/**
 * Main JavaScript functionality for Eros caps e-commerce
 * Handles UI interactions and initializes components
 */

/**
 * Updates header style on scroll
 */
function handleHeaderScroll() {
  const header = document.getElementById('main-header');
  if (!header) return;
  
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
}

/**
 * Toggles mobile navigation
 */
function toggleMobileNav() {
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  
  if (!hamburger || !navLinks) return;
  
  hamburger.classList.toggle('active');
  navLinks.classList.toggle('active');
  
  // Toggle body scroll
  if (navLinks.classList.contains('active')) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
}

/**
 * Closes mobile navigation
 */
function closeMobileNav() {
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  
  if (!hamburger || !navLinks) return;
  
  hamburger.classList.remove('active');
  navLinks.classList.remove('active');
  document.body.style.overflow = '';
}

/**
 * Adds smooth scrolling to anchor links
 */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      // Skip for cart icon
      if (this.id === 'cart-icon') return;
      
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (!targetElement) return;
      
      // Close mobile navigation if open
      closeMobileNav();
      
      // Scroll to target
      const headerOffset = 80;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    });
  });
}

/**
 * Initializes all scripts when DOM is loaded
 */
document.addEventListener('DOMContentLoaded', () => {
  // Initialize header scroll effect
  window.addEventListener('scroll', handleHeaderScroll);
  handleHeaderScroll(); // Call once on initial load
  
  // Initialize hamburger menu
  const hamburger = document.querySelector('.hamburger');
  if (hamburger) {
    hamburger.addEventListener('click', toggleMobileNav);
  }
  
  // Initialize smooth scrolling
  initSmoothScroll();
  
  // Add click event to nav links for mobile
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', function() {
      // Don't close for cart icon
      if (this.id === 'cart-icon') return;
      closeMobileNav();
    });
  });
  
  // Close mobile nav when clicking outside
  document.addEventListener('click', function(e) {
    const navLinks = document.querySelector('.nav-links');
    const hamburger = document.querySelector('.hamburger');
    
    if (!navLinks || !hamburger) return;
    
    if (navLinks.classList.contains('active') && 
        !navLinks.contains(e.target) && 
        !hamburger.contains(e.target)) {
      closeMobileNav();
    }
  });
});