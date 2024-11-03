
/* Variables */
let lastPositionFigureX;
let lastPositionFigureY;
let lastFichaSelected;
let lastClickedFigure = null;
let isMouseDown = false;
let velocidad = 0; 
const gravedad = 2; 
let player1ImageSrc;
let player2ImageSrc;
let nombreJugador1;
let nombreJugador2;
let gameOption;
let gameOptionTime;
let jugar = false;
let juegoTerminado = false;
let tiempoRestante = cantidades.timer;
let lastDropZone = null;
let lastDropCell = null;

/* Obtener elementos html */
let juegoSel = document.querySelector('.juego-sel');
let canvas = document.querySelector(".canvas");
let context = canvas.getContext("2d");
let btnJugar = document.querySelector('.jugar-juego');
const bntReiniciar = document.querySelector(".reiniciar-boton");
const btnNuevoJuego = document.querySelector(".nuevo-juego-boton");
const canvasContainer = document.querySelector('.canvas-container');


canvas.width = configurationsData.canvasWidth;
canvas.height = configurationsData.canvasHeight;
//canvas.style.border = "1px solid #000";

/* Asignar eventos al canvas */
canvas.addEventListener('mousedown', onMouseDown, false);
canvas.addEventListener('mouseup', onMouseUp, false);
canvas.addEventListener('mousemove', onMouseMove, false);

btnJugar.addEventListener('click', eventJugar);
bntReiniciar.addEventListener('click', reiniciarJuego);
btnNuevoJuego.addEventListener('click', nuevoJuego);

async function eventJugar() {
    await eventoJugar();
    juego = new Juego(context, gameOption, nombreJugador1, nombreJugador2, player1ImageSrc, player2ImageSrc);
    ejecutarJuego(juego);
    if(gameOptionTime=="con-tiempo"){
        iniciarTemporizador();
    }
}

/* Dibuja el canvas con la imagen de fondo y luego posiciona el juego por encima */
function dibujarCanvas() {
    const imagenFondo = new Image();
    imagenFondo.src = images.fondoCanvas;
    imagenFondo.onload = function() {
        
        context.drawImage(imagenFondo, 0, 0, canvas.width, canvas.height);
        juego.drawGame();
        
        Helper.fillText(3,'58px Roboto', colors.colorTurnoMsg, colors.colorBordeTurnoMsg, mensajes.msgTurno + juego.getTurno(), configurationsData.turnoPosicionX, configurationsData.turnoPosicionY);
        
        if(gameOptionTime=="con-tiempo") {
            Helper.dibujarTemporizador(tiempoRestante);
        }
        
    };
}

function onMouseDown(e) {
    if(juegoTerminado) return;

    isMouseDown = true;
    lastFichaSelected = null;
    let clickFig = Helper.findClickedFigure(e.offsetX, e.offsetY);
    if(clickFig != null && lastFichaSelected.getJugador() == juego.getTurno()) {
        lastClickedFigure = clickFig;
        lastPositionFigureX = lastClickedFigure.getPosX();
        lastPositionFigureY = lastClickedFigure.getPosY();
        lastClickedFigure.drawBorder();
        tableroT.mostrarZonaDropeable(true)
        
    }

    dibujarCanvas();
}

async function onMouseUp(e) {
    if(juegoTerminado) return;

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
                case nombreJugador1:
                    Helper.asignarFichaTablero(i, j, arr1);
                    break;
                case nombreJugador2:
                    Helper.asignarFichaTablero(i, j, arr2);
                    break;
            }

            drawedFigure = true;
            setTimeout(()=> {
                if (Helper.validarGanador(tableroT, i, j, lastFichaSelected, arr1, arr2)) {
                    juegoTerminado = true;
                    Helper.mostrarGanador(lastFichaSelected.getJugador(), mensajes.msgGanador);
                }
            }, 500)
           
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
    tableroT.mostrarZonaDropeable(false)
    dibujarCanvas();
    
}

function onMouseMove(e) {
    if(juegoTerminado) return;

    if (isMouseDown && lastClickedFigure != null) {

        let clickZoneDrop = Helper.checkDropZone(e.offsetX, e.offsetY);

        if (clickZoneDrop != null) {
            // Si hay una zona de drop anterior, restaurar su color original
            if (lastDropZone && lastDropZone !== clickZoneDrop) {
                lastDropZone.setGradient(); // Cambia 'color original' al color que deseas restaurar
            }

            let ctx = clickZoneDrop.getContext();
            let gradient = ctx.createLinearGradient(clickZoneDrop.getPosX(), clickZoneDrop.getPosY(),
            clickZoneDrop.getPosX(), clickZoneDrop.getPosY() + clickZoneDrop.getHeight());
            gradient.addColorStop(0, 'rgba(255, 255, 255, 0.5)'); 
            gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.3)');
            gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
            // Pintar la nueva zona de drop de blanco
            clickZoneDrop.setFill(gradient); // Blanco

            // Actualizar la última zona de drop
            lastDropZone = clickZoneDrop;
        } else if (lastDropZone) {
            // Si no hay zona de drop bajo el mouse, restaurar la última zona de drop
            lastDropZone.setGradient(); // Cambia 'color original' al color que deseas restaurar
            lastDropZone = null;
        }


        lastClickedFigure.setPosition(e.offsetX, e.offsetY);
        dibujarCanvas();
    }
}

function ejecutarJuego(juego) {
    tableroT = juego.getTablero();
    tablero = tableroT.getMatriz();
    zoneDrop = tableroT.getZonaDropeable();

    filas = tableroT.getFilas();
    columnas = tableroT.getColumnas();

    arr1 = juego.getFichasJug1();
    arr2 = juego.getFichasJug2();

    dibujarCanvas();
    
}

