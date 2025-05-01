document.addEventListener('DOMContentLoaded', function() {
    const formulario = document.getElementById('contacto-form');
    
    formulario.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Obtener los valores del formulario
        const formData = {
            nombre: document.getElementById('nombre').value,
            email: document.getElementById('email').value,
            telefono: document.getElementById('telefono').value,
            consulta: document.getElementById('consulta').value,
            mensaje: document.getElementById('mensaje').value
        };
        
        try {
            // Mostrar mensaje de carga
            const botonEnviar = document.querySelector('.btn-enviar');
            const textoOriginal = botonEnviar.textContent;
            botonEnviar.textContent = 'Enviando...';
            botonEnviar.disabled = true;
            
            // Enviar los datos al backend
            const response = await fetch('/api/contacto', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            
            if (response.ok) {
                // Mostrar mensaje de éxito
                alert('¡Mensaje enviado con éxito! Nos pondremos en contacto contigo pronto.');
                formulario.reset();
            } else {
                throw new Error('Error al enviar el mensaje');
            }
        } catch (error) {
            // Mostrar mensaje de error
            alert('Hubo un error al enviar el mensaje. Por favor, intenta nuevamente.');
            console.error('Error:', error);
        } finally {
            // Restaurar el botón
            const botonEnviar = document.querySelector('.btn-enviar');
            botonEnviar.textContent = 'Enviar mensaje';
            botonEnviar.disabled = false;
        }
    });
    
    // Efecto de hover en los campos del formulario
    const inputs = formulario.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.style.transform = 'translateY(-2px)';
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.style.transform = 'translateY(0)';
        });
    });
}); 