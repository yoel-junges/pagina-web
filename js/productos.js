document.addEventListener('DOMContentLoaded', function() {
    // Manejar clics en los botones "Ver más"
    document.querySelectorAll('.btn-ver-mas').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault(); // Prevenir el comportamiento por defecto del enlace
            
            // Obtener el ID de la línea del enlace padre
            const tarjeta = this.closest('.tarjeta-producto');
            const lineaId = tarjeta.getAttribute('href').split('#')[1];
            
            // Redirigir a la página de líneas con el hash
            window.location.href = `lineas.html#${lineaId}`;
        });
    });
}); 