document.addEventListener('DOMContentLoaded', () => {
  const btns = Array.from(document.querySelectorAll('.linea-btn[data-linea]'));
  const panels = Array.from(document.querySelectorAll('.linea-info[id]'));
  if (!btns.length || !panels.length) return;

  const byId = (id) => panels.find(p => p.id === id);
  const byBtn = (id) => btns.find(b => b.dataset.linea === id);

  function show(id, pushHash = true) {
    // Si el id no existe, caer a la primera pestaña
    if (!byId(id)) id = panels[0].id;

    panels.forEach(p => {
      const active = (p.id === id);
      p.toggleAttribute('hidden', !active);
      p.classList.toggle('active', active);
    });

    btns.forEach(b => {
      const active = (b.dataset.linea === id);
      b.classList.toggle('active', active);
      b.setAttribute('aria-selected', active ? 'true' : 'false');
      b.tabIndex = active ? 0 : -1;
    });

    if (pushHash) {
      // No rompemos el historial
      const url = new URL(window.location.href);
      url.hash = id;
      history.replaceState(null, '', url.toString());
    }
  }

  // Click en botones
  btns.forEach(b => b.addEventListener('click', () => show(b.dataset.linea)));

  // Cambios de hash (p.ej., al entrar con #a40 o si alguien cambia la URL)
  window.addEventListener('hashchange', () => {
    const id = (location.hash || '').replace('#','') || panels[0].id;
    show(id, false);
  });

  // Inicial: respetar el hash si viene en la URL
  const initial = (location.hash || '').replace('#','') || (btns[0]?.dataset.linea || panels[0].id);
  show(initial, false);
});
