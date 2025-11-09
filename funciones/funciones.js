// --- Función de fecha y hora para todas las paginas ---

function mostrarFechaHora() {
  const ahora = new Date();
  const opciones = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  let fechaFormateada = ahora.toLocaleDateString('es-ES', opciones);
  fechaFormateada = fechaFormateada.charAt(0).toUpperCase() + fechaFormateada.slice(1);

  const horas = String(ahora.getHours()).padStart(2, '0');
  const minutos = String(ahora.getMinutes()).padStart(2, '0');
  const segundos = String(ahora.getSeconds()).padStart(2, '0');

  document.getElementById("fechaHora").textContent =
    `Hoy es ${fechaFormateada} a las ${horas}:${minutos}:${segundos}`;
}

function iniciarReloj() {
  mostrarFechaHora();
  setInterval(mostrarFechaHora, 1000);
}

// --- Función contador para la pagina Historia ---

function mostrarContadorVisitas() {
  const elemento = document.getElementById("contadorVisitas");
  if (elemento) {
    // Obtener el contador guardado, si no existe iniciar en 0
    let visitas = localStorage.getItem("contadorVisitas");
    if (!visitas) {
      visitas = 0;
    }
    visitas = parseInt(visitas) + 1; // Aumentar en 1
    localStorage.setItem("contadorVisitas", visitas); // Guardar el valor actualizado

    elemento.textContent = `Visitas hoy: ${visitas}`;
  }
}

// --- Función tiempo en Bilbao para la pagina Expositores ---

function mostrarTiempoBilbao() {
  const tiempo = document.getElementById("tiempoBilbao");

  fetch("https://api.open-meteo.com/v1/forecast?latitude=43.2630&longitude=-2.9350&current_weather=true")
    .then(respuesta => respuesta.json())
    .then(datos => {
      const temp = datos.current_weather.temperature;
      const viento = datos.current_weather.windspeed;
      tiempo.textContent = `Bilbao: ${temp}°C, viento ${viento} km/h`;
    })
    .catch(() => {
      tiempo.textContent = "No se pudo cargar el tiempo.";
    });
}


// --- Función mapa para los alojamientos ---

function insertarMapasAlojamientos() {
  const celdasMapa = document.querySelectorAll("td.mapa");

  celdasMapa.forEach((celda) => {
    const direccion = celda.getAttribute("data-direccion");
    const iframe = document.createElement("iframe");

    iframe.src = `https://www.google.com/maps?q=${encodeURIComponent(direccion)}&output=embed`;
    iframe.width = "150";
    iframe.height = "100";
    iframe.style.border = "0";
    iframe.loading = "lazy";

    celda.appendChild(iframe);
  });
}

// --- Funcion error si no se meten los datos correctos para el envio del email ---

function activarValidacionEnTiempoReal() {
  const nombre = document.getElementById("nombre");
  const email = document.getElementById("email");
  const mensaje = document.getElementById("mensaje");

  const errorNombre = document.getElementById("errorNombre");
  const errorEmail = document.getElementById("errorEmail");
  const errorMensaje = document.getElementById("errorMensaje");

  nombre.addEventListener("input", () => {
    errorNombre.textContent = nombre.value.trim().length < 3
      ? "El nombre debe tener al menos 3 letras."
      : "";
  });

  email.addEventListener("input", () => {
    const valido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value);
    errorEmail.textContent = !valido
      ? "Introduce un correo válido."
      : "";
  });

  mensaje.addEventListener("input", () => {
    errorMensaje.textContent = mensaje.value.trim().length < 10
      ? "El mensaje debe tener al menos 10 caracteres."
      : "";
  });
}


// Funciones para ejecutar al cargar la pagina

window.onload = function() {
  iniciarReloj();             
  mostrarContadorVisitas();
  mostrarTiempoBilbao();
  insertarMapasAlojamientos();
  activarValidacionEnTiempoReal();
  
};
