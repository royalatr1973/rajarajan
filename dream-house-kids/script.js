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
    initRoomModal();
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

// ====================================
// Room Modal / Lightbox
// ====================================
function initRoomModal() {
    const modal = document.getElementById('roomModal');
    const modalImage = document.getElementById('modalImage');
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');
    const closeBtn = document.querySelector('.modal-close');
    const clickableRooms = document.querySelectorAll('.clickable-room');

    // Open modal when clicking on a room card
    clickableRooms.forEach(room => {
        room.addEventListener('click', function(e) {
            // Prevent event from bubbling
            e.stopPropagation();

            const fullImage = this.dataset.fullImage;
            const roomName = this.dataset.roomName;
            const roomDesc = this.dataset.roomDesc;

            if (fullImage && roomName) {
                // Set modal content
                modalImage.src = fullImage;
                modalImage.alt = roomName + ' - Full View';
                modalTitle.textContent = roomName;
                modalDescription.textContent = roomDesc;

                // Show modal with animation
                modal.style.display = 'flex';
                setTimeout(() => {
                    modal.classList.add('active');
                }, 10);

                // Prevent body scroll
                document.body.style.overflow = 'hidden';

                // Play a fun sound effect (optional visual feedback)
                createModalSparkles();
            }
        });
    });

    // Close modal when clicking close button
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }

    // Close modal when clicking outside the content
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });

    function closeModal() {
        modal.classList.remove('active');
        setTimeout(() => {
            modal.style.display = 'none';
            document.body.style.overflow = '';
        }, 300);
    }

    // Create sparkle effect when modal opens
    function createModalSparkles() {
        const modalContent = document.querySelector('.modal-content');
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                const sparkle = document.createElement('span');
                sparkle.innerHTML = ['✨', '⭐', '🌟', '💫'][Math.floor(Math.random() * 4)];
                sparkle.style.cssText = `
                    position: absolute;
                    font-size: ${1 + Math.random() * 1.5}rem;
                    pointer-events: none;
                    animation: modalSparkle 1s ease-out forwards;
                    z-index: 100;
                    left: ${Math.random() * 100}%;
                    top: ${Math.random() * 100}%;
                `;
                modalContent.appendChild(sparkle);
                setTimeout(() => sparkle.remove(), 1000);
            }, i * 100);
        }
    }
}

// Add modal sparkle animation
const modalSparkleStyles = document.createElement('style');
modalSparkleStyles.textContent = `
    @keyframes modalSparkle {
        0% {
            opacity: 1;
            transform: scale(0) rotate(0deg);
        }
        50% {
            opacity: 1;
            transform: scale(1.2) rotate(180deg);
        }
        100% {
            opacity: 0;
            transform: scale(0.5) rotate(360deg) translateY(-30px);
        }
    }
`;
document.head.appendChild(modalSparkleStyles);

