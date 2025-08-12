// Cargar el footer en todas las páginas
document.addEventListener('DOMContentLoaded', function() {
    const footerPlaceholder = document.getElementById('footer-placeholder');
    
    if (footerPlaceholder) {
        fetch('footer.html')
            .then(response => response.text())
            .then(data => {
                footerPlaceholder.innerHTML = data;
            })
            .catch(error => {
                console.error('Error cargando el footer:', error);
                footerPlaceholder.innerHTML = `
                    <footer class="footer">
                        <div class="footer-content">
                            <p>&copy; 2025 Metalúrgica Breques. Todos los derechos reservados.</p>
                        </div>
                    </footer>
                `;
            });
    }
});
