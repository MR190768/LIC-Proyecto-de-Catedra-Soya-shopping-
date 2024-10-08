document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registroForm');
  
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
  
      const nombre = document.getElementById('nombre').value;
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
  
      try {
        const response = await fetch('http://localhost:3001/soyashopping/register/user', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            usuarioName: nombre,
            email: email,
            contrasena: password,
            }),
        });
  
        const data = await response.json();
  
        if (response.ok) {
          alert(data.message);
          window.location.href = 'login_usuario.html'; // Redirige al login después de un registro exitoso
        } else {
          alert(data.message);
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Hubo un error al procesar su solicitud');
      }
    });
  });