class LinkStorage {
    constructor() {
        this.storageKey = 'wclinks_data';
        this.data = this.loadFromStorage();
    }

    loadFromStorage() {
        const savedData = localStorage.getItem(this.storageKey);
        return savedData ? JSON.parse(savedData) : {
            links: {},
            stats: {
                totalLinks: 0,
                totalClicks: 0,
                avgClickRate: 0
            }
        };
    }

    saveToStorage() {
        localStorage.setItem(this.storageKey, JSON.stringify(this.data));
    }

    generateShortCode() {
        let shortCode;
        do {
            shortCode = Math.random().toString(36).substring(2, 7);
        } while (this.data.links[shortCode]);
        return shortCode;
    }

    addLink(originalUrl, shortCode = null) {
        if (!shortCode) {
            shortCode = this.generateShortCode();
        }

        this.data.links[shortCode] = {
            originalUrl,
            createdAt: new Date().toISOString(),
            clicks: 0
        };

        this.data.stats.totalLinks++;
        this.updateStats();
        this.saveToStorage();
        return shortCode;
    }

    getLink(shortCode) {
        return this.data.links[shortCode];
    }

    incrementClick(shortCode) {
        const link = this.getLink(shortCode);
        if (link) {
            link.clicks++;
            this.data.stats.totalClicks++;
            this.updateStats();
            this.saveToStorage();
        }
    }

    updateStats() {
        const totalLinks = Object.keys(this.data.links).length;
        const totalClicks = Object.values(this.data.links).reduce((sum, link) => sum + link.clicks, 0);
        const avgClickRate = totalLinks > 0 ? (totalClicks / totalLinks) * 100 : 0;

        this.data.stats = {
            totalLinks,
            totalClicks,
            avgClickRate
        };
    }

    getStats() {
        return this.data.stats;
    }

    getAllLinks() {
        return this.data.links;
    }
}

// Create a singleton instance
const storage = new LinkStorage();

// Export the instance
window.storage = storage;
