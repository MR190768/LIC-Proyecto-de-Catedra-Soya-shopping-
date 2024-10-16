async function carga() {
    try {
        const response = await fetch('http://localhost:3001/soyashopping/read/info/produ', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id: productoId
            })
        });

        const data = await response.json();

        if (response.ok) {
            nName = document.getElementById("name");
            imagen = document.getElementById("Pimg");
            descripcion = document.getElementById("des");
            pName = document.getElementById("emprende");
            price = document.getElementById("precio")

            nName.innerText = data[0].NombreProd
            rutaOriginal = data[0].ImagenP;
            let rutaCorregida = rutaOriginal.replace(/\\/g, '/');
            imagen.src = "APIRest/" + rutaCorregida;
            descripcion.innerText = data[0].descripcion;
            pName.innerText = data[0].nombreN;
            price.innerText = "$ " + data[0].precio

        } else {
            alert(data.message);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Hubo un error al procesar su solicitud');
    }
}