// Product data
const products = [
  {
    name: 'Smart Irrigation Controller',
    description: 'AI-powered irrigation system for optimal water management',
    image: 'https://images.unsplash.com/photo-1563906267088-b029e7101114?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
  },
  {
    name: 'Soil Sensor Array',
    description: 'Advanced soil monitoring system with real-time analytics',
    image: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
  },
  {
    name: 'Drone Crop Scanner',
    description: 'High-precision aerial imaging for crop health monitoring',
    image: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
  },
  {
    name: 'Smart Greenhouse System',
    description: 'Automated climate control for optimal growing conditions',
    image: 'pexels-pixabay-265216.jpg'
  }
];

// Gallery data
const galleryItems = [
  {
    image: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
    title: 'Modern Farming',
    category: 'farm'
  },
  {
    image: 'pexels-nc-farm-bureau-mark-2255801.jpg',
    title: 'Drone Technology',
    category: 'tech'
  },
  {
    image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
    title: 'Wheat Fields',
    category: 'harvest'
  },
  {
    image: 'pexels-photo-2132250.jpeg',
    title: 'Smart Sensors',
    category: 'tech'
  },
  {
    image: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
    title: 'Harvest Time',
    category: 'harvest'
  },
  {
    image: 'https://images.unsplash.com/photo-1472145246862-b24cf25c4a36?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
    title: 'Organic Farming',
    category: 'farm'
  }
];

// Initialize product slider
function initializeProductSlider() {
  const slider = document.getElementById('productSlider');
  if (!slider) return;
  
  slider.innerHTML = ''; // Clear existing content
  
  products.forEach(product => {
    const productCard = document.createElement('div');
    productCard.className = 'product-card';
    productCard.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>${product.description}</p>
    `;
    slider.appendChild(productCard);
  });
}

// Initialize gallery with error handling
function initializeGallery() {
  const gallery = document.getElementById('galleryGrid');
  const filterButtons = document.querySelectorAll('.filter-btn');
  
  if (!gallery) return;

  // Clear existing content
  gallery.innerHTML = '';

  // Populate gallery
  galleryItems.forEach(item => {
    const galleryItem = document.createElement('div');
    galleryItem.className = `gallery-item ${item.category}`;
    galleryItem.innerHTML = `
      <img src="${item.image}" alt="${item.title}" loading="lazy">
      <div class="gallery-item-overlay">
        <h3>${item.title}</h3>
      </div>
    `;
    gallery.appendChild(galleryItem);
  });

  // Filter functionality
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      const filter = button.getAttribute('data-filter');
      
      // Update active button
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      // Filter gallery items with fade effect
      const items = gallery.getElementsByClassName('gallery-item');
      Array.from(items).forEach(item => {
        item.style.opacity = '0';
        setTimeout(() => {
          if (filter === 'all' || item.classList.contains(filter)) {
            item.style.display = 'block';
            setTimeout(() => {
              item.style.opacity = '1';
            }, 50);
          } else {
            item.style.display = 'none';
          }
        }, 300);
      });
    });
  });
}

// Slider navigation
let currentSlide = 0;
const slideWidth = 320; // Width of product card + margin

window.nextSlide = function() {
  const slider = document.getElementById('productSlider');
  if (!slider) return;
  currentSlide = Math.min(currentSlide + 1, products.length - 1);
  slider.scrollLeft = currentSlide * slideWidth;
};

window.prevSlide = function() {
  const slider = document.getElementById('productSlider');
  if (!slider) return;
  currentSlide = Math.max(currentSlide - 1, 0);
  slider.scrollLeft = currentSlide * slideWidth;
};

// Smooth scroll to products section
window.scrollToProducts = function() {
  const productsSection = document.getElementById('products');
  if (productsSection) {
    productsSection.scrollIntoView({ behavior: 'smooth' });
  }
};

// Initialize stats counter with error handling
function initializeStats() {
  const stats = document.querySelectorAll('.stat-number');
  
  stats.forEach(stat => {
    const target = parseInt(stat.getAttribute('data-target'));
    if (isNaN(target)) return;

    const increment = target / 100;
    let current = 0;

    const updateCounter = () => {
      if (current < target) {
        current += increment;
        stat.textContent = Math.ceil(current);
        requestAnimationFrame(updateCounter);
      } else {
        stat.textContent = target;
      }
    };

    updateCounter();
  });
}

// Newsletter form submission
window.handleNewsletterSubmit = function(event) {
  event.preventDefault();
  const emailInput = event.target.querySelector('input[type="email"]');
  if (!emailInput) return;
  
  const email = emailInput.value;
  alert(`Thank you for subscribing with: ${email}`);
  event.target.reset();
};

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  try {
    initializeProductSlider();
    initializeStats();
    initializeGallery();
  } catch (error) {
    console.error('Initialization error:', error);
  }
});

// Navbar scroll effect with error handling
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;
  
  if (window.scrollY > 50) {
    navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
  } else {
    navbar.style.backgroundColor = 'white';
  }
});