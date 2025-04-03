document.addEventListener('DOMContentLoaded', () => {
    const shortenButton = document.getElementById('shortenButton');
    const originalLinkInput = document.getElementById('originalLink');
    const shortLinkInput = document.getElementById('shortLink');
    const copyButton = document.getElementById('copyButton');
    const navLinks = document.querySelectorAll('.nav-links a');
    const totalLinks = document.getElementById('totalLinks');
    const totalClicks = document.getElementById('totalClicks');
    const avgClickRate = document.getElementById('avgClickRate');
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    const notificationsContainer = document.createElement('div');
    notificationsContainer.className = 'notifications-container';
    document.body.appendChild(notificationsContainer);

    // Initialize theme
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);

    // Simulated statistics (in a real application, these would come from a backend)
    let stats = {
        totalLinks: 0,
        totalClicks: 0,
        avgClickRate: 0
    };

    // Update statistics display
    function updateStats() {
        totalLinks.textContent = stats.totalLinks;
        totalClicks.textContent = stats.totalClicks;
        avgClickRate.textContent = stats.avgClickRate.toFixed(1) + '%';
    }

    // Simulate link shortening
    function shortenLink(url) {
        try {
            // Validate URL
            if (!url) {
                throw new Error('Bitte gib einen Link ein!');
            }
            
            if (!url.startsWith('http://') && !url.startsWith('https://')) {
                url = 'https://' + url;
            }

            // Generate and validate short code
            let shortCode;
            do {
                shortCode = Math.random().toString(36).substring(2, 7);
            } while (localStorage.getItem(shortCode)); // Ensure unique code

            const shortenedUrl = 'https://whitout_long_links.com/' + shortCode;
            
            // Store the mapping
            localStorage.setItem(shortCode, url);
            
            // Update statistics
            stats.totalLinks++;
            updateStats();

            // Show result
            shortLinkInput.value = shortenedUrl;
            shortLinkInput.style.display = 'block';
            copyButton.style.display = 'block';

            // Reset input
            originalLinkInput.value = '';
            
            // Show success message
            showNotification('Link erfolgreich verkürzt!', 'success');
            
        } catch (error) {
            showNotification(error.message, 'error');
        }
    }

    // Copy to clipboard function
    function copyToClipboard() {
        try {
            // Create a temporary textarea
            const tempInput = document.createElement('textarea');
            tempInput.value = shortLinkInput.value;
            document.body.appendChild(tempInput);
            
            // Select and copy text
            tempInput.select();
            tempInput.setSelectionRange(0, 99999);
            document.execCommand('copy');
            
            // Clean up
            document.body.removeChild(tempInput);
            
            // Show success message
            showNotification('Link wurde in die Zwischenablage kopiert!', 'success');
            
            // Change button text temporarily
            const originalText = copyButton.innerHTML;
            copyButton.innerHTML = '<i class="fas fa-check"></i> Kopiert!';
            setTimeout(() => {
                copyButton.innerHTML = originalText;
            }, 2000);
            
        } catch (err) {
            console.error('Failed to copy text: ', err);
            showNotification('Fehler beim Kopieren des Links!', 'error');
        }
    }

    // Theme functions
    function setTheme(theme) {
        localStorage.setItem('theme', theme);
        body.classList.toggle('dark', theme === 'dark');
        themeToggle.innerHTML = theme === 'dark' ? '🌙' : '☀️';
        
        // Update notifications container theme
        notificationsContainer.classList.toggle('dark', theme === 'dark');
    }

    // Notification function
    function showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        notificationsContainer.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);

        // Animate out and remove after 3 seconds
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    // Handle navigation
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
                // Update active link
                navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            }
        });
    });

    // Event listener for the shorten button
    shortenButton.addEventListener('click', () => {
        const url = originalLinkInput.value.trim();
        shortenLink(url);
    });

    // Event listener for the copy button
    copyButton.addEventListener('click', copyToClipboard);

    // Theme toggle event
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = body.classList.contains('dark') ? 'dark' : 'light';
            setTheme(currentTheme === 'dark' ? 'light' : 'dark');
        });
    }

    // Initialize statistics
    updateStats();

    // Handle redirects
    const urlParams = new URLSearchParams(window.location.search);
    const shortCode = window.location.pathname.substring(1);
    const targetUrl = localStorage.getItem(shortCode);

    if (shortCode && targetUrl) {
        // Redirect through redirect page
        window.location.href = 'redirect.html?url=' + encodeURIComponent(targetUrl);
    }
});
