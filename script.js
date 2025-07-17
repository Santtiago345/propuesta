document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("btn-empezar").addEventListener("click", iniciarJuego);
  inicializarLinternas();
  inicializarPascal();
  inicializarJuegoTorre();
  inicializarPropuesta();
  lanzarConfeti();

});


// Función general para mostrar con fade una pantalla y ocultar otra
function mostrarPantallaConFade(idMostrar, idOcultar) {
  const pantallaOcultar = document.getElementById(idOcultar);
  const pantallaMostrar = document.getElementById(idMostrar);

  pantallaOcultar.classList.remove("visible");
  setTimeout(() => {
    pantallaOcultar.classList.add("oculto");
    pantallaMostrar.classList.remove("oculto");
    // Pequeña espera para que se aplique el cambio antes de hacer visible (force repaint)
    setTimeout(() => {
      pantallaMostrar.classList.add("visible");
      // Si es juego3 (Pascal), iniciar animación de Pascal
      if(idMostrar === "juego3") {
        animarJuegoPascal();
      }
    }, 30);
  }, 1000); // duración de la transición CSS (fade out)
}

// Inicio: pantalla bienvenida → juego linternas
function iniciarJuego() {
  mostrarPantallaConFade("juego-linternas", "pantalla-bienvenida");
  setTimeout(() => {
    const juegoLinternas = document.getElementById("juego-linternas");
    juegoLinternas.classList.add("fondo-nocturno", "tema-nocturno");
  }, 1000);
}

// Inicializar juego linternas: configuramos clicks
function inicializarLinternas() {
  document.querySelectorAll("#linternas .linterna").forEach(img => {
    img.addEventListener("click", () => seleccionarLinterna(Number(img.dataset.num)));
  });
  document.getElementById("boton-siguiente").addEventListener("click", () => {
    mostrarPantallaConFade("juego3", "juego-linternas");

    setTimeout(() => {
      const juego3 = document.getElementById("juego3");
      // Aplica el fondo inspirado en Enredados para Pascal
      juego3.classList.add("fondo-enredados");

      // Remueve fondos del juego linternas para evitar superposiciones
      document.getElementById("juego-linternas").classList.remove("fondo-nocturno", "tema-nocturno");
    }, 1000);
  });
}

function seleccionarLinterna(numero) {
  const mensaje = document.getElementById("mensaje-linterna");
  const boton = document.getElementById("boton-siguiente");
  const mensajes = {
    2: "¡Muy bien! Encontraste la linterna mágica ✨",
    5: "Esta no essssssssssssssss, intenta con otra",
    7: "Otra vez te equivocaste",
    9: "Ashhhh que esta tampoco es",
    10:"Esta literna no eeeeees",
    1: "Terrible, adivinas muy mal",
    3: "No, no, no, esta tampoco es",
    4: "Esta linternaaaaaaaa no es la correcta",
    6: "FALLASTE OTRA VEEEEEEEEEEEEEEEEZ",
    8: "Jajajjajaj tampoco"
  };

  mensaje.textContent = mensajes[numero]||"";
  mensaje.classList.remove("hidden");

  if (numero === 2) {
    boton.classList.remove("hidden");
  } else {
    boton.classList.add("hidden");
  }
}

// Inicializa elementos y gestiona animación e interacción en juego Pascal

function inicializarPascal() {

document.getElementById("boton-juego3").addEventListener("click", () => {
  mostrarPantallaConFade("pantalla-torre", "juego3");

  setTimeout(() => {
    const pantallaTorre = document.getElementById("pantalla-torre");
    if (pantallaTorre) {
      pantallaTorre.classList.add("fondo-enredados"); // Asegura fondo bonito
    }
    inicializarJuegoTorre(); // Llama sí o sí la inicialización
  }, 1000);
});
  // Por seguridad, deshabilitamos clicks hasta animación
  busquedaActiva = false;

  document.getElementById("mensaje-pascal").classList.add("hidden");
  document.getElementById("boton-juego3").classList.add("hidden");

  const arbustos = document.querySelectorAll("#contenedor-arbustos .arbusto");
  arbustos.forEach(arbusto => {
    arbusto.style.order = "";
    arbusto.classList.remove("destino-pascal");
    arbusto.style.transform = "translateX(0)";
    arbusto.onclick = null;
  });

  function crearEstrellasPascal(cantidad) {
  const cont = document.getElementById("pascal-stars");
  cont.innerHTML = ""; // limpia previo

  for(let i = 0; i < cantidad; i++) {
    const star = document.createElement("div");
    star.className = "pascal-star";
    // Ubicación aleatoria (en % de pantalla)
    star.style.top = `${Math.random() * 100}%`;
    star.style.left = `${Math.random() * 100}%`;

    // Tamaño aleatorio
    const size = 5 + Math.random() * 6;
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;

    // Cada estrella titila con distinto delay y duración
    const duration = (1.6 + Math.random() * 2.3).toFixed(2);
    const delay = (Math.random() * 2.5).toFixed(2);
    star.style.animationDuration = `${duration}s`;
    star.style.animationDelay = `${delay}s`;

    cont.appendChild(star);
  }
}

// Llama a esta función al mostrar la pantalla de Pascal (por ejemplo, 70 puntos):
crearEstrellasPascal(70);


}

