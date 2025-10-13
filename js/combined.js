/* js/modules/dom-elements.js */
// DOM Elements Module
const DOM = {
    // Header elements
    header: document.getElementById('header'),
    mobileMenuBtn: document.getElementById('mobileMenuBtn'),
    navMenu: document.getElementById('navMenu'),
    navLinks: document.querySelectorAll('.nav-link'),
    
    // Carousel elements
    carouselContainer: document.getElementById('carouselContainer'),
    carouselPrev: document.getElementById('carouselPrev'),
    carouselNext: document.getElementById('carouselNext'),
    carouselItems: document.querySelectorAll('.service-card'),
    
    // Testimonials elements
    testimonialsContainer: document.getElementById('testimonialsContainer'),
    testimonialPrev: document.getElementById('testimonialPrev'),
    testimonialNext: document.getElementById('testimonialNext'),
    testimonialPlayPause: document.getElementById('testimonialPlayPause'),
    testimonialItems: document.querySelectorAll('.testimonial'),
    
    // FAQ elements
    faqItems: document.querySelectorAll('.faq-item'),
    
    // Form elements
    contactForm: document.getElementById('contactForm'),
    requestForm: document.getElementById('requestForm'),
    feedbackForm: document.getElementById('feedbackForm'),
    
    // Modal elements
    requestModal: document.getElementById('requestModal'),
    modalClose: document.getElementById('modalClose'),
    feedbackBtn: document.getElementById('feedbackBtn'),
    feedbackModal: document.getElementById('feedbackModal'),
    feedbackModalClose: document.getElementById('feedbackModalClose'),
    
    // Portfolio elements
    serviceItems: document.querySelectorAll('.service-item'),
    filterButtons: document.querySelectorAll('.filter-btn'),
    portfolioItems: document.querySelectorAll('.portfolio-item')
};

// Calculate dimensions
const DIMENSIONS = {
    carouselItemWidth: DOM.carouselItems[0] ? DOM.carouselItems[0].offsetWidth + 30 : 0,
    testimonialItemWidth: DOM.testimonialItems[0] ? DOM.testimonialItems[0].offsetWidth : 0
};


/* js/modules/state.js */
// State Management Module
const state = {
    // Carousel state
    carouselPosition: 0,
    testimonialPosition: 0,
    testimonialAutoPlay: true,
    testimonialInterval: null,
    
    // Touch/swipe state
    startX: 0,
    currentX: 0,
    isDragging: false
};


/* js/modules/header.js */
// Header Module
class HeaderManager {
    constructor() {
        this.init();
    }

    init() {
        this.setupScrollEffect();
        this.setupMobileMenu();
        this.setupNavigation();
    }

    setupScrollEffect() {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                DOM.header.classList.add('scrolled');
            } else {
                DOM.header.classList.remove('scrolled');
            }
            
