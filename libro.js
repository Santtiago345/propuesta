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

  /* ======== TEXTO DE LA INTRODUCCION ======== */
  var introRaw = [
    'Antes del año 2025 podia contar los libros que habia leido con dos manos —tal vez tres si tuviese—. Fuera de ensayos rutinarios de literatura estudiantil, un atipico libro de autoayuda o minilibros de recopilatorios de poemas, no mucho mas. Leido lo anterior se que en tu mente habra un pequeño y preocupante panorama a la espectativa de seguir leyendo o cerrar con aburrimiento lo que sea que sea esto y mi intento por darte animo a que sigas leyendo va acompañado de una promesa de amor genuino y si no confiamos en el amor como una fuerza transformadora y la revolucion indomita de nuestros tiempos, estaremos perdidos por la eternidad.',
    'No se como se empieza a escribir un libro. No se si esto termine en un libro, en tu libro. Contando una historia? O tal vez nuestra historia? O sera tan cliche hacerlo que solo tendria que inventar algunos personajes y contar una historia dramatica en forma de novela, asi venderia mil ejemplares y no solo el tuyo.',
    'Tengo una esperanza desmedida entre cada pared de mi caja toraxica, diria que la suficiente para distribuirla por el tiempo necesario para escribir un libro o al menos lo que recuerde de nuestra historia por si algun historiador en 100 años quisiese estudiar sobre el amor mas extraordinario pasado por esta tierra y a menos que describa con detalles milimetricos lo bien que combinabas con los primeros lirios rosados que escogi para ti, aun nos falta historia para rellenar un libro gordito y en parte esta esperanza lleva en si esa proyeccion y sentimiento de quererte mucho tiempo para hacerlo y decirle a los niños que ese libro de lomo bonito en la biblioteca lo escribi para su madre. Asi que tal vez si sepa como, este libro comienza contigo.',
    'Resulta aterrador, no? El concebir la idea de sentarte en una simple silla de un simple cuarto al rededor de unas simples casas e intentar escribir un increible libro para la chica que le encantan los libros, aunque en este punto de los acontecimientos me resulta mas aterrador no tener este porque de hacer. Sabes cuantas palabras tiene un libro? Por ejemplo, una novela en promedio deberia contener aproximadamente entre 60.000 a 90.000 paginas, uno de ficcion de 70.000 a 100.000, uno infantil de 50.000 a 70.000. En 2007 James Pennebaker en la revista Science publico un articulo investigativo donde encontro que las mujeres dicen en promedio 16.200 palabras al dia mientras que los hombres un aproximado de 15.600, resultados esperables dado que participaron varias mujeres con hijos adolescentes, no solo porque las chicas hablen mucho (que suelen hacerlo). Haciendo un vago calculo, si mi vida fuese una constante novela podria redactar todas mis palabras usadas a diario y escribiria una novela en una grandiosa cantidad de tiempo de 4.8 dias, a comparacion de los pocos 4.6 dias que le tomaria a una mujer, asi que si esto existe es resultado de un milagro porque si que esta siendo retador pensar de donde sacar 90.000 palabras.',
    'Este sera un pequeño o no tan pequeño viaje hacia ese lenguaje que estamos construyendo tan solo tu y yo, el que hablaremos, descubriremos y traduciremos a interesados en conocer lo que prolifera el amor en nuestras vidas y que mas regocijante que hacerlo mediante un libro contando la gran coincidencia que fue conocernos o lo que describira cada capitulo como eje central, el paso a paso certero de mi corazon tejiendo una capa de ti, un recopilatorio a grandes rasgos de esas cosas que guardamos adentro y en un intento de no dejarlas morir las inmortalizo en tinta impresa o en este caso prematuro, algunos cuantos muchos pixeles organizados estrategicamente en una pantalla lcd con el brillo suficiente para transferirte madejas de sentimientos.',
    'El termino "intento" proviene del latin intentus, participio pasado del verbo intendere, que significa "tender hacia" o bien "dirigir la atencion, esforzarse". En esencia es una direccion consciente de la atencion o la voluntad hacia un objetivo. Voluntariamente estoy sometiendome a tomar direccion en escribir y como objetivo te contemplo presente, en un esfuerzo que prevalece desde las ganas de tocar con la punta de los dedos —los mismos que estan escribiendo—',
    'Este es mi intento.'
  ];

  /* ======== CAPITULOS FIJOS ======== */
  var fixedChapters = [
    { title: 'El dia que te conoci', html:
      '<p>Recuerdo perfectamente ese momento. El universo conspiro para que nuestros caminos se cruzaran, y desde ese instante supe que mi vida cambiaria para siempre.</p>' +
      '<p>Tu sonrisa ilumino todo a mi alrededor, y aunque no lo sabias, ya habias robado completamente mi corazon.</p>' +
      '<p class="quote">"A veces el amor llega sin avisar, como una brisa suave que se convierte en huracan."</p>' },
    { title: 'Nuestra primera cita', html:
      '<p>Los nervios, las mariposas en el estomago, la emocion de verte llegar. Esa primera cita fue el comienzo de algo magico que ni yo mismo podia creer.</p>' +
      '<p>Cada palabra que dijiste, cada risa que compartimos, se quedo grabada en mi memoria como el dia mas feliz de mi vida... hasta que llego el siguiente a tu lado.</p>' +
      '<p class="quote">"No fue el lugar, ni la hora, ni el momento. Fuiste tu quien hizo que todo fuera perfecto."</p>' },
    { title: 'Lo que mas me gusta de ti', html:
      '<p>Me encanta tu forma de ver el mundo, esa chispa que tienes en los ojos cuando algo te emociona, tu risa contagiosa que alegra hasta los dias mas grises.</p>' +
      '<p>Admiro tu fortaleza, tu ternura, tu inteligencia y ese corazon tan grande que tienes.</p>' +
      '<p class="quote">"Eres el tipo de persona que hace que el mundo sea un lugar mejor solo con existir."</p>' },
    { title: 'Momentos inolvidables', html:
      '<p>Cada recuerdo contigo es un tesoro: las llamadas hasta tarde, los mensajes que me sacan una sonrisa, los planes que hacemos juntos y los sueños que compartimos.</p>' +
      '<p>No existe un solo dia en el que no agradezca al destino por haberte puesto en mi camino. Eres mi lugar favorito en el mundo entero.</p>' +
      '<p class="quote">"Los momentos mas simples se vuelven extraordinarios cuando los vivo contigo."</p>' },
    { title: 'Razones para amarte', html:
      '<p>Podria llenar mil libros con las razones por las que te amo, pero aqui van solo algunas:</p>' +
      '<ul class="reasons"><li>Porque me haces ser mejor persona cada dia</li><li>Porque tu felicidad es mi felicidad</li><li>Porque contigo todo tiene sentido</li><li>Porque eres mi hogar, mi paz y mi alegria</li><li>Porque simplemente eres tu</li></ul>' +
      '<p class="quote">"Te amo no por lo que eres, sino por lo que soy yo cuando estoy contigo."</p>' },
    { title: 'Mi carta para ti', html:
      '<p>Querida Juanita,</p>' +
      '<p>Escribir esto me hace sentir el hombre mas afortunado del mundo. Cada palabra que lees aqui sale directamente de mi corazon, porque eso es lo que haces tu: sacar lo mejor de mi.</p>' +
      '<p>Gracias por cada sonrisa, por cada momento, por cada enseñanza. Eres y siempre seras la persona mas importante en mi vida.</p>' +
      '<p class="signature">Con todo mi amor,<br>siempre tuyo</p>' }
  ];

  /* ======== PAGINADOR DINAMICO ======== */
  function medir() {
    var w = $('bookWrapper');
    var r = w.getBoundingClientRect();
    var pageW = r.width / 2;
    var pageH = r.height;
    if (pageW < 100) { pageW = 250; pageH = 550; }
    var usableW = pageW * 0.78;
    var usableH = pageH - 60;
    return { w: Math.floor(usableW), h: Math.floor(usableH) };
  }

  function hacerPagina(headTitle, bodyHTML, pageNum) {
    var div = document.createElement('div');
    div.className = 'book-page';
    div.innerHTML =
      '<div class="page-hdr">' +
        '<span class="hdr-left">' + pageNum + '</span>' +
        '<span class="hdr-center">' + headTitle + '</span>' +
        '<span class="hdr-right">' + pageNum + '</span>' +
      '</div>' +
      '<div class="page-content">' + bodyHTML + '</div>';
    return div;
  }

  function paginarTexto(parrafos, chapTitle, startPageNum) {
    var dims = medir();
    var pageW = dims.w;
    var pageH = dims.h;
    // Header usa ~3rem (~48px), padding es ~8% bottom + 0 top + sides 10%
    // Area util aproximada
    var usableW = pageW * 0.8; // 10% padding cada lado
    var usableH = pageH - 55;  // ~3.5rem header

    // Crear medidor oculto
    var meas = document.createElement('div');
    meas.style.cssText =
      'position:fixed;top:-9999px;left:-9999px;visibility:hidden;width:' + usableW + 'px;' +
      'font-family:Georgia,"Times New Roman",serif;' +
      'font-size:0.9rem;line-height:1.65;' +
      'word-wrap:break-word;overflow-wrap:break-word;';
    document.body.appendChild(meas);

    var pages = [];
    var currentHTML = '';
    var currentParaIdx = 0;

    while (currentParaIdx < parrafos.length) {
      var testHTML = currentHTML;
      if (testHTML) testHTML += ' ';
      testHTML += '<p>' + parrafos[currentParaIdx] + '</p>';

      meas.innerHTML = testHTML;
      var overflow = meas.scrollHeight > usableH;

      if (!overflow) {
        // Cabe, añadir
        currentHTML = testHTML;
        currentParaIdx++;
      } else if (!currentHTML) {
        // El parrafo solo no cabe: partirlo por palabras
        var words = parrafos[currentParaIdx].split(' ');
        var partial = '';
        for (var w = 0; w < words.length; w++) {
          var next = partial ? partial + ' ' + words[w] : words[w];
          meas.innerHTML = '<p>' + next + '</p>';
          if (meas.scrollHeight > usableH) {
            // Hacer pagina con lo que llevamos
            pages.push({ html: '<p>' + partial + '</p>' });
            partial = words[w];
          } else {
            partial = next;
          }
        }
        // Lo que sobro del parrafo sigue en la siguiente pagina
        if (partial) {
          parrafos[currentParaIdx] = partial;
        } else {
          currentParaIdx++;
        }
        currentHTML = '';
      } else {
        // La pagina actual esta llena, guardarla y empezar nueva
        pages.push({ html: currentHTML });
        currentHTML = '';
      }
    }

    // Ultima pagina
    if (currentHTML) {
      pages.push({ html: currentHTML });
    }

    document.body.removeChild(meas);

    // Convertir a elementos DOM
    var result = [];
    for (var p = 0; p < pages.length; p++) {
      result.push(hacerPagina(chapTitle, pages[p].html, startPageNum + p));
    }
    return result;
  }

  /* ======== CONSTRUIR LIBRO ======== */
  function buildAllPages() {
    var wrapper = $('bookWrapper');
    var backCover = $('backCoverPage');

    // Generar paginas de introduccion
    var introPages = paginarTexto(introRaw, 'Introduccion', 10);
    var introCount = introPages.length;

    // Insertar cada pagina de intro antes de la contraportada
    for (var i = introPages.length - 1; i >= 0; i--) {
      wrapper.insertBefore(introPages[i], backCover);
    }

    // Paginas de capitulos fijos
    var chapStart = 10 + introCount;
    for (var c = 0; c < fixedChapters.length; c++) {
      var ch = fixedChapters[c];
      var pg = hacerPagina(ch.title, ch.html, chapStart + c);
      wrapper.insertBefore(pg, backCover);
    }

    // Total de paginas: 0-9 (10 staticas) + introCount + fixedChapters.length + 1 (back cover)
    var total = 10 + introCount + fixedChapters.length + 1;
    pagesLen = total;

    // Construir pageLabels
    pageLabels = [];
    for (var idx = 0; idx < total; idx++) {
      if (idx === 0) pageLabels.push('Portada');
      else if (idx >= 1 && idx <= 3) pageLabels.push('');
      else if (idx === 4) pageLabels.push('Titulo');
      else if (idx === 5) pageLabels.push('');
      else if (idx === 6) pageLabels.push('Agradecimientos');
      else if (idx === 7) pageLabels.push('');
      else if (idx === 8) pageLabels.push('Indice');
      else if (idx === 9) pageLabels.push('');
      else if (idx >= 10 && idx < 10 + introCount) pageLabels.push('Introduccion');
      else if (idx >= 10 + introCount && idx < 10 + introCount + fixedChapters.length)
        pageLabels.push(fixedChapters[idx - 10 - introCount].title);
      else if (idx === total - 1) pageLabels.push('Contraportada');
      else pageLabels.push('');
    }

    // Construir TOC
    tocItems = [
      { page: 10, label: 'Introduccion' }
    ];
    var cBase = 10 + introCount;
    for (var ci = 0; ci < fixedChapters.length; ci++) {
      tocItems.push({ page: cBase + ci, label: fixedChapters[ci].title });
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
      width: 500, height: 820,
      size: 'stretch',
      minWidth: 280, minHeight: 400,
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
