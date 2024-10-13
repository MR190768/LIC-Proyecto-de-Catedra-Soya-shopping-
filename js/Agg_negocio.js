document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('negocioForm');
    const nName=document.getElementById("negocioName");
    const hAbre=document.getElementById("horaAbre");
    const hCierre=document.getElementById("horaCierre");
    const serv=document.getElementById("servicio");
    const ubi=document.getElementById("negocioUbicacion");
    const desc=document.getElementById("negocioDescription");


    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const negIMG=document.getElementById("negocioImg").files[0];

        try {
            const response = await fetch('http://localhost:3001/soyashopping/register/neg', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    nombreN:nName.value,
                    horaAbrir:hAbre.value,
                    horaCerrar:hCierre.value,
                    id_serv:serv.selectedIndex+1,
                    ubicacion:ubi.value,
                    Descripcion:desc.value,
                    user:localStorage.getItem("user")
                })
            });

            const data = await response.json();

            var formdata= new FormData();
            formdata.append("Name",nName);
            formdata.append("imagen",negIMG)

            if (response.ok) {
                alert(data.message);
                localStorage.removeItem("user")
                const responseimg = await fetch('http://localhost:3002/img/negocio', {
                    method: "POST",
                    body: formdata
                    })
                window.location.href = '/login_usuario.html'; // Redirige al login después de un registro exitoso
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Hubo un error al procesar su solicitud');
        }
    
    })

})