const urlParams = new URLSearchParams(window.location.search);
const productoName= urlParams.get('busc')
var fprodus=[];
async function CargarProductosf1(){
    try {
        const response = await fetch('http://localhost:3001/soyashopping/read/info/produ/name', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name:productoName
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
                    calificacion: data[i].promedio, // Pueden ser de 0 a 5 estrellas
                    price: data[i].precio
                  };
                  fprodus.push(datosTarjetas);
            }      
        } else {
            alert(data.message);
            const resultado=document.createElement("h1");
            resultado.innerText="No hay resultado"
            container.appendChild(resultado);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Hubo un error al procesar su solicitud');
    }
}