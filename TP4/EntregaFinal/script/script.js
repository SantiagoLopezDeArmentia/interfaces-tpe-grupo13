document.getElementById('hamburger-menu').addEventListener('click', function() {
  this.classList.toggle('active');
});

  document.addEventListener("scroll", () => {
    const header = document.querySelector("header");
    const logoContainer = document.getElementById("logo-container");
    const logo = document.getElementById("logo");

    const scrollY = window.scrollY;

    if (scrollY > 50) {
        // Cambiar tamaño y posición del logo
        /*header.style.height = "70px"; // Reducir altura del header*/
        logoContainer.style.top = "0px";
        logoContainer.style.width = "150px";
        logoContainer.style.height = "86px";
        logoContainer.style.paddingTop = "0px";
        logo.style.width = "150px"; // Reducir tamaño del logo
        header.classList.add("vertical-gradient");
        
    } else {
        // Restaurar valores iniciales
       /* header.style.height = "103px";*/
        logoContainer.style.top = "55px";
        logoContainer.style.width = "560px";
        logoContainer.style.height = "320px";
        logo.style.width = "100%";
        header.classList.remove("vertical-gradient");
    }
});

(function() {
  const image = document.querySelector(".parallax-image");

  if (!image) {
      
      return;
  }

  let defaultTransform = "translate(0px, 0px)"; // Valor inicial de la imagen

  image.addEventListener("mousemove", (e) => {
      // Obtén las dimensiones del contenedor y el mouse
      const containerRect = image.parentElement.getBoundingClientRect();
      const mouseX = e.clientX - containerRect.left;
      const mouseY = e.clientY - containerRect.top;

      const centerX = containerRect.width / 2;
      const centerY = containerRect.height / 2;

      // Calcula la cantidad de desplazamiento en la dirección opuesta al mouse
      const moveX = -(mouseX - centerX) * 0.05;  // 0.05 ajusta la velocidad de movimiento horizontal
      const moveY = -(mouseY - centerY) * 0.05;  // 0.05 ajusta la velocidad de movimiento vertical

      // Aplica la transformación a la imagen
      image.style.transform = `translate(${moveX}px, ${moveY}px)`;
  });

  // Cuando el mouse sale de la imagen, vuelve a su posición original
  image.addEventListener("mouseout", () => {
    image.style.transform = defaultTransform; // Vuelve a la posición inicial
});

})();

document.addEventListener('scroll', function() {
  const layers = document.querySelectorAll('.layer');
  const scrollTop = window.scrollY;

  layers.forEach((layer) => {
      const speed = layer.getAttribute('data-speed');
      const yPos = -(scrollTop * speed / 100);
      layer.style.transform = `translateY(${yPos}px)`;
  });
});

const div = document.querySelector(".section4-set-parrafos")
let imagenAnterior;

/* Seccion - Mover texto e imagenes */
div.addEventListener('scroll', ()=> {
  
  const parrafos = document.querySelectorAll(".section4-p");
  const imagenes = document.querySelector(".section4-set-imagenes").children;

  if (imagenAnterior == null) {
    imagenAnterior = imagenes[0];
  }

  parrafos.forEach((parrafo, index) => {

    const largo = (Number(div.getBoundingClientRect()["height"])+Number(div.getBoundingClientRect()["y"]))

    if(parrafo.getBoundingClientRect()["y"] >= div.getBoundingClientRect()["y"] && parrafo.getBoundingClientRect()["y"] <= largo) {
      let imagen = imagenes[index];

      // Aplicamos la clase 'hide' para la imagen anterior
      imagenAnterior.classList.add('hide'); // Imagen anterior se achica y desaparece
      // Eliminamos la clase 'show' de la imagen anterior para restablecer su visibilidad al inicio
      imagenAnterior.classList.remove('show');

      // Aplicamos la clase 'show' para la nueva imagen
      imagen.classList.add('show'); // Nueva imagen se agranda y aparece
      // Eliminamos la clase 'hide' de la nueva imagen para que no esté oculta por defecto
      imagen.classList.remove('hide');

      imagenAnterior = imagen;
    }
  });
})


/* Seccion 5 - Mover video y personaje */
document.addEventListener('scroll', function() {
  const section5 = document.querySelector('.section-5-container')

  if(section5.getBoundingClientRect()["top"]< window.innerHeight && section5.getBoundingClientRect()["bottom"] > 0) {
    const video = document.querySelector('.section5-container-video');
    const pj3 = document.querySelector('.section5-pj3');
    video.style.transform = `translateY(0px)`;
    pj3.style.transform = `translateY(0px)`;

  }
  
});


/* Seccion 2 - Mostrar cards */
const listaCards = document.querySelectorAll('.section-2-card-container');
let time = 1000; // Tiempo inicial para la animación

// Función que se llama cuando el usuario hace scroll
function checkVisibility() {
    listaCards.forEach((card) => {
        // Verificar la posición de la tarjeta
        const rect = card.getBoundingClientRect();
        
        // Si el elemento está dentro de la vista (en el área visible del navegador)
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            // Mover la tarjeta con un retraso progresivo
            setTimeout(() => {
                card.style.opacity = 1;  // Hacerla visible
                card.style.transform = 'translateY(0)';  // Moverla a su posición original
            }, time);
            time += 300;  // Incrementar el tiempo para el siguiente
        }
    });
}

// Escuchar el evento de scroll
window.addEventListener('scroll', checkVisibility);

// Llamar a la función al cargar la página en caso de que ya esté en vista
checkVisibility();



const hamburgerMenu = document.getElementById('hamburger-menu');
const menu = document.getElementById('menu');
hamburgerMenu.addEventListener('click', () => {
  menu.classList.toggle('show');
});

window.addEventListener('scroll', function() {
  let section = document.querySelector('.sct-2-la-app-mas-divertida');
  let scrollPosition = window.scrollY + window.innerHeight;
  let sectionTop = section.offsetTop;
  let sectionBottom = sectionTop + section.offsetHeight;

  // Verificamos si la sección está en la vista
  if (scrollPosition > sectionTop && scrollPosition < sectionBottom) {
      let scrollOffset = window.scrollY - sectionTop; // Distancia desplazada dentro de la sección

      // Movimiento del título (texto)
      let title = document.querySelector('.app-title');
      title.style.transform = `translateY(${scrollOffset * 0.05}px)`; // Se mueve sutilmente 0.05

      // Movimiento de la descripción (texto)
      let description = document.querySelector('.app-description');
      description.style.transform = `translateY(${scrollOffset * 0.04}px)`; // Se mueve sutilmente 0.04

      // Movimiento del marco de fotos
      let photoFrame = document.querySelector('.photo-frame');
      photoFrame.style.transform = `translateY(${scrollOffset * 0.03}px)`; // Se mueve sutilmente 0.03

      // Movimiento del personaje azul grande
      let blueCharacter = document.querySelector('.blue-character');
      blueCharacter.style.transform = `translateY(${scrollOffset *  0.07}px)`; // Se mueve sutilmente  0.07

      // Movimiento del personaje verde chico
      let greenCharacter = document.querySelector('.green-character');
      greenCharacter.style.transform = `translateY(${scrollOffset * 0.06}px)`; // Se mueve sutilmente  0.06
  }
});


document.addEventListener('DOMContentLoaded', function() {
  setTimeout(function() {
      document.querySelector('.loader-container').style.display = 'none';
  }, 10000);  // Ocultar el loader después de 10 segundos (cuando termina la animación)
});
