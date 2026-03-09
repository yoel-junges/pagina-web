/**
 * Modal de detalles técnicos para productos PVC
 * Lee data-* de la tarjeta y muestra el contenido en un popup
 */
(function() {
    'use strict';

    const overlay = document.getElementById('modal-pvc-overlay');
    const content = document.getElementById('modal-pvc-content');
    const btnCerrar = document.getElementById('modal-pvc-cerrar');
    const img = document.getElementById('modal-pvc-imagen');
    const titulo = document.getElementById('modal-pvc-titulo');
    const descripcion = document.getElementById('modal-pvc-descripcion');
    const medidas = document.getElementById('modal-pvc-medidas');
    const caracteristicas = document.getElementById('modal-pvc-caracteristicas');

    function abrirModal(card) {
        if (!card) return;

        const dataTitulo = card.dataset.titulo || '';
        const dataImagen = card.dataset.imagen || '';
        const dataDescripcion = card.dataset.descripcion || '';
        const dataMedidas = card.dataset.medidas || '';
        const dataCaracteristicas = card.dataset.caracteristicas || '';

        titulo.textContent = dataTitulo;
        img.src = dataImagen;
        img.alt = dataTitulo;
        descripcion.textContent = dataDescripcion;

        if (dataMedidas) {
            const lineas = dataMedidas.split('|').map(s => s.trim());
            medidas.innerHTML = '<strong>Medidas</strong><br>' + lineas.join('<br>');
            medidas.style.display = 'block';
        } else {
            medidas.style.display = 'none';
        }

        if (dataCaracteristicas) {
            const items = dataCaracteristicas.split('||').map(s => s.trim());
            caracteristicas.innerHTML = items.map(item => '<li>' + item + '</li>').join('');
            caracteristicas.style.display = 'block';
        } else {
            caracteristicas.style.display = 'none';
        }

        overlay.classList.add('activo');
        overlay.setAttribute('aria-hidden', 'false');
        content.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    function cerrarModal() {
        overlay.classList.remove('activo');
        overlay.setAttribute('aria-hidden', 'true');
        content.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    document.addEventListener('DOMContentLoaded', function() {
        if (!overlay || !content) return;

        document.querySelectorAll('.producto-card-pvc[data-titulo]').forEach(function(card) {
            card.addEventListener('click', function(e) {
                abrirModal(e.currentTarget);
            });
        });

        btnCerrar.addEventListener('click', cerrarModal);

        overlay.addEventListener('click', function(e) {
            if (e.target === overlay) cerrarModal();
        });

        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && overlay.classList.contains('activo')) {
                cerrarModal();
            }
        });
    });
})();
