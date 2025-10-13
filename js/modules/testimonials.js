// Testimonials Module
import { DOM, state, DIMENSIONS } from './dom-elements.js';

export class TestimonialsManager {
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
