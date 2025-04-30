/**
 * Shopping cart functionality for Eros caps e-commerce
 * Handles adding, removing, and updating cart items
 */

// Initialize cart from localStorage or empty array
let cart = JSON.parse(localStorage.getItem('erosCart')) || [];

/**
 * Saves the current cart to localStorage
 */
function saveCart() {
  localStorage.setItem('erosCart', JSON.stringify(cart));
}

/**
 * Updates the cart count in the header
 */
function updateCartCount() {
  const cartCount = document.getElementById('cart-count');
  if (!cartCount) return;
  
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  cartCount.textContent = totalItems;
  
  // Add animation effect
  cartCount.classList.add('pulse');
  setTimeout(() => {
    cartCount.classList.remove('pulse');
  }, 300);
}

/**
 * Adds a product to the cart
 * @param {Object} product - The product to add
 */
function addToCart(product) {
  const existingItem = cart.find(item => item.id === product.id);
  
  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1
    });
  }
  
  saveCart();
  updateCartCount();
  renderCartItems();
}

/**
 * Updates the quantity of a cart item
 * @param {number} id - The product ID
 * @param {number} newQuantity - The new quantity
 */
function updateCartItemQuantity(id, newQuantity) {
  const itemIndex = cart.findIndex(item => item.id === id);
  
  if (itemIndex !== -1) {
    if (newQuantity <= 0) {
      // Remove item if quantity is 0 or negative
      cart.splice(itemIndex, 1);
    } else {
      cart[itemIndex].quantity = newQuantity;
    }
    
    saveCart();
    updateCartCount();
    renderCartItems();
  }
}

/**
 * Removes an item from the cart
 * @param {number} id - The product ID to remove
 */
function removeCartItem(id) {
  cart = cart.filter(item => item.id !== id);
  saveCart();
  updateCartCount();
  renderCartItems();
}

/**
 * Calculates the total price of all items in the cart
 * @returns {number} The total price
 */
function calculateCartTotal() {
  return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

/**
 * Renders all cart items in the cart modal
 */
function renderCartItems() {
  const cartItemsContainer = document.getElementById('cart-items');
  const cartTotalElement = document.getElementById('cart-total-price');
  
  if (!cartItemsContainer || !cartTotalElement) return;
  
  if (cart.length === 0) {
    cartItemsContainer.innerHTML = `
      <div class="empty-cart">
        <i class="fas fa-shopping-cart"></i>
        <p>Tu carrito está vacío</p>
        <a href="#catalog" class="btn-primary" id="empty-cart-shop">Comprar ahora</a>
      </div>
    `;
    
    // Close cart when clicking shop now in empty cart
    const emptyCartShop = document.getElementById('empty-cart-shop');
    if (emptyCartShop) {
      emptyCartShop.addEventListener('click', closeCart);
    }
  } else {
    cartItemsContainer.innerHTML = cart.map(item => `
      <div class="cart-item" data-id="${item.id}">
        <img src="${item.image}" alt="${item.name}" class="cart-item-image">
        <div class="cart-item-details">
          <h3 class="cart-item-name">${item.name}</h3>
          <p class="cart-item-price">${formatPrice(item.price)}</p>
          <div class="cart-item-quantity">
            <button class="quantity-btn quantity-decrease" data-id="${item.id}">-</button>
            <span class="quantity-value">${item.quantity}</span>
            <button class="quantity-btn quantity-increase" data-id="${item.id}">+</button>
          </div>
        </div>
        <div class="cart-item-remove" data-id="${item.id}">
          <i class="fas fa-trash"></i>
        </div>
      </div>
    `).join('');
    
    // Add event listeners to quantity buttons and remove buttons
    document.querySelectorAll('.quantity-decrease').forEach(button => {
      button.addEventListener('click', function() {
        const id = parseInt(this.getAttribute('data-id'));
        const item = cart.find(item => item.id === id);
        if (item) {
          updateCartItemQuantity(id, item.quantity - 1);
        }
      });
    });
    
    document.querySelectorAll('.quantity-increase').forEach(button => {
      button.addEventListener('click', function() {
        const id = parseInt(this.getAttribute('data-id'));
        const item = cart.find(item => item.id === id);
        if (item) {
          updateCartItemQuantity(id, item.quantity + 1);
        }
      });
    });
    
    document.querySelectorAll('.cart-item-remove').forEach(button => {
      button.addEventListener('click', function() {
        const id = parseInt(this.getAttribute('data-id'));
        removeCartItem(id);
      });
    });
  }
  
  // Update total price
  cartTotalElement.textContent = formatPrice(calculateCartTotal());
}

/**
 * Opens the cart modal
 */
function openCart() {
  const cartModal = document.getElementById('cart-modal');
  if (!cartModal) return;
  
  cartModal.classList.add('open');
  renderCartItems();
  
  // Prevent scrolling on the body
  document.body.style.overflow = 'hidden';
}

/**
 * Closes the cart modal
 */
function closeCart() {
  const cartModal = document.getElementById('cart-modal');
  if (!cartModal) return;
  
  cartModal.classList.remove('open');
  
  // Re-enable scrolling on the body
  document.body.style.overflow = '';
}

/**
 * Clears all items from the cart
 */
function clearCart() {
  cart = [];
  saveCart();
  updateCartCount();
  renderCartItems();
}

// Initialize cart when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Initialize cart count
  updateCartCount();
  
  // Add event listener to cart icon to open cart
  const cartIcon = document.getElementById('cart-icon');
  if (cartIcon) {
    cartIcon.addEventListener('click', function(e) {
      e.preventDefault();
      openCart();
    });
  }
  
  // Add event listener to close cart button
  const closeCartBtn = document.getElementById('close-cart');
  if (closeCartBtn) {
    closeCartBtn.addEventListener('click', closeCart);
  }
  
  // Close cart when clicking outside
  window.addEventListener('click', function(e) {
    const cartModal = document.getElementById('cart-modal');
    if (cartModal && e.target === cartModal) {
      closeCart();
    }
  });
});