function initMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.nav');
    const menu = document.querySelector('.menu');

    if (menuToggle && nav && menu) {
        // Función para abrir/cerrar el menú
        function toggleMenu() {
            const isActive = nav.classList.contains('active');
            
            // Toggle de clases
            nav.classList.toggle('active');
            menu.classList.toggle('active');
            menuToggle.classList.toggle('active');
            
            // Prevenir scroll del body cuando el menú está abierto
            document.body.style.overflow = !isActive ? 'hidden' : '';
        }

        // Evento click en el botón del menú
        menuToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            toggleMenu();
        });

        // Cerrar el menú al hacer clic en un enlace
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (nav.classList.contains('active')) {
                    toggleMenu();
                }
            });
        });

        // Cerrar el menú al hacer clic fuera de él
        document.addEventListener('click', function(event) {
            if (nav.classList.contains('active') && 
                !nav.contains(event.target) && 
                !menuToggle.contains(event.target)) {
                toggleMenu();
            }
        });

        // Cerrar el menú al cambiar el tamaño de la ventana
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768 && nav.classList.contains('active')) {
                toggleMenu();
            }
        });
    }
}

// Inicializar el menú cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', initMenu);

// También inicializar cuando el header se cargue
document.addEventListener('headerLoaded', initMenu); 