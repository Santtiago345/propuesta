var Canciones = (function () {
  'use strict';

  var canciones = [
    {
      titulo: 'Maldito enero',
      letra:
        'Dime que me vaya ya\nTe prometo nunca regresar por ti\nDime que no volver\u00e1s\n\n' +
        'Estoy cansado de esperarte aqu\u00ed\n\n' +
        'Dime que esto es mentira\npor ti apuesto hasta mi vida\nDime que lo pensar\u00e1s\nY que ma\u00f1ana me amar\u00e1s\n\n' +
        'Porque si t\u00fa te vas no podr\u00e9 m\u00e1s\n\n' +
        'Dime, que las flores que te hice est\u00e1n guardadas\nDime, que me esperas cuando miras por ventanas\nDime, que ma\u00f1ana no tienes que hacer nada\nY te llego con todo el amor que te tengo\nQue respira por mis poros y que huelo\nQue me lleva a cantar con mariposas\nA volar con ella y posarme en rosas\nDime por favor que no tengo que olvidarme de esto\n\n' +
        'Dime que entender\u00e1s\nNo me fui porque lo quise as\u00ed\nDime que me so\u00f1ar\u00e1s\nY ah\u00ed nos casaremos en abril\n\n' +
        'Dime que me acompa\u00f1as\nEn cada d\u00eda al despertar\nDime cuando regresas\nPor ti te espero hasta el final\n\n' +
        'Porque si t\u00fa te vas, no estar\u00e9 en paz\n\n' +
        'Dime, que las flores que te hice est\u00e1n guardadas\nDime, que me esperas cuando miras por ventanas\nDime, que ma\u00f1ana no tienes que hacer nada\nY te llego con todo el amor que te tengo\nQue respira por mis poros y que huelo\nQue me lleva a cantar con mariposas\nA volar con ella y posarme en rosas\nDime por favor que no tengo que olvidarme de esto\nDime por favor que el amor seguir\u00e1 siendo nuestro\nDime que vas a leer el libro en alg\u00fan enero\nMaldito enero'
    }
  ];

  var currentIndex = -1;
  var videoEl = document.getElementById('audioSource');

  function abrir(index) {
    if (index < 0 || index >= canciones.length) return;
    currentIndex = index;
    var c = canciones[index];

    document.getElementById('lyricsTitle').textContent = c.titulo;
    document.getElementById('lyricsContent').textContent = c.letra;
    document.getElementById('lyricsOverlay').classList.add('open');

    // Girar vinilo grande
    var disc = document.getElementById('vinylDisc' + index);
    if (disc) disc.classList.add('spinning');

    // Girar mini vinilo en overlay
    document.getElementById('lyricsMiniVinyl').classList.add('spinning');

    // Reproducir audio del video
    if (videoEl) {
      videoEl.currentTime = 0;
      videoEl.play().catch(function () {});
    }
  }

  function cerrar() {
    document.getElementById('lyricsOverlay').classList.remove('open');

    // Parar vinilo
    if (currentIndex >= 0) {
      var disc = document.getElementById('vinylDisc' + currentIndex);
      if (disc) disc.classList.remove('spinning');
    }

    document.getElementById('lyricsMiniVinyl').classList.remove('spinning');

    // Pausar audio
    if (videoEl) {
      videoEl.pause();
    }

    currentIndex = -1;
  }

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') cerrar();
  });

  document.getElementById('lyricsOverlay').addEventListener('click', function (e) {
    if (e.target === this) cerrar();
  });

  return {
    abrir: abrir,
    cerrar: cerrar
  };
})();
