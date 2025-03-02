from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import os
import json
import uuid

app = Flask(__name__, static_folder='.')
CORS(app)  # Erlaubt Cross-Origin Requests

# Pfad zur JSON-Datei
PRODUCTS_FILE = 'products.json'

# Produkte initialisieren oder laden
def get_products():
    if os.path.exists(PRODUCTS_FILE):
        with open(PRODUCTS_FILE, 'r', encoding='utf-8') as f:
            return json.load(f)
    else:
        # Leere Produktliste erstellen, wenn Datei nicht existiert
        with open(PRODUCTS_FILE, 'w', encoding='utf-8') as f:
            json.dump([], f)
        return []

def save_products(products):
    with open(PRODUCTS_FILE, 'w', encoding='utf-8') as f:
        json.dump(products, f, ensure_ascii=False, indent=2)

# Statische Dateien ausliefern
@app.route('/<path:path>')
def serve_static(path):
    return send_from_directory('.', path)

# Standardroute zur Startseite
@app.route('/')
def index():
    return send_from_directory('.', 'index.html')

# API-Endpunkt zum Abrufen aller Produkte
@app.route('/api/products', methods=['GET'])
def api_get_products():
    products = get_products()
    return jsonify(products)

# API-Endpunkt zum Hinzufügen eines neuen Produkts
@app.route('/api/products', methods=['POST'])
def api_add_product():
    product_data = request.json
    
    # ID hinzufügen
    product_data['id'] = str(uuid.uuid4())
    
    # Produkte laden, neues Produkt hinzufügen und speichern
    products = get_products()
    products.append(product_data)
    save_products(products)
    
    return jsonify(product_data), 201

# Server starten
if __name__ == '__main__':
    app.run(debug=True, port=5000)
