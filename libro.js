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
    { title: 'Cap\u00edtulo 1', html: '<p></p>' },
    { title: 'Cap\u00edtulo 2', html: '<p></p>' },
    { title: 'Cap\u00edtulo 3', html:
      '<p>El d\u00eda de hoy, justo despu\u00e9s de dejarte en tu casa, revisar el poco aire de mi llanta trasera e ir despacio a alg\u00fan lugar que le ponga aire, presion\u00e9 el bot\u00f3n de mi casco que reproduce la siguiente canci\u00f3n en cola y son\u00f3 algo que no hab\u00eda o\u00eddo antes, algo que pens\u00e9 que podr\u00eda ser una de esas canciones que le doy a guardar para escuchar despu\u00e9s y nunca escucho despu\u00e9s, de esas que tiene nombre raro pero bonita portada. Esa canci\u00f3n reson\u00f3 en mi cabeza, no por la letra, cuando voy en la moto no escucho muy bien las voces ya que hay bastante ruido en el tr\u00e1fico, sino por un sonido caracter\u00edstico, un sonido que suena cada siete compases, un sonido que tiene 5 notas (si mi memoria no comete el fat\u00eddico error de fallarme como com\u00fanmente lo hace), de esos que son pegajosos al punto de quedarse en tu cabeza como tarareable mientras haces alguna otra actividad que no requiera de mucho esfuerzo, esos sonidos que son tan \u00fanicos en el plano existencial como para que cuando lo oigas entre el ruido vociferante de alguna plaza, en tu cabeza se active esa zona de cosas que te son familiares. No es m\u00e1s que un simple viol\u00edn hablando de la nostalgia que contrae una simple sucesi\u00f3n de notas b\u00e1sicas, hablando de c\u00f3mo aparecer 3 veces en una canci\u00f3n cambia completamente la trascendencia de una pieza instrumental y vocal, del c\u00f3mo de un instrumento caracterizado por la m\u00fasica cl\u00e1sica puede nacer un hook tan potente para una canci\u00f3n indie.</p>' +
      '<p>La canci\u00f3n se llama \u201cConticinio\u201d, la palabra conticinio proviene del lat\u00edn \u201cconticinium\u201d, que significa silencio profundo, actualmente se le atribuye el significado de ese instante de la noche en que todo entra en recesi\u00f3n y por ende en silencio, donde cesa el sonido de los camiones pasando por las calles o de la m\u00fasica en el lugar de las comidas, cuando los perros dejan de ladrar y los ni\u00f1os ya est\u00e1n durmiendo, casi como todo en calma y llegado a un acuerdo personal conmigo mismo declaro que la hora adecuada para determinar que empieza el conticinio es m\u00e1s o menos a las doce y treinta de la noche.</p>' +
      '<p>Un gran sustantivo para determinar ese momento en que la noche se convierte tan profunda como para comerse los aulladores sonidos de una gran obra y de la mayor\u00eda de seres, aunque por esta noche no har\u00e9 parte de esos seres ya que ando disfrutando este conticinio para poder escribirte sobre \u00e9l c\u00f3mo una canci\u00f3n en un solo d\u00eda me atrap\u00f3 en un loop interminable (al menos hasta que duerma), de esos que te hacen quemar la canci\u00f3n hasta despu\u00e9s no poder escucharla.</p>' +
      '<p>As\u00ed como conoc\u00ed la canci\u00f3n por una imposible coincidencia tecnol\u00f3gica, no se me hace raro que dure exactamente tres minutos con treinta y tres segundos, se visualizan tres n\u00fameros tres seguidos en la notificaci\u00f3n de previsualizaci\u00f3n, ser\u00eda una simple coincidencia hasta ah\u00ed, pero la canci\u00f3n es un c\u00edrculo constante de 3 acordes (en realidad 4 si contamos el peque\u00f1o puente antes del coro, <em>que en realidad suena solo dos veces</em>); Do mayor, La menor y Fa mayor, una progresi\u00f3n que generalmente expresa nostalgia y esperanza. Cuando llegu\u00e9 a casa y predispuesto a estudiar un poco puse la canci\u00f3n lleno de ganas de la curiosidad genuina producida por esa canci\u00f3n que nunca hab\u00eda escuchado pero me gust\u00f3 el sonido ese del viol\u00edn, le\u00ed la letra pero m\u00e1s que hacerlo, le puse atenci\u00f3n y no pudo gustarme m\u00e1s porque justo ayer se cumpli\u00f3 la primera frase de la canci\u00f3n al menos la primera vez, \u2014pude verte dormir\u2014 en mi pecho con ese hoodie blanco de flores bonitas manchado en la manga derecha. En general la canci\u00f3n puede llegar a ser muy interpretativa, he le\u00eddo gente en comentarios diciendo que puede ser relacionada a una ruptura o a un habitante de calle, para m\u00ed m\u00e1s que todo, es personal, es de esas canciones que no sab\u00edas que te hac\u00edan falta en tu lista de favoritas y de esas que pondr\u00edas en una tarde de ver atardeceres.</p>' +
      '<p>\u00bfPor qu\u00e9 la siento tan personal? Porque tambi\u00e9n es de esas canciones que me da envidia que no sean m\u00edas, envidia de que el poder divino creador de canciones maravillosas no haya aterrizado en mi alma en el a\u00f1o 2018 para poder ser yo quien la canta por primera vez y decirle al mundo que mi sue\u00f1o s\u00ed es servir de inspiraci\u00f3n. Aunque partiendo del hecho de que fue imposible conocerte en 2018 me quedo tranquilo porque no imagino a nadie m\u00e1s que t\u00fa siendo mi musa inspiradora para una oda al arte musical como lo es esta canci\u00f3n.</p>' +
      '<p>Van casi tres horas pasadas del conticinio de esta noche y en mis pies prevalece solo el fr\u00edo l\u00fagubre de las madrugadas de Bogot\u00e1, nada preocupante para el \u2014fuego y la gasolina que me mantengan despierto\u2014 y un poco esas ansias de desgarrar este arrebato de escribirte con un poco de alcohol en las sienes antes de que se vaya mi ef\u00edmera creatividad que surge en momentos espont\u00e1neos, tanto que pueden pasar o d\u00edas o a\u00f1os o tristezas, alguna de las tres coincidencias. \u2014Tentando el vicio y el azar\u2014 decid\u00ed subir al 94 ese d\u00eda, que el amor me encontrara despu\u00e9s de la tribulaci\u00f3n de enero, que el azar actuara en s\u00faplicas premeditadas a mi favor y el dado cayera en algo m\u00e1s que tres para que esas \u2014posibilidades de volver a empezar\u2014 me hicieran \u2014dejar de decir ma\u00f1ana\u2014 para sentir el hoy, contigo. En este punto de las circunstancias pasadas y de escrito este libro creo que atribuyo la parte de \u2014\u201cno te pedir\u00e9 las llaves\u201d\u2014 a las de mi coraz\u00f3n, s\u00ed, muy clich\u00e9 y cursi, s\u00e9 que ahorita puedes estar vomitando, pero ten por seguro que no te las pedir\u00e9, son tuyas, abre y entra cuando quieras, dejo que desordenes porque as\u00ed eres y porque s\u00e9 bien que esta vez no se te har\u00e1 tarde para ordenar antes de salir pero s\u00e9 mucho mejor que no saldr\u00e1s, as\u00ed que por favor desord\u00e9name el coraz\u00f3n al menos lo que dure la vida, ese ser\u00eda \u2014el elixir a mis heridas\u2014, unas tres veces, (como termina la canci\u00f3n) s\u00ed, otro tres.</p>'
    },
    { title: 'Cap\u00edtulo 4', html: '<p></p>' },
    { title: 'Cap\u00edtulo 5', html: '<p></p>' },
    { title: 'Cap\u00edtulo 6', html: '<p></p>' },
    { title: 'Cap\u00edtulo 7', html: '<p></p>' },
    { title: 'Cap\u00edtulo 8', html: '<p></p>' },
    { title: 'Cap\u00edtulo 9', html: '<p></p>' },
    { title: 'Cap\u00edtulo 10', html: '<p></p>' }
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
    d.setAttribute('data-r', pnum);
    d.innerHTML =
      '<div class="page-hdr">' +
        '<span class="hdr-left">' + pnum + '</span>' +
        '<span class="hdr-center">' + title + '</span>' +
        '<span class="hdr-right">' + pnum + '</span>' +
      '</div>' +
      '<div class="page-content"><div class="page-inner">' + bodyHTML + '</div></div>';
    return d;
  }

  function makeSectionCoverPage(title, pnum, bodyHTML) {
    var d = document.createElement('div');
    d.className = 'book-page section-cover-page';
    d.setAttribute('data-r', pnum);
    d.innerHTML =
      '<div class="page-hdr">' +
        '<span class="hdr-left"></span>' +
        '<span class="hdr-center"></span>' +
        '<span class="hdr-right"></span>' +
      '</div>' +
      '<div class="page-content">' +
        '<div class="section-cover-head">' +
          '<h1 class="section-cover-title">' + title + '</h1>' +
        '</div>' +
        '<div class="section-cover-body"><div class="page-inner">' + (bodyHTML || '') + '</div></div>' +
      '</div>';
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

    // Pagina portada de seccion Introduccion (titulo en 1/3 superior, texto desde 2/3)
    var firstParaHTML = introParagraphs.length > 0 ? '<p>' + introParagraphs[0] + '</p>' : '';
    var introCover = makeSectionCoverPage('Introducci\u00f3n', 10, firstParaHTML);

    // Resto de parrafos con paginacion normal desde pagina 11
    var restParas = introParagraphs.slice(1);
    var introContentPages = restParas.length > 0
      ? paginateSection('Introducci\u00f3n', restParas, 11, false)
      : [];

    // Combinar: portada de seccion + paginas de contenido
    var introPages = [introCover].concat(introContentPages);
    
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

  var isBuilding = false;
  function handleResize() {
    if (isBuilding || !pageFlip) return;
    isBuilding = true;
    rebuildAllPages();
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

  /* ======== DEV MODE Y ALMACENAMIENTO PERSISTENTE ======== */
  var devMode = false;
  var devDebounce = null;
  var editContainer = null;

  function saveToLocalStorage() {
    try {
      localStorage.setItem('flipbook_intro_v3', JSON.stringify(introParagraphs));
      localStorage.setItem('flipbook_chapters_v3', JSON.stringify(chapters));
    } catch (e) {}
  }

  function loadFromLocalStorage() {
    try {
      var savedIntro = localStorage.getItem('flipbook_intro_v3');
      var savedChap = localStorage.getItem('flipbook_chapters_v3');
      if (savedIntro) {
        var parsedI = JSON.parse(savedIntro);
        if (Array.isArray(parsedI) && parsedI.length > 0) introParagraphs = parsedI;
      }
      if (savedChap) {
        var parsedC = JSON.parse(savedChap);
        if (Array.isArray(parsedC) && parsedC.length > 0) chapters = parsedC;
      }
    } catch (e) {}
  }

  function resetToOriginal() {
    try {
      localStorage.removeItem('flipbook_intro_v2');
      localStorage.removeItem('flipbook_chapters_v2');
      localStorage.removeItem('flipbook_intro_v3');
      localStorage.removeItem('flipbook_chapters_v3');
      localStorage.removeItem('flipbook_intro');
      localStorage.removeItem('flipbook_chapters');
    } catch (e) {}
    location.reload();
  }

  function toggleDevMode() {
    devMode = !devMode;
    var scene = document.getElementById('scene');
    var btnDev = $('ctrlDev');

    if (devMode) {
      scene.classList.add('dev-mode');
      btnDev.classList.add('active');
      document.addEventListener('click', onDevClick, true);
    } else {
      flushCurrentEdit();
      removeEditContainer();
      scene.classList.remove('dev-mode');
      btnDev.classList.remove('active');
      document.removeEventListener('click', onDevClick, true);
      rebuildAllPages();
    }
  }

  function getSectionForPage(page) {
    var wrapper = $('bookWrapper');
    var allPages = Array.from(wrapper.querySelectorAll('.book-page'));
    var idx = allPages.indexOf(page);
    if (idx < 0) return null;
    
    var label = pageLabels[idx] || '';
    if (!label) return null;
    if (label === 'Portada' || label === 'Título' || label === 'Contraportada' || label === 'Agradecimientos' || label === 'Índice') return null;

    if (label === 'Introducción' || label === 'Introduccion') {
      return { type: 'intro', index: -1, title: 'Introducción' };
    }

    for (var c = 0; c < chapters.length; c++) {
      if (chapters[c].title === label) {
        return { type: 'chapter', index: c, title: chapters[c].title };
      }
    }
    return null;
  }

  function getSectionHTML(sec) {
    if (sec.type === 'intro') {
      return introParagraphs.map(function(p) { return '<p>' + p + '</p>'; }).join('\n');
    } else if (sec.type === 'chapter' && sec.index >= 0 && sec.index < chapters.length) {
      return chapters[sec.index].html;
    }
    return '';
  }

  function onDevClick(e) {
    if (!devMode) return;
    if (e.target.closest('.ctrl') || e.target.closest('.toc-overlay') ||
        e.target.closest('.dev-edit-container') || e.target.closest('.top-back-link')) return;

    e.preventDefault();
    e.stopPropagation();

    var wrapper = $('bookWrapper');
    var rect = wrapper.getBoundingClientRect();
    var cx = e.clientX, cy = e.clientY;
    if (cx < rect.left || cx > rect.right || cy < rect.top || cy > rect.bottom) return;

    var pages = wrapper.querySelectorAll('.book-page');
    var targetPage = null;
    for (var i = 0; i < pages.length; i++) {
      var pr = pages[i].getBoundingClientRect();
      if (cx >= pr.left && cx <= pr.right && cy >= pr.top && cy <= pr.bottom) {
        if (!pages[i].classList.contains('cover-page') &&
            !pages[i].classList.contains('blank-page') &&
            !pages[i].classList.contains('title-page')) {
          targetPage = pages[i];
          break;
        }
      }
    }
    if (!targetPage) return;

    var sec = getSectionForPage(targetPage);
    if (!sec) return;

    flushCurrentEdit();
    openEditContainer(targetPage, sec);
  }

  function openEditContainer(page, sec) {
    if (editContainer) {
      removeEditContainer();
    }

    var pr = page.getBoundingClientRect();
    var contentHTML = getSectionHTML(sec);

    var cont = document.createElement('div');
    cont.className = 'dev-edit-container';
    cont.setAttribute('data-sec-type', sec.type);
    cont.setAttribute('data-sec-idx', sec.index);
    cont.style.cssText =
      'left:' + pr.left + 'px;top:' + pr.top + 'px;' +
      'width:' + pr.width + 'px;height:' + pr.height + 'px;';

    // Toolbar
    var tb = document.createElement('div');
    tb.className = 'dev-toolbar';
    tb.innerHTML =
      '<button data-cmd="bold" title="Negrita"><b>N</b></button>' +
      '<button data-cmd="italic" title="Cursiva"><i>C</i></button>' +
      '<span class="dev-sep"></span>' +
      '<button data-cmd="fontSize-" title="Reducir fuente">A-</button>' +
      '<span class="dev-size-label">100%</span>' +
      '<button data-cmd="fontSize+" title="Aumentar fuente">A+</button>' +
      '<span class="dev-sep"></span>' +
      '<button class="dev-reset" title="Restaurar texto original" style="font-size:0.7rem;padding:2px 6px;">Restaurar Original</button>' +
      '<span class="dev-sep"></span>' +
      '<button class="dev-close" title="Guardar y cerrar">✔ Guardar</button>';
    cont.appendChild(tb);

    // Title input
    var ti = document.createElement('div');
    ti.className = 'dev-title-input';
    ti.contentEditable = 'true';
    ti.textContent = sec.title;
    cont.appendChild(ti);

    // Content area
    var ca = document.createElement('div');
    ca.className = 'dev-content-area';
    ca.contentEditable = 'true';
    ca.innerHTML = contentHTML;
    cont.appendChild(ca);

    document.body.appendChild(cont);
    editContainer = cont;

    // Toolbar events
    tb.querySelectorAll('button[data-cmd]').forEach(function (btn) {
      btn.addEventListener('mousedown', function (e) { e.preventDefault(); });
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        var cmd = btn.getAttribute('data-cmd');
        if (cmd === 'bold') { document.execCommand('bold', false); updateToolbarState(); }
        else if (cmd === 'italic') { document.execCommand('italic', false); updateToolbarState(); }
        else if (cmd === 'fontSize+') changeFontSize(1);
        else if (cmd === 'fontSize-') changeFontSize(-1);
      });
    });

    var resetBtn = tb.querySelector('.dev-reset');
    if (resetBtn) {
      resetBtn.addEventListener('click', function (e) {
        e.preventDefault();
        if (confirm('\u00bfDeseas restaurar todo el texto original del libro?')) {
          resetToOriginal();
        }
      });
    }

    tb.querySelector('.dev-close').addEventListener('click', function () {
      flushCurrentEdit();
      removeEditContainer();
    });

    document.addEventListener('selectionchange', updateToolbarState);

    // Auto-save on input with 600ms debounce
    cont.addEventListener('input', function () {
      clearTimeout(devDebounce);
      devDebounce = setTimeout(function () {
        flushCurrentEdit();
      }, 600);
    });

    setTimeout(function () { ca.focus(); }, 60);
  }

  var devFontLevel = 0;
  function changeFontSize(dir) {
    devFontLevel += dir;
    var pct = 100 + devFontLevel * 10;
    var label = editContainer.querySelector('.dev-size-label');
    var area = editContainer.querySelector('.dev-content-area');
    if (label) label.textContent = pct + '%';
    if (area) area.style.fontSize = (0.76 * (pct / 100)) + 'rem';
  }

  function updateToolbarState() {
    if (!editContainer) return;
    var tb = editContainer.querySelector('.dev-toolbar');
    if (!tb) return;
    var boldBtn = tb.querySelector('[data-cmd="bold"]');
    var italicBtn = tb.querySelector('[data-cmd="italic"]');
    if (boldBtn) boldBtn.classList.toggle('active', document.queryCommandState('bold'));
    if (italicBtn) italicBtn.classList.toggle('active', document.queryCommandState('italic'));
  }

  function flushCurrentEdit() {
    if (!editContainer) return;
    var secType = editContainer.getAttribute('data-sec-type');
    var secIdx = parseInt(editContainer.getAttribute('data-sec-idx'), 10);
    var titleInput = editContainer.querySelector('.dev-title-input');
    var contentArea = editContainer.querySelector('.dev-content-area');
    if (!secType) return;

    var newTitle = titleInput ? titleInput.textContent.trim() : '';
    var newHTML = contentArea ? contentArea.innerHTML : '';

    if (secType === 'intro') {
      var tmp = document.createElement('div');
      tmp.innerHTML = newHTML;
      var newParas = [];
      var pEls = tmp.querySelectorAll('p');
      if (pEls.length > 0) {
        pEls.forEach(function(p) {
          if (p.textContent.trim()) newParas.push(p.textContent.trim());
        });
      } else if (tmp.textContent.trim()) {
        tmp.textContent.trim().split(/\n+/).forEach(function(line) {
          if (line.trim()) newParas.push(line.trim());
        });
      }
      if (newParas.length > 0) {
        introParagraphs = newParas;
      }
    } else if (secType === 'chapter' && secIdx >= 0 && secIdx < chapters.length) {
      if (newTitle) chapters[secIdx].title = newTitle;
      if (newHTML) chapters[secIdx].html = newHTML;
    }

    saveToLocalStorage();
    rebuildAllPages();
  }

  function removeEditContainer() {
    if (editContainer) {
      document.removeEventListener('selectionchange', updateToolbarState);
      editContainer.remove();
      editContainer = null;
    }
  }

  function rebuildAllPages() {
    if (!pageFlip) return;
    var curIdx = pageFlip.getCurrentPageIndex();
    buildAllPages();
    buildTocElements();
    var wrapper = $('bookWrapper');
    pageFlip.loadFromHTML(wrapper.querySelectorAll('.book-page'));
    pagesLen = pageFlip.getPageCount();
    updateControls();
    var target = Math.min(curIdx, pageFlip.getPageCount() - 1);
    if (target >= 0) setTimeout(function () { pageFlip.flip(target, 'bottom'); }, 50);
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
      loadFromLocalStorage();
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
