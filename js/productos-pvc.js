// Carrusel de acabados/colores
function moverCarruselAcabados(direccion) {
    const track = document.getElementById('acabados-track');
    if (!track) return;
    
    const swatchWidth = window.innerWidth <= 480 ? 85 : (window.innerWidth <= 768 ? 95 : 110);
    const gap = window.innerWidth <= 480 ? 20 : 25;
    const moveDistance = (swatchWidth + gap) * 3;
    
    const containerWidth = track.parentElement.offsetWidth;
    const trackWidth = track.scrollWidth;
    const maxScroll = Math.max(0, trackWidth - containerWidth);
    
    const currentTransform = track.dataset.transform ? parseInt(track.dataset.transform, 10) : 0;
    let newTransform = currentTransform - (direccion * moveDistance);
    
    newTransform = Math.min(0, Math.max(-maxScroll, newTransform));
    track.dataset.transform = newTransform;
    track.style.transform = `translateX(${newTransform}px)`;
}

// Los detalles técnicos ahora se muestran en un modal (modal-pvc.js)
