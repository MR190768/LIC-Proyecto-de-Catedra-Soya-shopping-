const comentarios = [];

async function Cargarcomentarios() {
    try {
        const response = await fetch('http://localhost:3001/soyashopping/read/info/resena', {
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
            console.log(data)
            tamano = Object.keys(data).length;
            for (i = 0; i < tamano; i++) {
                const datosTarjetas = {
                    nombre: data[i].Resenador,
                    calificacion: data[i].Calificacion,
                    texto: data[i].Resena
                };
                comentarios.push(datosTarjetas)
                const comentariosPorPagina = 6;
                mostrarComentariosPagina(comentarios, 1, comentariosPorPagina);
            }
        } else {
            alert(data.message);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Hubo un error al procesar su solicitud');
    }
}

function crearComponenteComentario(comentarioD) {
    // Crear el contenedor principal
    const divComentario = document.createElement('div');
    divComentario.classList.add('darker', 'mt-4', 'text-justify');

    // Crear y añadir el título (nombre del usuario)
    const h4 = document.createElement('h4');
    h4.textContent = comentarioD.nombre;
    divComentario.appendChild(h4);

    // Crear el contenedor de estrellas (span)
    const span = document.createElement('span');

    // Añadir las estrellas según la calificación
    for (let i = 1; i <= 5; i++) {
        const starIcon = document.createElement('i');
        if (i <= comentarioD.calificacion) {
            starIcon.classList.add('bi', 'bi-star-fill', 'text-warning');
        } else {
            starIcon.classList.add('bi', 'bi-star');
        }
        span.appendChild(starIcon);
    }

    // Añadir el span al divComentario
    divComentario.appendChild(span);

    // Crear y añadir un salto de línea
    const br = document.createElement('br');
    divComentario.appendChild(br);

    // Crear y añadir el texto del comentario
    const p = document.createElement('p');
    p.textContent = comentarioD.texto;
    divComentario.appendChild(p);

    // Devolver el componente completo
    return divComentario;
}


function mostrarComentariosPagina(comentarios, paginaActual, comentariosPorPagina) {
    const container = document.getElementById('comentarios-container');
    container.innerHTML = ''; // Limpiar comentarios previos

    // Calcular el rango de comentarios a mostrar
    const inicio = (paginaActual - 1) * comentariosPorPagina;
    const fin = inicio + comentariosPorPagina;
    const comentariosPagina = comentarios.slice(inicio, fin);

    // Añadir los comentarios de la página actual
    comentariosPagina.forEach(comentario => {
        const comentarioElemento = crearComponenteComentario(comentario);
        container.appendChild(comentarioElemento);
    });

    // Actualizar la paginación
    actualizarPaginacion(comentarios.length, paginaActual, comentariosPorPagina);
}

function actualizarPaginacion(totalComentarios, paginaActual, comentariosPorPagina) {
    const paginacionContainer = document.getElementById('paginacion-container');
    paginacionContainer.innerHTML = ''; // Limpiar la paginación previa

    const totalPaginas = Math.ceil(totalComentarios / comentariosPorPagina);

    for (let i = 1; i <= totalPaginas; i++) {
        const botonPagina = document.createElement('button');
        botonPagina.textContent = i;
        botonPagina.classList.add('btn', 'btn-primary', 'me-2');

        if (i === paginaActual) {
            botonPagina.classList.add('active');
        }

        botonPagina.addEventListener('click', () => {
            mostrarComentariosPagina(comentarios, i, comentariosPorPagina);
        });

        paginacionContainer.appendChild(botonPagina);
    }
}

  