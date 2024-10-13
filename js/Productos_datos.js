window.addEventListener('load', () => {
    console.log('Todos los recursos han sido cargados');
    carga();
    Cargarcomentarios();
});


const urlParams = new URLSearchParams(window.location.search);
const productoId = parseInt(urlParams.get('id'));








