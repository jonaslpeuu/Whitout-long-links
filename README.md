# WClinks - Modern Link Shortener

WClinks ist ein moderner, responsiver Link-Verkürzer, der es dir ermöglicht, deine Links professionell und kürzer zu machen. Das Projekt verwendet die TinyURL API, um offizielle, dauerhaft gültige gekürzte Links zu erzeugen.

## 🚀 Features

- 📱 Vollständig responsives Design für alle Geräte
- 🌓 Automatische Dark/Light Mode
- 🔗 Intelligente Link-Verkürzung mit TinyURL
- 📊 Detaillierte Statistiken mit lokalem Tracking
- 📋 Einzelner Klick zum Kopieren
- 🎨 Modernes, professionelles Design
- 🔒 Robuste Fehlerbehandlung

## 🛠️ Technische Details

### Frontend
- HTML5
- CSS3
- JavaScript (ES6+)
- Font Awesome Icons
- LocalStorage für Statistiken

### Backend
- Python Server mit Flask
- CORS-Unterstützung für Cross-Origin Requests
- TinyURL API-Integration

### Browser Support
- Chrome (aktuelle Version)
- Firefox (aktuelle Version)
- Safari (aktuelle Version)
- Edge (aktuelle Version)

## 📥 Installation

### Voraussetzungen
- Python 3.8+ für den Backend-Server
- Webbrowser

### Schnelle Installation
1. Clone das Repository:
   ```
   git clone https://github.com/username/wclinks.git
   cd wclinks
   ```

2. Installiere die erforderlichen Python-Pakete:
   ```
   pip install flask flask-cors requests
   ```

3. Starte den Python-Server:
   ```
   python tinyurl_server.py
   ```

4. Öffne `index.html` in deinem Browser oder navigiere zu `http://localhost:5000`

## 📋 Verwendung

1. Gib den zu verkürzenden Link ein (z.B. "example.com")
2. Klicke auf "Verkürzen"
3. Der verkürzte Link wird angezeigt und du kannst ihn mit einem Klick kopieren
4. In den Statistiken siehst du, wie oft deine Links angeklickt wurden

## 🎨 Design

- Modernes, minimalistisches Design
- Smooth Animations und Übergänge
- Vollständig responsives Layout
- Dark/Light Mode

## 🔧 Konfiguration

### Dark/Light Mode
- Klicke auf das Sonne/Mond-Symbol in der oberen rechten Ecke
- Die Einstellung wird automatisch gespeichert und bleibt erhalten

### Betriebsmodi

Diese Anwendung kann in zwei verschiedenen Modi betrieben werden:

#### 1. TinyURL API-Modus (Standard)
- Verwendet den Python-Server und die TinyURL API
- Erzeugt echte, dauerhaft gültige TinyURL-Links (z.B. `https://tinyurl.com/abc123`)
- Benötigt einen laufenden Python-Server
- Lokales Tracking der Klicks mit localStorage

#### 2. Lokaler Weiterleitungsmodus (Alternative)
- Kann vollständig ohne Backend betrieben werden
- Verkürzte Links folgen dem Format: `domain.com/redirect.html?url=ENCODED_URL&code=RANDOM_CODE`
- Lokales Tracking der Klicks mit localStorage
- Verkürzte Links funktionieren nur auf der Domain, auf der die App gehostet ist

### Umschalten zwischen den Modi
Um zwischen diesen Modi zu wechseln, ändere die entsprechenden Einstellungen in der `script.js`-Datei:

- Für den TinyURL API-Modus: Verwende das aktuelle Setup mit dem Python-Server
- Für den lokalen Modus: Ändere die URL-Generierungsfunktion in `script.js` (siehe Kommentare im Code)

## 📊 Statistiken und Tracking

- WClinks speichert folgende Daten lokal in deinem Browser:
  - Gesamtzahl der verkürzten Links
  - Gesamtzahl der Klicks auf deine verkürzten Links
  - Durchschnittliche Klickrate
  
- Die Daten werden im localStorage gespeichert und sind nur für dich verfügbar
- Es werden keine Daten an externe Server gesendet (außer an TinyURL, wenn du den API-Modus verwendest)

## 📱 Responsive Design

- Vollständig responsives Layout für alle Bildschirmgrößen
- Optimierte Navigation für Mobilgeräte
- Anpassung der Schriftgrößen für bessere Lesbarkeit
- Touch-freundliche Button-Layouts

## 🧠 Technische Implementierung

### Frontend
- Modulare JavaScript-Struktur
- Verwendung von ES6+ Features
- Dynamische DOM-Manipulation
- Responsive CSS mit Flexbox

### Backend (im TinyURL API-Modus)
- Flask-REST-API
- CORS-Unterstützung für Cross-Origin-Anfragen
- Sichere API-Schlüsselverwaltung
- Robuste Fehlerbehandlung

## 📝 Lizenz

Dieses Projekt ist Open Source unter der MIT-Lizenz.

## 📈 Aktueller Status und zukünftige Features

### Umgesetzt
- Link-Kürzung mit TinyURL-API oder lokaler Weiterleitung
- Interaktive Benutzeroberfläche
- Lokales Klick-Tracking
- Dark/Light Mode
- Clipboard-Integration

### Geplante Features
- Verbessertes Fehlerhandling
- Erweiterte Statistiken und Berichte
- API-Dokumentation
- QR-Code Generierung für Links
- Benutzerdefinierte Link-Aliase

---

MIT License - Copyright (c) 2025 WClinks
