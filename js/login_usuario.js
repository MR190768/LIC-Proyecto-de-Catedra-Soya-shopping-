  document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registerForm');
  
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
  
      const usuario = document.getElementById('usuario').value;
      const password = document.getElementById('password').value;
  
      try {
        const response = await fetch('http://localhost:3001/soyashopping/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            usuarioName: usuario,
            contrasena: password,
          }),
        });
  
        const data = await response.json();
  
        if (response.ok) {
          // Login exitoso
          localStorage.setItem('token', data.Authorization);
          alert('Inicio de sesión exitoso');
          // Redirigir al usuario a la página principal o dashboard
            window.location.href = 'perfil.html';
        } else {
          // Login fallido
          if (data.message === "Usuario o contraseña invalida") {
            alert('Usuario o contraseña incorrectos. Por favor, inténtelo de nuevo.');
          } else if (data.message === "Usuario ya esta conectado") {
            alert('Este usuario ya tiene una sesión activa. Por favor, cierre la sesión en otros dispositivos e intente de nuevo.');
          } else {
            alert(`Error de inicio de sesión: ${data.message}`);
          }
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Hubo un error al procesar su solicitud. Por favor, inténtelo más tarde.');
      }
    });
  });