/* Funcionalidad para el carousel */ 
/*const carousels = document.querySelectorAll('.carousel-container');

carousels.forEach(carrusel => {
  const track = carrusel.querySelector('.carousel-track');
  const cards = carrusel.querySelectorAll('.card');
  const prevButton = carrusel.querySelector('.prev');
  const nextButton = carrusel.querySelector('.next');
  



  const carouselInner = document.querySelector('.carousel-track');
  let index = 0;

  prevButton.addEventListener('click', () => {
    moveToPreviousSlide();
  });

  nextButton.addEventListener('click', () => {
    moveToNextSlide();
  });

  function moveToPreviousSlide() {
    index = (index > 0) ? index - 1 : 0;
    carouselInner.style.transform = `translateX(-${index * 100}%)`;
  }

    function moveToNextSlide() {
      index = (index < carouselInner.children.length - 1) ? index + 1 : carouselInner.children.length - 1;
      const totalItems = carouselInner.children.length;
      const offset = (index === totalItems - 1) ? -(totalItems - 1) * 100 : -index * 100;
      carouselInner.style.transform = `translateX(${offset}%)`;
    }
  
});*/

  console.log("hola")
  const track = document.querySelector('.carousel-track');
  const cards = document.querySelectorAll('.card');
  const prevButton = document.querySelector('.prev');
  const nextButton = document.querySelector('.next');

  console.log(nextButton)
  console.log(track)
  nextButton.addEventListener('click', () => {
    console.log("adsad")
    track.style.transform = `translateX(${-cards[0].getBoundingClientRect().width}px)`;
    //track.scrollLeft += 125;
    //track.scrollLeft += cards[0].getBoundingClientRect().width;
    console.log(track.scrollLeft)
  })