// Aquí la animación de Pascal apareciendo, luego escondiéndose en arbusto central, luego mezcla y activación búsqueda
function animarJuegoPascal() {
  const imgPascal = document.getElementById("img-pascal");
  const contenedor = document.getElementById("contenedor-arbustos");
  const arbustos = contenedor.querySelectorAll(".arbusto");
  const arbustoCentral = arbustos[1];

  // Mostrar imagen Pascal inicialmente centrada debajo título
  imgPascal.style.display = "block";
  imgPascal.style.opacity = "1";
  imgPascal.style.transform = "translate(-50%, 0) scale(1)";
  imgPascal.style.transition = "all 0.7s ease";

  document.getElementById("mensaje-pascal").classList.add("hidden");
  document.getElementById("boton-juego3").classList.add("hidden");

  // Espera 0.5s antes de animar movimiento hacia arbusto central y desvanecer
  setTimeout(() => {
    const rectPascal = imgPascal.getBoundingClientRect();
    const rectArbusto = arbustoCentral.getBoundingClientRect();

    const dx = rectArbusto.left + rectArbusto.width/2 - (rectPascal.left + rectPascal.width/2);
    const dy = rectArbusto.top + rectArbusto.height/2 - (rectPascal.top + rectPascal.height/2);

    // Resalta arbusto central durante la animación
    arbustoCentral.classList.add("destino-pascal");

    imgPascal.style.transform = `translate(${dx}px, ${dy}px) scale(0.3)`;
    imgPascal.style.opacity = "0";

    setTimeout(() => {
      imgPascal.style.display = "none";
      iniciarMezclaArbustos(arbustos, () => {
        arbustoCentral.classList.remove("destino-pascal");
        activarBusquedaPascal();
      });
    }, 1200);
  }, 1000);
}

function iniciarMezclaArbustos(arbustos, callback) {
  const contenedor = arbustos[0].parentElement;
  contenedor.style.pointerEvents = "none";

  let pasos = 7;
  const intervalo = 600;
  let orden = [0,1,2];

  const movArr = [-30, 30];

  const intervalId = setInterval(() => {
    let i = Math.floor(Math.random() * 3);
    let j;
    do { j = Math.floor(Math.random() * 3); } while (j === i);

    // Swap en orden
    [orden[i], orden[j]] = [orden[j], orden[i]];

    // Animación lateral
    arbustos[i].style.transform = "translateX(30px)";
    arbustos[j].style.transform = "translateX(-30px)";

    setTimeout(() => {
      arbustos[i].style.transform = "translateX(0)";
      arbustos[j].style.transform = "translateX(0)";
    }, intervalo/2);

    // Aplicar nuevo orden (propiedad flex order)
    orden.forEach((pos, idx) => {
      arbustos[idx].style.transition = `order ${intervalo/1000}s ease`;
      arbustos[idx].style.order = pos;
    });

    pasos--;
    if(pasos <= 0) {
      clearInterval(intervalId);
      posicionPascal = orden.indexOf(1); // Actualizamos la posición pascal

      contenedor.style.pointerEvents = "auto";
      if(typeof callback === "function") callback();
    }
  }, intervalo);
}



function mostrarPascalEncontrado() {
  const imgPascal = document.getElementById("img-pascal");
  const contenedor = document.getElementById("contenedor-arbustos");
  const contenedorRect = contenedor.getBoundingClientRect();

  // Mostramos Pascal:
  imgPascal.style.display = "block";
  imgPascal.style.opacity = "1";
  imgPascal.style.transition = "all 0.8s ease";

  // Posicionamos Pascal estático arriba y centrado
  // Calculamos la posición horizontal centrada respecto al contenedor
  imgPascal.style.position = "absolute";
  imgPascal.style.top = `${contenedorRect.top - 90}px`; // 90px arriba del contenedor (ajusta según tamaño)
  imgPascal.style.left = `${contenedorRect.left + contenedorRect.width / 2}px`;
  imgPascal.style.transform = "translate(-50%, 0) scale(1)";

  // Opcional: efecto “salto” arriba con translateY
  imgPascal.animate([
    { transform: "translate(-50%, 20px) scale(0.5)", opacity: 0 },
    { transform: "translate(-50%, 0) scale(1)", opacity: 1 }
  ], {
    duration: 800,
    easing: "ease-out",
    fill: "forwards"
  });
}

