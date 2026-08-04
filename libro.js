(function () {
  'use strict';

  var pageFlip = null, pagesLen = 0;

  var pageLabels = [
    'Portada', 'Índice',
    'El día que te conocí', 'Nuestra primera cita',
    'Lo que más me gusta de ti', 'Momentos inolvidables',
    'Razones para amarte', 'Mi carta para ti', 'Contraportada'
  ];

  var ctrlPrev, ctrlNext, ctrlToc, pageIndicator, tocOverlay, hintOverlay;

  function $(id) { return document.getElementById(id); }

  function cacheDom() {
    ctrlPrev      = $('ctrlPrev');
    ctrlNext      = $('ctrlNext');
    ctrlToc       = $('ctrlToc');
    pageIndicator = $('pageIndicator');
    tocOverlay    = $('tocOverlay');
    hintOverlay   = $('hintOverlay');
  }

  /* ─── TOC PANEL ─── */
  var tocItems = [
    { page: 2, label: 'El día que te conocí' },
    { page: 3, label: 'Nuestra primera cita' },
    { page: 4, label: 'Lo que más me gusta de ti' },
    { page: 5, label: 'Momentos inolvidables' },
    { page: 6, label: 'Razones para amarte' },
    { page: 7, label: 'Mi carta para ti' }
  ];

  function buildTocPanel() {
    var body = $('tocBody'), html = '';
    tocItems.forEach(function (item, i) {
      html += '<div class="toc-item" data-p="' + item.page + '">' +
        '<span class="idx-badge">' + (i + 1) + '</span>' + item.label + '</div>';
    });
    body.innerHTML = html;
    body.querySelectorAll('.toc-item').forEach(function (el) {
      el.addEventListener('click', function () {
        closeToc();
        if (pageFlip) pageFlip.flip(parseInt(el.getAttribute('data-p')), 'bottom');
      });
    });
  }

  /* ─── INDEX PAGE CLICKS ─── */
  function setupIndexClicks() {
    setTimeout(function () {
      document.querySelectorAll('.index-list li').forEach(function (li) {
        li.addEventListener('click', function (e) {
          e.stopPropagation();
          var p = parseInt(li.getAttribute('data-page'), 10);
          if (!isNaN(p) && pageFlip) pageFlip.flip(p, 'bottom');
        });
      });
    }, 600);
  }

  /* ─── UI ─── */
  function updateControls() {
    if (!pageFlip) return;
    var idx = pageFlip.getCurrentPageIndex();
    var total = pageFlip.getPageCount();
    var label = pageLabels[idx] || '';
    pageIndicator.textContent = label + '  (' + (idx + 1) + ' / ' + total + ')';
    ctrlPrev.classList.toggle('disabled', idx <= 0);
    ctrlNext.classList.toggle('disabled', idx >= total - 1);
  }

  function hideHint() {
    hintOverlay.classList.add('faded');
    setTimeout(function () { hintOverlay.style.display = 'none'; }, 1500);
  }

  function openToc() { tocOverlay.classList.add('open'); }
  function closeToc() { tocOverlay.classList.remove('open'); }

  /* ─── CREATE ─── */
  function createFlipbook() {
    var wrapper = $('bookWrapper');
    var pageEls = wrapper.querySelectorAll('.book-page');

    pageFlip = new St.PageFlip(wrapper, {
      width: 600,
      height: 780,
      size: 'stretch',
      minWidth: 320,
      minHeight: 420,
      maxWidth: 1400,
      maxHeight: 1000,
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

    pageFlip.on('flip', function () { updateControls(); hideHint(); });
    pageFlip.on('changeOrientation', function () { updateControls(); });
    pageFlip.on('changeState', function (e) {
      if (e.data === 'user_fold' || e.data === 'flipping') hideHint();
    });

    updateControls();
    setupIndexClicks();
    setTimeout(function () { $('loader').classList.add('done'); }, 300);
  }

  /* ─── EVENTS ─── */
  function setupEvents() {
    ctrlPrev.addEventListener('click', function () {
      if (pageFlip) { pageFlip.flipPrev('bottom'); hideHint(); }
    });
    ctrlNext.addEventListener('click', function () {
      if (pageFlip) { pageFlip.flipNext('bottom'); hideHint(); }
    });
    ctrlToc.addEventListener('click', openToc);
    $('tocClose').addEventListener('click', closeToc);

    tocOverlay.addEventListener('click', function (e) {
      if (e.target === tocOverlay) closeToc();
    });

    document.addEventListener('keydown', function (e) {
      if (!pageFlip) return;
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault(); pageFlip.flipNext('bottom'); hideHint();
      }
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault(); pageFlip.flipPrev('bottom'); hideHint();
      }
      if (e.key === 'Escape' && tocOverlay.classList.contains('open')) closeToc();
    });

    $('bookWrapper').addEventListener('click', hideHint);
  }

  /* ─── INIT ─── */
  function waitForLib(cb) {
    if (typeof St !== 'undefined' && St.PageFlip) { cb(); return; }
    var n = 0;
    var t = setInterval(function () {
      n++;
      if (typeof St !== 'undefined' && St.PageFlip) { clearInterval(t); cb(); }
      else if (n > 120) { clearInterval(t); $('loader').textContent = 'Error al cargar.'; }
    }, 100);
  }

  cacheDom();
  buildTocPanel();

  waitForLib(function () {
    createFlipbook();
    setupEvents();
  });

  /* ─── API ─── */
  window.Flipbook = {
    getCurrentPage: function () { return pageFlip ? pageFlip.getCurrentPageIndex() : -1; },
    getTotalPages: function () { return pagesLen; },
    flipNext: function () { if (pageFlip) pageFlip.flipNext('bottom'); },
    flipPrev: function () { if (pageFlip) pageFlip.flipPrev('bottom'); },
    goToPage: function (n) { if (pageFlip) pageFlip.flip(n, 'bottom'); },
    isReady: function () { return pageFlip !== null; }
  };
})();
