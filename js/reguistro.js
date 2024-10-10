
document.getElementById('registroForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Validación básica
    let isValid = true;
    const fields = ['nombre', 'email', 'password', 'empresa', 'sector', 'descripcion'];
    
    fields.forEach(field => {
        const element = document.getElementById(field);
        const errorElement = document.getElementById(`${field}Error`);

        // manejo de errores y formularios incompletos 
        if (errorElement) {
            errorElement.remove();
        }
        
        if (!element.value.trim()) {
            isValid = false;
            const error = document.createElement('div');
            error.id = `${field}Error`;

            error.className = 'error';
            error.textContent = 'Este campo es requerido';
            element.parentNode.insertBefore(error, element.nextSibling);
        }
    });
    
    if (isValid) {
        const formData = new FormData(this);
        const data = Object.fromEntries(formData.entries());
        console.log('Datos del formulario:', data);
        
        alert('Registro exitoso!');
    }
});