            this.updateActiveNav();
        });
    }

    setupMobileMenu() {
        DOM.mobileMenuBtn.addEventListener('click', () => {
            DOM.navMenu.classList.toggle('active');
        });
    }

    setupNavigation() {
        DOM.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                
                // Close mobile menu when a link is clicked
                DOM.navMenu.classList.remove('active');
                
                if (targetId.startsWith('#')) {
                    const targetSection = document.querySelector(targetId);
                    if (targetSection) {
                        const headerHeight = DOM.header.offsetHeight;
                        const targetPosition = targetSection.offsetTop - headerHeight;
                        
                        window.scrollTo({
                            top: targetPosition,
                            behavior: 'smooth'
                        });
                        
                        // Update URL without jumping
                        history.pushState(null, null, targetId);
                    }
                } else if (targetId === '#request') {
                    // Handle request project modal
                    DOM.requestModal.style.display = 'flex';
                }
            });
        });
    }

    updateActiveNav() {
        const sections = document.querySelectorAll('section');
        const scrollPosition = window.scrollY + 100; // Adjust for header height
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                // Remove active class from all links
                DOM.navLinks.forEach(link => {
                    link.classList.remove('active');
                });
                
                // Add active class to corresponding link
                const activeLink = document.querySelector(`a[href="#${sectionId}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }
}


/* js/modules/carousel.js */
// Carousel Module
class CarouselManager {
    constructor() {
        this.init();
    }

    init() {
        this.setupCarouselNavigation();
        this.setupTouchSupport();
    }

    setupCarouselNavigation() {
        DOM.carouselNext.addEventListener('click', () => {
            if (state.carouselPosition > -DIMENSIONS.carouselItemWidth * (DOM.carouselItems.length - 1)) {
                state.carouselPosition -= DIMENSIONS.carouselItemWidth;
                DOM.carouselContainer.style.transform = `translateX(${state.carouselPosition}px)`;
            }
        });

        DOM.carouselPrev.addEventListener('click', () => {
            if (state.carouselPosition < 0) {
                state.carouselPosition += DIMENSIONS.carouselItemWidth;
                DOM.carouselContainer.style.transform = `translateX(${state.carouselPosition}px)`;
            }
        });
    }

    setupTouchSupport() {
        DOM.carouselContainer.addEventListener('touchstart', (e) => {
            state.startX = e.touches[0].clientX;
            state.currentX = state.startX;
            state.isDragging = true;
        });

        DOM.carouselContainer.addEventListener('touchmove', (e) => {
            if (!state.isDragging) return;
            state.currentX = e.touches[0].clientX;
        });

        DOM.carouselContainer.addEventListener('touchend', () => {
            if (!state.isDragging) return;
            const diffX = state.startX - state.currentX;
            
            // Minimum swipe distance (to avoid accidental touches)
            if (Math.abs(diffX) > 50) {
                if (diffX > 0) {
                    // Swiped left → Next slide
                    if (state.carouselPosition > -DIMENSIONS.carouselItemWidth * (DOM.carouselItems.length - 1)) {
                        state.carouselPosition -= DIMENSIONS.carouselItemWidth;
                    }
                } else {
                    // Swiped right → Previous slide
                    if (state.carouselPosition < 0) {
                        state.carouselPosition += DIMENSIONS.carouselItemWidth;
                    }
                }
                
                // Clamp carouselPosition to valid range
                const minPosition = -DIMENSIONS.carouselItemWidth * (DOM.carouselItems.length - 1);
                const maxPosition = 0;
                if (state.carouselPosition < minPosition) state.carouselPosition = minPosition;
                if (state.carouselPosition > maxPosition) state.carouselPosition = maxPosition;
                
                DOM.carouselContainer.style.transition = 'transform 0.4s ease';
                DOM.carouselContainer.style.transform = `translateX(${state.carouselPosition}px)`;
            }
            state.isDragging = false;
        });
    }
}


/* js/modules/testimonials.js */
// Testimonials Module
class TestimonialsManager {
    constructor() {
        this.init();
    }

    init() {
        this.setupTestimonialNavigation();
        this.setupPlayPause();
        this.startAutoPlay();
    }

    setupTestimonialNavigation() {
        DOM.testimonialNext.addEventListener('click', () => {
            if (state.testimonialPosition > -DIMENSIONS.testimonialItemWidth * (DOM.testimonialItems.length - 1)) {
                state.testimonialPosition -= DIMENSIONS.testimonialItemWidth;
                DOM.testimonialsContainer.style.transform = `translateX(${state.testimonialPosition}px)`;
            } else {
                // Animate sliding left back to the first card
                state.testimonialPosition = 0;
                DOM.testimonialsContainer.style.transition = 'none';
                DOM.testimonialsContainer.style.transform = `translateX(${state.testimonialPosition}px)`;
                // Force reflow then restore transition for smooth effect
                setTimeout(() => {
                    DOM.testimonialsContainer.style.transition = '';
                }, 50);
            }
        });

        DOM.testimonialPrev.addEventListener('click', () => {
            // If we're not at the first slide, move one right
            if (state.testimonialPosition < 0) {
                state.testimonialPosition += DIMENSIONS.testimonialItemWidth;
                DOM.testimonialsContainer.style.transform = `translateX(${state.testimonialPosition}px)`;
            } else {
                // If at first slide, wrap to the last slide
                state.testimonialPosition = -DIMENSIONS.testimonialItemWidth * (DOM.testimonialItems.length - 1);
                DOM.testimonialsContainer.style.transition = 'none';
                DOM.testimonialsContainer.style.transform = `translateX(${state.testimonialPosition}px)`;
                // restore transition for smooth next moves
                setTimeout(() => {
                    DOM.testimonialsContainer.style.transition = '';
                }, 50);
            }
        });
    }

    setupPlayPause() {
        DOM.testimonialPlayPause.addEventListener('click', () => {
            state.testimonialAutoPlay = !state.testimonialAutoPlay;
            const icon = DOM.testimonialPlayPause.querySelector('i');
            if (state.testimonialAutoPlay) {
                icon.classList.remove('fa-play');
                icon.classList.add('fa-pause');
                this.startAutoPlay();
            } else {
                icon.classList.remove('fa-pause');
                icon.classList.add('fa-play');
                this.stopAutoPlay();
            }
        });
    }

    startAutoPlay() {
        this.stopAutoPlay();
        state.testimonialInterval = setInterval(() => {
            if (state.testimonialPosition > -DIMENSIONS.testimonialItemWidth * (DOM.testimonialItems.length - 1)) {
                state.testimonialPosition -= DIMENSIONS.testimonialItemWidth;
                DOM.testimonialsContainer.style.transform = `translateX(${state.testimonialPosition}px)`;
            } else {
                state.testimonialPosition = 0;
                DOM.testimonialsContainer.style.transition = 'none';
                DOM.testimonialsContainer.style.transform = `translateX(${state.testimonialPosition}px)`;
                setTimeout(() => {
                    DOM.testimonialsContainer.style.transition = '';
                }, 50);
            }
        }, 5000);
    }

    stopAutoPlay() {
        if (state.testimonialInterval) {
            clearInterval(state.testimonialInterval);
            state.testimonialInterval = null;
        }
    }
}


/* js/modules/portfolio.js */
// Portfolio Module
class PortfolioManager {
    constructor() {
        this.init();
    }

    init() {
        this.setupFiltering();
        this.setupScrollAnimation();
    }

    setupFiltering() {
        DOM.filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons
                DOM.filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                button.classList.add('active');
                
                const filterValue = button.getAttribute('data-filter');
                
                // Filter portfolio items
                DOM.portfolioItems.forEach(item => {
                    const itemCategory = item.getAttribute('data-category');
                    
                    if (filterValue === 'all' || filterValue === itemCategory) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }

    setupScrollAnimation() {
        function checkScroll() {
            DOM.serviceItems.forEach(item => {
                const position = item.getBoundingClientRect().top;
                const screenPosition = window.innerHeight / 1.3;
                
                if (position < screenPosition) {
                    item.classList.add('visible');
                }
            });
        }

        window.addEventListener('scroll', checkScroll);
        // Initial check on page load
        checkScroll();
    }
}


/* js/modules/faq.js */
// FAQ Module
class FAQManager {
    constructor() {
        this.init();
    }

    init() {
        this.setupAccordion();
    }

    setupAccordion() {
        DOM.faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            question.addEventListener('click', () => {
                item.classList.toggle('active');
            });
        });
    }
}


/* js/modules/forms.js */
// Forms Module
class FormsManager {
    constructor() {
        this.init();
    }

    init() {
        this.setupContactForm();
        this.setupRequestModal();
        this.setupFeedbackModal();
        this.setupModalCloseHandlers();
    }

    setupContactForm() {
        DOM.contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Thank you for your message! We will get back to you soon.');
            DOM.contactForm.reset();
        });
    }

    setupRequestModal() {
        // Handle request project modal
        document.querySelector('.nav-request').addEventListener('click', (e) => {
            e.preventDefault();
            DOM.requestModal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        });

        DOM.modalClose.addEventListener('click', () => {
            DOM.requestModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });

        DOM.requestForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Validate required fields
            const requiredFields = DOM.requestForm.querySelectorAll('[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.style.borderColor = 'red';
                } else {
                    field.style.borderColor = '#ddd';
                }
            });
            
            if (isValid) {
                alert('Thank you for your project request! We will review it and get back to you within 24 hours.');
                DOM.requestForm.reset();
                DOM.requestModal.style.display = 'none';
                document.body.style.overflow = 'auto';
            } else {
                alert('Please fill in all required fields.');
            }
        });
    }

    setupFeedbackModal() {
        DOM.feedbackBtn.addEventListener('click', () => {
            DOM.feedbackModal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        });

        DOM.feedbackModalClose.addEventListener('click', () => {
            DOM.feedbackModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });

        DOM.feedbackForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Thank you for your feedback! We appreciate your input.');
            DOM.feedbackForm.reset();
            DOM.feedbackModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    }

    setupModalCloseHandlers() {
        // Close modals when clicking outside
        window.addEventListener('click', (e) => {
            if (e.target === DOM.requestModal) {
                DOM.requestModal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
            if (e.target === DOM.feedbackModal) {
                DOM.feedbackModal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    }
}



// Initialize all managers when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new HeaderManager();
    new CarouselManager();
    new TestimonialsManager();
    new PortfolioManager();
    new FAQManager();
    new FormsManager();
});