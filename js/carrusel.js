document.addEventListener('DOMContentLoaded', function() {
    const contenedores = document.querySelectorAll('.carrusel-contenedor');
    
    const anchoTarjeta = 220;
    const gap = 15;
    const totalAncho = anchoTarjeta + gap;

    contenedores.forEach(contenedor => {
        const wrapper = contenedor.closest('.carrusel-wrapper') || contenedor;
        const carrusel = contenedor.querySelector('.carrusel');
        const tarjetas = contenedor.querySelectorAll('.tarjeta-producto');
        const btnPrev = wrapper.querySelector('.carrusel-btn.prev');
        const btnNext = wrapper.querySelector('.carrusel-btn.next');

        if (!carrusel || !tarjetas.length || !btnPrev || !btnNext) return;

        let posicionActual = 0;

        function actualizarBotones() {
            const visibleCount = Math.min(4, Math.max(1, Math.floor(contenedor.offsetWidth / totalAncho)));
            const maxScroll = Math.max(0, (tarjetas.length - visibleCount) * totalAncho);
            
            btnPrev.style.display = posicionActual === 0 ? 'none' : 'flex';
            btnNext.style.display = posicionActual >= maxScroll ? 'none' : 'flex';
        }

        function moverCarrusel(direccion) {
            const visibleCount = Math.min(4, Math.max(1, Math.floor(contenedor.offsetWidth / totalAncho)));
            const maxScroll = Math.max(0, (tarjetas.length - visibleCount) * totalAncho);
            
            if (direccion === 'next') {
                posicionActual = Math.min(posicionActual + totalAncho, maxScroll);
            } else {
                posicionActual = Math.max(posicionActual - totalAncho, 0);
            }
            
            carrusel.style.transform = `translateX(-${posicionActual}px)`;
            actualizarBotones();
        }

        btnPrev.addEventListener('click', () => moverCarrusel('prev'));
        btnNext.addEventListener('click', () => moverCarrusel('next'));

        actualizarBotones();

        window.addEventListener('resize', function resizeHandler() {
            posicionActual = 0;
            carrusel.style.transform = 'translateX(0)';
            actualizarBotones();
        });
    });
});
