document.addEventListener('DOMContentLoaded', function() {
    const carrusel = document.querySelector('.carrusel');
    const tarjetas = document.querySelectorAll('.tarjeta-producto');
    const btnPrev = document.querySelector('.carrusel-btn.prev');
    const btnNext = document.querySelector('.carrusel-btn.next');
    
    let posicionActual = 0;
    const anchoTarjeta = 220; // Ancho fijo de la tarjeta
    const gap = 15; // Espacio entre tarjetas
    const totalAncho = anchoTarjeta + gap;

    function moverCarrusel(direccion) {
        const maxScroll = (tarjetas.length - 4) * totalAncho;
        
        if (direccion === 'next') {
            posicionActual = Math.min(posicionActual + totalAncho, maxScroll);
        } else {
            posicionActual = Math.max(posicionActual - totalAncho, 0);
        }
        
        carrusel.style.transform = `translateX(-${posicionActual}px)`;
        actualizarBotones();
    }

    function actualizarBotones() {
        const maxScroll = (tarjetas.length - 4) * totalAncho;
        btnPrev.style.display = posicionActual === 0 ? 'none' : 'block';
        btnNext.style.display = posicionActual >= maxScroll ? 'none' : 'block';
    }

    // Event listeners para los botones
    btnPrev.addEventListener('click', () => moverCarrusel('prev'));
    btnNext.addEventListener('click', () => moverCarrusel('next'));

    // Inicializar estado de los botones
    actualizarBotones();

    // Ajustar el carrusel cuando se redimensiona la ventana
    window.addEventListener('resize', () => {
        posicionActual = 0;
        carrusel.style.transform = `translateX(0)`;
        actualizarBotones();
    });
}); 