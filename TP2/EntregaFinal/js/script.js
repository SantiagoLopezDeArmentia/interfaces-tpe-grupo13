const hamburgerMenu = document.getElementById('hamburger-menu');
const menu = document.getElementById('menu');
const popover = document.querySelector("#id-popover");
const cerrarBtn = document.querySelector('.btn-popover');
const form = document.querySelector(".form-register");
const btnIniSesion = document.querySelector('#btn-ini-sesion');
const btnSearch = document.querySelector('.mob-search');
const searchBar = document.querySelector('.search');
let cartCount = 0;
const btnCompartir = document.querySelector('#btn-compartir');
const popoverCompartir = document.querySelector('#id-popover-compartir');
const cerrarPopover = document.querySelector('#cerrar-popover');

if (btnCompartir) {
  btnCompartir.addEventListener('click', () => {
    if (popoverCompartir) {
      popoverCompartir.showPopover(); // Muestra el popover
    }
  });
}

if (cerrarPopover) {
  cerrarPopover.addEventListener('click', () => {
    if (popoverCompartir) {
      popoverCompartir.close(); // Cierra el popover
    }
  });
}

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
  });
}

if (cerrarBtn) {
  cerrarBtn.addEventListener("click", () => {
      window.location.href = 'index.html';  
  });
}

if(btnIniSesion){ 
  btnIniSesion.addEventListener('click',() =>{
    window.location.href = "index.html";
  });
}

/* ######## Manejo del carousel ######### */

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
    moveCardToNext(track, cardWidth, cards.length);
    applySkewEffect(cards, -8); // Aplica el skew hacia la derecha
    resetSkewEffectWithDelay(cards); // Resetea después de un pequeño retraso
  });

  // Evento de click en el botón "prev"
  prevButton.addEventListener('click', () => {
    moveCardToPrevious(track, cardWidth, cards.length);
    applySkewEffect(cards, 8); // Aplica el skew hacia la izquierda
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

      efectoRebote(track); // Aquí tu lógica de rebote
    } else {
      isDragging = false; // Finalizar el dragging horizontal
    }
  });

  // Aplicar el evento hover para el efecto scale en cada card
  cards.forEach(card => {
    card.style.transition = 'transform 0.3s ease';
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'scale(1.1) skewX(0deg)'; // Aplica solo el scale al hacer hover
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'scale(1)'; // Vuelve al estado original
    });
  });

  /* Manejo de los botones agregar/quitar del carrito */
  const cards2 = carousel.querySelectorAll('.card');
  cards2.forEach(card => {
    const btnAddGame = card.querySelector(".btn-card-add");
    const bntRemoveGame = card.querySelector(".btn-card-remove-game");
    const divAddedProd = card.querySelector(".added-product");

    if (btnAddGame) {
      btnAddGame.addEventListener('click', () => {
        btnAddGame.style.display = "none";
        bntRemoveGame.style.display = "flex";
        divAddedProd.style.display = "flex";
        cartCount++;
        document.getElementById('cartCount').textContent = cartCount; // Actualizar el span
      });
    }
    
    if(bntRemoveGame) {
      bntRemoveGame.addEventListener('click', () => {
        bntRemoveGame.style.display = "none";
        btnAddGame.style.display = "flex";
        divAddedProd.style.display = "none";
        cartCount--;
        if(cartCount<=0){
          cartCount = "";
        }
        document.getElementById('cartCount').textContent = cartCount; // Actualizar el span
      });
    }
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

function moveCardToNext(track, cardWidth, numberCards) {
  const maxScrollLeft = track.scrollWidth - track.clientWidth;
  if (track.scrollLeft + cardWidth >= maxScrollLeft) {
    if (track.scrollLeft < maxScrollLeft) {
      track.scrollLeft = maxScrollLeft;
    }
    track.classList.add('bounce');
    setTimeout(() => {
      track.classList.remove('bounce');
    }, 300);
  } else {
    track.scrollLeft += cardWidth + numberCards;
  }
}

function moveCardToPrevious(track, cardWidth, numberCards) {
  if (track.scrollLeft <= 0) {
    track.classList.add('bounce-back');
    setTimeout(() => {
      track.classList.remove('bounce-back');
    }, 300);
  } else {
    track.scrollLeft -= cardWidth + numberCards;
  }
}

function efectoRebote(track) {
  const maxScrollLeft = track.scrollWidth - track.clientWidth;
  if (Math.max(0, Math.min(maxScrollLeft, track.scrollLeft)) == maxScrollLeft) {
    track.classList.add('bounce');
    setTimeout(() => {
      track.classList.remove('bounce');
    }, 300);
  } else if (Math.max(0, Math.min(maxScrollLeft, track.scrollLeft)) == 0) {
    track.classList.add('bounce-back');
    setTimeout(() => {
      track.classList.remove('bounce-back');
    }, 300);
  }
}

/* Barra de carga del home */
document.addEventListener("DOMContentLoaded", function() {
  const spinnerContainer = document.getElementById("loading-spinner-container");
  const progressCircle = document.querySelector(".foreground");

  setTimeout(() => {
    progressCircle.style.strokeDashoffset = '0';
  }, 100);

  setTimeout(() => {
    spinnerContainer.style.display = "none";
    document.getElementById("home-content").style.display = "block";
  }, 5300); // 3 segundos más un pequeño margen
});
