window.addEventListener('load', () => {
    console.log('Todos los recursos han sido cargados');
    carga();
});

const carga = async function(){
    try {
        const response = await fetch('http://localhost:3001/soyashopping/read/info/user', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                Authorization:localStorage.getItem("token")
              ,
              }),
            })

        const data = await response.json();

        if (response.ok) {
            iper=document.getElementById("imgPerfil");
            Nper=document.getElementById("Nusuario");
            Nper.innerText=data[0].usuarioName;
            rutaOriginal=data[0].ImagenP;
            let rutaCorregida = rutaOriginal.replace(/\\/g, '/');
            iper.src="APIRest/"+rutaCorregida;

        } else {
            console.log(data.message);
        }
    } catch (error) {
        console.error('Error:', error);

    }
}

