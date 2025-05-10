window.addEventListener('load', function() { // Menggunakan 'load' untuk memastikan semua siap
    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-navigation');
    const headerActions = document.querySelector('.header-actions');

    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', function() {
            const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true' || false;
            menuToggle.setAttribute('aria-expanded', !isExpanded);
            
            mainNav.classList.toggle('active');
            if (headerActions) {
                headerActions.classList.toggle('active');
            }
            menuToggle.classList.toggle('active');
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

    // INISIALISASI TINY SLIDER UNTUK LOGO MITRA
    const partnerCarouselElement = document.querySelector('.partner-carousel');
    if (partnerCarouselElement && typeof tns === 'function') {
		try { // Menambahkan try-catch untuk menangkap error jika ada
        var slider = tns({
            container: '.partner-carousel',
            items: 3,
            slideBy: 1,
            autoplay: true,
            autoplayTimeout: 3000,
            autoplayButtonOutput: false,
            mouseDrag: true,
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
    } else if (partnerCarouselElement && typeof tns !== 'function') {
        console.warn('Tiny Slider (tns) function is not defined. Make sure the library is loaded correctly.');
    } else if (!partnerCarouselElement) {
        console.warn('.partner-carousel element not found.');
    }
});
