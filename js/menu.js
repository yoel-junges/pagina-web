document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.nav');
    const menu = document.querySelector('.menu');

    if (menuToggle && nav && menu) {
        menuToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
            menu.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });

        // Cerrar el menú al hacer clic en un enlace
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                nav.classList.remove('active');
                menu.classList.remove('active');
                menuToggle.classList.remove('active');
            });
        });
    }
}); 