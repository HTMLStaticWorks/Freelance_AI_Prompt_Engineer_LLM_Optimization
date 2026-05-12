document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            mobileMenu.classList.toggle('flex');
        });
    }

    // Theme Persistence
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.body.classList.add('light-theme');
    }

    // Theme Toggle
    const themeToggles = document.querySelectorAll('[id^="theme-toggle"]');
    themeToggles.forEach(btn => {
        btn.addEventListener('click', () => {
            const isLight = document.body.classList.toggle('light-theme');
            localStorage.setItem('theme', isLight ? 'light' : 'dark');
        });
    });

    // RTL Persistence
    const savedDir = localStorage.getItem('dir');
    const rtlToggles = document.querySelectorAll('[id^="rtl-toggle"]');
    if (savedDir === 'rtl') {
        document.documentElement.dir = 'rtl';
        rtlToggles.forEach(b => b.innerText = 'LTR');
    }

    // RTL Toggle
    rtlToggles.forEach(btn => {
        btn.addEventListener('click', () => {
            const isRtl = document.documentElement.dir === 'rtl';
            const newDir = isRtl ? 'ltr' : 'rtl';
            document.documentElement.dir = newDir;
            localStorage.setItem('dir', newDir);
            
            // Update all RTL buttons text
            rtlToggles.forEach(b => {
                b.innerText = isRtl ? 'RTL' : 'LTR';
            });
        });
    });

    // Smooth Scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(el => {
        observer.observe(el);
    });
});
