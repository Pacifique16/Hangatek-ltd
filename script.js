        // DOM Elements
        const header = document.getElementById('header');
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const navMenu = document.getElementById('navMenu');
        const navLinks = document.querySelectorAll('.nav-link');
        const carouselContainer = document.getElementById('carouselContainer');
        const carouselPrev = document.getElementById('carouselPrev');
        const carouselNext = document.getElementById('carouselNext');
        const testimonialsContainer = document.getElementById('testimonialsContainer');
        const testimonialPrev = document.getElementById('testimonialPrev');
        const testimonialNext = document.getElementById('testimonialNext');
        const testimonialPlayPause = document.getElementById('testimonialPlayPause');
        const faqItems = document.querySelectorAll('.faq-item');
        const contactForm = document.getElementById('contactForm');
        const requestModal = document.getElementById('requestModal');
        const modalClose = document.getElementById('modalClose');
        const requestForm = document.getElementById('requestForm');
        const feedbackBtn = document.getElementById('feedbackBtn');
        const feedbackModal = document.getElementById('feedbackModal');
        const feedbackModalClose = document.getElementById('feedbackModalClose');
        const feedbackForm = document.getElementById('feedbackForm');
        const serviceItems = document.querySelectorAll('.service-item');
        const filterButtons = document.querySelectorAll('.filter-btn');
        const portfolioItems = document.querySelectorAll('.portfolio-item');

        // Variables
        let carouselPosition = 0;
        let testimonialPosition = 0;
        let testimonialAutoPlay = true;
        let testimonialInterval;
        const carouselItems = document.querySelectorAll('.service-card');
        const testimonialItems = document.querySelectorAll('.testimonial');
        const carouselItemWidth = carouselItems[0].offsetWidth + 30; // width + margin
        const testimonialItemWidth = testimonialItems[0].offsetWidth;

        // Header scroll effect
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
            
            // Update active navigation based on scroll position
            updateActiveNav();
        });

        // Mobile menu toggle
        mobileMenuBtn.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });

        // Enhanced smooth scrolling for navigation links with header offset
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                
                // Close mobile menu when a link is clicked
                navMenu.classList.remove('active');
                
                if (targetId.startsWith('#')) {
                    const targetSection = document.querySelector(targetId);
                    if (targetSection) {
                        const headerHeight = header.offsetHeight;
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
                    requestModal.style.display = 'flex';
                }
            });
        });

        // Function to update active navigation link based on scroll position
        function updateActiveNav() {
            const sections = document.querySelectorAll('section');
            const scrollPosition = window.scrollY + 100; // Adjust for header height
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                const sectionId = section.getAttribute('id');
                
                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    // Remove active class from all links
                    navLinks.forEach(link => {
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

        // Initialize active navigation on page load
        document.addEventListener('DOMContentLoaded', updateActiveNav);

        // Carousel navigation
        carouselNext.addEventListener('click', () => {
            if (carouselPosition > -carouselItemWidth * (carouselItems.length - 1)) {
                carouselPosition -= carouselItemWidth;
                carouselContainer.style.transform = `translateX(${carouselPosition}px)`;
            }
        });

        carouselPrev.addEventListener('click', () => {
            if (carouselPosition < 0) {
                carouselPosition += carouselItemWidth;
                carouselContainer.style.transform = `translateX(${carouselPosition}px)`;
            }
        });


        // ▶︎ Add this to re-enable the Prev button (place after testimonialNext handler)
        testimonialPrev.addEventListener('click', () => {
            // If we're not at the first slide, move one right
            if (testimonialPosition < 0) {
                testimonialPosition += testimonialItemWidth;
                testimonialsContainer.style.transform = `translateX(${testimonialPosition}px)`;
            } else {
                // If at first slide, wrap to the last slide
                testimonialPosition = -testimonialItemWidth * (testimonialItems.length - 1);
                testimonialsContainer.style.transition = 'none';
                testimonialsContainer.style.transform = `translateX(${testimonialPosition}px)`;
                // restore transition for smooth next moves
                setTimeout(() => {
                    testimonialsContainer.style.transition = '';
                }, 50);
            }
        });


        // Testimonials navigation
        testimonialNext.addEventListener('click', () => {
            if (testimonialPosition > -testimonialItemWidth * (testimonialItems.length - 1)) {
                testimonialPosition -= testimonialItemWidth;
                testimonialsContainer.style.transform = `translateX(${testimonialPosition}px)`;
            } else {
                // Animate sliding left back to the first card
                testimonialPosition = 0;
                testimonialsContainer.style.transition = 'none';
                testimonialsContainer.style.transform = `translateX(${testimonialPosition}px)`;
                // Force reflow then restore transition for smooth effect
                setTimeout(() => {
                    testimonialsContainer.style.transition = '';
                }, 50);
            }
        });

        // Remove testimonialPrev event to prevent sliding right

        // Play/Pause button logic
        testimonialPlayPause.addEventListener('click', () => {
            testimonialAutoPlay = !testimonialAutoPlay;
            const icon = testimonialPlayPause.querySelector('i');
            if (testimonialAutoPlay) {
                icon.classList.remove('fa-play');
                icon.classList.add('fa-pause');
                startTestimonialAutoPlay();
            } else {
                icon.classList.remove('fa-pause');
                icon.classList.add('fa-play');
                stopTestimonialAutoPlay();
            }
        });

        function startTestimonialAutoPlay() {
            stopTestimonialAutoPlay();
            testimonialInterval = setInterval(() => {
                if (testimonialPosition > -testimonialItemWidth * (testimonialItems.length - 1)) {
                    testimonialPosition -= testimonialItemWidth;
                    testimonialsContainer.style.transform = `translateX(${testimonialPosition}px)`;
                } else {
                    testimonialPosition = 0;
                    testimonialsContainer.style.transition = 'none';
                    testimonialsContainer.style.transform = `translateX(${testimonialPosition}px)`;
                    setTimeout(() => {
                        testimonialsContainer.style.transition = '';
                    }, 50);
                }
            }, 5000);
        }

        function stopTestimonialAutoPlay() {
            if (testimonialInterval) {
                clearInterval(testimonialInterval);
                testimonialInterval = null;
            }
        }

        // Start autoplay on load
        // Set initial icon to pause (since autoplay starts enabled)
        testimonialPlayPause.querySelector('i').classList.remove('fa-play');
        testimonialPlayPause.querySelector('i').classList.add('fa-pause');
        startTestimonialAutoPlay();

        // FAQ accordion
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            question.addEventListener('click', () => {
                item.classList.toggle('active');
            });
        });

        // Portfolio filtering
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                button.classList.add('active');
                
                const filterValue = button.getAttribute('data-filter');
                
                // Filter portfolio items
                portfolioItems.forEach(item => {
                    const itemCategory = item.getAttribute('data-category');
                    
                    if (filterValue === 'all' || filterValue === itemCategory) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });

        // Form submissions
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Thank you for your message! We will get back to you soon.');
            contactForm.reset();
        });

        // Request project modal
        document.querySelector('.nav-request').addEventListener('click', (e) => {
            e.preventDefault();
            requestModal.style.display = 'flex';
        });

        modalClose.addEventListener('click', () => {
            requestModal.style.display = 'none';
        });

        requestForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Thank you for your project request! We will review it and get back to you soon.');
            requestForm.reset();
            requestModal.style.display = 'none';
        });

        // Feedback modal
        feedbackBtn.addEventListener('click', () => {
            feedbackModal.style.display = 'flex';
        });

        feedbackModalClose.addEventListener('click', () => {
            feedbackModal.style.display = 'none';
        });

        feedbackForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Thank you for your feedback! We appreciate your input.');
            feedbackForm.reset();
            feedbackModal.style.display = 'none';
        });

        // Close modals when clicking outside
        window.addEventListener('click', (e) => {
            if (e.target === requestModal) {
                requestModal.style.display = 'none';
            }
            if (e.target === feedbackModal) {
                feedbackModal.style.display = 'none';
            }
        });

        // Animate service items on scroll
        function checkScroll() {
            serviceItems.forEach(item => {
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

        // Auto rotate testimonials
        // ...existing code...


        // Request project modal - UPDATED to ensure it works with the new form
        document.querySelector('.nav-request').addEventListener('click', (e) => {
            e.preventDefault();
            requestModal.style.display = 'flex';
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        });

        modalClose.addEventListener('click', () => {
            requestModal.style.display = 'none';
            document.body.style.overflow = 'auto'; // Restore scrolling
        });

        requestForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Validate required fields
            const requiredFields = requestForm.querySelectorAll('[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.style.borderColor = 'red';
                } else {
                    field.style.borderColor = '#ddd';
                }
            });
            
            // Check if terms checkbox is checked
            const termsChecked = document.getElementById('terms').checked;
            if (!termsChecked) {
                isValid = false;
                document.getElementById('terms').parentElement.style.color = 'red';
            } else {
                document.getElementById('terms').parentElement.style.color = 'inherit';
            }
            
            if (isValid) {
                alert('Thank you for your project request! We will review it and get back to you within 24 hours.');
                requestForm.reset();
                requestModal.style.display = 'none';
                document.body.style.overflow = 'auto'; // Restore scrolling
            } else {
                alert('Please fill in all required fields and accept the Terms of Service.');
            }
        });

        // Close modals when clicking outside - UPDATED to handle body overflow
        window.addEventListener('click', (e) => {
            if (e.target === requestModal) {
                requestModal.style.display = 'none';
                document.body.style.overflow = 'auto'; // Restore scrolling
            }
            if (e.target === feedbackModal) {
                feedbackModal.style.display = 'none';
                document.body.style.overflow = 'auto'; // Restore scrolling
            }
        });

        // --- Touch Swipe Support for Carousel (Mobile) ---
        let startX = 0;
        let currentX = 0;
        let isDragging = false;

        carouselContainer.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            isDragging = true;
        });

        carouselContainer.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            currentX = e.touches[0].clientX;
        });

        carouselContainer.addEventListener('touchend', () => {
            if (!isDragging) return;
            const diffX = startX - currentX;
            // Minimum swipe distance (to avoid accidental touches)
            if (Math.abs(diffX) > 50) {
                if (diffX > 0) {
                    // Swiped left → Next slide
                    if (carouselPosition > -carouselItemWidth * (carouselItems.length - 1)) {
                        carouselPosition -= carouselItemWidth;
                        carouselContainer.style.transition = 'transform 0.4s ease';
                        carouselContainer.style.transform = `translateX(${carouselPosition}px)`;
                    }
                } else {
                    // Swiped right → Previous slide
                    if (carouselPosition < 0) {
                        carouselPosition += carouselItemWidth;
                        carouselContainer.style.transition = 'transform 0.4s ease';
                        carouselContainer.style.transform = `translateX(${carouselPosition}px)`;
                    }
                }
            }
            isDragging = false;
        });
                // --- End Touch Swipe Support ---


        