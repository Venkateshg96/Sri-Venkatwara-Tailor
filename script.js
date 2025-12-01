// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle (removed as navigation is now always visible)
    
    // Navigation links will be set up after header loads - handled in index.html

    // Product category filtering
    const categoryTabs = document.querySelectorAll('.tab-btn');
    const productItems = document.querySelectorAll('.product-item');
    
    categoryTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs
            categoryTabs.forEach(t => t.classList.remove('active'));
            // Add active class to clicked tab
            this.classList.add('active');
            
            const category = this.getAttribute('data-category');
            
            productItems.forEach(item => {
                if (category === 'all' || item.getAttribute('data-category') === category) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // Contact form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const phone = formData.get('phone');
            const service = formData.get('service');
            const message = formData.get('message');
            
            // Create WhatsApp message
            const whatsappMessage = `Hello! I'm interested in your services.%0A%0AName: ${name}%0AEmail: ${email}%0APhone: ${phone || 'Not provided'}%0AService: ${service}%0AMessage: ${message}`;
            
            // Open WhatsApp with pre-filled message
            window.open(`https://wa.me/919603632618?text=${whatsappMessage}`, '_blank');
            
            // Show success message
            alert('Thank you for your message! You will be redirected to WhatsApp to send your inquiry.');
            
            // Reset form
            this.reset();
        });
    }

    // Cart functionality - handled in header setup after header loads

    // Product order buttons
    const orderButtons = document.querySelectorAll('.product-item .btn');
    orderButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const productName = this.closest('.product-item').querySelector('h3').textContent;
            const productPrice = this.closest('.product-item').querySelector('.price').textContent;
            
            const whatsappMessage = `Hello! I'm interested in ordering:%0A%0AProduct: ${productName}%0APrice Range: ${productPrice}%0A%0APlease provide more details about this product.`;
            
            window.open(`https://wa.me/919603632618?text=${whatsappMessage}`, '_blank');
        });
    });

    // Account navigation
    const accountNavLinks = document.querySelectorAll('.account-nav-link');
    const accountSections = document.querySelectorAll('.account-section');
    
    accountNavLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all nav links
            accountNavLinks.forEach(l => l.classList.remove('active'));
            // Add active class to clicked link
            this.classList.add('active');
            
            // Hide all account sections
            accountSections.forEach(section => {
                section.style.display = 'none';
            });
            
            // Show target section
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.style.display = 'block';
            }
        });
    });

    // Profile form submission
    const profileForm = document.querySelector('.profile-form');
    if (profileForm) {
        profileForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Profile updated successfully!');
        });
    }

    // Order tracking
    const trackOrderButtons = document.querySelectorAll('.order-actions .btn-secondary');
    trackOrderButtons.forEach(button => {
        if (button.textContent.includes('Track')) {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                const orderId = this.closest('.order-item').querySelector('h3').textContent;
                const whatsappMessage = `Hello! I would like to track my order:%0A%0A${orderId}%0A%0APlease provide the current status.`;
                window.open(`https://wa.me/919603632618?text=${whatsappMessage}`, '_blank');
            });
        }
    });

    // Reorder functionality
    const reorderButtons = document.querySelectorAll('.order-actions .btn-primary');
    reorderButtons.forEach(button => {
        if (button.textContent.includes('Reorder')) {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                const orderItem = this.closest('.order-item');
                const orderId = orderItem.querySelector('h3').textContent;
                const orderDetails = orderItem.querySelector('.order-details p').textContent;
                
                const whatsappMessage = `Hello! I would like to reorder:%0A%0A${orderId}%0A${orderDetails}%0A%0APlease confirm availability and pricing.`;
                window.open(`https://wa.me/919603632618?text=${whatsappMessage}`, '_blank');
            });
        }
    });

    // Scroll to top functionality
    window.addEventListener('scroll', function() {
        const floatingWhatsapp = document.querySelector('.floating-whatsapp');
        if (window.scrollY > 300) {
            floatingWhatsapp.style.display = 'flex';
        } else {
            floatingWhatsapp.style.display = 'flex'; // Always show WhatsApp button
        }
    });

    // Initialize page - show home section by default
    document.querySelectorAll('section').forEach(section => {
        section.style.display = 'none';
    });
    
    const homeSection = document.querySelector('#home');
    if (homeSection) {
        homeSection.style.display = 'flex';
    }

    // Header scroll effect
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        if (window.scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.background = '#fff';
            header.style.backdropFilter = 'none';
        }
    });

    // Animate service cards on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe service cards and product items
    document.querySelectorAll('.service-card, .product-item').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    // Add loading animation
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
    });

    // Handle resize events
    window.addEventListener('resize', function() {
        closeCartSidebar();
    });

    // FAQ toggle functionality (if needed)
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('faq-question')) {
            const answer = e.target.nextElementSibling;
            const isOpen = answer.style.display === 'block';
            
            // Close all other answers
            document.querySelectorAll('.faq-answer').forEach(ans => {
                ans.style.display = 'none';
            });
            
            // Toggle current answer
            answer.style.display = isOpen ? 'none' : 'block';
        }
    });

    // Add to cart functionality (basic)
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    function updateCartDisplay() {
        const cartContent = document.querySelector('.cart-content');
        const cartCount = cart.length;
        
        if (cartCount === 0) {
            cartContent.innerHTML = '<p>Your cart is empty</p>';
        } else {
            let cartHTML = '<div class="cart-items">';
            cart.forEach((item, index) => {
                cartHTML += `
                    <div class="cart-item">
                        <h4>${item.name}</h4>
                        <p>${item.price}</p>
                        <button onclick="removeFromCart(${index})" class="btn-remove">Remove</button>
                    </div>
                `;
            });
            cartHTML += '</div>';
            cartContent.innerHTML = cartHTML;
        }
        
        // Update cart count badge
        const cartCountElement = document.querySelector('.cart-count');
        if (cartCountElement) {
            cartCountElement.textContent = cartCount;
            cartCountElement.style.display = cartCount > 0 ? 'flex' : 'none';
        }
    }
    
    window.removeFromCart = function(index) {
        cart.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartDisplay();
    };
    
    // Initialize cart display
    updateCartDisplay();

    // Newsletter subscription (if added)
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            alert(`Thank you for subscribing with email: ${email}`);
            this.reset();
        });
    }

    // Search functionality (if search box is added)
    const searchBox = document.getElementById('search-box');
    if (searchBox) {
        searchBox.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const productItems = document.querySelectorAll('.product-item');
            
            productItems.forEach(item => {
                const productName = item.querySelector('h3').textContent.toLowerCase();
                const productDescription = item.querySelector('p').textContent.toLowerCase();
                
                if (productName.includes(searchTerm) || productDescription.includes(searchTerm)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    }

    // Print functionality for orders
    window.printOrder = function(orderId) {
        const printContent = document.querySelector(`[data-order="${orderId}"]`);
        if (printContent) {
            const newWindow = window.open('', '_blank');
            newWindow.document.write(`
                <html>
                    <head>
                        <title>Order ${orderId}</title>
                        <style>
                            body { font-family: Arial, sans-serif; padding: 20px; }
                            .order-header { border-bottom: 2px solid #333; padding-bottom: 10px; margin-bottom: 20px; }
                        </style>
                    </head>
                    <body>
                        <div class="order-header">
                            <h1>Sri Venkatewara Tailor</h1>
                            <p>Order Details</p>
                        </div>
                        ${printContent.innerHTML}
                    </body>
                </html>
            `);
            newWindow.document.close();
            newWindow.print();
        }
    };

    // Auto-hide functionality (simplified)
    document.addEventListener('click', function(e) {
        // Close cart if clicking outside
        const isClickInsideCart = cartSidebar && cartSidebar.contains(e.target);
        const isClickOnCartBtn = cartBtn && cartBtn.contains(e.target);
        
        if (!isClickInsideCart && !isClickOnCartBtn) {
            closeCartSidebar();
        }
    });

    console.log('Sri Venkatewara Tailor website initialized successfully!');
});

// Utility functions
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR'
    }).format(amount);
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePhone(phone) {
    const phoneRegex = /^[6-9]\d{9}$/;
    return phoneRegex.test(phone);
}

// Add loading states for buttons
function addLoadingState(button) {
    const originalText = button.textContent;
    button.textContent = 'Loading...';
    button.disabled = true;
    
    return function removeLoading() {
        button.textContent = originalText;
        button.disabled = false;
    };
}

// Toast notification function
function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    
    const styles = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 5px;
        color: white;
        font-weight: 500;
        z-index: 1002;
        animation: slideIn 0.3s ease;
    `;
    
    if (type === 'success') {
        toast.style.cssText = styles + 'background: #27ae60;';
    } else if (type === 'error') {
        toast.style.cssText = styles + 'background: #e74c3c;';
    }
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 300);
    }, 3000);
}

// Add CSS for toast animations
const toastStyles = document.createElement('style');
toastStyles.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(toastStyles);
