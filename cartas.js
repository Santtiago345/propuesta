var Cartas = (function () {
  'use strict';

  var cartas = [
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
  ];

  var currentIndex = -1;
  var cartaAudio = document.getElementById('cartaAudio');

  function abrir(index) {
    if (index < 0 || index >= cartas.length) return;
    currentIndex = index;
    var c = cartas[index];

    var contentEl = document.getElementById('cartaContent');
    contentEl.innerHTML =
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
    if (currentIndex > 0) abrir(currentIndex - 1);
  }

  function siguiente() {
    if (currentIndex < cartas.length - 1) abrir(currentIndex + 1);
  }

  function actualizarNav() {
    document.getElementById('cartaCounter').textContent =
      (currentIndex + 1) + ' / ' + cartas.length;
  }

  // Cerrar con Escape
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') cerrar();
  });

  // Cerrar al hacer clic fuera
  document.getElementById('cartaOverlay').addEventListener('click', function (e) {
    if (e.target === this) cerrar();
  });

  return {
    abrir: abrir,
    cerrar: cerrar,
    anterior: anterior,
    siguiente: siguiente
  };
})();
