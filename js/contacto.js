document.addEventListener('DOMContentLoaded', function() {
  const formulario = document.getElementById('contacto-form');
  if (!formulario) return;

  formulario.addEventListener('submit', async function(e) {
    e.preventDefault();

    // Estados de botón
    const botonEnviar = formulario.querySelector('.btn-enviar');
    const textoOriginal = botonEnviar ? botonEnviar.textContent : null;
    if (botonEnviar) {
      botonEnviar.textContent = 'Enviando...';
      botonEnviar.disabled = true;
    }

    try {
      // Armamos payload en formato x-www-form-urlencoded como requiere Netlify
      const formData = new FormData(formulario);
      // Aseguramos el form-name por si el HTML cambia
      if (!formData.has('form-name')) {
        formData.append('form-name', formulario.getAttribute('name') || 'contacto');
      }
      const body = new URLSearchParams(formData).toString();

      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body
      });

      if (response.ok) {
        // Redirección a la página de gracias (mejor UX que alert)
        window.location.href = formulario.getAttribute('action') || '/gracias.html';
      } else {
        throw new Error('Respuesta no OK del servidor');
      }
    } catch (error) {
      alert('Hubo un error al enviar el mensaje. Por favor, intenta nuevamente.');
      console.error('Error:', error);
      if (botonEnviar && textoOriginal) {
        botonEnviar.textContent = textoOriginal;
        botonEnviar.disabled = false;
      }
    }
  });

  // Efecto de hover/focus (se mantiene tu lógica)
  const inputs = formulario.querySelectorAll('input, select, textarea');
  inputs.forEach(input => {
    input.addEventListener('focus', function() {
      if (this.parentElement) this.parentElement.style.transform = 'translateY(-2px)';
    });
    input.addEventListener('blur', function() {
      if (this.parentElement) this.parentElement.style.transform = 'translateY(0)';
    });
  });
});