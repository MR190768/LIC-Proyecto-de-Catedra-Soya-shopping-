function cargarComentarios() {
    const listaComentarios = document.getElementById("lista-comentarios");
    listaComentarios.innerHTML = ""; // Limpiar la lista de comentarios
  
    // Obtener los comentarios guardados en localStorage
    const comentarios = JSON.parse(localStorage.getItem("comentarios")) || [];
  
    // Mostrar cada comentario
    comentarios.forEach((comentario) => {
      const comentarioElement = document.createElement("div");
      comentarioElement.classList.add("comentario");
      comentarioElement.innerHTML = `
        <strong>${comentario.nombre}</strong> <br>
        Puntuación: ${comentario.puntuacion} estrellas <br>
        Comentario: ${comentario.comentario}
        <hr>
      `;
      listaComentarios.appendChild(comentarioElement);
    });
  }
  
  // Función para guardar el comentario
  function guardarComentario(event) {
    event.preventDefault(); // Prevenir recarga de la página
  
    // Obtener valores del formulario
    const nombre = document.getElementById("nombre").value;
    const comentario = document.getElementById("comentario").value;
    const puntuacion = document.getElementById("puntuacion").value;
  
    // Validar que no estén vacíos
    if (nombre === "" || comentario === "" || puntuacion === "") {
      alert("Todos los campos son obligatorios.");
      return;
    }
  
    // Obtener los comentarios guardados o un array vacío
    const comentarios = JSON.parse(localStorage.getItem("comentarios")) || [];
  
    // Agregar el nuevo comentario
    comentarios.push({ nombre, comentario, puntuacion });
  
    // Guardar los comentarios nuevamente en localStorage
    localStorage.setItem("comentarios", JSON.stringify(comentarios));
  
    // Limpiar el formulario
    document.getElementById("comentario-form").reset();
  
    // Volver a cargar los comentarios
    cargarComentarios();
  }
  
  // Evento que se ejecuta cuando la página se carga para mostrar comentarios guardados
  window.onload = cargarComentarios;
  
  // Evento de envío del formulario
  document.getElementById("comentario-form").addEventListener("submit", guardarComentario);