
/* ELEMENTOS DEL JUEGO */

let canvas = document.querySelector(".canvas");
let context = canvas.getContext("2d");

canvas.width = configurationsData.canvasWidth;
canvas.height = configurationsData.canvasHeight;
canvas.style.border = "1px solid #000";


juego = new Juego(context, 4, "Jugador 1", "Jugador 2", 'js/4enlinea/image/fire.png', 'js/4enlinea/image/water.png');

tableroT = juego.getTablero();
tablero = tableroT.getMatriz();
zoneDrop = tableroT.getZonaDropeable();

filas = tableroT.getFilas();
columnas = tableroT.getColumnas();

arr1 = juego.getFichasJug1();
arr2 = juego.getFichasJug2();

let lastPositionFigureX;
let lastPositionFigureY;
let lastFichaSelected;

let lastClickedFigure = null;
let isMouseDown = false;

let velocidad = 0; // Velocidad vertical
const gravedad = 2; // Aceleración debida a la gravedad

canvas.addEventListener('mousedown', onMouseDown, false);
canvas.addEventListener('mouseup', onMouseUp, false);
canvas.addEventListener('mousemove', onMouseMove, false);

dibujarCanvas();

/* Dibuja el canvas con la imagen de fondo y luego posiciona el juego por encima */
function dibujarCanvas() {
    const imagenFondo = new Image();
    imagenFondo.src = images.fondoCanvas;
    imagenFondo.onload = function() {
        
        context.drawImage(imagenFondo, 0, 0, canvas.width, canvas.height);
        juego.drawGame()
        Helper.fillText('48px Arial', '#FF8C33', '#23034D', "Turno " + juego.getTurno(), 500, 100);
        Helper.fillText('48px Arial', '#FF8C33', '#23034D', arr1.length, 65, 300);
        Helper.fillText('48px Arial', '#FF8C33', '#23034D', arr2.length, 875, 300);
    };
}


function onMouseDown(e) {
    isMouseDown = true;
    lastFichaSelected = null;
    let clickFig = Helper.findClickedFigure(e.offsetX, e.offsetY);
    if(clickFig != null && lastFichaSelected.getJugador() == juego.getTurno()) {
        lastClickedFigure = clickFig;
        lastPositionFigureX = lastClickedFigure.getPosX();
        lastPositionFigureY = lastClickedFigure.getPosY();
        lastClickedFigure.drawBorder();
    }

    dibujarCanvas();
}

async function onMouseUp(e) {
    isMouseDown = false;
    let drawedFigure = false;
    let clickZoneDrop = null;
    
    clickZoneDrop = Helper.checkDropZone(e.offsetX, e.offsetY);

    if(clickZoneDrop != null && lastClickedFigure != null) {
        const j = clickZoneDrop.getNumeroColumna();
        const i = tableroT.buscarPosicion(j);

        /* Si el valor de [i] es -1, significa que la columna estaba completa. */
        if(i != -1) {

            await  Helper.simularGravedad(i,j, lastClickedFigure,0)
            switch(juego.getTurno()) {
                case "Jugador 1":
                    Helper.asignarFichaTablero(i, j, arr1);
                    break;
                case "Jugador 2":
                    Helper.asignarFichaTablero(i, j, arr2);
                    break;
            }
            
            
            drawedFigure = true;
            setTimeout(()=> {
                tableroT.buscarHorizontal(i, j, lastFichaSelected);
                tableroT.buscarVertical(i, j, lastFichaSelected);
                tableroT.buscarDiagonalDerecha(i, j, lastFichaSelected);
                tableroT.buscarDiagonalIzquierda(i, j, lastFichaSelected);
            }, 1000)

            juego.cambiarTurnoJugador();
        }

    }

    /* Si la Ficha no fue soltada sobre la zona de drop, la ficha vuelve a su estado original
    * lo mismo si no hay lugar disponible en la columna para otra ficha. */
    if (!drawedFigure && lastClickedFigure != null) {
        lastClickedFigure.setPosX(lastPositionFigureX);
        lastClickedFigure.setPosY(lastPositionFigureY);
    }
    
    /* Resetear valores. */
    lastPositionFigureX = null;
    lastPositionFigureY = null;
    lastClickedFigure = null;
    velocidad = 0;
    dibujarCanvas();
    
}

function onMouseMove(e) {
    if (isMouseDown && lastClickedFigure != null) {
        lastClickedFigure.setPosition(e.offsetX, e.offsetY);
        dibujarCanvas();
    }
}


/** */

document.querySelectorAll('input[name="opciones1"]').forEach(radio => {
    radio.addEventListener('change', function() {
        const selectedValue = this.value;
        document.querySelectorAll('input[name="opciones2"]').forEach(radio2 => {
            if (radio2.value === selectedValue) {
                radio2.disabled = true;
            } else {
                radio2.disabled = false;
            }
        });
    });
});


/**  */

function getSelectedImageSrc(player) {
    const selectedRadio = document.querySelector(`input[name="opciones${player}"]:checked`);
    console.log(selectedRadio)
    if (selectedRadio) {
        const selectedImage = selectedRadio.nextElementSibling.querySelector('img');
        return selectedImage ? selectedImage.src : null;
    }
    return null;
}

document.querySelector('.jugar-juego').addEventListener('click', function() {
    const player1ImageSrc = getSelectedImageSrc(1);
    const player2ImageSrc = getSelectedImageSrc(2);

    if (player1ImageSrc) {
        console.log('Jugador 1 seleccionó:', player1ImageSrc);
    } else {
        console.log('Jugador 1 no ha seleccionado ninguna imagen.');
    }

    if (player2ImageSrc) {
        console.log('Jugador 2 seleccionó:', player2ImageSrc);
    } else {
        console.log('Jugador 2 no ha seleccionado ninguna imagen.');
    }
});

/** */







