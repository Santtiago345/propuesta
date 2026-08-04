var Libro = (function () {
  'use strict';

  var cerrado = true;
  var spreadActual = 0;
  var flipping = false;

  var spreads = [
    {
      left: '<h2 class="chapter-title">📑 Índice</h2>' +
        '<ul class="index-list">' +
        '<li onclick="Libro.irASpread(1)"><span class="idx-num">1</span> El día que te conocí</li>' +
        '<li onclick="Libro.irASpread(2)"><span class="idx-num">2</span> Nuestra primera cita</li>' +
        '<li onclick="Libro.irASpread(2)"><span class="idx-num">3</span> Lo que más me gusta de ti</li>' +
        '<li onclick="Libro.irASpread(3)"><span class="idx-num">4</span> Momentos inolvidables</li>' +
        '<li onclick="Libro.irASpread(3)"><span class="idx-num">5</span> Razones para amarte</li>' +
        '<li onclick="Libro.irASpread(4)"><span class="idx-num">6</span> Mi carta para ti</li>' +
        '</ul>',
      right: '<h2 class="chapter-title">✨ El día que te conocí</h2>' +
        '<p>Recuerdo perfectamente ese momento. El universo conspiró para que nuestros caminos se cruzaran, y desde ese instante supe que mi vida cambiaría para siempre.</p>' +
        '<p>Tu sonrisa iluminó todo a mi alrededor, y aunque no lo sabías, ya habías robado completamente mi corazón.</p>' +
        '<p class="page-quote">"A veces el amor llega sin avisar, como una brisa suave que se convierte en huracán."</p>'
    },
    {
      left: '<h2 class="chapter-title">🌸 Nuestra primera cita</h2>' +
        '<p>Los nervios, las mariposas en el estómago, la emoción de verte llegar. Esa primera cita fue el comienzo de algo mágico que ni yo mismo podía creer.</p>' +
        '<p>Cada palabra que dijiste, cada risa que compartimos, se quedó grabada en mi memoria como el día más feliz de mi vida... hasta que llegó el siguiente a tu lado.</p>' +
        '<p class="page-quote">"No fue el lugar, ni la hora, ni el momento. Fuiste tú quien hizo que todo fuera perfecto."</p>',
      right: '<h2 class="chapter-title">💖 Lo que más me gusta de ti</h2>' +
        '<p>Me encanta tu forma de ver el mundo, esa chispa que tienes en los ojos cuando algo te emociona, tu risa contagiosa que alegra hasta los días más grises.</p>' +
        '<p>Admiro tu fortaleza, tu ternura, tu inteligencia y ese corazón tan grande que tienes. Eres la combinación perfecta de todo lo bueno que existe en este mundo.</p>' +
        '<p class="page-quote">"Eres el tipo de persona que hace que el mundo sea un lugar mejor solo con existir."</p>'
    },
    {
      left: '<h2 class="chapter-title">🌟 Momentos inolvidables</h2>' +
        '<p>Cada recuerdo contigo es un tesoro: las llamadas hasta tarde, los mensajes que me sacan una sonrisa, los planes que hacemos juntos y los sueños que compartimos.</p>' +
        '<p>No existe un solo día en el que no agradezca al destino por haberte puesto en mi camino. Eres mi lugar favorito en el mundo entero.</p>' +
        '<p class="page-quote">"Los momentos más simples se vuelven extraordinarios cuando los vivo contigo."</p>',
      right: '<h2 class="chapter-title">💌 Razones para amarte</h2>' +
        '<p>Podría llenar mil libros con las razones por las que te amo, pero aquí van solo algunas:</p>' +
        '<ul class="reasons-list">' +
        '<li>💜 Porque me haces ser mejor persona cada día</li>' +
        '<li>💜 Porque tu felicidad es mi felicidad</li>' +
        '<li>💜 Porque contigo todo tiene sentido</li>' +
        '<li>💜 Porque eres mi hogar, mi paz y mi alegría</li>' +
        '<li>💜 Porque simplemente eres tú</li>' +
        '</ul>' +
        '<p class="page-quote">"Te amo no por lo que eres, sino por lo que soy yo cuando estoy contigo."</p>'
    },
    {
      left: '<h2 class="chapter-title">💌 Mi carta para ti</h2>' +
        '<p>Querida Juanita,</p>' +
        '<p>Escribir esto me hace sentir el hombre más afortunado del mundo. Cada palabra que lees aquí sale directamente de mi corazón, porque eso es lo que haces tú: sacar lo mejor de mí.</p>' +
        '<p>Gracias por cada sonrisa, por cada momento, por cada enseñanza. Eres y siempre serás la persona más importante en mi vida.</p>' +
        '<p class="signature">Con todo mi amor,<br>siempre tuyo 💜</p>',
      right: '<div class="back-cover-end">' +
        '<h2 class="chapter-title" style="color:#fff;border-bottom-color:rgba(255,215,0,0.5)">Y esta historia...</h2>' +
        '<p style="color:rgba(255,255,255,0.9);text-align:center">...apenas comienza ✨</p>' +
        '<p style="color:rgba(255,255,255,0.8);text-align:center">Porque lo mejor está por venir,<br>y quiero vivirlo todo a tu lado.</p>' +
        '<a href="index.html" class="back-link">Volver al inicio 🏠</a>' +
        '</div>'
    }
  ];

  var totalSpreads = spreads.length;

  var bookClosed, bookOpen, pageLeft, pageRight;
  var flipContainer, flipFront, flipBack;
  var navPrev, navNext, navIndex, pageLabel;

  function cacheDom() {
    bookClosed = document.getElementById('bookClosed');
    bookOpen = document.getElementById('bookOpen');
    pageLeft = document.getElementById('pageLeft').querySelector('.page-inner');
    pageRight = document.getElementById('pageRight');
    flipContainer = document.getElementById('flipContainer');
    flipFront = document.getElementById('flipFront').querySelector('.page-inner');
    flipBack = document.getElementById('flipBack').querySelector('.page-inner');
    navPrev = document.getElementById('navPrev');
    navNext = document.getElementById('navNext');
    navIndex = document.getElementById('navIndex');
    pageLabel = document.getElementById('pageLabel');
  }

  function ponerContenido(spreadIdx) {
    var s = spreads[spreadIdx];
    pageLeft.innerHTML = s.left;
    flipFront.innerHTML = s.right;
  }

  function renovarUI() {
    pageLabel.textContent = (spreadActual + 1) + ' / ' + totalSpreads;
    if (spreadActual === 0) {
      navPrev.classList.add('deshabilitada');
    } else {
      navPrev.classList.remove('deshabilitada');
    }
    if (spreadActual === totalSpreads - 1) {
      navNext.classList.add('deshabilitada');
    } else {
      navNext.classList.remove('deshabilitada');
    }
  }

  function animarFlip(callback) {
    flipContainer.classList.add('flipped');
    setTimeout(function () {
      flipContainer.classList.remove('flipped');
      setTimeout(function () {
        renovarUI();
        flipping = false;
        if (callback) callback();
      }, 100);
    }, 700);
  }

  function abrir() {
    if (!cerrado) return;
    cerrado = false;

    bookClosed.classList.add('cerrandose');

    setTimeout(function () {
      bookClosed.classList.add('hidden');
      bookOpen.classList.remove('hidden');

      setTimeout(function () {
        bookOpen.classList.add('visible');
        ponerContenido(spreadActual);
        renovarUI();
      }, 50);
    }, 750);
  }

  function cerrar() {
    if (cerrado) return;
    cerrado = true;

    bookOpen.classList.remove('visible');

    setTimeout(function () {
      bookOpen.classList.add('hidden');
      bookClosed.classList.remove('hidden', 'cerrandose');
    }, 500);
  }

  function siguiente() {
    if (flipping) return;
    if (spreadActual >= totalSpreads - 1) return;
    flipping = true;

    flipBack.innerHTML = flipFront.innerHTML;
    spreadActual++;
    ponerContenido(spreadActual);
    animarFlip();
  }

  function anterior() {
    if (flipping) return;
    if (spreadActual <= 0) return;
    flipping = true;

    flipBack.innerHTML = pageLeft.innerHTML;
    spreadActual--;
    ponerContenido(spreadActual);
    animarFlip();
  }

  function irASpread(n) {
    if (flipping) return;
    if (n < 0 || n >= totalSpreads) return;
    if (n === spreadActual) return;
    flipping = true;

    if (n > spreadActual) {
      flipBack.innerHTML = flipFront.innerHTML;
    } else {
      flipBack.innerHTML = pageLeft.innerHTML;
    }

    spreadActual = n;
    ponerContenido(spreadActual);
    animarFlip();
  }

  function irAIndice() {
    irASpread(0);
  }

  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowRight') { e.preventDefault(); siguiente(); }
    if (e.key === 'ArrowLeft')  { e.preventDefault(); anterior(); }
    if (e.key === 'ArrowDown')  { e.preventDefault(); siguiente(); }
    if (e.key === 'ArrowUp')    { e.preventDefault(); anterior(); }
  });

  var touchX = 0;
  document.addEventListener('touchstart', function (e) { touchX = e.touches[0].clientX; }, { passive: true });
  document.addEventListener('touchend', function (e) {
    var dx = e.changedTouches[0].clientX - touchX;
    if (Math.abs(dx) > 50) {
      if (dx < 0) siguiente();
      else anterior();
    }
  });

  cacheDom();

  return {
    abrir: abrir,
    cerrar: cerrar,
    siguiente: siguiente,
    anterior: anterior,
    irASpread: irASpread,
    irAIndice: irAIndice,
    getSpreadActual: function () { return spreadActual; },
    getTotalSpreads: function () { return totalSpreads; },
    getCerrado: function () { return cerrado; },
    getSpreads: function () { return spreads; }
  };
})();
