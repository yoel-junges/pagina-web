function loadHeader() {
    fetch('/header.html')
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al cargar el header');
            }
            return response.text();
        })
        .then(data => {
            document.getElementById('header-placeholder').innerHTML = data;
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('header-placeholder').innerHTML = '<p>Error al cargar el header</p>';
        });
}

// Cargar el header cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', loadHeader); 