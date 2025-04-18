// Script inicial
console.log("Página cargada correctamente");

function mostrarLinea(id) {
    const secciones = document.querySelectorAll('.info-linea');
    secciones.forEach(seccion => {
        seccion.style.display = 'none';
    });

    const seleccionada = document.getElementById(id);
    if (seleccionada) {
        seleccionada.style.display = 'block';
    }
}
// Detecta si viene un parámetro de línea desde la URL
document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const linea = params.get('linea');
    if (linea) {
        mostrarLinea(linea);
    }
});

