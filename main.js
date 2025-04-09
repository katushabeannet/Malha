document.addEventListener('DOMContentLoaded', function() {
    
    const slides = document.querySelectorAll('.slider img');
    const heroContents = document.querySelectorAll('.hero-content');
    let current = 0;
    
    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        heroContents.forEach(content => content.classList.remove('active'));

        slides[index].classList.add('active');
        heroContents[index].classList.add('active');
    }

    showSlide(0);

    let slideInterval = setInterval(() => {
        current = (current + 1) % slides.length;
        showSlide(current);
    }, 5000);

    const heroSection = document.querySelector('.hero');
    
    heroSection.addEventListener('touchstart', () => {
        clearInterval(slideInterval);
    });
    
    heroSection.addEventListener('touchend', () => {
        slideInterval = setInterval(() => {
            current = (current + 1) % slides.length;
            showSlide(current);
        }, 5000);
    });

    const scrollIndicator = document.createElement('div');
    scrollIndicator.className = 'scroll-indicator';
    heroSection.appendChild(scrollIndicator);
    
    scrollIndicator.addEventListener('click', () => {
        window.scrollTo({
            top: window.innerHeight,
            behavior: 'smooth'
        });
    });

    const toggle = document.getElementById("menu-toggle");
    const nav = document.getElementById("nav-menu");
    
    toggle.addEventListener("click", () => {
        nav.classList.toggle("active");
        toggle.textContent = nav.classList.contains("active") ? "✕" : "☰";

        if (navigator.vibrate) {
            navigator.vibrate(50);
        }
    });

    document.addEventListener('click', (e) => {
        if (nav.classList.contains('active') && 
            !nav.contains(e.target) && 
            e.target !== toggle) {
            nav.classList.remove('active');
            toggle.textContent = "☰";
        }
    });

    const testimonials = document.querySelectorAll('.testimonial');
    const dots = document.querySelectorAll('.dot');
    let currentTestimonial = 0;
    
    function showTestimonial(index) {
        testimonials.forEach(testimonial => testimonial.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        testimonials[index].classList.add('active');
        dots[index].classList.add('active');
    }
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentTestimonial = index;
            showTestimonial(currentTestimonial);
        });
    });
    
    let testimonialInterval = setInterval(() => {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(currentTestimonial);
    }, 5000);

    const testimonialSlider = document.querySelector('.testimonial-slider');
    let touchStartX = 0;
    let touchEndX = 0;
    
    testimonialSlider.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        clearInterval(testimonialInterval);
    });
    
    testimonialSlider.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
        
        testimonialInterval = setInterval(() => {
            currentTestimonial = (currentTestimonial + 1) % testimonials.length;
            showTestimonial(currentTestimonial);
        }, 5000);
    });
    
    function handleSwipe() {
        if (touchEndX < touchStartX - 50) {
            currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        }
        if (touchEndX > touchStartX + 50) {
            currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
        }
        showTestimonial(currentTestimonial);
    }

    const animateOnScroll = () => {
        const headings = document.querySelectorAll('h2');
        headings.forEach(heading => {
            const headingPosition = heading.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if(headingPosition < screenPosition) {
                heading.classList.add('animated');
            }
        });

        const galleryImages = document.querySelectorAll('.gallery-img');
        galleryImages.forEach(img => {
            const imgPosition = img.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.1;
            
            if(imgPosition < screenPosition) {
                img.classList.add('animated');
            }
        });

        const animatedElements = document.querySelectorAll('.service-card, .destination-card, .about-text, .about-image, .newsletter-form');
        animatedElements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if(elementPosition < screenPosition) {
                element.classList.add('fade-in-element', 'visible');
            }
        });

        const revealImages = document.querySelectorAll('.image-reveal');
        revealImages.forEach(image => {
            const imagePosition = image.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.1;
            
            if(imagePosition < screenPosition) {
                image.classList.add('revealed');
            }
        });
    };

    window.addEventListener('scroll', animateOnScroll);
    window.addEventListener('load', animateOnScroll);

    const images = document.querySelectorAll('img');
    images.forEach(img => {
        if (!img.complete) {
            img.parentElement.classList.add('loading-animation');
            
            img.addEventListener('load', () => {
                img.parentElement.classList.remove('loading-animation');
            });
        }
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });

                if (nav.classList.contains('active')) {
                    nav.classList.remove('active');
                    toggle.textContent = "☰";
                }
            }
        });
    });

    window.addEventListener('scroll', () => {
        const scrollPosition = window.pageYOffset;
        const heroSection = document.querySelector('.hero');
        const slider = document.querySelector('.slider');
        
        if (scrollPosition <= window.innerHeight) {
            slider.style.transform = `translateY(${scrollPosition * 0.4}px)`;
        }
    });

    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if (validateEmail(email)) {
                const successMessage = document.createElement('p');
                successMessage.textContent = 'Thank you for subscribing!';
                successMessage.style.color = '#ffeb3b';
                successMessage.style.marginTop = '10px';

                this.innerHTML = '';
                this.appendChild(successMessage);
                
                console.log('Email submitted:', email);
            } else {
                emailInput.style.borderColor = '#ff6b6b';

                let errorMessage = this.querySelector('.error-message');
                if (!errorMessage) {
                    errorMessage = document.createElement('p');
                    errorMessage.className = 'error-message';
                    errorMessage.style.color = '#ff6b6b';
                    errorMessage.style.fontSize = '0.9rem';
                    errorMessage.style.marginTop = '5px';
                    this.appendChild(errorMessage);
                }
                errorMessage.textContent = 'Please enter a valid email address';

                emailInput.addEventListener('focus', function() {
                    this.style.borderColor = '';
                    if (errorMessage) {
                        errorMessage.textContent = '';
                    }
                });
            }
        });
    }

    function validateEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    if ('loading' in HTMLImageElement.prototype) {
        const lazyImages = document.querySelectorAll('img:not(.slider img)');
        lazyImages.forEach(img => {
            img.loading = 'lazy';
        });
    } else {
        const lazyImages = document.querySelectorAll('img:not(.slider img)');
        
        const lazyLoadObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    observer.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => {
            lazyLoadObserver.observe(img);
        });
    }

    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
        const touchElements = document.querySelectorAll('.service-card, .destination-card, .gallery img');
        
        touchElements.forEach(element => {
            element.addEventListener('touchstart', function() {
                this.classList.add('touch-active');
            });
            
            element.addEventListener('touchend', function() {
                setTimeout(() => {
                    this.classList.remove('touch-active');
                }, 300);
            });
        });
    }

    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollTopBtn.className = 'scroll-top-btn';
    document.body.appendChild(scrollTopBtn);
    
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });

    const style = document.createElement('style');
    style.textContent = `
        .scroll-top-btn {
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background-color: #006400;
            color: white;
            border: none;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            z-index: 1000;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
        }
        
        .scroll-top-btn.visible {
            opacity: 1;
            visibility: visible;
        }
        
        .scroll-top-btn:hover {
            background-color: #004d00;
            transform: translateY(-3px);
        }
        
        .touch-active {
            transform: scale(0.95) !important;
            transition: transform 0.3s ease !important;
        }
    `;
    document.head.appendChild(style);

    window.addEventListener('online', updateNetworkStatus);
    window.addEventListener('offline', updateNetworkStatus);
    
    function updateNetworkStatus() {
        if (!navigator.onLine) {
            if (!document.querySelector('.offline-message')) {
                const offlineMessage = document.createElement('div');
                offlineMessage.className = 'offline-message';
                offlineMessage.textContent = 'You are currently offline. Some features may be unavailable.';
                document.body.prepend(offlineMessage);

                const offlineStyle = document.createElement('style');
                offlineStyle.textContent = `
                    .offline-message {
                        background-color: #ff6b6b;
                        color: white;
                        text-align: center;
                        padding: 10px;
                        position: fixed;
                        top: 0;
                        left: 0;
                        right: 0;
                        z-index: 2000;
                        font-size: 0.9rem;
                    }
                `;
                document.head.appendChild(offlineStyle);
            }
        } else {
            const offlineMessage = document.querySelector('.offline-message');
            if (offlineMessage) {
                offlineMessage.remove();
            }
        }
    }
    
    updateNetworkStatus();
});
