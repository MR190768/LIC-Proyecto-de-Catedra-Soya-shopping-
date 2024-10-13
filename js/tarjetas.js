
var productosPorPagina
let paginaActual=1;
var productos=[];
const container = document.getElementById('productos-container');

function tarjetas(npaginas){
    productosPorPagina=npaginas;
};

function mostrarProductos(pagina) {
    const inicio = (pagina - 1) * productosPorPagina;
    const fin = inicio + productosPorPagina;
    const productosPagina = productos.slice(inicio, fin);
  
    const container = document.getElementById('productos-container');
    container.innerHTML = ''; // Limpiar productos anteriores
    productosPagina.forEach(producto => {
        crearTarjeta(producto);
      });
}

function crearPaginacion(totalPaginas) {
    const paginacionUl = document.getElementById('pagination');
    paginacionUl.innerHTML = ''; // Limpiar la paginación existente

    for (let i = 1; i <= totalPaginas; i++) {
      const li = document.createElement('li');
      li.classList.add('page-item');
      if (i === paginaActual) li.classList.add('active');

      const a = document.createElement('a');
      a.classList.add('page-link');
      a.href = '#';
      a.textContent = i;

      a.addEventListener('click', function(e) {
        e.preventDefault();
        paginaActual = i;
        mostrarProductos(paginaActual);
        crearPaginacion(totalPaginas);
      });

      li.appendChild(a);
      paginacionUl.appendChild(li);
    }
  }

  function inicializarPaginacion() {
    const totalPaginas = Math.ceil(productos.length / productosPorPagina);
    crearPaginacion(totalPaginas);
    mostrarProductos(paginaActual);
    console.log(productos)
  }



function crearTarjeta(producto) {
    // Crear los elementos del DOM
    const colDiv = document.createElement('div');
    colDiv.classList.add('col-md-4', 'mb-5');
    
    const productosMinDiv = document.createElement('div');
    productosMinDiv.classList.add('productosMin');

    const cardDiv = document.createElement('div');
    cardDiv.classList.add('card', 'border-0', 'rounded-0', 'shadow');
    cardDiv.style.width = '18rem';

    cardDiv.addEventListener('click', function() {
        // Redirigir a una página de detalles pasando el ID del producto
        window.location.href = `Producto.html?id=${producto.id}`;
      });

    const img = document.createElement('img');
    img.classList.add('card-img-top', 'rounded-0', 'imgporducto');
    img.src = producto.imagenSrc;
    img.alt = producto.altText;
    img.id = 'produIMG';

    const cardBodyItemDiv = document.createElement('div');
    cardBodyItemDiv.classList.add('card-body-item', 'mt-3', 'mb-2');

    const rowDiv = document.createElement('div');
    rowDiv.classList.add('row');

    const col12Div = document.createElement('div');
    col12Div.classList.add('col-12');

    const titleH3 = document.createElement('h3');
    titleH3.classList.add('card-title', 'text-center');
    titleH3.textContent = producto.titulo;

    const cardTextP = document.createElement('p');
    cardTextP.classList.add('card-text', 'text-center');
    
    // Crear los íconos de estrellas
    for (let i = 1; i <= 5; i++) {
      const starIcon = document.createElement('i');
      if (i <= producto.calificacion) {
        starIcon.classList.add('bi', 'bi-star-fill', 'text-warning');
      } else {
        starIcon.classList.add('bi', 'bi-star', 'text-warning');
      }
      cardTextP.appendChild(starIcon);
    }
    
    const ratingSpan = document.createElement('span');
    ratingSpan.textContent = ` (${producto.totalReviews})`;
    cardTextP.appendChild(ratingSpan);

    // Agregar los elementos al DOM
    col12Div.appendChild(titleH3);
    col12Div.appendChild(cardTextP);

    rowDiv.appendChild(col12Div);

    cardBodyItemDiv.appendChild(rowDiv);

    cardDiv.appendChild(img);
    cardDiv.appendChild(cardBodyItemDiv);

    productosMinDiv.appendChild(cardDiv);
    colDiv.appendChild(productosMinDiv);

    // Agregar la tarjeta al contenedor
    container.appendChild(colDiv);
  }