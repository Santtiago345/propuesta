(function () {
  'use strict';

  var pageFlip = null, pagesLen = 0;

  var pageLabels = [
    'Portada',           // 0
    '',                  // 1
    '',                  // 2
    '',                  // 3
    'Titulo',            // 4
    '',                  // 5
    'Agradecimientos',   // 6
    '',                  // 7
    'Indice',            // 8
    '',                  // 9
    'Introduccion',      // 10
    'Introduccion',      // 11
    'Introduccion',      // 12
    'Introduccion',      // 13
    'El dia que te conoci',       // 14
    'Nuestra primera cita',       // 15
    'Lo que mas me gusta de ti',  // 16
    'Momentos inolvidables',      // 17
    'Razones para amarte',        // 18
    'Mi carta para ti',           // 19
    'Contraportada'               // 20
  ];

  var tocItems = [
    { page: 10, label: 'Introduccion' },
    { page: 14, label: 'El dia que te conoci' },
    { page: 15, label: 'Nuestra primera cita' },
    { page: 16, label: 'Lo que mas me gusta de ti' },
    { page: 17, label: 'Momentos inolvidables' },
    { page: 18, label: 'Razones para amarte' },
    { page: 19, label: 'Mi carta para ti' }
  ];

  var ctrlPrev, ctrlNext, pageIndicator, tocOverlay;

  function $(id) { return document.getElementById(id); }

  function cacheDom() {
    ctrlPrev      = $('ctrlPrev');
    ctrlNext      = $('ctrlNext');
    pageIndicator = $('pageIndicator');
    tocOverlay    = $('tocOverlay');
  }

  function goTo(p) { if (pageFlip) pageFlip.flip(p, 'bottom'); }

  function buildTocElements() {
    var pgBody = $('tocBody');
    var pgProf = $('tocProfesional');

    tocItems.forEach(function (item) {
      if (pgBody) {
        var r = document.createElement('div');
        r.className = 'toc-row';
        r.innerHTML = '<span class="toc-label">' + item.label + '</span><span class="toc-num">' + item.page + '</span>';
        r.addEventListener('click', function () { closeToc(); goTo(item.page); });
        pgBody.appendChild(r);
      }
      if (pgProf) {
        var p = document.createElement('div');
        p.className = 'toc-row';
        p.innerHTML = '<span class="toc-label">' + item.label + ' <span style="color:#ccc;font-size:0.6rem;">..................................................</span></span><span class="toc-num">' + item.page + '</span>';
        p.addEventListener('click', function () { goTo(item.page); });
        pgProf.appendChild(p);
      }
    });
  }

  function updateControls() {
    if (!pageFlip) return;
    var idx = pageFlip.getCurrentPageIndex();
    var total = pageFlip.getPageCount();
    var label = pageLabels[idx] || '';
    pageIndicator.textContent = (label ? label + '  |  ' : '') + (idx + 1) + ' / ' + total;
    ctrlPrev.classList.toggle('disabled', idx <= 0);
    ctrlNext.classList.toggle('disabled', idx >= total - 1);
  }

  function openToc() { tocOverlay.classList.add('open'); }
  function closeToc() { tocOverlay.classList.remove('open'); }

  function createFlipbook() {
    var wrapper = $('bookWrapper');
    var pageEls = wrapper.querySelectorAll('.book-page');

    pageFlip = new St.PageFlip(wrapper, {
      width: 600, height: 780,
      size: 'stretch',
      minWidth: 300, minHeight: 400,
      maxWidth: 2000, maxHeight: 2000,
      showCover: true,
      drawShadow: true,
      flippingTime: 800,
      usePortrait: true,
      startZIndex: 0,
      autoSize: false,
      maxShadowOpacity: 1,
      mobileScrollSupport: true
    });

    pageFlip.loadFromHTML(pageEls);
    pagesLen = pageFlip.getPageCount();

    pageFlip.on('flip', updateControls);
    pageFlip.on('changeOrientation', updateControls);
    updateControls();
    setTimeout(function () { $('loader').classList.add('done'); }, 300);
  }

  function setupEvents() {
    ctrlPrev.addEventListener('click', function () { if (pageFlip) pageFlip.flipPrev('bottom'); });
    ctrlNext.addEventListener('click', function () { if (pageFlip) pageFlip.flipNext('bottom'); });
    $('ctrlToc').addEventListener('click', openToc);
    $('tocClose').addEventListener('click', closeToc);
    tocOverlay.addEventListener('click', function (e) { if (e.target === tocOverlay) closeToc(); });
    document.addEventListener('keydown', function (e) {
      if (!pageFlip) return;
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') { e.preventDefault(); pageFlip.flipNext('bottom'); }
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') { e.preventDefault(); pageFlip.flipPrev('bottom'); }
      if (e.key === 'Escape' && tocOverlay.classList.contains('open')) closeToc();
    });
  }

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
  buildTocElements();

  waitForLib(function () { createFlipbook(); setupEvents(); });

  window.Flipbook = {
    getCurrentPage: function () { return pageFlip ? pageFlip.getCurrentPageIndex() : -1; },
    getTotalPages: function () { return pagesLen; },
    flipNext: function () { if (pageFlip) pageFlip.flipNext('bottom'); },
    flipPrev: function () { if (pageFlip) pageFlip.flipPrev('bottom'); },
    goToPage: function (n) { if (pageFlip) pageFlip.flip(n, 'bottom'); },
    isReady: function () { return pageFlip !== null; }
  };
})();
