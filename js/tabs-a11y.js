(function() {
  const tablist = document.querySelector('.lineas-nav[role="tablist"]');
  if (!tablist) return;

  const tabs = Array.from(tablist.querySelectorAll('[role="tab"]'));
  const panels = Array.from(document.querySelectorAll('.lineas-contenido [role="tabpanel"]'));

  function activateTab(tab) {
    tabs.forEach(t => {
      const selected = t === tab;
      t.setAttribute('aria-selected', selected ? 'true' : 'false');
      t.tabIndex = selected ? 0 : -1;
      t.classList.toggle('active', selected);
    });

    panels.forEach(p => {
      const isTarget = p.id === tab.getAttribute('aria-controls');
      p.toggleAttribute('hidden', !isTarget);
      p.classList.toggle('active', isTarget);
    });

    tab.focus();
  }

  // Click
  tabs.forEach(t => t.addEventListener('click', () => activateTab(t)));

  // Teclado: ← → Home End
  tablist.addEventListener('keydown', (e) => {
    const currentIndex = tabs.indexOf(document.activeElement);
    let nextIndex = null;

    switch (e.key) {
      case 'ArrowLeft': case 'ArrowUp':
        nextIndex = (currentIndex > 0 ? currentIndex - 1 : tabs.length - 1);
        break;
      case 'ArrowRight': case 'ArrowDown':
        nextIndex = (currentIndex + 1) % tabs.length;
        break;
      case 'Home':
        nextIndex = 0; break;
      case 'End':
        nextIndex = tabs.length - 1; break;
      default: return;
    }
    e.preventDefault();
    activateTab(tabs[nextIndex]);
  });

  // Inicial
  const initial = tabs.find(t => t.getAttribute('aria-selected') === 'true') || tabs[0];
  if (initial) activateTab(initial);
})();
