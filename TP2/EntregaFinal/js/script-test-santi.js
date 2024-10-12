const hamburgerMenu = document.getElementById('hamburger-menu');
const menu = document.getElementById('menu');
const popover = document.querySelector("#id-popover");
const cerrarBtn = document.querySelector('.btn-popover');
const form = document.querySelector(".form-register");
const btnIniSesion = document.querySelector('#btn-ini-sesion');
const btnSearch = document.querySelector('.mob-search');
const searchBar = document.querySelector('.search');
//const btnFooter = document.querySelectorAll('.btn-footer');


// Recorre cada botón
/*btnFooter.forEach(function (btn) {
  btn.addEventListener('click', function () {
      // Selecciona la lista de enlaces que corresponde al botón clicado
      const links = btn.nextElementSibling; // Asumiendo que los enlaces están justo después del botón

      // Alterna la clase 'show' en la lista
      links.classList.toggle('show'); // Muestra u oculta la lista
  });
});*/

/* ######## Funcionalidad barra buscar ######### */

btnSearch.addEventListener('click', () =>{
  searchBar.classList.toggle('show-search');
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
if (cerrarBtn) {
  cerrarBtn.addEventListener("click", () => {
      window.location.href = 'index.html';  
  });
}

if(btnIniSesion){ // Esto no tendria que estar  o no?
btnIniSesion.addEventListener('click',() =>{
 window.location.href = "index.html";
})}




/* ######## Manejo del carousel ######### */

let currentPosition = 0;

const arrCarousels = document.querySelectorAll('.carousel-container');

arrCarousels.forEach(carousel => {
  const track = carousel.querySelector('.carousel-track');
  const cards = carousel.querySelectorAll('.card');
  const prevButton = carousel.querySelector('.prev');
  const nextButton = carousel.querySelector('.next');
  const cardWidth = carousel.querySelector('.card').getBoundingClientRect().width;

 

  let isDragging = false;
  let startX, startY;
  let startScrollLeft;
  
  // Evento de click en el botón "next"
  nextButton.addEventListener('click', () => {
    moveCardToNext(track, cardWidth, cards);
    applySkewEffect(cards, 25); // Aplica el skew hacia la derecha
    resetSkewEffectWithDelay(cards); // Resetea después de un pequeño retraso
  });

  // Evento de click en el botón "prev"
  prevButton.addEventListener('click', () => {
    moveCardToPrevious(track, cardWidth, cards);
    applySkewEffect(cards, -25); // Aplica el skew hacia la izquierda
    resetSkewEffectWithDelay(cards); // Resetea después de un pequeño retraso
  });

  // Evento al iniciar el touch
  track.addEventListener('touchstart', (event) => {
    isDragging = true;
    startX = event.touches[0].clientX;
    startY = event.touches[0].clientY;
    startScrollLeft = track.scrollLeft;
  });

  // Evento al finalizar el touch
  track.addEventListener('touchend', () => {
    isDragging = false;
    resetSkewEffectWithDelay(cards); // Resetea después de un pequeño retraso
  });

  // Evento al mover el touch
  track.addEventListener('touchmove', (event) => {
    if (!isDragging) return;

    const currentX = event.touches[0].clientX;
    const currentY = event.touches[0].clientY;
    const diffX = startX - currentX;
    const diffY = startY - currentY;

    // Verificar si el movimiento es principalmente horizontal
    if (Math.abs(diffX) > Math.abs(diffY)) {
      event.preventDefault(); // Prevenir el scroll vertical de la página
      track.scrollLeft = startScrollLeft + diffX;

      // Aplica el efecto de skew mientras se desplaza
      if (diffX > 0) {
        applySkewEffect(cards, 25); // Mover hacia la derecha
      } else {
        applySkewEffect(cards, -25); // Mover hacia la izquierda
      }

      efectoRebote(track); // Aquí tu lógica de rebote
    } else {
      isDragging = false; // Finalizar el dragging horizontal
    }
  });

  const btnAddGame = document.querySelector(".btn-card-add");
  const bntRemoveGame = document.querySelector(".btn-card-remove-game");
  
  btnAddGame.addEventListener('click', () => {
    btnAddGame.style.display = "none";
    bntRemoveGame.style.display = "flex";
  });

  bntRemoveGame.addEventListener('click', () => {
    bntRemoveGame.style.display = "none";
    btnAddGame.style.display = "flex";
    
  });

});

/* Función para aplicar el efecto skew */
function applySkewEffect(cards, angle) {
  cards.forEach(card => {
    card.style.transition = 'transform 0.3s ease'; // Añade una transición suave
    card.style.transform = `skewX(${angle}deg)`;
  });
}

/* Función para resetear el efecto skew al valor original después de un retraso */
function resetSkewEffectWithDelay(cards) {
  setTimeout(() => {
    cards.forEach(card => {
      card.style.transition = 'transform 0.5s ease'; // Añade una transición suave al volver
      card.style.transform = 'skewX(0deg)'; // Vuelve al estado original
    });
  }, 200); // Resetea después de 200 ms
}


/* Funcionalidades del carousel */

function moveCardToNext(track, cardWidth, cards) {
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
  
  // barra de carga del home
document.addEventListener("DOMContentLoaded", function() {
  const spinnerContainer = document.getElementById("loading-spinner-container");
  const progressCircle = document.querySelector(".foreground");

  // Iniciar la animación después de un breve retraso
  setTimeout(() => {
    progressCircle.style.strokeDashoffset = '0';
  }, 100);

  // Después de la animación (3 segundos), ocultar el círculo y mostrar el contenido
  setTimeout(() => {
    spinnerContainer.style.display = "none";
    document.getElementById("home-content").style.display = "block";
  }, 3100); // 3 segundos más un pequeño margen

})
