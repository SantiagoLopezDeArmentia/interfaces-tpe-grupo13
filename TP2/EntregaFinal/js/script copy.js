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
const track = document.querySelector('.carousel-track');
const cards = document.querySelectorAll('.card');
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');
const cardWidth = document.querySelector('.card').getBoundingClientRect().width;
 

let currentPosition = 0;

nextButton.addEventListener('click', () => {
  moveCardToNext();
  //track.scrollLeft += cardWidth;
  //limitScroll();
})

prevButton.addEventListener('click', () => {
  moveCardToPrevious();
})

function moveCardToNext() {
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

function moveCardToPrevious() {
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

/* Efecto de caroules para touch mobile*/

const _track = document.querySelector('.carousel-track');
let isDragging = false;
let startX, startY, currentX, currentY;
let startScrollLeft;

track.addEventListener('touchstart', (event) => {
    isDragging = true;
    startX = event.touches[0].clientX;
    startY = event.touches[0].clientY;
    startScrollLeft = _track.scrollLeft;
});

track.addEventListener('touchend', () => {
    isDragging = false;
});

track.addEventListener('touchmove', (event) => {
    if (!isDragging) return;
    event.preventDefault();

    const currentX = event.touches[0].clientX;
    const currentY = event.touches[0].clientY;
    const diffX = startX - currentX;
    const diffY = startY - currentY;

    // Verificar si el movimiento es principalmente horizontal
    if (Math.abs(diffX) > Math.abs(diffY)) {
      _track.scrollLeft = startScrollLeft + diffX;
      efectoRebote();
      //let maxScrollLeft = _track.scrollWidth - _track.clientWidth;
      console.log(_track.scrollWidth)
      console.log(_track.clientWidth)
      console.log(_track.scrollWidth - _track.clientWidth)
      /*console.log("max scrooll: " + maxScrollLeft)
      console.log("Math.min(maxScrollLeft, _track.scrollLeft): " + Math.min(maxScrollLeft, _track.scrollLeft))
      console.log("Math.max(0, Math.min(maxScrollLeft, _track.scrollLeft)) " + Math.max(0, Math.min(maxScrollLeft, _track.scrollLeft)))*/
    }
});

// Función para limitar el desplazamiento al inicio y al final del carrusel

function efectoRebote() {
  let maxScrollLeft = _track.scrollWidth - _track.clientWidth;
  if (Math.max(0, Math.min(maxScrollLeft, _track.scrollLeft)) == maxScrollLeft) {
    track.classList.add('bounce');
    setTimeout(() => {
      // Remueve la clase después del rebote para volver a la normalidad
      track.classList.remove('bounce');
    }, 300);
  } else if (Math.max(0, Math.min(maxScrollLeft, _track.scrollLeft)) == 0) {
    track.classList.add('bounce-back');
    
    setTimeout(() => {
      // Remueve la clase después del rebote para volver a la normalidad
      track.classList.remove('bounce-back');
    }, 300);
  }
}

function limitScroll() {
    const maxScrollLeft = _track.scrollWidth - _track.clientWidth;
    console.log("max scrooll: " + maxScrollLeft)
    _track.scrollLeft = Math.max(0, Math.min(maxScrollLeft, _track.scrollLeft));
    console.log("track scrool limit scroll: " + _track.scrollLeft)
}

