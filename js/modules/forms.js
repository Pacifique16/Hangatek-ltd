// Forms Module
import { DOM } from './dom-elements.js';

export class FormsManager {
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
