from flask import Flask, request, jsonify, send_from_directory
import requests
import os
from flask_cors import CORS  # Für Cross-Origin Unterstützung

# Flask-App mit aktuellem Verzeichnis als static_folder erstellen
app = Flask(__name__, static_folder=os.path.abspath('.'))
CORS(app)  # Erlaubt CORS für alle Routen

# TinyURL API Key (in einer Produktionsumgebung sollte dieser in Umgebungsvariablen gespeichert werden)
API_KEY = '3qyZD4ME9Bq59gdRzcPty5VSugB8rYgPuJlnetRiJvPiphiw73NEuyB1FCGX'  # Ersetze mit deinem API-Key

@app.route('/api/shorten', methods=['POST'])
def shorten_url():
    data = request.json
    original_url = data.get('url')
    
    if not original_url:
        return jsonify({'error': 'Keine URL angegeben'}), 400
    
    # TinyURL API-Endpunkt
    tinyurl_api = 'https://api.tinyurl.com/create'
    
    # Header mit Authentifizierung
    headers = {
        'Authorization': f'Bearer {API_KEY}',
        'Content-Type': 'application/json'
    }
    
    # Daten für den POST-Request
    payload = {
        'url': original_url,
        'domain': 'tinyurl.com'  # oder 'tiny.one', wenn du das bevorzugst
    }
    
    try:
        # Anfrage an TinyURL senden
        response = requests.post(tinyurl_api, json=payload, headers=headers)
        
        # Antwort auswerten
        if response.status_code == 201 or response.status_code == 200:
            data = response.json()
            
            # Die Antwort kann unterschiedliche Strukturen haben
            # Manchmal ist tiny_url direkt in data, manchmal tiefer verschachtelt
            if 'data' in data and 'tiny_url' in data['data']:
                short_url = data['data']['tiny_url']
            elif 'tiny_url' in data:
                short_url = data['tiny_url']
            else:
                # Wenn wir die URL nicht finden können, geben wir die komplette Antwort zurück
                # Zu Debug-Zwecken
                return jsonify({
                    'success': False,
                    'error': 'Konnte keine URL in der Antwort finden',
                    'data': data
                }), 500
            
            return jsonify({
                'success': True,
                'shortUrl': short_url
            })
        else:
            # Echter Fehlerfall
            return jsonify({
                'success': False,
                'error': f'TinyURL API Fehler: {response.status_code}',
                'message': response.text
            }), 500
    except Exception as e:
        return jsonify({
            'success': False,
            'error': 'Server-Fehler',
            'message': str(e)
        }), 500

# Statisches Verzeichnis für Frontend-Dateien
@app.route('/', defaults={'path': 'index.html'})
@app.route('/<path:path>')
def serve_static(path):
    return send_from_directory(app.static_folder, path)

if __name__ == '__main__':
    # Server auf Port 5000 starten
    app.run(debug=True, port=5000)
