tarjetas(6);
window.addEventListener('load', () => {
    console.log('Todos los recursos han sido cargados');
    CargarProductos();
    inicializarPaginacion();
});

async function CargarProductos(){
    try {
        const response = await fetch('http://localhost:3001/soyashopping/read/info/user/produ', {
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
            tamano=Object.keys(data).length;
            for(i=0;i<tamano;i++){
                rutaOriginal=data[i].ImagenP;
                let rutaCorregida = rutaOriginal.replace(/\\/g, '/');
                const datosTarjetas = {
                    id:data[i].id_producto,
                    imagenSrc: "APIRest/"+rutaCorregida,
                    altText: 'Imagen de producto',
                    titulo: data[i].NombreProd,
                    calificacion: 3, // Pueden ser de 0 a 5 estrellas
                    totalReviews: 123
                  };
                  productos.push(datosTarjetas);
            }      
        } else {
            alert(data.message);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Hubo un error al procesar su solicitud');
    }
}

 document.getElementById("home-tab").addEventListener("click",function(){
    inicializarPaginacion();
 })

 