document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide Icons
    lucide.createIcons();

    // Elements
    const navbar = document.querySelector('.navbar-container');
    const mobileToggle = document.querySelector('.mobile-toggle');
    const mobileNav = document.querySelector('.mobile-nav');
    const navLinks = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('section');
    
    // Form Elements
    const contactForm = document.getElementById('portfolio-contact-form');
    const successMessage = document.querySelector('.form-success-message');
    const btnResetForm = document.getElementById('btn-reset-form');

    // 1. Sticky Navbar on Scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 2. Mobile Menu Toggle
    mobileToggle.addEventListener('click', () => {
        const isOpen = mobileNav.classList.toggle('open');
        const icon = mobileToggle.querySelector('i');
        
        if (isOpen) {
            icon.setAttribute('data-lucide', 'x');
        } else {
            icon.setAttribute('data-lucide', 'menu');
        }
        lucide.createIcons();
    });

    // Close mobile nav when clicking a link
    document.querySelectorAll('.mobile-nav-item').forEach(item => {
        item.addEventListener('click', () => {
            mobileNav.classList.remove('open');
            const icon = mobileToggle.querySelector('i');
            icon.setAttribute('data-lucide', 'menu');
            lucide.createIcons();
        });
    });

    // 3. Active Nav Link on Scroll (Intersection Observer)
    const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -60% 0px',
        threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    } else {
                        link.classList.remove('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));

    // 4. Contact Form Handling
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Simulating form submission
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalContent = submitBtn.innerHTML;
            
            submitBtn.disabled = true;
            submitBtn.innerHTML = 'Sending... <i data-lucide="loader-2" class="animate-spin"></i>';
            lucide.createIcons();

            setTimeout(() => {
                contactForm.classList.add('hidden');
                successMessage.classList.remove('hidden');
                
                // Reset submit button state
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalContent;
                lucide.createIcons();
            }, 1200);
        });
    }

    if (btnResetForm) {
        btnResetForm.addEventListener('click', () => {
            contactForm.reset();
            successMessage.classList.add('hidden');
            contactForm.classList.remove('hidden');
        });
    }
});
