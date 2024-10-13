
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registroForm');
    const nombreInput = document.getElementById('nombre');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');

    const nombreError = document.getElementById('nombreError');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');
    const confirmPasswordError = document.getElementById('confirmPasswordError');

    function validateEmail(email) {
        const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return re.test(email);
    }

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const imagenusuario = document.getElementById('usertImage').files[0]

        // Reset error messages
        nombreError.textContent = '';
        emailError.textContent = '';
        passwordError.textContent = '';
        confirmPasswordError.textContent = '';

        let isValid = true;

        // Validate username
        if (nombreInput.value.length < 5) {
            nombreError.textContent = 'El nombre de usuario debe tener al menos 5 caracteres.';
            isValid = false;
        }

        // Validate email
        if (!validateEmail(emailInput.value)) {
            emailError.textContent = 'Por favor, ingrese un correo electrónico válido.';
            isValid = false;
        }

        // Validate password match
        if (passwordInput.value !== confirmPasswordInput.value) {
            confirmPasswordError.textContent = 'Las contraseñas no coinciden.';
            isValid = false;
        }

        if (!isValid) {
            return;
        }

        var fecha = new Date();
        const nombre = nombreInput.value;
        const correo = emailInput.value;
        const password = passwordInput.value;

        var formdata= new FormData();
        formdata.append("Name",nombre);
        formdata.append("imagen",imagenusuario)


        try {
            const response = await fetch('http://localhost:3001/soyashopping/register/user', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    usuarioName: nombre,
                    contrasena: password,
                    email: correo,
                    Fecha_registro: fecha.getFullYear() + "-" + (fecha.getMonth() + 1) + "-" + fecha.getDate(),
                    status: "INACTIVO"
                })
            });

            const data = await response.json();

            if (response.ok) {
                alert(data.message);
                localStorage.setItem("user",nombre)
                const responseimg = await fetch('http://localhost:3002/img/user', {
                    method: "POST",
                    body: formdata
                    });
                    window.location.href = "/pagina_reg_negocio.html"; // Redirige al login después de un registro exitoso
                
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Hubo un error al procesar su solicitud');
        }
    });
});