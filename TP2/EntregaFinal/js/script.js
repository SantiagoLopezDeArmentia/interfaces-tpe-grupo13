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

/* ######## Fin - Manejo del carousel ######### */

let isDragging = false, startPos = 0, currentTranslate = 0, prevTranslate = 0, animationID, currentIndex = 0;
const carousel = document.querySelector('.carousel-track');
        carousel.addEventListener('touchstart', touchStart);
        carousel.addEventListener('touchend', touchEnd);
        carousel.addEventListener('touchmove', touchMove);

        function touchStart(event) {
            console.log("tocuch star")
            isDragging = true;
            startPos = event.touches.clientX;
            animationID = requestAnimationFrame(animation);
        }

        function touchEnd() {
            console.log("end")
            isDragging = false;
            cancelAnimationFrame(animationID);
            const movedBy = currentTranslate - prevTranslate;

            if (movedBy < -100 && currentIndex < 2) currentIndex += 1;
            if (movedBy > 100 && currentIndex > 0) currentIndex -= 1;

            setPositionByIndex();
        }

        function touchMove(event) {
          console.log("touch move")
            if (isDragging) {
                moveCardToNext();
                const currentPosition = event.touches.clientX;
                currentTranslate = prevTranslate + currentPosition - startPos;
            }
        }

        function animation() {
            setSliderPosition();
            if (isDragging) requestAnimationFrame(animation);
        }

        function setSliderPosition() {
            carousel.style.transform = `translateX(${currentTranslate}px)`;
        }

        function setPositionByIndex() {
            currentTranslate = currentIndex * -window.innerWidth;
            prevTranslate = currentTranslate;
            setSliderPosition();
        }