function mostrarPascalArriba() {
  const imgPascal = document.getElementById("img-pascal");
  const contenedor = document.getElementById("contenedor-arbustos");
  const contenedorRect = contenedor.getBoundingClientRect();

  // Mostramos imagen Pascal visible, con transición suave
  imgPascal.style.display = "block";
  imgPascal.style.opacity = "1";
  imgPascal.style.transition = "all 1s ease";

  // Posicionar Pascal arriba y centrado del contenedor (arbustos)
  imgPascal.style.position = "absolute";
  imgPascal.style.top = `${contenedorRect.top - 90}px`; // Ajusta según quieres que suba
  imgPascal.style.left = `${contenedorRect.left + contenedorRect.width / 2}px`;
  imgPascal.style.transform = "translate(-50%, 0) scale(1)";

  // Opcional animación tipo salto y fade-in usando Web Animations API (o puedes usar solo CSS)
  imgPascal.animate([
    { transform: "translate(-50%, 20px) scale(0.7)", opacity: 0 },
    { transform: "translate(-50%, 0px) scale(1)", opacity: 1 }
  ], {
    duration: 1000,
    easing: "ease-out",
    fill: "forwards"
  });
}

function activarBusquedaPascal() {
  busquedaActiva = true;
  const arbustos = document.querySelectorAll("#contenedor-arbustos .arbusto");
  arbustos.forEach((arbusto, index) => {

    arbusto.onclick = () => {
      if (!busquedaActiva) return;
      if (index === posicionPascal) {
        document.getElementById("mensaje-pascal").classList.remove("hidden");
        document.getElementById("boton-juego3").classList.remove("hidden");
        mostrarPascalArriba();  // <-- Aquí mostramos la animación que pediste
      } else {
        alert("Pascal no está aquí, intenta con otro arbusto.");
      }
    };
  });
}



// Juego torre

 // Variables control progreso torre
let progreso = 0;
const progresoMax = 100; // 100%
const incremento = 2;    // % que suma por click (ajusta segun velocidad)

// Agrega la lógica para el juego torre
function inicializarJuegoTorre() {

  // Reset progreso
  progreso = 0;
  const barra = document.getElementById("barra-progreso");
  barra.style.height = "0%";

  // Estado inicial de torres
  const torre1 = document.getElementById("torre1");
  const torre2 = document.getElementById("torre2");
  torre1.style.top = "0px";
  torre1.style.opacity = "1";
  torre1.classList.remove("animar-torre1");
  torre2.style.top = "-120px";
  torre2.style.opacity = "0";
  torre2.classList.remove("animar-torre2");

  // Título visible con fade
  const titulo = document.getElementById("titulo-torre");
  titulo.classList.remove("fade-visible");
  setTimeout(() => titulo.classList.add("fade-visible"), 30);


  // Agregar evento click en barra progreso
  const contenedorBarra = document.getElementById("barra-progreso-container");
  contenedorBarra.onclick = function () {
    if(progreso >= progresoMax) return; // ya completo

    progreso += incremento;
    if(progreso > progresoMax) progreso = progresoMax;

    barra.style.height = progreso + "%";

    if(progreso === progresoMax) {
      subirTorreAnimacion();
    }
  };
}

// Animación cuando la barra se completa - intercambia torres
function subirTorreAnimacion() {
  const torre1 = document.getElementById("torre1");
  const torre2 = document.getElementById("torre2");
  const btnSiguiente = document.getElementById("btn-siguiente-juego");
  const contenedor = document.getElementById("pantalla-torre");

  // Animar torre1 hacia abajo y desvanecer
  torre1.classList.add("animar-torre1");

  // Después de 1.5s animar mostrar torre2 (deslizando arriba)
  setTimeout(() => {
    torre2.classList.add("animar-torre2");

    // Mostrar botón siguiente cuando torre2 acaba animación
    setTimeout(() => {
      btnSiguiente.classList.remove("hidden");
      btnSiguiente.classList.add("fade-visible");

      // Crear mensaje de llegada
      const mensajeFinal = document.createElement("div");
      mensajeFinal.textContent = "¡Llegaste👸!";
      mensajeFinal.classList.add(
        "text-3xl", "text-center", "text-white", "font-bold", "mt-5", "animate-pulse"
      );

      contenedor.appendChild(mensajeFinal);
    }, 1500);
  }, 1500);
}

