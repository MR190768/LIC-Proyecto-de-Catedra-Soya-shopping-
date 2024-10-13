const form = document.getElementById("algin-form");
const resena = document.getElementById("resC");
const nameR = document.getElementById("fullname");

let ratingValue = null;
const ratingInputs = document.querySelectorAll('input[name="rating"]');

ratingInputs.forEach(input => {
    input.addEventListener('change', () => {
        ratingValue = document.querySelector('input[name="rating"]:checked').value;
    });
})
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    try {
        const response = await fetch('http://localhost:3001/soyashopping/register/resen', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                Resenador: nameR.value,
                Resena: resena.value,
                Calificacion: ratingValue,
                id_producto: productoId
            })
        });

        const data = await response.json();

        if (response.ok) {
            alert(data.message);
            nameR.value = "";
            resena.value = "";
            Cargarcomentarios();

        } else {
            alert(data.message);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Hubo un error al procesar su solicitud');
    }


})