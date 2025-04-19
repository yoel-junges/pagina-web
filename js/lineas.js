document.addEventListener('DOMContentLoaded', function() {
    const botones = document.querySelectorAll('.linea-btn');
    const secciones = document.querySelectorAll('.linea-info');

    // Función para mostrar una sección específica
    function mostrarSeccion(id) {
        // Ocultar todas las secciones
        secciones.forEach(seccion => {
            seccion.classList.remove('active');
        });

        // Desactivar todos los botones
        botones.forEach(boton => {
            boton.classList.remove('active');
        });

        // Mostrar la sección seleccionada
        const seccionSeleccionada = document.getElementById(id);
        if (seccionSeleccionada) {
            seccionSeleccionada.classList.add('active');
        }

        // Activar el botón correspondiente
        const botonSeleccionado = document.querySelector(`[data-linea="${id}"]`);
        if (botonSeleccionado) {
            botonSeleccionado.classList.add('active');
        }
    }

    // Agregar event listeners a los botones
    botones.forEach(boton => {
        boton.addEventListener('click', function() {
            const lineaId = this.getAttribute('data-linea');
            mostrarSeccion(lineaId);
        });
    });

    // Mostrar la primera sección por defecto
    if (botones.length > 0) {
        const primeraLinea = botones[0].getAttribute('data-linea');
        mostrarSeccion(primeraLinea);
    }
}); 