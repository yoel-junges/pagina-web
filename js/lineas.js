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

    // Funcionalidad del carrusel de frentes
    let autoPlayInterval = null;
    
    // Función para iniciar auto-play
    function iniciarAutoPlay(tipo) {
        if (autoPlayInterval) {
            clearInterval(autoPlayInterval);
        }
        autoPlayInterval = setInterval(() => {
            cambiarImagen(tipo, 1);
        }, 4000); // Cambiar cada 4 segundos
    }
    
    // Función para detener auto-play
    function detenerAutoPlay() {
        if (autoPlayInterval) {
            clearInterval(autoPlayInterval);
            autoPlayInterval = null;
        }
    }
    
    // Iniciar auto-play para ambos carruseles
    iniciarAutoPlay('integral');
    iniciarAutoPlay('vidriado');
    
    // Detener auto-play cuando se interactúa manualmente
    document.querySelectorAll('.carrusel-btn').forEach(btn => {
        btn.addEventListener('mouseenter', detenerAutoPlay);
        btn.addEventListener('click', detenerAutoPlay);
    });
    
    // Reanudar auto-play cuando se deja de interactuar
    document.querySelectorAll('.carrusel-frente').forEach(carrusel => {
        carrusel.addEventListener('mouseleave', () => {
            setTimeout(() => {
                iniciarAutoPlay('integral');
                iniciarAutoPlay('vidriado');
            }, 1000);
        });
    });
    
    window.cambiarImagen = function(tipo, direccion) {
        const carrusel = document.querySelector(`#frentes .carrusel-frente[data-tipo="${tipo}"] .carrusel-container`);
        if (!carrusel) return;
        
        const imagenes = carrusel.querySelectorAll('.carrusel-img');
        const imagenActiva = carrusel.querySelector('.carrusel-img.active');
        let indiceActual = Array.from(imagenes).indexOf(imagenActiva);
        
        // Calcular nuevo índice
        let nuevoIndice = indiceActual + direccion;
        
        // Manejar bucle circular
        if (nuevoIndice >= imagenes.length) {
            nuevoIndice = 0;
        } else if (nuevoIndice < 0) {
            nuevoIndice = imagenes.length - 1;
        }
        
        // Cambiar imagen
        cambiarAImagen(tipo, nuevoIndice);
    };

    // Función para ir directamente a una imagen específica
    window.irAImagen = function(tipo, indice) {
        cambiarAImagen(tipo, indice);
    };

    // Función auxiliar para cambiar imagen y actualizar indicadores
    function cambiarAImagen(tipo, indice) {
        const carrusel = document.querySelector(`#frentes .carrusel-frente[data-tipo="${tipo}"] .carrusel-container`);
        if (!carrusel) return;
        
        const imagenes = carrusel.querySelectorAll('.carrusel-img');
        const imagenActiva = carrusel.querySelector('.carrusel-img.active');
        
        // Ocultar imagen actual
        imagenActiva.classList.remove('active');
        
        // Mostrar nueva imagen
        imagenes[indice].classList.add('active');
        
        // Actualizar indicadores
        const indicadores = carrusel.parentElement.querySelectorAll('.indicador');
        indicadores.forEach((indicador, i) => {
            if (i === indice) {
                indicador.classList.add('active');
            } else {
                indicador.classList.remove('active');
            }
        });
    }
}); 