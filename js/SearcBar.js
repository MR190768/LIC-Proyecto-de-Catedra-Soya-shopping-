const form=document.getElementById("buscador");
const searcjbar=document.getElementById("bustext");

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    window.location.href = `filtroproductos.html?busc=${searcjbar.value}`;
})