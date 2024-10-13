document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('productForm');
    const pName=document.getElementById("productName");
    const pPrecio=document.getElementById("productPrice");
    const Cate=document.getElementById("categoria");
    const desc=document.getElementById("productDescription");


    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const proIMG=document.getElementById("productImage").files[0];

        try {
            const response = await fetch('http://localhost:3001/soyashopping/register/prod', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name:pName.value,
                    Precio:pPrecio.value,
                    catego:Cate.selectedIndex+1,
                    descrip:desc.value,
                    Authorization:localStorage.getItem("token")
                })
            });

            const data = await response.json();

            var formdata= new FormData();
            formdata.append("Name",pName.value);
            formdata.append("imagen",proIMG)

            if (response.ok) {
                alert(data.message);
                formdata.append("id",data.proID)
                const responseimg = await fetch('http://localhost:3002/img/produ', {
                    method: "POST",
                    body: formdata
                    })
                window.location.href = 'perfil.html'; // Redirige al login después de un registro exitoso
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Hubo un error al procesar su solicitud');
        }
    
    })

})