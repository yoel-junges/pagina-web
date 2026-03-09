document.addEventListener('DOMContentLoaded', () => {
    const materialTabs = document.querySelectorAll('.material-tab[data-material]');
    const materialContents = document.querySelectorAll('.material-content[id]');

    if (!materialTabs.length || !materialContents.length) return;

    function showMaterial(material) {
        // Ocultar todos los contenidos
        materialContents.forEach(content => {
            const isActive = content.id === `content-${material}`;
            content.classList.toggle('active', isActive);
        });

        // Actualizar tabs
        materialTabs.forEach(tab => {
            const isActive = tab.dataset.material === material;
            tab.classList.toggle('active', isActive);
        });
    }

    // Click en tabs
    materialTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            showMaterial(tab.dataset.material);
        });
    });

    // Inicializar con aluminio por defecto
    showMaterial('aluminio');
});
