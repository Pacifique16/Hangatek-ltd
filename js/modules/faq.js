// FAQ Module
import { DOM } from './dom-elements.js';

export class FAQManager {
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