// ====================================
// Secret Room Multi-Step Modal
// ====================================
function initSecretRoomModal() {
    const secretRoomCard = document.getElementById('secretRoomCard');
    const secretModal = document.getElementById('secretRoomModal');
    const secretClose = document.querySelector('.secret-close');
    const step1 = document.getElementById('secretStep1');
    const step2 = document.getElementById('secretStep2');
    const step3 = document.getElementById('secretStep3');
    const goToStep2Btn = document.getElementById('goToStep2');
    const goToStep3Btn = document.getElementById('goToStep3');
    const restartBtn = document.getElementById('restartSecret');

    if (!secretRoomCard || !secretModal) return;

    // Open secret modal when clicking secret room card
    secretRoomCard.addEventListener('click', function(e) {
        e.stopPropagation();
        openSecretModal();
    });

    function openSecretModal() {
        // Reset to step 1
        showStep(1);

        // Show modal
        secretModal.style.display = 'flex';
        setTimeout(() => {
            secretModal.classList.add('active');
        }, 10);

        document.body.style.overflow = 'hidden';
        createMagicParticles();
    }

    function closeSecretModal() {
        secretModal.classList.remove('active');
        setTimeout(() => {
            secretModal.style.display = 'none';
            document.body.style.overflow = '';
            showStep(1); // Reset for next time
        }, 300);
    }

    function showStep(stepNumber) {
        // Hide all steps
        step1.classList.add('hidden');
        step2.classList.add('hidden');
        step3.classList.add('hidden');

        // Show requested step
        switch(stepNumber) {
            case 1:
                step1.classList.remove('hidden');
                break;
            case 2:
                step2.classList.remove('hidden');
                createMagicParticles();
                break;
            case 3:
                step3.classList.remove('hidden');
                createFinalRevealEffect();
                break;
        }
    }

    // Step navigation
    if (goToStep2Btn) {
        goToStep2Btn.addEventListener('click', function() {
            showStep(2);
        });
    }

    if (goToStep3Btn) {
        goToStep3Btn.addEventListener('click', function() {
            showStep(3);
        });
    }

    if (restartBtn) {
        restartBtn.addEventListener('click', function() {
            showStep(1);
        });
    }

    // Close modal
    if (secretClose) {
        secretClose.addEventListener('click', closeSecretModal);
    }

    secretModal.addEventListener('click', function(e) {
        if (e.target === secretModal) {
            closeSecretModal();
        }
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && secretModal.classList.contains('active')) {
            closeSecretModal();
        }
    });

    // Create magical particle effect
    function createMagicParticles() {
        const modalContent = document.querySelector('.secret-modal-content');
        const particles = ['✨', '⭐', '🌟', '💫', '🔮'];

        for (let i = 0; i < 8; i++) {
            setTimeout(() => {
                const particle = document.createElement('span');
                particle.innerHTML = particles[Math.floor(Math.random() * particles.length)];
                particle.style.cssText = `
                    position: absolute;
                    font-size: ${1 + Math.random() * 1.5}rem;
                    pointer-events: none;
                    animation: secretParticle 2s ease-out forwards;
                    z-index: 100;
                    left: ${Math.random() * 100}%;
                    top: ${Math.random() * 100}%;
                `;
                modalContent.appendChild(particle);
                setTimeout(() => particle.remove(), 2000);
            }, i * 150);
        }
    }

    // Final reveal celebration effect
    function createFinalRevealEffect() {
        const modalContent = document.querySelector('.secret-modal-content');
        const celebrationItems = ['🎉', '✨', '🌟', '💫', '⛓️', '🔮', '💎'];

        for (let i = 0; i < 15; i++) {
            setTimeout(() => {
                const item = document.createElement('span');
                item.innerHTML = celebrationItems[Math.floor(Math.random() * celebrationItems.length)];
                item.style.cssText = `
                    position: absolute;
                    font-size: ${1.5 + Math.random() * 2}rem;
                    pointer-events: none;
                    animation: celebrationBurst 2.5s ease-out forwards;
                    z-index: 100;
                    left: ${Math.random() * 100}%;
                    top: ${Math.random() * 100}%;
                `;
                modalContent.appendChild(item);
                setTimeout(() => item.remove(), 2500);
            }, i * 100);
        }
    }
}

// Add secret room particle animations
const secretParticleStyles = document.createElement('style');
secretParticleStyles.textContent = `
    @keyframes secretParticle {
        0% {
            opacity: 1;
            transform: scale(0) translateY(0);
        }
        50% {
            opacity: 1;
            transform: scale(1.3) translateY(-20px);
        }
        100% {
            opacity: 0;
            transform: scale(0.5) translateY(-50px);
        }
    }

    @keyframes celebrationBurst {
        0% {
            opacity: 1;
            transform: scale(0) rotate(0deg);
        }
        30% {
            opacity: 1;
            transform: scale(1.5) rotate(180deg);
        }
        100% {
            opacity: 0;
            transform: scale(0.3) rotate(360deg) translateY(-80px);
        }
    }
`;
document.head.appendChild(secretParticleStyles);

// Initialize secret room modal on DOM load
document.addEventListener('DOMContentLoaded', function() {
    initSecretRoomModal();
});
