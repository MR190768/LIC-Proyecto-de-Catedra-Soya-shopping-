
window.addEventListener('load', async () => {
    console.log('Todos los recursos han sido cargados');
    await tarjetas(12);
    await CargarProductosf1();
    await inicializarPaginacion(fprodus);
});



