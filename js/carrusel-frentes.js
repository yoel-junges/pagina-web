// js/carrusel-frentes.js
(function () {
  function getCarousel(tipo) {
    const root = document.querySelector(`.carrusel-frente[data-tipo="${tipo}"]`);
    if (!root) return null;
    const imgs = Array.from(root.querySelectorAll('.carrusel-img'));
    const indicadores = Array.from(root.querySelectorAll('.carrusel-indicadores .indicador'));
    const activeIndex = Math.max(
      0,
      imgs.findIndex(img => img.classList.contains('active'))
    );
    return { root, imgs, indicadores, activeIndex };
  }

  function setActive(c, index) {
    if (!c || !c.imgs.length) return;
    const total = c.imgs.length;
    const i = ((index % total) + total) % total; // wrap

    c.imgs.forEach((img, idx) => {
      const active = idx === i;
      img.classList.toggle('active', active);
      img.setAttribute('aria-hidden', active ? 'false' : 'true');
      // Por si el CSS usa display, mantenemos compatibilidad:
      if (!active) img.removeAttribute('loading'); // no forzamos nada aquí
    });

    c.indicadores.forEach((dot, idx) => {
      const active = idx === i;
      dot.classList.toggle('active', active);
      // accesibilidad si luego migras a <button>:
      dot.setAttribute('aria-current', active ? 'true' : 'false');
    });
  }

  // Exponer funciones globales usadas por los onclick del HTML
  window.cambiarImagen = function (tipo, delta) {
    const c = getCarousel(tipo);
    if (!c) return;
    const next = (c.activeIndex + (Number(delta) || 0));
    setActive(c, next);
  };

  window.irAImagen = function (tipo, index) {
    const c = getCarousel(tipo);
    if (!c) return;
    setActive(c, Number(index) || 0);
  };

  // Inicializar todos los carruseles al cargar la página
  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.carrusel-frente[data-tipo]').forEach(root => {
      const tipo = root.getAttribute('data-tipo');
      const c = getCarousel(tipo);
      if (!c) return;
      // Si ninguna imagen tiene .active, activar la primera
      if (!c.imgs.some(img => img.classList.contains('active'))) {
        setActive(c, 0);
      } else {
        setActive(c, c.activeIndex);
      }
    });
  });
})();
