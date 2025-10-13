// DOM Elements Module
export const DOM = {
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
export const DIMENSIONS = {
    carouselItemWidth: DOM.carouselItems[0] ? DOM.carouselItems[0].offsetWidth + 30 : 0,
    testimonialItemWidth: DOM.testimonialItems[0] ? DOM.testimonialItems[0].offsetWidth : 0
};
