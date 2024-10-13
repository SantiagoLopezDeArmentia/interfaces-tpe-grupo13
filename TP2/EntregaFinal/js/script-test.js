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

    // Desplazamiento con botones (desktop)
    nextButton.addEventListener('click', () => {
        applyCardEffect(cards, 'right');
        moveCardToNext(track, cardWidth);
        removeCardEffect(cards);
    });

    prevButton.addEventListener('click', () => {
        applyCardEffect(cards, 'left');
        moveCardToPrevious(track, cardWidth);
        removeCardEffect(cards);
    });

    // Evento para iniciar el touch
    track.addEventListener('touchstart', (event) => {
        isDragging = true;
        startX = event.touches[0].clientX;
        startY = event.touches[0].clientY;
        startScrollLeft = track.scrollLeft;
    });

    // Evento para mover el carrusel durante el touch
    track.addEventListener('touchmove', (event) => {
        if (!isDragging) return;

        const currentX = event.touches[0].clientX;
        const currentY = event.touches[0].clientY;
        const diffX = startX - currentX;
        const diffY = startY - currentY;

        // Solo prevenir el scroll vertical si el movimiento es predominantemente horizontal
        if (Math.abs(diffX) > Math.abs(diffY)) {
            event.preventDefault();  // Prevenir el scroll vertical
            track.scrollLeft = startScrollLeft + diffX * 2;  // Aumentar la sensibilidad de desplazamiento
            
            if (diffX > 0) {
                applyCardEffect(cards, 'right');  // Movimiento hacia la derecha
            } else {
                applyCardEffect(cards, 'left');   // Movimiento hacia la izquierda
            }
        }
    });

    // Evento para finalizar el touch
    track.addEventListener('touchend', () => {
        isDragging = false;
        removeCardEffect(cards); // Eliminar el efecto al finalizar el desplazamiento
        efectoRebote(track); // Aplicar efecto rebote al finalizar el desplazamiento
    });

    // También manejar el desplazamiento con el mouse (desktop)
    track.addEventListener('mousedown', (event) => {
        isDragging = true;
        startX = event.clientX;
        startScrollLeft = track.scrollLeft;
    });

    track.addEventListener('mousemove', (event) => {
        if (!isDragging) return;

        const currentX = event.clientX;
        const diffX = startX - currentX;

        track.scrollLeft = startScrollLeft + diffX * 2;  // Aumentar la sensibilidad de desplazamiento

        if (diffX > 0) {
            applyCardEffect(cards, 'right');  // Movimiento hacia la derecha
        } else {
            applyCardEffect(cards, 'left');   // Movimiento hacia la izquierda
        }
    });

    track.addEventListener('mouseup', () => {
        isDragging = false;
        removeCardEffect(cards); // Eliminar el efecto al finalizar el desplazamiento
        efectoRebote(track); // Aplicar efecto rebote al soltar el mouse
    });

    track.addEventListener('mouseleave', () => {
        isDragging = false;
        removeCardEffect(cards); // Eliminar el efecto si el mouse sale del área del carrusel
    });
});

// Funciones de movimiento del carrusel con los botones
function moveCardToNext(track, cardWidth) {
    const maxScrollLeft = track.scrollWidth - track.clientWidth;

    if (track.scrollLeft + cardWidth >= maxScrollLeft) {
        track.scrollLeft = maxScrollLeft; // Evita que la card se corte si es la última
        efectoRebote(track); // Aplicar efecto de rebote al llegar al final
    } else {
        track.scrollLeft += cardWidth * 2; // Desplazar más tarjetas de una sola vez
    }
}

function moveCardToPrevious(track, cardWidth) {
    if (track.scrollLeft <= 0) {
        track.scrollLeft = 0; // Evita que la card se corte si es la primera
        efectoRebote(track); // Aplicar efecto de rebote al llegar al inicio
    } else {
        track.scrollLeft -= cardWidth * 2; // Desplazar más tarjetas de una sola vez
    }
}

// Función de rebote para evitar desbordes en los bordes del carrusel
function efectoRebote(track) {
    const maxScrollLeft = track.scrollWidth - track.clientWidth;
    console.log("puto el eque lee")
    if (track.scrollLeft >= maxScrollLeft) {
        track.classList.add('bounce');
        setTimeout(() => {
            track.classList.remove('bounce');
        }, 300);
    } else if (track.scrollLeft <= 0) {
        track.classList.add('bounce-back');
        setTimeout(() => {
            track.classList.remove('bounce-back');
        }, 300);
    }
}

// Funciones para aplicar y eliminar el efecto skewX a las cards
function applyCardEffect(cards, direction) {
    cards.forEach(card => {
        card.style.transition = 'transform 0.2s ease'; // Agregar una transición suave
        card.style.transform = direction === 'right' ? 'skewX(25deg)' : 'skewX(-25deg)'; // Inclinación según la dirección
    });
}

function removeCardEffect(cards) {
    setTimeout(() => {
        cards.forEach(card => {
            card.style.transform = 'skewX(0deg)'; // Volver las cards a su estado normal
        });
    }, 200); // Mantener el efecto un poco antes de revertirlo
}

// barra de carga del home
document.addEventListener("DOMContentLoaded", function () {
    const spinnerContainer = document.getElementById("loading-spinner-container");
    const progressCircle = document.querySelector(".foreground");

    // Iniciar la animación después de un breve retraso
    setTimeout(() => {
        progressCircle.style.strokeDashoffset = '0';
    }, 100);

    // Después de la animación (3 segundos), ocultar el círculo y mostrar el contenido
    setTimeout(() => {
        spinnerContainer.style.display = "none";
       /* document.getElementById("home-content").style.display = "block";
    }, 3100); // 3 segundos más un pequeño margen
});
