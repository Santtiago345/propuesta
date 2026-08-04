(function () {
  'use strict';

  var pageFlip = null, pagesLen = 0;
  var pageLabels = [], tocItems = [];
  var ctrlPrev, ctrlNext, pageIndicator, tocOverlay;

  function $(id) { return document.getElementById(id); }

  function cacheDom() {
    ctrlPrev = $('ctrlPrev');
    ctrlNext = $('ctrlNext');
    pageIndicator = $('pageIndicator');
    tocOverlay = $('tocOverlay');
  }

  /* ======== TEXTO INTRODUCCION ======== */
  var introParagraphs = [
    'Antes del a\u00f1o 2025 pod\u00eda contar los libros que hab\u00eda le\u00eddo con dos manos \u2014tal vez tres si tuviese\u2014. Fuera de ensayos rutinarios de literatura estudiantil, un at\u00edpico libro de autoayuda o minilibros de recopilatorios de poemas, no mucho m\u00e1s. Le\u00eddo lo anterior s\u00e9 que en tu mente habr\u00e1 un peque\u00f1o y preocupante panorama a la espectativa de seguir leyendo o cerrar con aburrimiento lo que sea que sea esto y mi intento por darte \u00e1nimo a que sigas leyendo va acompa\u00f1ado de una promesa de amor genuino y si no confiamos en el amor como una fuerza transformadora y la revoluci\u00f3n ind\u00f3mita de nuestros tiempos, estaremos perdidos por la eternidad.',
    'No s\u00e9 c\u00f3mo se empieza a escribir un libro. No s\u00e9 si esto termine en un libro, en tu libro. \u00bfContando una historia? \u00bfO tal vez nuestra historia? \u00bfO ser\u00e1 tan clich\u00e9 hacerlo que solo tendr\u00eda que inventar algunos personajes y contar una historia dram\u00e1tica en forma de novela, as\u00ed vender\u00eda mil ejemplares y no solo el tuyo.',
    'Tengo una esperanza desmedida entre cada pared de mi caja tor\u00e1xica, dir\u00eda que la suficiente para distribuirla por el tiempo necesario para escribir un libro o al menos lo que recuerde de nuestra historia por si alg\u00fan historiador en 100 a\u00f1os quisiese estudiar sobre el amor m\u00e1s extraordinario pasado por esta tierra y a menos que describa con detalles milim\u00e9tricos lo bien que combinabas con los primeros lirios rosados que escog\u00ed para ti, a\u00fan nos falta historia para rellenar un libro gordito y en parte esta esperanza lleva en s\u00ed esa proyecci\u00f3n y sentimiento de quererte mucho tiempo para hacerlo y decirle a los ni\u00f1os que ese libro de lomo bonito en la biblioteca lo escrib\u00ed para su madre. As\u00ed que tal vez s\u00ed sepa c\u00f3mo, este libro comienza contigo.',
    'Resulta aterrador, \u00bfno? El concebir la idea de sentarte en una simple silla de un simple cuarto alrededor de unas simples casas e intentar escribir un incre\u00edble libro para la chica que le encantan los libros, aunque en este punto de los acontecimientos me resulta m\u00e1s aterrador no tener este porqu\u00e9 de hacer. \u00bfSabes cu\u00e1ntas palabras tiene un libro? Por ejemplo, una novela en promedio deber\u00eda contener aproximadamente entre 60.000 a 90.000 p\u00e1ginas, uno de ficci\u00f3n de 70.000 a 100.000, uno infantil de 50.000 a 70.000. En 2007 James Pennebaker en la revista Science public\u00f3 un art\u00edculo investigativo donde encontr\u00f3 que las mujeres dicen en promedio 16.200 palabras al d\u00eda mientras que los hombres un aproximado de 15.600, resultados esperables dado que participaron varias mujeres con hijos adolescentes, no solo porque las chicas hablen mucho (que suelen hacerlo). Haciendo un vago c\u00e1lculo, si mi vida fuese una constante novela podr\u00eda redactar todas mis palabras usadas a diario y escribir\u00eda una novela en una grandiosa cantidad de tiempo de 4.8 d\u00edas, a comparaci\u00f3n de los pocos 4.6 d\u00edas que le tomar\u00eda a una mujer, as\u00ed que si esto existe es resultado de un milagro porque s\u00ed que est\u00e1 siendo retador pensar de d\u00f3nde sacar 90.000 palabras.',
    'Este ser\u00e1 un peque\u00f1o o no tan peque\u00f1o viaje hacia ese lenguaje que estamos construyendo tan solo t\u00fa y yo, el que hablaremos, descubriremos y traduciremos a interesados en conocer lo que prolifera el amor en nuestras vidas y qu\u00e9 m\u00e1s regocijante que hacerlo mediante un libro contando la gran coincidencia que fue conocernos o lo que describir\u00e1 cada cap\u00edtulo como eje central, el paso a paso certero de mi coraz\u00f3n tejiendo una capa de ti, un recopilatorio a grandes rasgos de esas cosas que guardamos adentro y en un intento de no dejarlas morir las inmortalizo en tinta impresa o en este caso prematuro, algunos cuantos muchos p\u00edxeles organizados estrat\u00e9gicamente en una pantalla LCD con el brillo suficiente para transferirte madejas de sentimientos.',
    'El t\u00e9rmino \u201cintento\u201d proviene del lat\u00edn intentus, participio pasado del verbo intendere, que significa \u201ctender hacia\u201d o bien \u201cdirigir la atenci\u00f3n, esforzarse\u201d. En esencia es una direcci\u00f3n consciente de la atenci\u00f3n o la voluntad hacia un objetivo. Voluntariamente estoy someti\u00e9ndome a tomar direcci\u00f3n en escribir y como objetivo te contemplo presente, en un esfuerzo que prevalece desde las ganas de tocar con la punta de los dedos \u2014los mismos que est\u00e1n escribiendo\u2014',
    'Este es mi intento.'
  ];

  /* ======== CAPITULOS FIJOS ======== */
  var chapters = [
    { title: 'El d\u00eda que te conoc\u00ed', html:
      '<p>Recuerdo perfectamente ese momento. El universo conspir\u00f3 para que nuestros caminos se cruzaran, y desde ese instante supe que mi vida cambiar\u00eda para siempre.</p>' +
      '<p>Tu sonrisa ilumin\u00f3 todo a mi alrededor, y aunque no lo sab\u00edas, ya hab\u00edas robado completamente mi coraz\u00f3n.</p>' +
      '<p class="quote">\u201cA veces el amor llega sin avisar, como una brisa suave que se convierte en hurac\u00e1n.\u201d</p>' },
    { title: 'Nuestra primera cita', html:
      '<p>Los nervios, las mariposas en el est\u00f3mago, la emoci\u00f3n de verte llegar. Esa primera cita fue el comienzo de algo m\u00e1gico que ni yo mismo pod\u00eda creer.</p>' +
      '<p>Cada palabra que dijiste, cada risa que compartimos, se qued\u00f3 grabada en mi memoria como el d\u00eda m\u00e1s feliz de mi vida... hasta que lleg\u00f3 el siguiente a tu lado.</p>' +
      '<p class="quote">\u201cNo fue el lugar, ni la hora, ni el momento. Fuiste t\u00fa quien hizo que todo fuera perfecto.\u201d</p>' },
    { title: 'Lo que m\u00e1s me gusta de ti', html:
      '<p>Me encanta tu forma de ver el mundo, esa chispa que tienes en los ojos cuando algo te emociona, tu risa contagiosa que alegra hasta los d\u00edas m\u00e1s grises.</p>' +
      '<p>Admiro tu fortaleza, tu ternura, tu inteligencia y ese coraz\u00f3n tan grande que tienes.</p>' +
      '<p class="quote">\u201cEres el tipo de persona que hace que el mundo sea un lugar mejor solo con existir.\u201d</p>' },
    { title: 'Momentos inolvidables', html:
      '<p>Cada recuerdo contigo es un tesoro: las llamadas hasta tarde, los mensajes que me sacan una sonrisa, los planes que hacemos juntos y los sue\u00f1os que compartimos.</p>' +
      '<p>No existe un solo d\u00eda en el que no agradezca al destino por haberte puesto en mi camino. Eres mi lugar favorito en el mundo entero.</p>' +
      '<p class="quote">\u201cLos momentos m\u00e1s simples se vuelven extraordinarios cuando los vivo contigo.\u201d</p>' },
    { title: 'Razones para amarte', html:
      '<p>Podr\u00eda llenar mil libros con las razones por las que te amo, pero aqu\u00ed van solo algunas:</p>' +
      '<ul class="reasons"><li>Porque me haces ser mejor persona cada d\u00eda</li><li>Porque tu felicidad es mi felicidad</li><li>Porque contigo todo tiene sentido</li><li>Porque eres mi hogar, mi paz y mi alegr\u00eda</li><li>Porque simplemente eres t\u00fa</li></ul>' +
      '<p class="quote">\u201cTe amo no por lo que eres, sino por lo que soy yo cuando estoy contigo.\u201d</p>' },
    { title: 'Mi carta para ti', html:
      '<p>Querida Juanita,</p>' +
      '<p>Escribir esto me hace sentir el hombre m\u00e1s afortunado del mundo. Cada palabra que lees aqu\u00ed sale directamente de mi coraz\u00f3n, porque eso es lo que haces t\u00fa: sacar lo mejor de m\u00ed.</p>' +
      '<p>Gracias por cada sonrisa, por cada momento, por cada ense\u00f1anza. Eres y siempre ser\u00e1s la persona m\u00e1s importante en mi vida.</p>' +
      '<p class="signature">Con todo mi amor,<br>siempre tuyo</p>' }
  ];

  /* ======== PAGINADOR ======== */
  function crearPaginaPrueba(wrapper) {
    var r = wrapper.getBoundingClientRect();
    var tp = document.createElement('div');
    tp.className = 'book-page';
    tp.style.cssText = 'position:fixed;top:-9999px;left:-9999px;visibility:hidden;' +
      'width:' + (r.width / 2) + 'px;height:' + r.height + 'px;';
    tp.innerHTML =
      '<div class="page-hdr">' +
        '<span class="hdr-left">0</span>' +
        '<span class="hdr-center">X</span>' +
        '<span class="hdr-right">0</span>' +
      '</div>' +
      '<div class="page-content"></div>';
    document.body.appendChild(tp);
    return tp;
  }

  function makePage(title, body, pnum) {
    var d = document.createElement('div');
    d.className = 'book-page';
    d.innerHTML =
      '<div class="page-hdr">' +
        '<span class="hdr-left">' + pnum + '</span>' +
        '<span class="hdr-center">' + title + '</span>' +
        '<span class="hdr-right">' + pnum + '</span>' +
      '</div>' +
      '<div class="page-content">' + body + '</div>';
    return d;
  }

  function paginate(paragraphs, title, startNum) {
    var wrapper = $('bookWrapper');
    var tp = crearPaginaPrueba(wrapper);
    var contentEl = tp.querySelector('.page-content');

    var pages = [];
    var accHTML = '';   // HTML acumulado en la pagina de prueba
    var consumed = 0;   // cuantos parrafos completos se consumieron

    function overflow() {
      return contentEl.scrollHeight > contentEl.clientHeight;
    }

    // Ir añadiendo parrafos completos mientras quepan
    while (consumed < paragraphs.length) {
      var prev = accHTML;
      accHTML += '<p>' + paragraphs[consumed] + '</p>';
      contentEl.innerHTML = accHTML;
      consumed++;

      if (overflow()) {
        // El ultimo parrafo no cupo. Revertir y guardar pagina.
        consumed--;
        accHTML = prev;
        if (accHTML) {
          pages.push(makePage(title, accHTML, startNum + pages.length));
          accHTML = '';
          contentEl.innerHTML = '';
        }
        // Intentar llenar el resto de la pagina con palabras del parrafo problematico
        var words = paragraphs[consumed].split(' ');
        var part = '';
        for (var w = 0; w < words.length; w++) {
          var test = part ? part + ' ' + words[w] : words[w];
          contentEl.innerHTML = accHTML + '<p>' + test + '</p>';
          if (!overflow()) {
            part = test;
          } else {
            // Guardar lo que cupo, si hay algo
            if (part || accHTML) {
              pages.push(makePage(title, accHTML + (part ? '<p>' + part + '</p>' : ''), startNum + pages.length));
            }
            // Preparar siguiente pagina con lo que sobra del parrafo
            accHTML = '';
            contentEl.innerHTML = '<p>' + words.slice(w).join(' ') + '</p>';
            // Si aun asi no cabe en pagina vacia, seguir partiendo
            while (overflow()) {
              var ws2 = contentEl.textContent.split(' ');
              var partial = '';
              for (var w2 = 0; w2 < ws2.length; w2++) {
                var n2 = partial ? partial + ' ' + ws2[w2] : ws2[w2];
                contentEl.innerHTML = '<p>' + n2 + '</p>';
                if (overflow()) {
                  if (partial) pages.push(makePage(title, '<p>' + partial + '</p>', startNum + pages.length));
                  contentEl.innerHTML = '<p>' + ws2.slice(w2).join(' ') + '</p>';
                  partial = '';
                  break;
                } else {
                  partial = n2;
                }
              }
              if (partial && !overflow()) break;
            }
            consumed++;
            accHTML = contentEl.innerHTML;
            break;
          }
        }
        if (!overflow() && part) {
          // Todas las palabras del parrafo cupieron en el espacio restante
          accHTML += '<p>' + part + '</p>';
          // consumed ya fue incrementado antes del revert, falta uno mas?
          // consumed fue: incrementado, luego decrementado, ahora debe incrementarse de nuevo
          consumed++;
        }
      }
    }

    // Ultima pagina
    if (accHTML) {
      pages.push(makePage(title, accHTML, startNum + pages.length));
    }

    document.body.removeChild(tp);
    return pages;
  }

  /* ======== CONSTRUIR PAGINAS ======== */
  function buildAllPages() {
    var wrapper = $('bookWrapper');
    var existing = wrapper.querySelectorAll('.book-page');
    var backHTML = existing[existing.length - 1]; // la contraportada es la ultima

    // Paginas fijas: 0-9
    var fixedPages = [];
    for (var i = 0; i < existing.length - 1; i++) {
      fixedPages.push(existing[i]);
    }

    // Generar intro
    var introPages = paginate(introParagraphs, 'Introducci\u00f3n', 10);
    var introCount = introPages.length;

    // Generar capitulos
    var chapStart = 10 + introCount;
    var chapterPages = [];
    for (var c = 0; c < chapters.length; c++) {
      chapterPages.push(makePage(chapters[c].title, chapters[c].html, chapStart + c));
    }

    // Ensamblar en orden
    var allPages = fixedPages.concat(introPages, chapterPages, [backHTML]);
    var total = allPages.length;
    pagesLen = total;

    // Reconstruir wrapper
    while (wrapper.firstChild) wrapper.removeChild(wrapper.firstChild);
    for (var a = 0; a < allPages.length; a++) {
      wrapper.appendChild(allPages[a]);
    }

    // pageLabels
    pageLabels = [];
    for (var pi = 0; pi < total; pi++) {
      if (pi === 0) pageLabels.push('Portada');
      else if (pi >= 1 && pi <= 3) pageLabels.push('');
      else if (pi === 4) pageLabels.push('T\u00edtulo');
      else if (pi === 5) pageLabels.push('');
      else if (pi === 6) pageLabels.push('Agradecimientos');
      else if (pi === 7) pageLabels.push('');
      else if (pi === 8) pageLabels.push('\u00cdndice');
      else if (pi === 9) pageLabels.push('');
      else if (pi >= 10 && pi < 10 + introCount) pageLabels.push('Introducci\u00f3n');
      else if (pi >= 10 + introCount && pi < total - 1)
        pageLabels.push(chapters[pi - 10 - introCount].title);
      else if (pi === total - 1) pageLabels.push('Contraportada');
      else pageLabels.push('');
    }

    // TOC
    tocItems = [{ page: 10, label: 'Introducci\u00f3n' }];
    for (var ci = 0; ci < chapters.length; ci++) {
      tocItems.push({ page: chapStart + ci, label: chapters[ci].title });
    }
  }

  /* ======== BUILD TOC ELEMENTS ======== */
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
        p.innerHTML = '<span class="toc-label">' + item.label +
          ' <span style="color:#ccc;font-size:0.6rem;">..................................................</span></span>' +
          '<span class="toc-num">' + item.page + '</span>';
        p.addEventListener('click', function () { goTo(item.page); });
        pgProf.appendChild(p);
      }
    });
  }

  /* ======== CONTROLES ======== */
  function goTo(p) { if (pageFlip) pageFlip.flip(p, 'bottom'); }

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

  /* ======== STPAGEFLIP ======== */
  function createFlipbook() {
    var wrapper = $('bookWrapper');
    var pageEls = wrapper.querySelectorAll('.book-page');

    pageFlip = new St.PageFlip(wrapper, {
      width: 520, height: 860,
      size: 'stretch',
      minWidth: 280, minHeight: 420,
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
    setTimeout(function () { $('loader').classList.add('done'); }, 400);
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

  /* ======== INIT ======== */
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

  requestAnimationFrame(function () {
    requestAnimationFrame(function () {
      buildAllPages();
      buildTocElements();
      waitForLib(function () { createFlipbook(); setupEvents(); });
    });
  });

  window.Flipbook = {
    getCurrentPage: function () { return pageFlip ? pageFlip.getCurrentPageIndex() : -1; },
    getTotalPages: function () { return pagesLen; },
    flipNext: function () { if (pageFlip) pageFlip.flipNext('bottom'); },
    flipPrev: function () { if (pageFlip) pageFlip.flipPrev('bottom'); },
    goToPage: function (n) { if (pageFlip) pageFlip.flip(n, 'bottom'); },
    isReady: function () { return pageFlip !== null; }
  };
})();
