window.addEventListener('load', function() {
    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-navigation');
    const headerActions = document.querySelector('.header-actions');

    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
            menuToggle.setAttribute('aria-expanded', !isExpanded);

            mainNav.classList.toggle('active');
            if (headerActions) {
                headerActions.classList.toggle('active');
            }
            menuToggle.classList.toggle('active');
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (mainNav.classList.contains('active') && 
                !mainNav.contains(e.target) && 
                !menuToggle.contains(e.target)) {
                menuToggle.setAttribute('aria-expanded', 'false');
                mainNav.classList.remove('active');
                if (headerActions) {
                    headerActions.classList.remove('active');
                }
                menuToggle.classList.remove('active');
            }
        });

        // Close menu when clicking a link
        const navLinks = mainNav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                menuToggle.setAttribute('aria-expanded', 'false');
                mainNav.classList.remove('active');
                if (headerActions) {
                    headerActions.classList.remove('active');
                }
                menuToggle.classList.remove('active');
            });
        });
    }

    // Update Tahun di Footer
    const currentYearSpan = document.getElementById('currentYear');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // Smooth scroll untuk link anchor
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const hrefAttribute = this.getAttribute('href');
            if (hrefAttribute.length > 1 && document.querySelector(hrefAttribute)) {
                e.preventDefault();
                document.querySelector(hrefAttribute).scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Form validation untuk halaman kontak
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            const requiredFields = contactForm.querySelectorAll('[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                // Remove existing error styling
                field.classList.remove('error-field');
                const errorSpan = field.parentElement.querySelector('.error-message');
                if (errorSpan) {
                    errorSpan.remove();
                }
                
                // Validate field
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('error-field');
                    
                    // Add error message
                    const errorSpan = document.createElement('span');
                    errorSpan.className = 'error-message';
                    errorSpan.style.color = 'var(--kibar-red)';
                    errorSpan.style.fontSize = '0.85rem';
                    errorSpan.style.marginTop = '5px';
                    errorSpan.style.display = 'block';
                    errorSpan.textContent = 'Wajib diisi';
                    field.parentElement.appendChild(errorSpan);
                }
                
                // Email validation
                if (field.type === 'email' && field.value) {
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(field.value)) {
                        isValid = false;
                        field.classList.add('error-field');
                        
                        const errorSpan = document.createElement('span');
                        errorSpan.className = 'error-message';
                        errorSpan.style.color = 'var(--kibar-red)';
                        errorSpan.style.fontSize = '0.85rem';
                        errorSpan.style.marginTop = '5px';
                        errorSpan.style.display = 'block';
                        errorSpan.textContent = 'Format email tidak valid';
                        field.parentElement.appendChild(errorSpan);
                    }
                }
            });
            
            if (!isValid) {
                e.preventDefault();
                // Scroll to first error field
                const firstError = contactForm.querySelector('.error-field');
                if (firstError) {
                    firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    firstError.focus();
                }
            }
        });

        // Real-time validation
        const formInputs = contactForm.querySelectorAll('.form-control');
        formInputs.forEach(input => {
            input.addEventListener('blur', function() {
                this.classList.remove('error-field');
                const errorSpan = this.parentElement.querySelector('.error-message');
                if (errorSpan) {
                    errorSpan.remove();
                }
                
                if (this.hasAttribute('required') && !this.value.trim()) {
                    this.classList.add('error-field');
                    const errorSpan = document.createElement('span');
                    errorSpan.className = 'error-message';
                    errorSpan.style.color = 'var(--kibar-red)';
                    errorSpan.style.fontSize = '0.85rem';
                    errorSpan.style.marginTop = '5px';
                    errorSpan.style.display = 'block';
                    errorSpan.textContent = 'Wajib diisi';
                    this.parentElement.appendChild(errorSpan);
                }
            });
            
            // Remove error on input
            input.addEventListener('input', function() {
                this.classList.remove('error-field');
                const errorSpan = this.parentElement.querySelector('.error-message');
                if (errorSpan) {
                    errorSpan.remove();
                }
            });
        });
    }

    // INISIALISASI TINY SLIDER UNTUK LOGO MITRA
    const partnerCarouselElement = document.querySelector('.partner-carousel');
    if (partnerCarouselElement && typeof tns === 'function') {
		try {
        var slider = tns({
            container: '.partner-carousel',
            items: 3,
            slideBy: 1,
            autoplay: true,
            autoplayTimeout: 3000,
            autoplayButtonOutput: false,
            mouseDrag: true,
            swipeAngle: false, // Allow swipe in any direction
            speed: 400,
            controls: false,
            nav: false,
            gutter: 20,
            loop: true,
            responsive: {
                576: {
                    items: 4,
                    gutter: 30
                },
                768: {
                    items: 4,
                    gutter: 30
                },
                992: {
                    items: 5,
                    gutter: 40
                },
                1200: {
                    items: 6,
                    gutter: 50
                }
            }
        });
        console.log("Tiny Slider initialized successfully.");
        } catch (error) {
            console.error("Error initializing Tiny Slider:", error);
        }
    }
    // Note: .partner-carousel only exists on index.html
    
    // Add loading="lazy" to all images that are not in viewport initially
    const images = document.querySelectorAll('img:not([loading])');
    if ('IntersectionObserver' in window) {
        const imgObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                    }
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imgObserver.observe(img));
    }
    
    // Improve scroll performance
    if ('requestIdleCallback' in window) {
        requestIdleCallback(() => {
            document.body.classList.add('loaded');
        });
    }
});
