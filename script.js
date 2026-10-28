
const header = document.querySelector('.nav_container');
const toggle = document.querySelector('.menu_toggle');
const menu = document.getElementById('nav_menu');

if (header && toggle && menu) {
    function setMenu(open) {
        header.classList.toggle('nav_open', open);
        toggle.setAttribute('aria-expanded', String(open));
        toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    }

    toggle.addEventListener('click', () => {
        setMenu(!header.classList.contains('nav_open'));
    });

    menu.addEventListener('click', (event) => {
        if (event.target.closest('a')) setMenu(false);
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') setMenu(false);
    });


    window.matchMedia('(min-width: 901px)').addEventListener('change', (event) => {
        if (event.matches) setMenu(false);
    });
}