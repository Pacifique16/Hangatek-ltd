// Main JavaScript File - Imports all modules
import { HeaderManager } from './modules/header.js';
import { CarouselManager } from './modules/carousel.js';
import { TestimonialsManager } from './modules/testimonials.js';
import { PortfolioManager } from './modules/portfolio.js';
import { FAQManager } from './modules/faq.js';
import { FormsManager } from './modules/forms.js';

// Initialize all managers when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new HeaderManager();
    new CarouselManager();
    new TestimonialsManager();
    new PortfolioManager();
    new FAQManager();
    new FormsManager();
});
