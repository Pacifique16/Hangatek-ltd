// Portfolio Module
import { DOM } from './dom-elements.js';

export class PortfolioManager {
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
