var Flipbook = (function () {
  'use strict';

  /* ======== DATOS ======== */
  var pages = [
    /* 0: portada (solo cerrado) */ '',

    /* 1: indice */
    '<h2 class="cht">📑 Índice</h2>' +
    '<ul class="toc-inline">' +
    '<li onclick="Flipbook.irAPagina(2)"><span class="toc-num">1</span> El día que te conocí</li>' +
    '<li onclick="Flipbook.irAPagina(4)"><span class="toc-num">2</span> Nuestra primera cita</li>' +
    '<li onclick="Flipbook.irAPagina(4)"><span class="toc-num">3</span> Lo que más me gusta de ti</li>' +
    '<li onclick="Flipbook.irAPagina(6)"><span class="toc-num">4</span> Momentos inolvidables</li>' +
    '<li onclick="Flipbook.irAPagina(6)"><span class="toc-num">5</span> Razones para amarte</li>' +
    '<li onclick="Flipbook.irAPagina(8)"><span class="toc-num">6</span> Mi carta para ti</li>' +
    '</ul>',

    /* 2: contenido 1 */
    '<h2 class="cht">✨ El día que te conocí</h2>' +
    '<p>Recuerdo perfectamente ese momento. El universo conspiró para que nuestros caminos se cruzaran, y desde ese instante supe que mi vida cambiaría para siempre.</p>' +
    '<p>Tu sonrisa iluminó todo a mi alrededor, y aunque no lo sabías, ya habías robado completamente mi corazón.</p>' +
    '<p class="quote">"A veces el amor llega sin avisar, como una brisa suave que se convierte en huracán."</p>',

    /* 3: contenido 2 */
    '<h2 class="cht">🌸 Nuestra primera cita</h2>' +
    '<p>Los nervios, las mariposas en el estómago, la emoción de verte llegar. Esa primera cita fue el comienzo de algo mágico que ni yo mismo podía creer.</p>' +
    '<p>Cada palabra que dijiste, cada risa que compartimos, se quedó grabada en mi memoria como el día más feliz de mi vida... hasta que llegó el siguiente a tu lado.</p>' +
    '<p class="quote">"No fue el lugar, ni la hora, ni el momento. Fuiste tú quien hizo que todo fuera perfecto."</p>',

    /* 4: contenido 3 */
    '<h2 class="cht">💖 Lo que más me gusta de ti</h2>' +
    '<p>Me encanta tu forma de ver el mundo, esa chispa que tienes en los ojos cuando algo te emociona, tu risa contagiosa que alegra hasta los días más grises.</p>' +
    '<p>Admiro tu fortaleza, tu ternura, tu inteligencia y ese corazón tan grande que tienes. Eres la combinación perfecta de todo lo bueno que existe en este mundo.</p>' +
    '<p class="quote">"Eres el tipo de persona que hace que el mundo sea un lugar mejor solo con existir."</p>',

    /* 5: contenido 4 */
    '<h2 class="cht">🌟 Momentos inolvidables</h2>' +
    '<p>Cada recuerdo contigo es un tesoro: las llamadas hasta tarde, los mensajes que me sacan una sonrisa, los planes que hacemos juntos y los sueños que compartimos.</p>' +
    '<p>No existe un solo día en el que no agradezca al destino por haberte puesto en mi camino. Eres mi lugar favorito en el mundo entero.</p>' +
    '<p class="quote">"Los momentos más simples se vuelven extraordinarios cuando los vivo contigo."</p>',

    /* 6: contenido 5 */
    '<h2 class="cht">💌 Razones para amarte</h2>' +
    '<p>Podría llenar mil libros con las razones por las que te amo, pero aquí van solo algunas:</p>' +
    '<ul class="reasons">' +
    '<li>💜 Porque me haces ser mejor persona cada día</li>' +
    '<li>💜 Porque tu felicidad es mi felicidad</li>' +
    '<li>💜 Porque contigo todo tiene sentido</li>' +
    '<li>💜 Porque eres mi hogar, mi paz y mi alegría</li>' +
    '<li>💜 Porque simplemente eres tú</li></ul>' +
    '<p class="quote">"Te amo no por lo que eres, sino por lo que soy yo cuando estoy contigo."</p>',

    /* 7: contenido 6 */
    '<h2 class="cht">💌 Mi carta para ti</h2>' +
    '<p>Querida Juanita,</p>' +
    '<p>Escribir esto me hace sentir el hombre más afortunado del mundo. Cada palabra que lees aquí sale directamente de mi corazón, porque eso es lo que haces tú: sacar lo mejor de mí.</p>' +
    '<p>Gracias por cada sonrisa, por cada momento, por cada enseñanza. Eres y siempre serás la persona más importante en mi vida.</p>' +
    '<p class="sig">Con todo mi amor,<br>siempre tuyo 💜</p>',

    /* 8: contraportada */
    '<div class="end-page">' +
    '<h2 class="cht">Y esta historia...</h2>' +
    '<p>...apenas comienza ✨</p>' +
    '<p>Porque lo mejor está por venir,<br>y quiero vivirlo todo a tu lado.</p>' +
    '<a href="index.html" class="end-link">Volver al inicio 🏠</a></div>'
  ];

  var totalPaginas = pages.length - 1; // sin contar portada (índice 0)
  var currentPage = 2;   // página mostrada en el lado derecho
  var flipping = false;
  var cerrado = true;

  /* ======== DOM ======== */
  var bookClosedWrap, bookContainer;
  var pageLeftContent, sheetFlipper, sheetFrontContent, sheetBackContent;
  var flipShadowEl, ctrlPrev, ctrlNext, ctrlToc, ctrlZoom;
  var pageCounter, tocOverlay, tocList, sheetsStack;

  function cacheDom() {
    bookClosedWrap   = document.getElementById('bookClosedWrap');
    bookContainer    = document.getElementById('bookContainer');
    pageLeftContent  = document.getElementById('pageLeftContent');
    sheetFlipper     = document.getElementById('sheetFlipper');
    sheetFrontContent = document.getElementById('sheetFrontContent');
    sheetBackContent  = document.getElementById('sheetBackContent');
    flipShadowEl     = document.getElementById('flipShadow');
    ctrlPrev         = document.getElementById('ctrlPrev');
    ctrlNext         = document.getElementById('ctrlNext');
    ctrlToc          = document.getElementById('ctrlToc');
    ctrlZoom         = document.getElementById('ctrlZoom');
    pageCounter      = document.getElementById('pageCounter');
    tocOverlay       = document.getElementById('tocOverlay');
    tocList          = document.getElementById('tocList');
    sheetsStack      = document.getElementById('sheetsStack');
  }

  /* ======== UI ======== */
  function updateUI() {
    pageLeftContent.innerHTML = pages[currentPage - 1];
    sheetFrontContent.innerHTML = pages[currentPage];
    sheetBackContent.innerHTML = pages[currentPage + 1] || '';

    var num = currentPage / 2;
    pageCounter.textContent = num + ' / ' + (totalPaginas / 2);

    if (currentPage <= 2) ctrlPrev.classList.add('disabled');
    else ctrlPrev.classList.remove('disabled');

    if (currentPage >= totalPaginas) ctrlNext.classList.add('disabled');
    else ctrlNext.classList.remove('disabled');

    buildSheetStack();
  }

  function buildSheetStack() {
    sheetsStack.innerHTML = '';
    var remaining = (totalPaginas - currentPage) / 2;
    for (var i = 0; i < Math.min(remaining, 6); i++) {
      var edge = document.createElement('div');
      edge.className = 'sheet-edge';
      edge.style.transform = 'translateZ(' + (-0.5 * (i + 1)) + 'px) scale(0.995)';
      edge.style.zIndex = -(i + 1);
      sheetsStack.appendChild(edge);
    }
  }

  /* ======== ABRIR / CERRAR ======== */
  function abrir() {
    if (!cerrado) return;
    cerrado = false;

    bookClosedWrap.classList.add('hiding');

    setTimeout(function () {
      bookClosedWrap.style.display = 'none';
      currentPage = 2;
      updateUI();
      bookContainer.classList.add('visible');
    }, 650);
  }

  function cerrar() {
    if (cerrado) return;
    cerrado = true;

    bookContainer.classList.remove('visible');
    setTimeout(function () {
      bookClosedWrap.style.display = '';
      bookClosedWrap.classList.remove('hiding');
    }, 500);
  }

  /* ======== FLIP ======== */
  function animarFlip(forward) {
    flipShadowEl.classList.add('active');

    sheetFlipper.classList.add('flipped');

    setTimeout(function () {
      sheetFlipper.classList.remove('flipped');
      flipShadowEl.classList.remove('active');

      setTimeout(function () {
        updateUI();
        flipping = false;
      }, 80);
    }, 700);
  }

  function siguiente() {
    if (flipping || cerrado) return;
    if (currentPage >= totalPaginas) return;
    flipping = true;

    sheetBackContent.innerHTML = pages[currentPage + 1];
    sheetFrontContent.innerHTML = pages[currentPage + 2];
    pageLeftContent.innerHTML = pages[currentPage + 1];
    currentPage += 2;

    animarFlip(true);
  }

  function anterior() {
    if (flipping || cerrado) return;
    if (currentPage <= 2) return;
    flipping = true;

    sheetBackContent.innerHTML = pages[currentPage - 2];
    sheetFrontContent.innerHTML = pages[currentPage - 1];
    pageLeftContent.innerHTML = pages[currentPage - 3];
    currentPage -= 2;

    animarFlip(false);
  }

  function irAPagina(target) {
    if (flipping || cerrado) return;
    if (target < 2 || target > totalPaginas) return;
    if (target % 2 !== 0) return; // solo pares
    if (target === currentPage) return;

    flipping = true;
    var forward = target > currentPage;

    if (forward) {
      sheetBackContent.innerHTML = pages[target - 1];
      sheetFrontContent.innerHTML = pages[target];
      pageLeftContent.innerHTML = pages[target - 1];
    } else {
      sheetBackContent.innerHTML = pages[target];
      sheetFrontContent.innerHTML = pages[target];
      pageLeftContent.innerHTML = pages[target - 1];
    }

    currentPage = target;

    animarFlip(forward);
  }

  /* ======== TOC OVERLAY ======== */
  var tocOpen = false;

  function toggleTOC() {
    tocOpen = !tocOpen;
    if (tocOpen) {
      buildTOCList();
      tocOverlay.classList.add('open');
    } else {
      tocOverlay.classList.remove('open');
    }
  }

  function closeTOC() {
    tocOpen = false;
    tocOverlay.classList.remove('open');
  }

  function buildTOCList() {
    tocList.innerHTML = '';
    var items = [
      { page: 2, label: 'El día que te conocí' },
      { page: 4, label: 'Nuestra primera cita' },
      { page: 4, label: 'Lo que más me gusta de ti' },
      { page: 6, label: 'Momentos inolvidables' },
      { page: 6, label: 'Razones para amarte' },
      { page: 8, label: 'Mi carta para ti' }
    ];
    items.forEach(function (item, i) {
      var div = document.createElement('div');
      div.className = 'toc-item';
      div.innerHTML = '<span class="toc-num">' + (i + 1) + '</span>' + item.label;
      div.onclick = function () {
        closeTOC();
        irAPagina(item.page);
      };
      tocList.appendChild(div);
    });
  }

  /* ======== FULLSCREEN ======== */
  var fullscreen = false;
  function toggleFullscreen() {
    fullscreen = !fullscreen;
    var scene = document.getElementById('scene');
    if (fullscreen) {
      scene.classList.add('fullscreen');
      ctrlZoom.textContent = '⛶';
      ctrlZoom.title = 'Salir de pantalla completa';
    } else {
      scene.classList.remove('fullscreen');
      ctrlZoom.textContent = '⛶';
      ctrlZoom.title = 'Pantalla completa';
    }
  }

  /* ======== INIT ======== */
  cacheDom();
  updateUI();

  /* ======== EVENTOS ======== */
  document.getElementById('btnOpenBook').addEventListener('click', function (e) {
    e.stopPropagation();
    abrir();
  });

  bookClosedWrap.addEventListener('click', function () {
    abrir();
  });

  ctrlPrev.addEventListener('click', anterior);
  ctrlNext.addEventListener('click', siguiente);
  ctrlToc.addEventListener('click', toggleTOC);
  ctrlZoom.addEventListener('click', toggleFullscreen);
  document.getElementById('tocClose').addEventListener('click', closeTOC);

  tocOverlay.addEventListener('click', function (e) {
    if (e.target === tocOverlay) closeTOC();
  });

  document.addEventListener('keydown', function (e) {
    if (cerrado) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); abrir(); }
      return;
    }
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') { e.preventDefault(); siguiente(); }
    if (e.key === 'ArrowLeft' || e.key === 'ArrowUp')   { e.preventDefault(); anterior(); }
    if (e.key === 'Escape') {
      if (tocOpen) closeTOC();
      else if (fullscreen) toggleFullscreen();
    }
  });

  var touchX = 0, touchY = 0;
  document.addEventListener('touchstart', function (e) {
    touchX = e.touches[0].clientX;
    touchY = e.touches[0].clientY;
  }, { passive: true });

  document.addEventListener('touchend', function (e) {
    var dx = e.changedTouches[0].clientX - touchX;
    var dy = e.changedTouches[0].clientY - touchY;
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 50) {
      if (dx < 0) siguiente();
      else anterior();
    }
  });

  /* ======== API ======== */
  return {
    abrir: abrir,
    cerrar: cerrar,
    siguiente: siguiente,
    anterior: anterior,
    irAPagina: irAPagina,
    getCurrentPage: function () { return currentPage; },
    getTotalPaginas: function () { return totalPaginas; },
    getCerrado: function () { return cerrado; },
    getPages: function () { return pages; }
  };
})();
