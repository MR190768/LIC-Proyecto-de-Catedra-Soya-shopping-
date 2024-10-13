var boton=document.getElementById("logout");
boton.addEventListener("click", async function(){

    try {
        const response = await fetch('http://localhost:3001/soyashopping/logout', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                Authorization:localStorage.getItem("token")

            })
        });

        const data = await response.json();

        if (response.ok) {
            alert(data.message);
            localStorage.removeItem("token")
            window.location.href = "indice.html"; // Redirige al login después de un registro exitoso
        } else {
            alert(data.message);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Hubo un error al procesar su solicitud');
    }

})