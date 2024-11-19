document.getElementById('hamburger-menu').addEventListener('click', function() {
    this.classList.toggle('active');
  });






/*
  (function() {
    // Add event listener
    document.addEventListener("mousemove", parallax);
    const elem = document.querySelector("#parallax");
    // Magic happens here
    function parallax(e) {
      console.log("etre")
        let _w = window.innerWidth/2;
        let _h = window.innerHeight/2;
        let _mouseX = e.clientX;
        let _mouseY = e.clientY;
        let _depth1 = `${50 - (_mouseX - _w) * 0.01}% ${50 - (_mouseY - _h) * 0.01}%`;
        let _depth2 = `${50 - (_mouseX - _w) * 0.02}% ${50 - (_mouseY - _h) * 0.02}%`;
        let _depth3 = `${50 - (_mouseX - _w) * 0.06}% ${50 - (_mouseY - _h) * 0.06}%`;
        let x = `${_depth3}, ${_depth2}, ${_depth1}`;
        console.log(x);
        elem.style.backgroundPosition = x;
    }

})();*/


document.addEventListener('scroll', function() {
  const layers = document.querySelectorAll('.layer');
  const scrollTop = window.scrollY;

  layers.forEach((layer, index) => {
      const speed = layer.getAttribute('data-speed');
      const yPos = -(scrollTop * speed / 100);
      layer.style.transform = `translateY(${yPos}px)`;
  });
});

const div = document.querySelector(".section4-set-parrafos")
let imagenAnterior;

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