function getSelectedImageSrc(player) {
    const selectedRadio = document.querySelector(`input[name="opciones${player}"]:checked`);
    if (selectedRadio) {
        const selectedImage = selectedRadio.nextElementSibling.querySelector('img');
        return selectedImage ? selectedImage.src : null;
    }
    return null;
}

function eventoJugar() {
    return new Promise((resolve, reject) => {
        player1ImageSrc = getSelectedImageSrc(1);
        player2ImageSrc = getSelectedImageSrc(2);

        nombreJugador1 = document.querySelector('#input-nombre-jugador-1').value;
        nombreJugador2 = document.querySelector('#input-nombre-jugador-2').value;

        if (!player1ImageSrc) {
            console.log('Jugador 1 no ha seleccionado ninguna imagen.');
            alert('Jugador 1 debe seleccionar una imagen.');
            return reject('Jugador 1 debe seleccionar una imagen.');
        }

        if (!player2ImageSrc) {
            console.log('Jugador 2 no ha seleccionado ninguna imagen.');
            alert('Jugador 2 debe seleccionar una imagen.');
            return reject('Jugador 2 debe seleccionar una imagen.');
        }

        if (!nombreJugador1) {
            console.log('Jugador 1 no ha ingresado un nombre.');
            alert('Jugador 1 debe ingresar un nombre.');
            return reject('Jugador 1 debe ingresar un nombre.');
        }

        if (!nombreJugador2) {
            console.log('Jugador 2 no ha ingresado un nombre.');
            alert('Jugador 2 debe ingresar un nombre.');
            return reject('Jugador 2 debe ingresar un nombre.');
        }

        if (nombreJugador1 === nombreJugador2) {
            console.log('Los nombres de los jugadores no pueden ser iguales.');
            alert('Los nombres de los jugadores no pueden ser iguales.');
            return reject('Los nombres de los jugadores no pueden ser iguales.');
        }

        if (!gameOption) {
            console.log('Se debe seleccionar un modo de juego');
            alert('Se debe seleccionar un modo de juego');
            return reject('Se debe seleccionar un modo de juego');
        }

        if (!gameOptionTime) {
            console.log('Se debe elegir el modo de tiempo del juego.');
            alert('Se debe elegir el modo de tiempo del juego.');
            return reject('Se debe elegir el modo de tiempo del juego.');
        }

        console.log('Jugador 1 seleccionó:', player1ImageSrc);
        console.log('Jugador 2 seleccionó:', player2ImageSrc);
        console.log('Nombre Jugador 1:', nombreJugador1);
        console.log('Nombre Jugador 2:', nombreJugador2);

        jugar = true;

        juegoSel.classList.toggle('hidden');
        canvasContainer.classList.toggle('hidden');
        /*canvas.classList.toggle('hidden');
        bntReiniciar.classList.toggle('hidden');
        btnNuevoJuego.classList.toggle('hidden');*/

        // Resuelve la promesa después de realizar todas las acciones necesarias
        resolve();
    });
}



configurationsEvents()


function configurationsEvents() {

    document.querySelectorAll('input[name="opciones1"]').forEach(radio => {
        radio.addEventListener('change', function() {
            const selectedValue = this.value;
            document.querySelectorAll('input[name="opciones2"]').forEach(radio2 => {
                const label = radio2.nextElementSibling;
                const img = label.querySelector('img'); 
                if (radio2.value === selectedValue) {
                    radio2.disabled = true;
                    label.classList.add('disabled');
                    img.classList.add('disabled')
                } else {
                    radio2.disabled = false;
                    label.classList.remove('disabled');
                    img.classList.remove('disabled');
                }
            });
        });
    });

    document.querySelectorAll('input[name="opciones2"]').forEach(radio2 => {
        radio2.addEventListener('change', function() {
            const selectedValue = this.value;
            document.querySelectorAll('input[name="opciones1"]').forEach(radio1 => {
                const label = radio1.nextElementSibling;
                const img = label.querySelector('img'); 
                if (radio1.value === selectedValue) {
                    radio1.disabled = true;
                    label.classList.add('disabled');
                    img.classList.add('disabled')
                } else {
                    radio1.disabled = false;
                    label.classList.remove('disabled');
                    img.classList.remove('disabled');
                }
            });
        });
    });
    

    document.querySelectorAll('input[name="game-options"]').forEach(radio => {
        radio.addEventListener('change', function() {
            gameOption = this.value;
            console.log('Modo de juego seleccionado:', gameOption);
        });
    });

    document.querySelectorAll('input[name="game-options-time"]').forEach(radio => {
        radio.addEventListener('change', function() {
            gameOptionTime = this.value;
            console.log('Tiempo de juego seleccionado:', gameOptionTime);
        });
    });
}


function iniciarTemporizador() {
    const intervalo = setInterval(() => {
        if (juegoTerminado) {
            clearInterval(intervalo);
            return;
        }

        tiempoRestante--;
        dibujarCanvas();

        if (tiempoRestante <= 0) {
            clearInterval(intervalo);
            juegoTerminado = true;
            Helper.mostrarGanador(null, mensajes.msgSinGanadores);
        }
    }, 1000);
}


function reiniciarJuego() {
    juegoTerminado = false;
    tiempoRestante = cantidades.timer; 
    juego = new Juego(context, gameOption, nombreJugador1, nombreJugador2, player1ImageSrc, player2ImageSrc);
    ejecutarJuego(juego);
    if(gameOptionTime=="con-tiempo"){
        clearInterval(intervalo);
        iniciarTemporizador();
    }
}

function nuevoJuego() {
    const baseUrl = window.location.origin;
    console.log(baseUrl)
    window.location.href = `${baseUrl}/interfaces-tpe-grupo13/TP3/EntregaFinal/4enlinea.html`;

}