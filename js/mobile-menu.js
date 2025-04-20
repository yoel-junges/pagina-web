document.addEventListener('DOMContentLoaded', function() {
    // Esperar a que el header se cargue
    setTimeout(function() {
        const menuToggle = document.querySelector('.menu-toggle');
        const nav = document.querySelector('.nav');
        
        if (menuToggle && nav) {
            // Función para abrir/cerrar el menú
            menuToggle.addEventListener('click', function() {
                nav.classList.toggle('active');
                menuToggle.classList.toggle('active');
                
                // Prevenir scroll del body cuando el menú está abierto
                if (nav.classList.contains('active')) {
                    document.body.style.overflow = 'hidden';
                } else {
                    document.body.style.overflow = '';
                }
            });
            
            // Cerrar el menú al hacer clic en un enlace
            const navLinks = document.querySelectorAll('.nav-link');
            navLinks.forEach(link => {
                link.addEventListener('click', function() {
                    nav.classList.remove('active');
                    menuToggle.classList.remove('active');
                    document.body.style.overflow = '';
                });
            });
        }
    }, 500); // Esperar 500ms para asegurar que el header se cargue
}); 