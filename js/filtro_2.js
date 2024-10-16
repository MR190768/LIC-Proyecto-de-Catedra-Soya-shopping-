let f2produs=[];
const btnfiltro=document.getElementById("Afiltro").addEventListener("click",async function(){
    
    await tarjetas(12);
    await cargaFiltros()
    await inicializarPaginacion(f2produs);
})

async function cargaFiltros() {
    f2produs=[];
    const categoria = document.querySelectorAll('input[name="cat"]:checked');
    const rating = document.querySelectorAll('input[name="rating"]:checked');
    const Fradio= document.querySelector('input[name="radio"]:checked').value;
    try {
        const response = await fetch('http://localhost:3001/soyashopping/read/info/produ/filtro', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                calfi:arrayFiltros(rating),
                cate:arrayFiltros(categoria),
                tipo:Fradio,
                name:productoName
            })
        });
    
        const data = await response.json();
        console.log(data)
    
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
                  f2produs.push(datosTarjetas);
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

  function arrayFiltros(array){
    const rArray=[];
    array.forEach((checkbox) => {
        rArray.push(checkbox.value);
      });

      return rArray;

  }