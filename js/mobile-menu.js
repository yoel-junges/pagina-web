let mobileMenuInicializado = false;

function initMobileMenu() {
    if (mobileMenuInicializado) return;
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.nav');
    
    if (menuToggle && nav) {
            mobileMenuInicializado = true;
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
}

// headerLoaded se dispara cuando loadHeader.js inyecta el header
document.addEventListener('headerLoaded', initMobileMenu);
// Fallback: si el header ya estaba al cargar (p.ej. caché), o por si el evento se perdió
document.addEventListener('DOMContentLoaded', initMobileMenu); 