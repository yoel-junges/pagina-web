document.addEventListener('DOMContentLoaded', function() {
    // Obtener el hash de la URL (la parte después del #)
    const hash = window.location.hash;
    
    // Primero, desplazar la página al inicio
    window.scrollTo(0, 0);
    
    if (hash) {
        // Remover el # del hash
        const lineaId = hash.substring(1);
        
        // Encontrar el botón correspondiente y activarlo
        const botonLinea = document.querySelector(`.linea-btn[data-linea="${lineaId}"]`);
        if (botonLinea) {
            // Remover la clase active de todos los botones
            document.querySelectorAll('.linea-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            
            // Remover la clase active de todas las secciones
            document.querySelectorAll('.linea-info').forEach(section => {
                section.classList.remove('active');
            });
            
            // Activar el botón y la sección correspondiente
            botonLinea.classList.add('active');
            const seccionActiva = document.getElementById(lineaId);
            seccionActiva.classList.add('active');
            
            // Hacer scroll suave hasta la parte superior de la sección
            setTimeout(() => {
                window.scrollTo({
                    top: seccionActiva.offsetTop - 200, // Aumentado el offset para ir más arriba
                    behavior: 'smooth'
                });
            }, 100);
        }
    }

    // Manejar clics en los botones de línea
    document.querySelectorAll('.linea-btn').forEach(button => {
        button.addEventListener('click', function() {
            const lineaId = this.getAttribute('data-linea');
            
            // Remover la clase active de todos los botones
            document.querySelectorAll('.linea-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            
            // Remover la clase active de todas las secciones
            document.querySelectorAll('.linea-info').forEach(section => {
                section.classList.remove('active');
            });
            
            // Activar el botón y la sección correspondiente
            this.classList.add('active');
            const seccionActiva = document.getElementById(lineaId);
            seccionActiva.classList.add('active');
            
            // Actualizar la URL con el hash correspondiente
            window.location.hash = lineaId;
            
            // Hacer scroll suave hasta la parte superior de la sección
            window.scrollTo({
                top: seccionActiva.offsetTop - 200, // Aumentado el offset para ir más arriba
                behavior: 'smooth'
            });
        });
    });
}); 