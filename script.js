// Produktklasse
class Product {
    constructor(name, price, image, description, size) {
        this.name = name;
        this.price = price;
        this.image = image;
        this.description = description;
        this.size = size;
    }
}

// API URLs
const API_URL = 'http://localhost:5000/api';

// DOM-Elemente
document.addEventListener('DOMContentLoaded', function() {
    // Shop-Seite Funktionalität
    if (document.querySelector('.shop-page')) {
        // Referenzen auf DOM-Elemente
        const productsContainer = document.querySelector('.products');
        const addProductForm = document.querySelector('#add-product-form');
        
        // Shop-Funktionen ausführen
        loadProducts();
        
        // Event-Listener für das Hinzufügen neuer Produkte
        if (addProductForm) {
            addProductForm.addEventListener('submit', handleAddProduct);
        }
        
        // Event-Delegation für Warenkorb-Buttons
        if (productsContainer) {
            productsContainer.addEventListener('click', function(e) {
                if (e.target.classList.contains('add-to-cart')) {
                    e.preventDefault();
                    alert('Der Shop ist aktuell nur zur Ansicht. Bitte kontaktieren Sie uns für weitere Informationen.');
                }
            });
        }
    }
});

// Produkte aus der API laden
async function loadProducts() {
    const productsContainer = document.querySelector('.products');
    if (!productsContainer) return;
    
    try {
        // Ladeanimation anzeigen
        productsContainer.innerHTML = '<div class="loading">Produkte werden geladen...</div>';
        
        // API-Anfrage
        const response = await fetch(`${API_URL}/products`);
        if (!response.ok) {
            throw new Error('Fehler beim Laden der Produkte');
        }
        
        const products = await response.json();
        
        // Container leeren
        productsContainer.innerHTML = '';
        
        // Wenn keine Produkte vorhanden sind, Hinweistext anzeigen
        if (products.length === 0) {
            productsContainer.innerHTML = '<p class="no-products">Aktuell sind keine Produkte vorhanden.</p>';
            return;
        }
        
        // Produkte anzeigen
        products.forEach(product => {
            displayProduct(product);
        });
    } catch (error) {
        console.error('Fehler:', error);
        productsContainer.innerHTML = `<div class="error">Fehler beim Laden der Produkte: ${error.message}</div>`;
    }
}

// Produkt hinzufügen
async function handleAddProduct(e) {
    e.preventDefault();
    
    const nameInput = document.querySelector('#product-name');
    const priceInput = document.querySelector('#product-price');
    const imageInput = document.querySelector('#product-image');
    const descriptionInput = document.querySelector('#product-description');
    const sizeInput = document.querySelector('#product-size');
    
    // Validierung
    if (!nameInput.value || !priceInput.value || !imageInput.files[0] || !descriptionInput.value) {
        alert('Bitte füllen Sie alle Pflichtfelder aus.');
        return;
    }
    
    try {
        // Bild als Base64 konvertieren
        const imageBase64 = await convertImageToBase64(imageInput.files[0]);
        
        // Neues Produkt erstellen
        const newProduct = new Product(
            nameInput.value,
            parseFloat(priceInput.value),
            imageBase64,
            descriptionInput.value,
            sizeInput.value
        );
        
        // An API senden
        const response = await fetch(`${API_URL}/products`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newProduct)
        });
        
        if (!response.ok) {
            throw new Error('Fehler beim Speichern des Produkts');
        }
        
        const savedProduct = await response.json();
        
        // Neues Produkt anzeigen
        displayProduct(savedProduct);
        
        // Formular zurücksetzen
        e.target.reset();
        
        alert('Produkt erfolgreich hinzugefügt!');
    } catch (error) {
        console.error('Fehler:', error);
        alert(`Fehler beim Hinzufügen des Produkts: ${error.message}`);
    }
}

// Produkt anzeigen
function displayProduct(product) {
    const productsContainer = document.querySelector('.products');
    if (!productsContainer) return;
    
    const productElement = document.createElement('div');
    productElement.classList.add('product');
    
    productElement.innerHTML = `
        <div class="product-img">
            <img src="${product.image}" alt="${product.name}">
        </div>
        <div class="product-info">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            ${product.size ? `<div class="product-size">Größe: ${product.size}</div>` : ''}
            <div class="price">${product.price.toFixed(2)} €</div>
            <button class="btn add-to-cart">In den Warenkorb</button>
        </div>
    `;
    
    productsContainer.appendChild(productElement);
}

// Bild in Base64 konvertieren
function convertImageToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
        reader.readAsDataURL(file);
    });
}
