/**
 * WhatsApp integration for Eros caps e-commerce
 * Handles checkout process via WhatsApp
 */

// WhatsApp number for sending orders (replace with your actual number)
const WHATSAPP_NUMBER = '+54 9 2645 89-5763'; // Replace with your WhatsApp number

/**
 * Prepares the WhatsApp message for checkout
 * @returns {string} Formatted WhatsApp message with order details
 */
function prepareWhatsAppMessage() {
  if (!cart || cart.length === 0) {
    return 'Me gustaría realizar un pedido en EROS.';
  }
  
  // Create order message
  let message = '*Nuevo pedido de EROS*\n\n';
  
  // Add each item
  cart.forEach(item => {
    const itemTotal = item.price * item.quantity;
    message += `• ${item.quantity}x ${item.name} - ${formatPrice(item.price)} each = ${formatPrice(itemTotal)}\n`;
  });
  
  // Add total
  const total = calculateCartTotal();
  message += `\n*Total: ${formatPrice(total)}*\n\n`;
  
  // Add note
  message += 'Por favor, confirme mi pedido. ¡Gracias!';
  
  return encodeURIComponent(message);
}

/**
 * Opens WhatsApp with the prepared message
 */
function checkoutViaWhatsApp() {
  const message = prepareWhatsAppMessage();
  const whatsappUrl = `https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${message}`;
  
  // Open WhatsApp in a new tab
  window.open(whatsappUrl, '_blank');
  
  // Clear cart after successful checkout
  clearCart();
  closeCart();
}

// Initialize WhatsApp checkout when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  const checkoutBtn = document.getElementById('checkout-btn');
  
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', function() {
      checkoutViaWhatsApp();
    });
  }
});