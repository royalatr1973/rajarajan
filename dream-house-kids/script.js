// ====================================
// My Dream House - Kids Educational Website
// Fun Interactive JavaScript
// ====================================

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all interactive features
    initMobileMenu();
    initSmoothScroll();
    initScrollAnimations();
    initHoverEffects();
    initNavbarScroll();
    initCardAnimations();
});

// ====================================
// Mobile Menu Toggle
// ====================================
function initMobileMenu() {
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (menuBtn && navLinks) {
        menuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('active');

            // Animate hamburger menu
            const spans = menuBtn.querySelectorAll('span');
            spans.forEach((span, index) => {
                span.style.transition = 'transform 0.3s ease';
            });

            if (navLinks.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });

        // Close menu when clicking on a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                navLinks.classList.remove('active');
                const spans = menuBtn.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            });
        });
    }
}

// ====================================
// Smooth Scroll for Navigation Links
// ====================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));

            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ====================================
// Scroll Animations (Fade In Elements)
// ====================================
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll(
        '.feature-card, .room-card, .special-card, .eco-card, .love-icon-item, .gallery-img'
    );

    // Add initial hidden state
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });

    // Create intersection observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add staggered delay for multiple elements
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);

                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    animatedElements.forEach(el => observer.observe(el));
}

// ====================================
// Fun Hover Effects
// ====================================
function initHoverEffects() {
    // Add sparkle effect on card hover
    const cards = document.querySelectorAll('.room-card, .special-card');

    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            createSparkle(this);
        });
    });

    // Add bounce effect to emoji icons
    const emojiIcons = document.querySelectorAll('.section-icon, .feature-icon, .special-icon');

    emojiIcons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            this.style.animation = 'none';
            setTimeout(() => {
                this.style.animation = 'bounce 0.5s ease';
            }, 10);
        });
    });
}

// Create sparkle effect
function createSparkle(element) {
    const sparkle = document.createElement('span');
    sparkle.innerHTML = '✨';
    sparkle.style.cssText = `
        position: absolute;
        font-size: 1.5rem;
        pointer-events: none;
        animation: sparkleFloat 1s ease-out forwards;
        z-index: 100;
    `;

    const rect = element.getBoundingClientRect();
    sparkle.style.left = Math.random() * rect.width + 'px';
    sparkle.style.top = Math.random() * rect.height + 'px';

    element.style.position = 'relative';
    element.appendChild(sparkle);

    setTimeout(() => sparkle.remove(), 1000);
}

// Add sparkle animation styles
const sparkleStyles = document.createElement('style');
sparkleStyles.textContent = `
    @keyframes sparkleFloat {
        0% {
            opacity: 1;
            transform: translateY(0) scale(1);
        }
        100% {
            opacity: 0;
            transform: translateY(-30px) scale(0);
        }
    }
`;
document.head.appendChild(sparkleStyles);

// ====================================
// Navbar Scroll Effect
// ====================================
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;

        // Add shadow on scroll
        if (currentScroll > 50) {
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
            navbar.style.padding = '0.8rem 2rem';
        } else {
            navbar.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.08)';
            navbar.style.padding = '1rem 2rem';
        }

        // Hide/show navbar on scroll direction
        if (currentScroll > lastScroll && currentScroll > 200) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }

        navbar.style.transition = 'all 0.3s ease';
        lastScroll = currentScroll;
    });
}

// ====================================
// Card Click Animations
// ====================================
function initCardAnimations() {
    // Add click ripple effect to cards
    const clickableCards = document.querySelectorAll('.feature-card, .room-card, .special-card, .eco-card');

    clickableCards.forEach(card => {
        card.addEventListener('click', function(e) {
            createRipple(this, e);
        });
    });

    // Fun counter for room items
    const roomItems = document.querySelectorAll('.room-items .item');
    roomItems.forEach(item => {
        item.addEventListener('click', function() {
            this.style.transform = 'scale(1.2)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 200);
        });
    });
}

// Create ripple effect
function createRipple(element, event) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();

    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(255, 107, 157, 0.3);
        border-radius: 50%;
        transform: scale(0);
        animation: rippleEffect 0.6s ease-out;
        pointer-events: none;
        z-index: 1;
    `;

    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(ripple);

    setTimeout(() => ripple.remove(), 600);
}

// Add ripple animation styles
const rippleStyles = document.createElement('style');
rippleStyles.textContent = `
    @keyframes rippleEffect {
        0% {
            transform: scale(0);
            opacity: 1;
        }
        100% {
            transform: scale(2);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyles);

// ====================================
// Fun Console Message for Curious Kids
// ====================================
console.log('%c🏠 Welcome to My Dream House! 🏠',
    'font-size: 24px; color: #FF6B9D; font-weight: bold;');
console.log('%cYou found the secret developer console!',
    'font-size: 14px; color: #7C4DFF;');
console.log('%c✨ Keep dreaming and keep creating! ✨',
    'font-size: 14px; color: #00D9FF;');

// ====================================
// Scroll Progress Indicator
// ====================================
function initScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 4px;
        background: linear-gradient(90deg, #FF6B9D, #7C4DFF, #00D9FF);
        z-index: 9999;
        transition: width 0.1s ease;
        width: 0%;
    `;
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', function() {
        const scrollTop = document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPercent = (scrollTop / scrollHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    });
}

// Initialize scroll progress
initScrollProgress();

// ====================================
// Image Lazy Loading with Fun Effect
// ====================================
function initLazyLoading() {
    const images = document.querySelectorAll('img');

    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.style.animation = 'fadeInUp 0.5s ease forwards';
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => {
        img.style.opacity = '0';
        imageObserver.observe(img);
    });
}

// Add fadeInUp animation
const fadeStyles = document.createElement('style');
fadeStyles.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(fadeStyles);

// Initialize lazy loading
initLazyLoading();

// ====================================
// Active Navigation Highlight
// ====================================
function initActiveNavHighlight() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', function() {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (window.pageYOffset >= sectionTop - 150) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
                link.style.background = 'linear-gradient(135deg, #FFE5EC 0%, #E8F4FF 100%)';
                link.style.color = '#FF6B9D';
            } else {
                link.style.background = 'transparent';
                link.style.color = '#2D3436';
            }
        });
    });
}

// Initialize active nav highlight
initActiveNavHighlight();
