function initMenu() {
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
}

// Escuchar el evento de carga del header
document.addEventListener('headerLoaded', initMenu);

// También intentar inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    // Si el header ya está cargado, inicializar el menú
    if (document.querySelector('.header')) {
        initMenu();
    }
}); 