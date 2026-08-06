var Cartas = (function () {
  'use strict';

  var categorias = [
    {
      nombre: 'Cartas',
      cartas: [
        {
          titulo: 'Sobre la suerte',
          contenido:
            '<p>Tengo la creencia muy interiorizada de que no soy de esas personas que tienen suerte por defecto y la defino como ese tipo de cosas cotidianas que te benefician o esas que afectan y que m\u00ednimamente no pasan m\u00e1s seguido de lo normal, o tal vez tambi\u00e9n sean conversaciones entre Dios y yo, oraciones que llegaron tarde o en defecto, su forma de hablarme sin necesidad de palabras. Es contraproducente este pensamiento porque he sido muy beneficiado por la suerte, de no ser por ella tal vez la mitad de cosas que conozco o he querido no las hubiese concebido.</p>' +
            '<p>La frase c\u00e9lebre m\u00e1s presente que tengo a d\u00eda de hoy viene de mi profesora Dianita: \u201cLes deseo \u00e9xitos, la suerte es para mediocres\u201d. Le pedimos que nos deseara suerte para el examen por venir y sustent\u00f3 su frase con el hecho de que no se deber\u00eda necesitar suerte para merecerse las cosas o en este caso, para pasar el examen y en su tiempo le di la raz\u00f3n, para m\u00ed ten\u00eda un gran sentido que no deb\u00eda acudir a milagros o un golpe fortuito de suerte para aprobar, deb\u00eda venir de mis propios esfuerzos por estudiar y as\u00ed fue, aprob\u00e9 con buena nota solo con deseos de \u00e9xito.</p>' +
            '<p>T\u00fa me cambiaste aquel refr\u00e1n en cierto modo, he sido bastante mediocre durante toda mi vida en cualesquiera de los \u00e1mbitos, incluyo lo que fuimos, lo que fui contigo y eso me llev\u00f3 a depender de suerte para tenerte pero el amor ya no es solo suerte, quiero ser merecedor de \u00e9l. De mis luchas internas m\u00e1s presentes ha sido el aceptar que yo no te merezco, al menos a\u00fan no, s\u00e9 que no te merezco pero en favor de Dios y la suerte que \u00e9l deposit\u00f3 en m\u00ed al traerte, me convertir\u00e9 en el hombre que s\u00ed lo haga, con muchos deseos de \u00e9xito.</p>' +
            '<p>Tambi\u00e9n definir\u00eda la suerte con tu nombre, o lo m\u00e1s cercano a ti. \u00bfQu\u00e9 m\u00e1s puede ser la suerte si no es todo lo que me hizo conocerte?</p>' +
            '<p>Y doy testimonio personal de que en los fat\u00eddicos d\u00edas cuando no estuvimos juntos se me acab\u00f3 la suerte y no la culpo, toda la gast\u00e9 encontr\u00e1ndote a ti. Asimismo, me has ense\u00f1ado a redefinir el t\u00e9rmino, antes mencionaba \u201cQu\u00e9 mala suerte\u201d al llegar a un sem\u00e1foro en rojo, pero cuando estoy contigo me alegro del rojo, puedo acariciarte las piernas o hacer paradas t\u00e9cnicas de besos antes de llegar al siguiente lugar de hamburguesas, tal vez contigo no existe la mala suerte.</p>' +
            '<p>Y s\u00ed, cuando se habla de suerte, yo volteo a verte.</p>'
        }
      ]
    },
    {
      nombre: 'Nostalgia',
      cartas: [
        {
          titulo: '09/07/2026',
          contenido:
            '<p>Qui\u00e9n dir\u00eda que un d\u00eda sin ti se iba a sentir tan extra\u00f1o, el que no sea lo primero que haga en las ma\u00f1anas el escribirte o el aviso al llegar a casa, el pensar constantemente que est\u00e1s haciendo y si me piensas o no. Est\u00e1 siendo muy extra\u00f1o este hecho de extra\u00f1arte de una manera en la que te puedo ver, saber d\u00f3nde est\u00e1s y c\u00f3mo te sientes, pero no poder hablarte, llamarte o enviarte una paloma mensajera con esta primera carta de nostalgia, que tendr\u00e1 que trabajar mucho la paloma mensajera al final de nuestro contrato firmado, porque no ser\u00e1n pocas.</p>' +
            '<p>Me gustar\u00eda decirte que hoy fui a trabajar, cada vez va mejor el trabajo, me siento muy feliz por ello, las soluciones de las grabaciones que di han servido mucho, mi jefe est\u00e1 muy contenta conmigo. En realidad el d\u00eda ha sido levemente aburrido e ins\u00edpido, el clima no ayud\u00f3 mucho y la verdad las ansias de escribirte me pesaron un poco, preguntarte c\u00f3mo vas con tu cuadro, si chanelita ya tiene color, si ya saben qu\u00e9 carro van a comprar o qu\u00e9 piensan hacer para el cumplea\u00f1os de tu mam\u00e1, que pienso enviarle el regalo.</p>' +
            '<p>Anoche tuve varios sue\u00f1os en los que dilucidaba tu presencia entre escenas, ojal\u00e1 tuviera la memoria suficiente para haberte tenido m\u00e1s presente durante el d\u00eda, que los sue\u00f1os hubiesen durado m\u00e1s para as\u00ed restarle un poquito a esta a\u00f1oranza de tu recuerdo.</p>'
        }
      ]
    }
  ];

  var currentCat = 0;
  var currentIndex = -1;
  var list = [];
  var cartaAudio = document.getElementById('cartaAudio');

  function renderizarGrid() {
    var grid = document.getElementById('cartasGrid');
    grid.innerHTML = '';

    if (currentCat === -1) {
      // Vista principal: categorias
      categorias.forEach(function (cat, i) {
        var wrapper = document.createElement('div');
        wrapper.className = 'carta-wrapper folder-wrapper';
        wrapper.onclick = function () { abrirCategoria(i); };
        wrapper.innerHTML =
          '<div class="carta folder-card">' +
            '<div class="carta-front folder-front">' +
              '<div class="carta-seal">' + (cat.nombre === 'Nostalgia' ? '📁' : '💌') + '</div>' +
              '<h2 class="carta-name">' + cat.nombre + '</h2>' +
              '<p class="carta-hint">' + cat.cartas.length + ' carta' + (cat.cartas.length !== 1 ? 's' : '') + '</p>' +
            '</div>' +
          '</div>';
        grid.appendChild(wrapper);
      });
    } else {
      // Vista dentro de categoria: boton volver + cartas
      var back = document.createElement('div');
      back.className = 'carta-wrapper';
      back.onclick = function () { currentCat = -1; renderizarGrid(); };
      back.innerHTML =
        '<div class="carta back-card">' +
          '<div class="carta-front back-front">' +
            '<div class="carta-seal">←</div>' +
            '<h2 class="carta-name">Volver</h2>' +
          '</div>' +
        '</div>';
      grid.appendChild(back);

      list = categorias[currentCat].cartas;

      list.forEach(function (carta, i) {
        var wrapper = document.createElement('div');
        wrapper.className = 'carta-wrapper';
        wrapper.onclick = function () { abrirCarta(i); };
        wrapper.innerHTML =
          '<div class="carta">' +
            '<div class="carta-front">' +
              '<div class="carta-seal">' + (categorias[currentCat].nombre === 'Nostalgia' ? '📝' : '💌') + '</div>' +
              '<h2 class="carta-name">' + carta.titulo + '</h2>' +
              '<p class="carta-hint">Toca para leer</p>' +
            '</div>' +
          '</div>';
        grid.appendChild(wrapper);
      });
    }
  }

  function abrirCategoria(i) {
    currentCat = i;
    renderizarGrid();
  }

  function abrirCarta(index) {
    if (index < 0 || index >= list.length) return;
    currentIndex = index;
    var c = list[index];

    document.getElementById('cartaContent').innerHTML =
      '<h2>' + c.titulo + '</h2>' + c.contenido;
    document.getElementById('cartaOverlay').classList.add('open');
    actualizarNav();

    if (cartaAudio) {
      cartaAudio.currentTime = 0;
      cartaAudio.play().catch(function () {});
    }
  }

  function cerrar() {
    document.getElementById('cartaOverlay').classList.remove('open');
    currentIndex = -1;
    if (cartaAudio) cartaAudio.pause();
  }

  function anterior() {
    if (currentIndex > 0) abrirCarta(currentIndex - 1);
  }

  function siguiente() {
    if (currentIndex < list.length - 1) abrirCarta(currentIndex + 1);
  }

  function actualizarNav() {
    document.getElementById('cartaCounter').textContent =
      (currentIndex + 1) + ' / ' + list.length;
  }

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      if (document.getElementById('cartaOverlay').classList.contains('open')) {
        cerrar();
      } else if (currentCat !== -1) {
        currentCat = -1; renderizarGrid();
      }
    }
  });

  document.getElementById('cartaOverlay').addEventListener('click', function (e) {
    if (e.target === this) cerrar();
  });

  renderizarGrid();

  return {
    abrir: cerrar,
    cerrar: cerrar,
    anterior: anterior,
    siguiente: siguiente
  };
})();
