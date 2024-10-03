


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




hamburgerMenu.addEventListener('click', () => {
  menu.classList.toggle('show');
});

if(form){
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if(popover){
      popover.showPopover();
    } 
  })
}

if(btnIniSesion){
btnIniSesion.addEventListener('click',() =>{
 window.location.href = "index.html";
})}

/* Funcionalidad para el carousel */ 
const carousels = document.querySelectorAll('.carousel-container');

carousels.forEach(carrusel => {
  const track = carrusel.querySelector('.carousel-track');
  console.log("scrollLeft: " + track.scrollLeft)
  const prevButton = carrusel.querySelector('.prev');
  const nextButton = carrusel.querySelector('.next');
  const cards = carrusel.querySelectorAll('.card');

  if (cards.length > 0) {
    const cardStyle = cards[0].currentStyle || window.getComputedStyle(cards[0]);

    const cardWidth = cards[2].getBoundingClientRect().width; // Incluye márgenes

    let currentPosition = 0;
    const visibleCards = 2;
    const totalCards = cards.length+1;
    const maxScroll = -(cardWidth * (totalCards - visibleCards));
    let esAnimado = true;

    const totalWitdhCards = -cardWidth*8;
    const limit = -(totalCards * cardWidth) + carrusel.getBoundingClientRect().width;


    nextButton.addEventListener('click', () => {
      console.log("scrollLeft: " + track.scrollLeft)
      console.log("clientSwith: " + track.clientWidth)
      console.log("scrollWidth: " + track.scrollWidth)
      console.log("current position: " + currentPosition);
      console.log("cardwith: " + cardWidth);
      if (currentPosition > maxScroll) {
      //if (currentPosition > -widthCarouselContainer) {
      //if (currentPosition > -widthCarouselContainer) {
        currentPosition -= cardWidth;
        track.style.transform = `translateX(${currentPosition}px)`;
      } else {
        currentPosition -= cardWidth;
        track.style.transform = `translateX(${currentPosition}px)`;
      }
    });


    prevButton.addEventListener('click', () => {
      esAnimado = true;
      if (currentPosition < 0) {
        esAnimado = true;
        currentPosition += cardWidth;
        track.style.transform = `translateX(${currentPosition}px)`;
      }
    });
    /*
    // Calcular el límite derecho
    const limit = -(totalCards * cardWidth) + containerWidth;

    if (currentPosition > limit) {
      currentPosition -= cardWidth;

      // Asegurarse de que no se pase del límite
      if (currentPosition < limit) {
        currentPosition = limit;
      }
    }*/
  }
});



