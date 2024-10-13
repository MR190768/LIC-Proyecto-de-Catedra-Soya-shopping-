const urlParams = new URLSearchParams(window.location.search);
const productoName= urlParams.get('busc')


window.addEventListener('load', () => {
    console.log('Todos los recursos han sido cargados');
    tarjetas(12);
    CargarProductosf1();
    inicializarPaginacion();
});