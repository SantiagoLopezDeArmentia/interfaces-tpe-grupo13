const hamburgerMenu = document.getElementById('hamburger-menu');
const menu = document.getElementById('menu');
const popover = document.querySelector("#id-popover");
const form = document.querySelector("form");
const btnIniSesion = document.querySelector('#btn-ini-sesion');
const btnFooter = document.querySelectorAll('.btn-footer');


// Recorre cada botón
btnFooter.forEach(function (btn) {
  btn.addEventListener('click', function () {
      // Selecciona la lista de enlaces que corresponde al botón clicado
      const links = btn.nextElementSibling; // Asumiendo que los enlaces están justo después del botón

      // Alterna la clase 'show' en la lista
      links.classList.toggle('show'); // Muestra u oculta la lista
  });
});

/* ######## Funcionalidad menu ######### */

hamburgerMenu.addEventListener('click', () => {
  menu.classList.toggle('show');
});

/* ######## Fin - Funcionalidad menu ######### */

if(form){
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if(popover){
      popover.showPopover();
    } 
  })
}

if(btnIniSesion){ // Esto no tendria que estar  o no?
btnIniSesion.addEventListener('click',() =>{
 window.location.href = "index.html";
})}




/* ######## Manejo del carousel ######### */

let currentPosition = 0;

const arrCarousels = document.querySelectorAll('.carousel-container');

arrCarousels.forEach(carousel => {
  console.log("ando")
  const track = carousel.querySelector('.carousel-track');
  const cards = carousel.querySelectorAll('.card');
  const prevButton = carousel.querySelector('.prev');
  const nextButton = carousel.querySelector('.next');
  const cardWidth = carousel.querySelector('.card').getBoundingClientRect().width;

  let isDragging = false;
  let startX, startY;
  let startScrollLeft;

  nextButton.addEventListener('click', () => {
    moveCardToNext(track, cardWidth, cards);
  })

  prevButton.addEventListener('click', () => {
    moveCardToPrevious(track, cardWidth, cards);
  })

  /* Efecto de caroules para touch mobile*/

  track.addEventListener('touchstart', (event) => {
    isDragging = true;
    startX = event.touches[0].clientX;
    startY = event.touches[0].clientY;
    startScrollLeft = track.scrollLeft;
  });

  track.addEventListener('touchend', () => {
      isDragging = false;
  });

  track.addEventListener('touchmove', (event) => {
      if (!isDragging) return;

      const currentX = event.touches[0].clientX;
      const currentY = event.touches[0].clientY;
      const diffX = startX - currentX;
      const diffY = startY - currentY;

      // Verificar si el movimiento es principalmente horizontal
      if (Math.abs(diffX) > Math.abs(diffY)) {
        event.preventDefault();
        track.scrollLeft = startScrollLeft + diffX;
        efectoRebote(track);
      }
  });

});

/* Funcionalidades del carousel */

function moveCardToNext(track, cardWidth, cards) {
  console.log("tonext")
  const maxScrollLeft = track.scrollWidth - track.clientWidth;
  // Verifica si el scroll está en el final
  if (track.scrollLeft + cardWidth >= maxScrollLeft) {

    // Evita que la card se corte si es la ultima
    if (track.scrollLeft < maxScrollLeft) {
      track.scrollLeft = maxScrollLeft
    }
    // Si llegamos al final, aplicamos el efecto de rebote
    track.classList.add('bounce');
    setTimeout(() => {
      // Remueve la clase después del rebote para volver a la normalidad
      track.classList.remove('bounce');
    }, 300);

  } else {
    track.scrollLeft += cardWidth + cards.length ;
  }
}

function moveCardToPrevious(track, cardWidth, cards) {
  // Verifica si el scroll está en el inicio
  if (track.scrollLeft <= 0) {
    // Si estamos al inicio, aplicamos el efecto de rebote
    track.classList.add('bounce-back');
    
    setTimeout(() => {
      // Remueve la clase después del rebote para volver a la normalidad
      track.classList.remove('bounce-back');
    }, 300);

  } else {
    track.scrollLeft -= cardWidth + cards.length ;
  }
}

// Función para limitar el desplazamiento al inicio y al final del carrusel

function efectoRebote(track) {
  let maxScrollLeft = track.scrollWidth - track.clientWidth;
  if (Math.max(0, Math.min(maxScrollLeft, track.scrollLeft)) == maxScrollLeft) {
    track.classList.add('bounce');
    setTimeout(() => {
      // Remueve la clase después del rebote para volver a la normalidad
      track.classList.remove('bounce');
    }, 300);
  } else if (Math.max(0, Math.min(maxScrollLeft, track.scrollLeft)) == 0) {
    track.classList.add('bounce-back');
    
    setTimeout(() => {
      // Remueve la clase después del rebote para volver a la normalidad
      track.classList.remove('bounce-back');
    }, 300);
  }
}

function limitScroll(track) {
    const maxScrollLeft = track.scrollWidth - track.clientWidth;
    console.log("max scrooll: " + maxScrollLeft)
    track.scrollLeft = Math.max(0, Math.min(maxScrollLeft, track.scrollLeft));
    console.log("track scrool limit scroll: " + track.scrollLeft)
}