function ocultarTodasLasPantallas() {
  document.querySelectorAll(".pantalla").forEach(p => p.classList.add("hidden"));
}

function mostrarPantalla(id) {
  const pantalla = document.getElementById(id);
  if (pantalla) pantalla.classList.remove("hidden");
}


function animarTextoElemento(elemento, nuevoTexto) {
  elemento.classList.remove("aparecer-suave");
  void elemento.offsetWidth; // Forzar reflujo
  elemento.textContent = nuevoTexto;
  elemento.classList.add("aparecer-suave");
}

// Paso final desde pantalla de torre a pantalla de propuesta
function inicializarPropuesta() {
  const frase = document.getElementById("frase-propuesta");
  const btnContinuar = document.getElementById("btn-propuesta-continuar");
  const opciones = document.getElementById("opciones-respuesta");

  let paso = 0;

  // Ocultar frase, botones y opciones por defecto
  frase.classList.remove("opacity-100");
  btnContinuar.classList.add("hidden");
  opciones.classList.add("hidden");

  // Evento que se dispara desde pantalla torre
  document.getElementById("btn-siguiente-juego").addEventListener("click", () => {
    mostrarPantallaConFade("pantalla-propuesta", "pantalla-torre");
    generarDestellos(); // Agregamos destellos


    // Mostrar frase con fade
    setTimeout(() => {
      frase.textContent = "Te quiero hacer una pregunta";
      frase.classList.add("opacity-100");
    }, 100);

    // Mostrar botón después de 1.5 segundos
    setTimeout(() => {
      btnContinuar.classList.remove("hidden");
      btnContinuar.classList.add("fade-visible");
    }, 1500);
  });

  // Control de pasos en los clics del botón
  btnContinuar.addEventListener("click", () => {
    paso++;

    frase.classList.remove("opacity-100"); // Oculta antes de cambiar
    setTimeout(() => {
      if (paso === 1) {
        frase.textContent = "Sé que me demore un poco peeerooooo";
      } else if (paso === 2) {
        frase.textContent = "Te hice esta página y todos estos jueguitos para preguntarte siiiiii";
      } else if (paso === 3) {
        frase.textContent = "¿Quieres ser mi novia?";
        btnContinuar.classList.add("hidden");
        opciones.classList.remove("hidden");
      }

      frase.classList.add("opacity-100"); // Reaparece con animación
    }, 200); // Pequeño retraso para efecto de desvanecimiento
  });
}


function generarDestellos(cantidad = 30) {
  const contenedor = document.getElementById("destellos-container");

  for (let i = 0; i < cantidad; i++) {
    const destello = document.createElement("div");
    destello.classList.add("destello");

    // Tamaño aleatorio
    const size = Math.random() < 0.5 ? 8 : 20 + Math.random() * 30;
    destello.style.width = `${size}px`;
    destello.style.height = `${size}px`;

    // Posición aleatoria
    const top = Math.random() * 100;
    const left = Math.random() * 100;
    destello.style.top = `${top}%`;
    destello.style.left = `${left}%`;

    // Duración y retraso aleatorio
    const duracion = 1 + Math.random() * 2;
    const delay = Math.random() * 3;
    destello.style.animationDuration = `${duracion}s`;
    destello.style.animationDelay = `${delay}s`;

    contenedor.appendChild(destello);
  }
}



function lanzarConfeti() {
  const canvas = document.getElementById('confeti-canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  // Lógica de botón "Sí"
document.getElementById('bsi').addEventListener('click', () => {
  mostrarPantallaConFade("pantalla-celebracion", "pantalla-propuesta");
  lanzarConfeti();
});

document.getElementById("bno").addEventListener("click", () => {
  const botonNo = document.getElementById("bno");
  botonNo.classList.add("opacity-0", "transition-opacity", "duration-700");

  // Opcional: eliminar del DOM completamente después del fade
  setTimeout(() => {
    botonNo.style.display = "none";
  }, 800);
});


  const colores = ['#E1A4F2', '#FDDDE6', '#FFD700', '#B07FD3', '#FFB6C1'];
  const particulas = [];

  for (let i = 0; i < 300; i++) {
    particulas.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 6 + 2,
      color: colores[Math.floor(Math.random() * colores.length)],
      velocidadY: Math.random() * 3 + 2,
      velocidadX: (Math.random() - 0.5) * 2
    });
  }

  function animar() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let p of particulas) {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.fill();
      p.y += p.velocidadY;
      p.x += p.velocidadX;

      if (p.y > canvas.height) p.y = -10;
      if (p.x > canvas.width || p.x < 0) p.x = Math.random() * canvas.width;
    }
    requestAnimationFrame(animar);
  }

  animar();
}
