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