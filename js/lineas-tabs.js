document.addEventListener('DOMContentLoaded', () => {
  // Manejo de tabs de material (Aluminio/PVC)
  const materialBtns = Array.from(document.querySelectorAll('.material-btn[data-material]'));
  const materialSections = Array.from(document.querySelectorAll('.material-section[id]'));
  
  // Manejo de tabs de productos dentro de cada material
  const allLineaBtns = Array.from(document.querySelectorAll('.linea-btn[data-linea]'));
  const allLineaPanels = Array.from(document.querySelectorAll('.linea-info[id]'));

  // Función para mostrar/ocultar secciones de material
  function showMaterial(material, pushHash = true) {
    materialSections.forEach(section => {
      const active = (section.id === material);
      section.toggleAttribute('hidden', !active);
      section.classList.toggle('active', active);
    });

    materialBtns.forEach(btn => {
      const active = (btn.dataset.material === material);
      btn.classList.toggle('active', active);
      btn.setAttribute('aria-selected', active ? 'true' : 'false');
      btn.tabIndex = active ? 0 : -1;
    });

    // Cuando cambiamos de material, activar la primera línea del material activo
    const activeSection = materialSections.find(s => s.id === material);
    if (activeSection) {
      const firstLineaBtn = activeSection.querySelector('.linea-btn[data-linea]');
      const firstLineaId = firstLineaBtn?.dataset.linea;
      if (firstLineaId) {
        showLinea(firstLineaId, false, false);
      }
    }

    if (pushHash) {
      const url = new URL(window.location.href);
      // Si hay un hash específico de producto, mantenerlo, sino usar el material
      if (!url.hash || url.hash === '#') {
        url.hash = material;
        history.replaceState(null, '', url.toString());
      }
    }
  }

  // Función para mostrar/ocultar líneas dentro de un material
  function showLinea(lineaId, pushHash = true, checkMaterial = true) {
    // Determinar a qué material pertenece esta línea
    let targetMaterial = 'aluminio'; // default
    if (lineaId.startsWith('pvc-')) {
      targetMaterial = 'pvc';
    }

    // Si necesitamos cambiar de material primero
    if (checkMaterial) {
      const currentMaterial = materialSections.find(s => s.classList.contains('active'))?.id;
      if (currentMaterial !== targetMaterial) {
        showMaterial(targetMaterial, false);
      }
    }

    // Obtener los botones y paneles del material activo
    const activeSection = materialSections.find(s => s.id === targetMaterial);
    if (!activeSection) return;

    const lineaBtns = Array.from(activeSection.querySelectorAll('.linea-btn[data-linea]'));
    const lineaPanels = Array.from(activeSection.querySelectorAll('.linea-info[id]'));

    const byId = (id) => lineaPanels.find(p => p.id === id);
    const byBtn = (id) => lineaBtns.find(b => b.dataset.linea === id);

    // Si el id no existe, usar el primero disponible
    if (!byId(lineaId)) {
      lineaId = lineaBtns[0]?.dataset.linea || lineaPanels[0]?.id;
    }

    lineaPanels.forEach(p => {
      const active = (p.id === lineaId);
      p.toggleAttribute('hidden', !active);
      p.classList.toggle('active', active);
    });

    lineaBtns.forEach(b => {
      const active = (b.dataset.linea === lineaId);
      b.classList.toggle('active', active);
      b.setAttribute('aria-selected', active ? 'true' : 'false');
      b.tabIndex = active ? 0 : -1;
    });

    if (pushHash) {
      const url = new URL(window.location.href);
      url.hash = lineaId;
      history.replaceState(null, '', url.toString());
    }
  }

  // Click en botones de material
  materialBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      showMaterial(btn.dataset.material);
    });
  });

  // Click en botones de líneas
  allLineaBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      showLinea(btn.dataset.linea);
    });
  });

  // IDs de productos PVC (para deep linking desde index)
  const pvcProductIds = ['corrediza', 'oscilobatiente', 'banderola', 'proyectante', 'plegadiza', 'practicable', 'paralela', 'puerta-machimbre', 'puerta-vidriada', 'puertas-frente'];

  // Manejo de cambios de hash
  function handleHashChange() {
    const hash = (location.hash || '').replace('#', '');
    
    if (!hash) {
      // Sin hash, mostrar aluminio por defecto
      showMaterial('aluminio', false);
      return;
    }

    // Determinar si es un material o una línea
    if (hash === 'aluminio' || hash === 'pvc') {
      showMaterial(hash, false);
    } else if (pvcProductIds.includes(hash)) {
      // Es un producto PVC: mostrar sección PVC y scroll al elemento
      showMaterial('pvc', false);
      requestAnimationFrame(() => {
        const el = document.getElementById(hash);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    } else {
      // Es una línea específica de aluminio
      showLinea(hash);
    }
  }

  window.addEventListener('hashchange', handleHashChange);

  // Inicialización
  handleHashChange();
});
