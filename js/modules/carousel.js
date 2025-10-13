// Carousel Module
import { DOM, state, DIMENSIONS } from './dom-elements.js';

export class CarouselManager {
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
