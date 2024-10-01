


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

const carousels = document.querySelectorAll('.carousel-container');

carousels.forEach(carrusel => {
  const track = carrusel.querySelector('.carousel-track');
  const prevButton = carrusel.querySelector('.prev');
  const nextButton = carrusel.querySelector('.next');
  const cards = carrusel.querySelectorAll('.card');

  if (cards.length > 0) {
    const cardWidth = cards[0].getBoundingClientRect().width + 20; // Incluye márgenes

    let currentPosition = 0;
    const visibleCards = 5;
    const totalCards = cards.length;
    const maxScroll = -(cardWidth * (totalCards - visibleCards));

    nextButton.addEventListener('click', () => {
      if (currentPosition > maxScroll) {
        currentPosition -= cardWidth;
        track.style.transform = `translateX(${currentPosition}px)`;
      }
    });

    prevButton.addEventListener('click', () => {
      if (currentPosition < 0) {
        currentPosition += cardWidth;
        track.style.transform = `translateX(${currentPosition}px)`;
      }
    });
  }
});



