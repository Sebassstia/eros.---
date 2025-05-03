/**
 * Products data for Eros caps e-commerce store
 * Each product has a unique id, name, price, image URL, and optional badge
 */
const products = [
  {
    id: 1,
    name: "Gorra Urban Highly Favored Edition",
    price: 13000,
    image: "1.png",
    badge: ""
  },
  {
    id: 2,
    name: "Gorra Chill Gris Casual ",
    price: 13000,
    image: "2.png"
  },
  {
    id: 3,
    name: "Gorra Retro New York 92’s ",
    price: 13000,
    image: "3.png",
    badge: ""
  },
  {
    id: 4,
    name: "Gorra New York 88’s Vintage",
    price: 13000,
    image: "4.png"
  },
  {
    id: 5,
    name: "Gorra Athlehs Urban",
    price: 13000,
    image: "5.png"
  },
  {
    id: 6,
    name: "Gorra The North Face",
    price: 13000,
    image: "6.png",
    badge: ""
  },
  {
    id: 7,
    name: "Gorra New York 00’s",
    price: 13000,
    image: "7.png",
    badge: ""
  },
  {
    id: 8,
    name: "Gorra New York 88’s Vintage",
    price: 13000,
    image: "8.png",
    badge: ""
  },
  {
    id: 9,
    name: "Gorra New York 88’s Vintage",
    price: 13000,
    image: "9.png",
    badge: ""
  },
  {
    id: 10,
    name: "Gorra Chill Negro Casual",
    price: 13000,
    image: "10.png",
    badge: ""
  }
];

/**
 * Formats a number as USD currency
 * @param {number} price - The price to format
 * @returns {string} The formatted price string
 */
function formatPrice(price) {
  return new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'ARS' // o 'COP', 'ARS', etc.
  }).format(price);
}


/**
 * Creates HTML for a product card
 * @param {Object} product - The product data
 * @returns {string} HTML string for the product card
 */
function createProductCard(product) {
  return `
    <div class="product-card" data-id="${product.id}">
      <div class="product-image">
        <img src="${product.image}" alt="${product.name}">
        ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
      </div>
      <div class="product-info">
        <h3 class="product-name">${product.name}</h3>
        <p class="product-price">${formatPrice(product.price)}</p>
        <div class="product-actions">
          <button class="add-to-cart" data-id="${product.id}">Añadir al carrito</button>
        </div>
      </div>
    </div>
  `;
}

/**
 * Renders all products to the product container
 */
function renderProducts() {
  const productsContainer = document.getElementById('products-container');
  
  if (!productsContainer) return;
  
  productsContainer.innerHTML = products.map(product => 
    createProductCard(product)
  ).join('');
  
  // Add event listeners to all "Add to Cart" buttons
  document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function() {
      const productId = parseInt(this.getAttribute('data-id'));
      const product = products.find(p => p.id === productId);
      
      if (product) {
        // This function is defined in cart.js
        addToCart(product);
        showNotification('¡Artículo añadido al carrito!');
      }
    });
  });
}

/**
 * Gets a product by its ID
 * @param {number} id - The product ID to find
 * @returns {Object|null} The product object or null if not found
 */
function getProductById(id) {
  return products.find(product => product.id === id) || null;
}

/**
 * Shows a notification message
 * @param {string} message - The message to display
 */
function showNotification(message) {
  const notification = document.getElementById('notification');
  notification.querySelector('p').textContent = message;
  notification.classList.add('show');
  
  setTimeout(() => {
    notification.classList.remove('show');
  }, 3000);
}

// Initialize products when DOM is loaded
document.addEventListener('DOMContentLoaded', renderProducts);