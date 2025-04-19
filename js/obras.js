document.addEventListener('DOMContentLoaded', function() {
    const filtros = document.querySelectorAll('.filtro-btn');
    const obras = document.querySelectorAll('.obra-card');

    filtros.forEach(filtro => {
        filtro.addEventListener('click', function() {
            // Remover clase active de todos los filtros
            filtros.forEach(f => f.classList.remove('active'));
            // Agregar clase active al filtro clickeado
            this.classList.add('active');

            const categoria = this.getAttribute('data-categoria');

            obras.forEach(obra => {
                if (categoria === 'todas' || obra.getAttribute('data-categoria') === categoria) {
                    obra.style.display = 'block';
                    setTimeout(() => {
                        obra.style.opacity = '1';
                        obra.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    obra.style.opacity = '0';
                    obra.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        obra.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}); 