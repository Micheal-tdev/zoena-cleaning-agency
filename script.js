// Mobile menu (hamburger) for Zoena Cleaning Services.
// Include on every page with: <script src="script.js" defer></script>

const header = document.querySelector('.nav_container');
const toggle = document.querySelector('.menu_toggle');
const menu = document.getElementById('nav_menu');

if (header && toggle && menu) {
    function setMenu(open) {
        header.classList.toggle('nav_open', open);
        toggle.setAttribute('aria-expanded', String(open));
        toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    }

    // tap the hamburger to open/close
    toggle.addEventListener('click', () => {
        setMenu(!header.classList.contains('nav_open'));
    });

    // close the menu after tapping a link inside it
    menu.addEventListener('click', (event) => {
        if (event.target.closest('a')) setMenu(false);
    });

    // Escape key closes it
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') setMenu(false);
    });

    // if the screen grows past the mobile breakpoint, reset the menu
    window.matchMedia('(min-width: 901px)').addEventListener('change', (event) => {
        if (event.matches) setMenu(false);
    });
}

/* highlight the link of the page you are on */
const currentPage = location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav_links').forEach((link) => {
    const href = link.getAttribute('href');
    if (href && !href.includes('#') && href === currentPage) {
        link.classList.add('active');
        link.setAttribute('aria-current', 'page');
    }
});

/* ===== Hero slider (home page only) ===== */
const slider = document.querySelector('.hero_slider');

if (slider) {
    const slides = slider.querySelectorAll('.hero_slide');
    const dots = slider.querySelectorAll('.hero_dot');
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const DELAY = 6000;      // 6 seconds per slide
    let current = 0;
    let timer = null;

    function showSlide(index) {
        current = (index + slides.length) % slides.length;   // wraps around
        slides.forEach((slide, i) => slide.classList.toggle('is_active', i === current));
        dots.forEach((dot, i) => dot.classList.toggle('is_active', i === current));
    }

    function startAuto() {
        if (reduceMotion) return;   // respect "reduce motion" settings
        stopAuto();
        timer = setInterval(() => showSlide(current + 1), DELAY);
    }

    function stopAuto() {
        clearInterval(timer);
    }

    slider.querySelector('.hero_next').addEventListener('click', () => { showSlide(current + 1); startAuto(); });
    slider.querySelector('.hero_prev').addEventListener('click', () => { showSlide(current - 1); startAuto(); });
    dots.forEach((dot, i) => dot.addEventListener('click', () => { showSlide(i); startAuto(); }));

    // pause while the mouse is over it or a button has keyboard focus
    slider.addEventListener('mouseenter', stopAuto);
    slider.addEventListener('mouseleave', startAuto);
    slider.addEventListener('focusin', stopAuto);
    slider.addEventListener('focusout', startAuto);

    // pause when the tab is hidden
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) stopAuto(); else startAuto();
    });

    // swipe on touch screens
    let startX = 0;
    slider.addEventListener('touchstart', (e) => { startX = e.touches[0].clientX; }, { passive: true });
    slider.addEventListener('touchend', (e) => {
        const diff = e.changedTouches[0].clientX - startX;
        if (Math.abs(diff) > 50) {
            showSlide(diff < 0 ? current + 1 : current - 1);
            startAuto();
        }
    }, { passive: true });

    startAuto();
}