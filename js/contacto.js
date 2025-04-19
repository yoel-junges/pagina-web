document.addEventListener('DOMContentLoaded', function() {
    const formulario = document.getElementById('contacto-form');
    
    formulario.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validar campos requeridos
        const nombre = document.getElementById('nombre').value;
        const email = document.getElementById('email').value;
        const consulta = document.getElementById('consulta').value;
        const mensaje = document.getElementById('mensaje').value;
        
        if (!nombre || !email || !consulta || !mensaje) {
            alert('Por favor, complete todos los campos requeridos.');
            return;
        }
        
        // Validar formato de email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Por favor, ingrese un email válido.');
            return;
        }
        
        // Aquí iría la lógica para enviar el formulario
        // Por ahora solo mostramos un mensaje de éxito
        alert('¡Mensaje enviado con éxito! Nos pondremos en contacto contigo pronto.');
        formulario.reset();
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