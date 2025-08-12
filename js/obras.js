// Funcionalidad para el módulo de obras
document.addEventListener('DOMContentLoaded', function() {
    // Configurar event listeners para los botones de las tarjetas
    const botonesVerObras = document.querySelectorAll('.btn-ver-obras');
    
    botonesVerObras.forEach(boton => {
        boton.addEventListener('click', function() {
            const tipo = this.getAttribute('data-tipo');
            mostrarVistaObras(tipo);
        });
    });

    // Configurar event listeners para las imágenes de la galería
    const galeriaItems = document.querySelectorAll('.galeria-item img');
    galeriaItems.forEach(img => {
        img.addEventListener('click', function() {
            mostrarModalImagen(this.src, this.alt);
        });
    });
});

// Función para mostrar la vista principal
function mostrarVistaPrincipal() {
    document.getElementById('vista-principal').style.display = 'block';
    document.getElementById('vista-residencial').style.display = 'none';
    document.getElementById('vista-industrial').style.display = 'none';
}

// Función para mostrar vista residencial (nueva)
function mostrarVistaResidencial() {
    document.getElementById('vista-principal').style.display = 'none';
    document.getElementById('vista-residencial').style.display = 'block';
    document.getElementById('vista-industrial').style.display = 'none';
}

// Función para mostrar vista industrial (nueva)
function mostrarVistaIndustrial() {
    document.getElementById('vista-principal').style.display = 'none';
    document.getElementById('vista-residencial').style.display = 'none';
    document.getElementById('vista-industrial').style.display = 'block';
}

// Función para mostrar la vista de obras específicas
function mostrarVistaObras(tipo) {
    // Ocultar vista principal
    document.getElementById('vista-principal').style.display = 'none';
    
    // Mostrar la vista correspondiente
    if (tipo === 'residencial') {
        document.getElementById('vista-residencial').style.display = 'block';
        document.getElementById('vista-industrial').style.display = 'none';
    } else if (tipo === 'industrial') {
        document.getElementById('vista-industrial').style.display = 'block';
        document.getElementById('vista-residencial').style.display = 'none';
    }
}

// Función para mostrar modal de imagen
function mostrarModalImagen(src, alt) {
    // Crear modal si no existe
    let modal = document.getElementById('modal-imagen');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'modal-imagen';
        modal.className = 'modal-imagen';
        modal.innerHTML = `
            <div class="modal-contenido">
                <span class="cerrar-modal">&times;</span>
                <img src="" alt="" class="modal-imagen-img">
            </div>
        `;
        document.body.appendChild(modal);
        
        // Event listener para cerrar modal
        modal.querySelector('.cerrar-modal').addEventListener('click', function() {
            modal.style.display = 'none';
        });
        
        // Cerrar modal al hacer clic fuera
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    }
    
    // Mostrar imagen en el modal
    modal.querySelector('.modal-imagen-img').src = src;
    modal.querySelector('.modal-imagen-img').alt = alt;
    modal.style.display = 'flex';
}

// Función para cerrar modal
function cerrarModal() {
    const modal = document.getElementById('modal-imagen');
    if (modal) {
        modal.style.display = 'none';
    }
}

// Cerrar modal con tecla Escape
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        cerrarModal();
    }
}); 