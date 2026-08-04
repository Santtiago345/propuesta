let paginaActual = 0;
const totalPaginas = 9;
const btnPrev = document.getElementById('btnPrev');
const btnNext = document.getElementById('btnNext');
const pageIndicator = document.getElementById('pageIndicator');

const nombresPaginas = [
  'Portada',
  'Índice',
  'El día que te conocí',
  'Nuestra primera cita',
  'Lo que más me gusta de ti',
  'Momentos inolvidables',
  'Razones para amarte',
  'Mi carta para ti',
  'Contraportada'
];

function actualizarUI() {
  const todasPaginas = document.querySelectorAll('.page');

  todasPaginas.forEach((pagina, index) => {
    pagina.classList.remove('flipped');
    if (index < paginaActual) {
      pagina.classList.add('flipped');
    }
  });

  pageIndicator.textContent = nombresPaginas[paginaActual];

  if (paginaActual === 0) {
    btnPrev.classList.add('hidden');
  } else {
    btnPrev.classList.remove('hidden');
  }

  if (paginaActual === totalPaginas - 1) {
    btnNext.classList.add('hidden');
  } else {
    btnNext.classList.remove('hidden');
  }
}

function abrirLibro() {
  paginaSiguiente();
}

function paginaSiguiente() {
  if (paginaActual < totalPaginas - 1) {
    paginaActual++;
    actualizarUI();
  }
}

function paginaAnterior() {
  if (paginaActual > 0) {
    paginaActual--;
    actualizarUI();
  }
}

function irAPagina(numero) {
  paginaActual = numero;
  actualizarUI();
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
    e.preventDefault();
    paginaSiguiente();
  } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
    e.preventDefault();
    paginaAnterior();
  }
});

let touchStartX = 0;
let touchStartY = 0;

document.addEventListener('touchstart', (e) => {
  touchStartX = e.touches[0].clientX;
  touchStartY = e.touches[0].clientY;
}, { passive: true });

document.addEventListener('touchend', (e) => {
  const dx = e.changedTouches[0].clientX - touchStartX;
  const dy = e.changedTouches[0].clientY - touchStartY;

  if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 50) {
    if (dx < 0) {
      paginaSiguiente();
    } else {
      paginaAnterior();
    }
  }
});

actualizarUI();
