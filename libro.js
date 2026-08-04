(function () {
  'use strict';

  /* ======== WAIT FOR LIBRARY ======== */
  function waitForLib(cb) {
    if (typeof St !== 'undefined' && St.PageFlip) { cb(); return; }
    var n = 0;
    var t = setInterval(function () {
      n++;
      if (typeof St !== 'undefined' && St.PageFlip) {
        clearInterval(t); cb();
      } else if (n > 100) {
        clearInterval(t);
        document.getElementById('loader').textContent =
          'Error: No se pudo cargar el libro. Verifica tu conexión.';
      }
    }, 80);
  }

  /* ======== INIT ======== */
  var pageFlip = null;
  var pagesLen = 0;
  var pageLabels = [
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

  var ctrlPrev, ctrlNext, ctrlToc, ctrlFs, pageIndicator;
  var tocOverlay, hintOverlay, loader;

  function cacheDom() {
    ctrlPrev      = document.getElementById('ctrlPrev');
    ctrlNext      = document.getElementById('ctrlNext');
    ctrlToc       = document.getElementById('ctrlToc');
    ctrlFs        = document.getElementById('ctrlFs');
    pageIndicator = document.getElementById('pageIndicator');
    tocOverlay    = document.getElementById('tocOverlay');
    hintOverlay   = document.getElementById('hintOverlay');
    loader        = document.getElementById('loader');
  }

  /* ======== TOC PANEL ======== */
  var tocItems = [
    { page: 2, label: 'El día que te conocí' },
    { page: 3, label: 'Nuestra primera cita' },
    { page: 4, label: 'Lo que más me gusta de ti' },
    { page: 5, label: 'Momentos inolvidables' },
    { page: 6, label: 'Razones para amarte' },
    { page: 7, label: 'Mi carta para ti' }
  ];

  function buildTocPanel() {
    var body = document.getElementById('tocBody');
    body.innerHTML = '';
    tocItems.forEach(function (item, i) {
      var div = document.createElement('div');
      div.className = 'toc-item';
      div.innerHTML =
        '<span class="idx-badge">' + (i + 1) + '</span>' + item.label;
      div.addEventListener('click', function () {
        closeToc();
        if (pageFlip) {
          pageFlip.flip(item.page, 'bottom');
        }
      });
      body.appendChild(div);
    });
  }

  /* ======== INDEX PAGE CLICKS ======== */
  function setupIndexClicks() {
    setTimeout(function () {
      var items = document.querySelectorAll('.index-list li');
      items.forEach(function (li) {
        li.addEventListener('click', function (e) {
          e.stopPropagation();
          var p = parseInt(li.getAttribute('data-page'), 10);
          if (!isNaN(p) && pageFlip) {
            pageFlip.flip(p, 'bottom');
          }
        });
      });
    }, 600);
  }

  /* ======== UPDATE UI ======== */
  function updateControls() {
    if (!pageFlip) return;
    var idx = pageFlip.getCurrentPageIndex();
    var total = pageFlip.getPageCount();

    pageIndicator.textContent = (idx + 1) + ' / ' + total +
      ' — ' + (pageLabels[idx] || '');

    if (idx <= 0) ctrlPrev.classList.add('disabled');
    else ctrlPrev.classList.remove('disabled');

    if (idx >= total - 1) ctrlNext.classList.add('disabled');
    else ctrlNext.classList.remove('disabled');
  }

  /* ======== HINT ======== */
  function hideHint() {
    hintOverlay.classList.add('faded');
    setTimeout(function () { hintOverlay.style.display = 'none'; }, 1500);
  }

  /* ======== TOC TOGGLE ======== */
  function openToc() { tocOverlay.classList.add('open'); }
  function closeToc() { tocOverlay.classList.remove('open'); }

  /* ======== FULLSCREEN ======== */
  var fsOn = false;
  function toggleFullscreen() {
    fsOn = !fsOn;
    var scene = document.getElementById('scene');
    if (fsOn) {
      scene.classList.add('fullscreen');
    } else {
      scene.classList.remove('fullscreen');
    }
    if (pageFlip) {
      setTimeout(function () { pageFlip.update(); }, 100);
    }
  }

  /* ======== CREATE FLIPBOOK ======== */
  function createFlipbook() {
    var wrapper = document.getElementById('bookWrapper');
    var pageEls = wrapper.querySelectorAll('.book-page');
    pagesLen = pageEls.length;

    pageFlip = new St.PageFlip(wrapper, {
      width: 520,
      height: 680,
      size: 'stretch',
      minWidth: 280,
      minHeight: 340,
      maxWidth: 1100,
      maxHeight: 800,
      showCover: true,
      drawShadow: true,
      flippingTime: 800,
      usePortrait: true,
      startZIndex: 0,
      autoSize: true,
      maxShadowOpacity: 1,
      mobileScrollSupport: true
    });

    pageFlip.loadFromHTML(pageEls);

    pagesLen = pageFlip.getPageCount();

    /* Evento: cambio de página */
    pageFlip.on('flip', function () {
      updateControls();
      hideHint();
    });

    /* Evento: cambio de orientación */
    pageFlip.on('changeOrientation', function () {
      updateControls();
    });

    /* Evento: cambio de estado */
    pageFlip.on('changeState', function (e) {
      if (e.data === 'user_fold' || e.data === 'flipping') {
        hideHint();
      }
    });

    updateControls();
    setupIndexClicks();

    /* Ocultar loader */
    setTimeout(function () {
      loader.classList.add('done');
    }, 300);
  }

  /* ======== EVENT LISTENERS ======== */
  function setupEvents() {
    ctrlPrev.addEventListener('click', function () {
      if (pageFlip) { pageFlip.flipPrev('bottom'); hideHint(); }
    });
    ctrlNext.addEventListener('click', function () {
      if (pageFlip) { pageFlip.flipNext('bottom'); hideHint(); }
    });
    ctrlToc.addEventListener('click', openToc);
    ctrlFs.addEventListener('click', toggleFullscreen);
    document.getElementById('tocClose').addEventListener('click', closeToc);

    tocOverlay.addEventListener('click', function (e) {
      if (e.target === tocOverlay) closeToc();
    });

    /* Teclado */
    document.addEventListener('keydown', function (e) {
      if (!pageFlip) return;
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault(); pageFlip.flipNext('bottom'); hideHint();
      }
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault(); pageFlip.flipPrev('bottom'); hideHint();
      }
      if (e.key === 'Escape') {
        if (tocOverlay.classList.contains('open')) closeToc();
        else if (fsOn) toggleFullscreen();
      }
    });

    /* Clic en el libro también oculta el hint */
    document.getElementById('bookWrapper').addEventListener('click', function () {
      hideHint();
    });
  }

  /* ======== START ======== */
  cacheDom();
  buildTocPanel();

  waitForLib(function () {
    createFlipbook();
    setupEvents();
  });

  /* ======== EXPOSE API FOR TESTS ======== */
  window.Flipbook = {
    getCurrentPage: function () {
      return pageFlip ? pageFlip.getCurrentPageIndex() : -1;
    },
    getTotalPages: function () {
      return pagesLen;
    },
    flipNext: function () {
      if (pageFlip) pageFlip.flipNext('bottom');
    },
    flipPrev: function () {
      if (pageFlip) pageFlip.flipPrev('bottom');
    },
    goToPage: function (n) {
      if (pageFlip) pageFlip.flip(n, 'bottom');
    },
    isReady: function () {
      return pageFlip !== null;
    }
  };
})();
