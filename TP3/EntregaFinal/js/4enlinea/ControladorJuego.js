
let spanNombreJugador = document.querySelector("#nombre-jugador");








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
        // Dibujar la imagen en el canvas
        //spanNombreJugador.innerHTML = "Turno " + juego.getTurno();
        
        context.drawImage(imagenFondo, 0, 0, canvas.width, canvas.height);
        juego.drawGame()
        fillText('48px Arial', '#FF8C33', '#23034D', "Turno " + juego.getTurno(), 500, 100);
        fillText('48px Arial', '#FF8C33', '#23034D', arr1.length, 65, 300);
        fillText('48px Arial', '#FF8C33', '#23034D', arr2.length, 875, 300);
    };
}

function fillText(font, fillStyle, strokeStyle, text, posX, posY) {
    // Configuración del texto
    context.font = font;
    context.fillStyle = fillStyle;
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.strokeStyle = strokeStyle; // Color del borde
    context.lineWidth = 3; // Grosor del borde
    // Escribir texto en el canvas
    context.fillText(text, posX, posY);
    context.strokeText(text, posX, posY);
}

/*function fillText() {
    // Configuración del texto
    context.font = '48px Arial';
    context.fillStyle = '#FF8C33';
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.strokeStyle = '#23034D'; // Color del borde
    context.lineWidth = 3; // Grosor del borde
    const text = "Turno " + juego.getTurno();
    // Escribir texto en el canvas
    context.fillText(text, 500, 100);
    context.strokeText(text, 500, 100);
}*/

function onMouseDown(e) {
    console.log("entre")
    isMouseDown = true;
    lastFichaSelected = null;
    //let clickFig = Helper.findClickedFigure(e.layerX, e.layerY);
    let clickFig = Helper.findClickedFigure(e.offsetX, e.offsetY);
    //let clickFig = Helper.findClickedFigure(e.clientX, e.clientY);
    //let clickFig = Helper.findClickedFigure(e.pageX, e.pageY);
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
    
    //clickZoneDrop = Helper.checkDropZone(e.layerX, e.layerY);
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

            juego.jugar();
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
        //lastClickedFigure.setPosition(e.layerX, e.layerY);
        lastClickedFigure.setPosition(e.offsetX, e.offsetY);
        dibujarCanvas();
    }
}





