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

  /* ======== CAPITULOS ======== */
  var chapters = [
    { title: 'El d\u00eda que te conoc\u00ed', html: '<p></p>' },
    { title: 'Nuestra primera cita', html: '<p></p>' },
    { title: 'Lo que m\u00e1s me gusta de ti', html: '<p></p>' },
    { title: 'Momentos inolvidables', html: '<p></p>' },
    { title: 'Razones para amarte', html: '<p></p>' },
    { title: 'Mi carta para ti', html: '<p></p>' }
  ];

  /* ======== PAGINADOR ======== */
  /* ======== PAGINADOR GENERALIZADO ======== */
  /* ======== PAGINADOR GENERALIZADO ======== */
  function getPageDimensions(wrapper) {
    var r = wrapper.getBoundingClientRect();
    var isPortrait = window.innerWidth <= 768;
    var maxW = isPortrait ? r.width : (r.width / 2);
    var maxH = r.height;

    if (!maxW || maxW <= 0) maxW = isPortrait ? (window.innerWidth * 0.8) : (window.innerWidth * 0.32);
    if (!maxH || maxH <= 0) maxH = window.innerHeight * 0.82;

    var aspect = 520 / 860;

    var w = maxW;
    var h = w / aspect;

    if (h > maxH) {
      h = maxH;
      w = h * aspect;
    }
    return { width: Math.round(w), height: Math.round(h) };
  }

  function crearPaginaPrueba(wrapper) {
    var dim = getPageDimensions(wrapper);
    var tp = document.createElement('div');
    tp.className = 'book-page';
    tp.style.cssText = 'position:fixed;top:-9999px;left:-9999px;visibility:hidden;' +
      'width:' + dim.width + 'px;height:' + dim.height + 'px;';
    tp.innerHTML =
      '<div class="page-hdr">' +
        '<span class="hdr-left">0</span>' +
        '<span class="hdr-center">X</span>' +
        '<span class="hdr-right">0</span>' +
      '</div>' +
      '<div class="page-content"><div class="page-inner"></div></div>';
    document.body.appendChild(tp);
    return tp;
  }

  function makePage(title, bodyHTML, pnum) {
    var d = document.createElement('div');
    d.className = 'book-page';
    d.innerHTML =
      '<div class="page-hdr">' +
        '<span class="hdr-left">' + pnum + '</span>' +
        '<span class="hdr-center">' + title + '</span>' +
        '<span class="hdr-right">' + pnum + '</span>' +
      '</div>' +
      '<div class="page-content"><div class="page-inner">' + bodyHTML + '</div></div>';
    return d;
  }

  function parseElements(elements, title, isChapter) {
    var items = [];
    if (isChapter) {
      items.push({ tag: 'h2', className: 'ch-title', text: title, isTitle: true });
    }
    
    elements.forEach(function(el) {
      if (typeof el === 'string') {
        var tmp = document.createElement('div');
        tmp.innerHTML = el.trim();
        if (tmp.children.length > 0) {
          Array.from(tmp.children).forEach(function(child) {
            items.push(domToItem(child));
          });
        } else if (el.trim()) {
          items.push({ tag: 'p', className: '', text: el.trim() });
        }
      }
    });
    return items;
  }

  function domToItem(node) {
    var tag = node.tagName.toLowerCase();
    var className = node.className || '';
    if (tag === 'ul') {
      var listItems = [];
      Array.from(node.children).forEach(function(li) {
        listItems.push(li.innerHTML || li.textContent);
      });
      return { tag: 'ul', className: className, listItems: listItems };
    }
    return { tag: tag, className: className, html: node.innerHTML, text: node.textContent || node.innerText };
  }

  function renderItemHTML(item, overrideContent) {
    var cls = item.className ? ' class="' + item.className + '"' : '';
    if (item.tag === 'ul') {
      var lis = (overrideContent || item.listItems).map(function(li) {
        return '<li>' + li + '</li>';
      }).join('');
      return '<ul' + cls + '>' + lis + '</ul>';
    }
    var content = overrideContent !== undefined ? overrideContent : (item.html || item.text);
    return '<' + item.tag + cls + '>' + content + '</' + item.tag + '>';
  }

  function paginateSection(title, elements, startNum, isChapter) {
    var wrapper = $('bookWrapper');
    var dim = getPageDimensions(wrapper);
    var tp = crearPaginaPrueba(wrapper);
    var innerEl = tp.querySelector('.page-inner');

    function getTargetHeight() {
      var h = innerEl.clientHeight;
      if (!h || h <= 50) {
        h = Math.max(200, dim.height - 90);
      }
      return h;
    }

    function checkOverflow() {
      return innerEl.scrollHeight > getTargetHeight();
    }

    var items = parseElements(elements, title, isChapter);
    var pages = [];
    var currentHTML = '';
    var itemIdx = 0;

    while (itemIdx < items.length) {
      var item = items[itemIdx];
      var itemHTML = renderItemHTML(item);
      
      innerEl.innerHTML = currentHTML + itemHTML;
      
      if (!checkOverflow()) {
        currentHTML += itemHTML;
        itemIdx++;
      } else {
        if (item.tag === 'ul' && item.listItems && item.listItems.length > 1) {
          var fitLis = [];
          for (var liIdx = 0; liIdx < item.listItems.length; liIdx++) {
            var testLis = fitLis.concat([item.listItems[liIdx]]);
            var testListHTML = renderItemHTML(item, testLis);
            innerEl.innerHTML = currentHTML + testListHTML;
            if (!checkOverflow()) {
              fitLis.push(item.listItems[liIdx]);
            } else {
              break;
            }
          }
          if (fitLis.length > 0) {
            currentHTML += renderItemHTML(item, fitLis);
            pages.push(makePage(title, currentHTML, startNum + pages.length));
            currentHTML = '';
            items[itemIdx] = { tag: 'ul', className: item.className, listItems: item.listItems.slice(fitLis.length) };
          } else {
            if (currentHTML) {
              pages.push(makePage(title, currentHTML, startNum + pages.length));
              currentHTML = '';
            } else {
              fitLis = [item.listItems[0]];
              currentHTML = renderItemHTML(item, fitLis);
              pages.push(makePage(title, currentHTML, startNum + pages.length));
              currentHTML = '';
              items[itemIdx] = { tag: 'ul', className: item.className, listItems: item.listItems.slice(1) };
            }
          }
        } else if (!item.isTitle) {
          var words = (item.text || '').split(/\s+/);
          
          if (words.length <= 1) {
            if (currentHTML) {
              pages.push(makePage(title, currentHTML, startNum + pages.length));
              currentHTML = '';
            } else {
              currentHTML = itemHTML;
              pages.push(makePage(title, currentHTML, startNum + pages.length));
              currentHTML = '';
              itemIdx++;
            }
          } else {
            var low = 1;
            var high = words.length;
            var best = 0;

            while (low <= high) {
              var mid = Math.floor((low + high) / 2);
              var testWords = words.slice(0, mid).join(' ');
              var testHTML = currentHTML + renderItemHTML(item, testWords);
              innerEl.innerHTML = testHTML;
              if (!checkOverflow()) {
                best = mid;
                low = mid + 1;
              } else {
                high = mid - 1;
              }
            }

            if (best > 0) {
              var partWords = words.slice(0, best).join(' ');
              currentHTML += renderItemHTML(item, partWords);
              pages.push(makePage(title, currentHTML, startNum + pages.length));
              currentHTML = '';
              
              var restWords = words.slice(best).join(' ');
              if (restWords.trim()) {
                items[itemIdx] = { tag: item.tag, className: item.className, html: restWords, text: restWords };
              } else {
                itemIdx++;
              }
            } else {
              if (currentHTML) {
                pages.push(makePage(title, currentHTML, startNum + pages.length));
                currentHTML = '';
              } else {
                var partWords = words.slice(0, 1).join(' ');
                currentHTML = renderItemHTML(item, partWords);
                pages.push(makePage(title, currentHTML, startNum + pages.length));
                currentHTML = '';
                var restWords = words.slice(1).join(' ');
                if (restWords.trim()) {
                  items[itemIdx] = { tag: item.tag, className: item.className, html: restWords, text: restWords };
                } else {
                  itemIdx++;
                }
              }
            }
          }
        } else {
          if (currentHTML) {
            pages.push(makePage(title, currentHTML, startNum + pages.length));
            currentHTML = '';
          } else {
            currentHTML += itemHTML;
            itemIdx++;
          }
        }
      }
    }

    if (currentHTML) {
      pages.push(makePage(title, currentHTML, startNum + pages.length));
    }

    document.body.removeChild(tp);
    return pages;
  }

  /* ======== CONSTRUIR PAGINAS ======== */
  function buildAllPages() {
    var wrapper = $('bookWrapper');
    var existing = wrapper.querySelectorAll('.book-page');
    var backHTML = existing[existing.length - 1]; // Contraportada

    var fixedPages = [];
    for (var i = 0; i < existing.length - 1; i++) {
      fixedPages.push(existing[i]);
    }

    // Paginación Introducción
    var introPages = paginateSection('Introducci\u00f3n', introParagraphs, 10, false);
    
    // Paginación Capítulos
    var currentNum = 10 + introPages.length;
    var chapterPagesList = [];
    var chapterMeta = [];

    tocItems = [{ page: 10, label: 'Introducci\u00f3n' }];

    for (var c = 0; c < chapters.length; c++) {
      var cTitle = chapters[c].title;
      var cPages = paginateSection(cTitle, [chapters[c].html], currentNum, true);
      tocItems.push({ page: currentNum, label: cTitle });
      chapterMeta.push({ title: cTitle, startPage: currentNum, count: cPages.length });
      currentNum += cPages.length;
      chapterPagesList = chapterPagesList.concat(cPages);
    }

    var contentTotal = fixedPages.length + introPages.length + chapterPagesList.length;
    var fillerPages = [];
    if ((contentTotal + 1) % 2 !== 0) {
      var blankP = document.createElement('div');
      blankP.className = 'book-page blank-page';
      fillerPages.push(blankP);
    }

    var allPages = fixedPages.concat(introPages, chapterPagesList, fillerPages, [backHTML]);
    var total = allPages.length;
    pagesLen = total;

    while (wrapper.firstChild) wrapper.removeChild(wrapper.firstChild);
    for (var a = 0; a < allPages.length; a++) {
      wrapper.appendChild(allPages[a]);
    }

    pageLabels = [];
    var introStart = fixedPages.length;
    var introEnd = introStart + introPages.length;
    var chapStartIdx = introEnd;

    for (var pi = 0; pi < total; pi++) {
      if (pi === 0) pageLabels.push('Portada');
      else if (pi >= 1 && pi <= 3) pageLabels.push('');
      else if (pi === 4) pageLabels.push('T\u00edtulo');
      else if (pi === 5) pageLabels.push('');
      else if (pi === 6) pageLabels.push('Agradecimientos');
      else if (pi === 7) pageLabels.push('');
      else if (pi === 8) pageLabels.push('\u00cdndice');
      else if (pi >= introStart && pi < introEnd) pageLabels.push('Introducci\u00f3n');
      else if (pi >= chapStartIdx && pi < total - (fillerPages.length + 1)) {
        var pNum = pi + 1;
        var foundTitle = '';
        for (var cm = 0; cm < chapterMeta.length; cm++) {
          if (pNum >= chapterMeta[cm].startPage && pNum < chapterMeta[cm].startPage + chapterMeta[cm].count) {
            foundTitle = chapterMeta[cm].title;
            break;
          }
        }
        pageLabels.push(foundTitle);
      }
      else if (pi === total - 1) pageLabels.push('Contraportada');
      else pageLabels.push('');
    }
  }

  /* ======== BUILD TOC ELEMENTS ======== */
  function buildTocElements() {
    var pgBody = $('tocBody');
    var pgProf = $('tocProfesional');
    if (pgBody) pgBody.innerHTML = '';
    if (pgProf) pgProf.innerHTML = '';

    tocItems.forEach(function (item) {
      if (pgBody) {
        var r = document.createElement('div');
        r.className = 'toc-row';
        r.innerHTML = '<span class="toc-label">' + item.label + '</span><span class="toc-num">' + item.page + '</span>';
        r.addEventListener('click', function () { closeToc(); goTo(item.page - 1); });
        pgBody.appendChild(r);
      }
      if (pgProf) {
        var p = document.createElement('div');
        p.className = 'toc-row';
        p.innerHTML = '<span class="toc-label">' + item.label +
          ' <span style="color:#ccc;font-size:0.6rem;">..................................................</span></span>' +
          '<span class="toc-num">' + item.page + '</span>';
        p.addEventListener('click', function () { goTo(item.page - 1); });
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

  var isBuilding = false;
  function handleResize() {
    if (isBuilding || !pageFlip) return;
    isBuilding = true;
    rebuildAndReload();
    isBuilding = false;
  }

  var resizeTimeout;

  function setupEvents() {
    ctrlPrev.addEventListener('click', function () { if (pageFlip) pageFlip.flipPrev('bottom'); });
    ctrlNext.addEventListener('click', function () { if (pageFlip) pageFlip.flipNext('bottom');     });
    $('ctrlToc').addEventListener('click', openToc);
    $('ctrlDev').addEventListener('click', toggleDevMode);
    $('tocClose').addEventListener('click', closeToc);
    tocOverlay.addEventListener('click', function (e) { if (e.target === tocOverlay) closeToc(); });
    document.addEventListener('keydown', function (e) {
      if (!pageFlip) return;
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') { e.preventDefault(); pageFlip.flipNext('bottom'); }
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') { e.preventDefault(); pageFlip.flipPrev('bottom'); }
      if (e.key === 'Escape' && tocOverlay.classList.contains('open')) closeToc();
    });
    window.addEventListener('resize', function() {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(handleResize, 300);
    });
  }

  /* ======== DEV MODE ======== */
  var devMode = false;
  var devDebounce = null;

  function toggleDevMode() {
    devMode = !devMode;
    var scene = document.getElementById('scene');
    var btnDev = $('ctrlDev');
    var wrapper = $('bookWrapper');

    if (devMode) {
      // Crear overlay que bloquea interaccion de StPageFlip
      var overlay = document.createElement('div');
      overlay.className = 'dev-overlay';
      overlay.id = 'devOverlay';
      wrapper.appendChild(overlay);

      scene.classList.add('dev-mode');
      btnDev.classList.add('active');
      enableEditing();
    } else {
      var ov = $('devOverlay');
      if (ov) ov.remove();

      scene.classList.remove('dev-mode');
      btnDev.classList.remove('active');
      disableEditing();
      rebuildAndReload();
    }
  }

  function enableEditing() {
    var inners = document.querySelectorAll('.book-page .page-inner');
    for (var i = 0; i < inners.length; i++) {
      inners[i].contentEditable = 'true';
      inners[i].addEventListener('input', onDevInput);
    }
  }

  function disableEditing() {
    var inners = document.querySelectorAll('.book-page .page-inner');
    for (var i = 0; i < inners.length; i++) {
      inners[i].contentEditable = 'false';
      inners[i].removeEventListener('input', onDevInput);
    }
  }

  function onDevInput() {
    clearTimeout(devDebounce);
    devDebounce = setTimeout(function () { rebuildAndReload(); }, 600);
  }

  function rebuildAndReload() {
    if (!pageFlip) return;
    var curIdx = pageFlip.getCurrentPageIndex();
    var wrapper = $('bookWrapper');
    var allPages = wrapper.querySelectorAll('.book-page');
    var fixedCount = 10;
    var total = allPages.length;

    var sections = [];
    var currentSection = null;

    for (var i = fixedCount; i < total - 1; i++) {
      var page = allPages[i];
      if (page.classList.contains('blank-page')) continue;
      if (page.classList.contains('cover-page')) continue;
      var inner = page.querySelector('.page-inner');
      if (!inner) continue;
      var hdr = page.querySelector('.hdr-center');
      var secTitle = hdr ? hdr.textContent.trim() : '';
      if (!currentSection || currentSection.title !== secTitle) {
        currentSection = { title: secTitle, pagesHTML: [] };
        sections.push(currentSection);
      }
      currentSection.pagesHTML.push(inner.innerHTML);
    }

    var allNewPages = [];
    var newToc = [];
    var pageNum = 10;

    for (var s = 0; s < sections.length; s++) {
      var sec = sections[s];
      var combinedHTML = sec.pagesHTML.join('');
      var tmp = document.createElement('div');
      tmp.innerHTML = combinedHTML;
      var h2 = tmp.querySelector('h2.ch-title');
      if (h2) h2.remove();

      var elements = [];
      Array.from(tmp.childNodes).forEach(function (node) {
        if (node.nodeType === 3) {
          var t = node.textContent.trim();
          if (t) elements.push(t);
        } else if (node.nodeType === 1) {
          elements.push(node.outerHTML);
        }
      });

      var isChapter = sec.title !== 'Introducci\u00f3n' && sec.title !== 'Introduccion';
      var newPages = paginateSection(sec.title, elements, pageNum, isChapter);
      allNewPages = allNewPages.concat(newPages);
      newToc.push({ page: pageNum, label: sec.title });
      pageNum += newPages.length;
    }

    var existing = wrapper.querySelectorAll('.book-page');
    var fixedPages = [];
    for (var fi = 0; fi < fixedCount; fi++) { fixedPages.push(existing[fi]); }
    var backCover = existing[existing.length - 1];

    var fillerPages = [];
    if ((fixedCount + allNewPages.length + 1) % 2 !== 0) {
      var bp = document.createElement('div');
      bp.className = 'book-page blank-page';
      fillerPages.push(bp);
    }

    var assembled = fixedPages.concat(allNewPages, fillerPages, [backCover]);
    pagesLen = assembled.length;

    while (wrapper.firstChild) wrapper.removeChild(wrapper.firstChild);
    for (var ai = 0; ai < assembled.length; ai++) { wrapper.appendChild(assembled[ai]); }

    pageLabels = [];
    for (var pi = 0; pi < pagesLen; pi++) {
      if (pi === 0) pageLabels.push('Portada');
      else if (pi >= 1 && pi <= 3) pageLabels.push('');
      else if (pi === 4) pageLabels.push('T\u00edtulo');
      else if (pi === 5) pageLabels.push('');
      else if (pi === 6) pageLabels.push('Agradecimientos');
      else if (pi === 7) pageLabels.push('');
      else if (pi === 8) pageLabels.push('\u00cdndice');
      else if (pi >= fixedCount && pi < pagesLen - (fillerPages.length + 1)) {
        var found = '';
        for (var ti = 0; ti < newToc.length; ti++) {
          var ns = (ti + 1 < newToc.length) ? newToc[ti + 1].page : (pagesLen - (fillerPages.length + 1));
          if (pi >= newToc[ti].page && pi < ns) { found = newToc[ti].label; break; }
        }
        pageLabels.push(found);
      } else if (pi === pagesLen - 1) pageLabels.push('Contraportada');
      else pageLabels.push('');
    }

    tocItems = newToc;
    buildTocElements();

    pageFlip.loadFromHTML(wrapper.querySelectorAll('.book-page'));
    pagesLen = pageFlip.getPageCount();
    
    if (devMode) {
      // Re-crear overlay despues de recargar
      if (!$('devOverlay')) {
        var ov = document.createElement('div');
        ov.className = 'dev-overlay';
        ov.id = 'devOverlay';
        wrapper.appendChild(ov);
      }
      enableEditing();
    }

    var target = Math.min(curIdx, pageFlip.getPageCount() - 1);
    updateControls();
    setTimeout(function () { if (target >= 0) pageFlip.flip(target, 'bottom'); }, 100);
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
