class Helper {


    /* Determina el tamanio que tendra el circulo */
    static calcularCirculo(posX, posY, width, height) {
        const circ_posX = width/2 + posX;
        const circ_posY = height/2 + posY;
        const circ_radius = width*1/3;

        return {
            posX: circ_posX,
            posY: circ_posY,
            radius: circ_radius
        }
    }

    /* Calcula las dimensiones del casillero */
    static calcularDimensionesCasillero(totalWidth, totalHeight, columnas, filas) {
        const width = totalWidth/columnas;
        const height = totalHeight/filas;

        return {
            width: width,
            height: height
        }
    }

    /* Verificar que se encuentre en la zona de drop */ 
    static checkDropZone(x, y) {
        //console.log(zoneDrop.length)
        for(let i=0; i < zoneDrop.length; i ++) {
            const element = zoneDrop[i];
            if(element.isPointInside(x, y)) {
                //console.log(element)
                return element;
            }
        }
    }

    /* Validar que la figura alla sido seleccionada */
    static findClickedFigure(x, y) {
        /* Recorrer fichas jugador 1 */
        for(let j = 0; j < arr1.length; j++) {
            const element = arr1[j].getCircle();
            if(element.isPointInside(x, y) && j == arr1.length-1) {
                lastFichaSelected = arr1[j];
                return element;
            }
        }
    
        /* Recorrer fichas jugador 2 */
        for(let j = 0; j < arr2.length; j++) {
            const element = arr2[j].getCircle();
            if(element.isPointInside(x, y) && j == arr2.length-1) {
                lastFichaSelected = arr2[j];
                return element;
            }
        }
    }

    /* Asigna la ficha al tablero y luego la elimina de la lista de fichas */
    static asignarFichaTablero(i, j, arr)  {
        const posX = tablero[i][j].getCircle().getPosX();
        const posY = tablero[i][j].getCircle().getPosY();
        lastClickedFigure.setPosX(posX);
        lastClickedFigure.setPosY(posY);
        tablero[i][j].setFicha(lastFichaSelected);
        arr.pop();
    }

    static simularGravedad(i, j, lastClickedFigure) {
        return new Promise((resolve) => {
    
            const posX = tablero[i][j].getCircle().getPosX();
            const posY = tablero[i][j].getCircle().getPosY();
    
            let posYc = lastClickedFigure.getPosY();
            velocidad += gravedad;
            posYc += velocidad;
    
            lastClickedFigure.setPosition(posX, posYc);
    
            // Verifica si la figura ha alcanzado la posición final
            if ((lastClickedFigure.getPosY() + lastClickedFigure.getRadius()) >= posY) {
                lastClickedFigure.setPosition(posX, posY);
                dibujarCanvas();
                resolve(); // Resuelve la promesa cuando la figura llega a su destino
            } else {
                dibujarCanvas();
                // Llama a simularGravedad nuevamente con un pequeño retraso
                setTimeout(() => {
                    this.simularGravedad(i, j, lastClickedFigure).then(resolve);
                }, 1);
            }
        });
    }

    static pintarPosCaida(i, j, lastClickedFigure, sePinta) {
        return new Promise((resolve) => {
    
            let circle = tablero[i][j].getCircle();
            /*const posX = tablero[i][j].getCircle().getPosX();
            const posY = tablero[i][j].getCircle().getPosY();*/
    
            let posYc = lastClickedFigure.getPosY();
    
            lastClickedFigure.setPosition(posX, posYc);
    
            // Verifica si la figura ha alcanzado la posición final
            if ((lastClickedFigure.getPosY() + lastClickedFigure.getRadius()) >= posY) {
                lastClickedFigure.setPosition(posX, posY);
                dibujarCanvas();
                resolve(); // Resuelve la promesa cuando la figura llega a su destino
            } else {
                dibujarCanvas();
                // Llama a simularGravedad nuevamente con un pequeño retraso
                setTimeout(() => {
                    this.simularGravedad(i, j, lastClickedFigure).then(resolve);
                }, 1);
            }
        });
    }

    static fillText(lineWitdh, font, fillStyle, strokeStyle, text, posX, posY) {
        // Configuración del texto
        context.font = font;
        context.fillStyle = fillStyle;
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        context.strokeStyle = strokeStyle; 
        //context.lineWidth = 2;
        context.lineWidth = lineWitdh; 
        context.fillText(text, posX, posY);
        context.strokeText(text, posX, posY);
    }

    static validarGanador(tableroT, i, j, lastFichaSelected, arr1, arr2) {

        if (arr1.lenght == 0 && arr2.lenght == 0) {
            console.log("Se acabaron todas las fichas")
            return false;
        }
        if (tableroT.buscarHorizontal(i, j, lastFichaSelected)) {
            console.log("Gano linea horizontal");
            return true;
        }

        if (tableroT.buscarVertical(i, j, lastFichaSelected)) {
            console.log("Gano linea vertical");
            return true;
        }

        if (tableroT.buscarDiagonalDerecha(i, j, lastFichaSelected)) {
            console.log("Gano linea diagnoal derecha");
            return true;
        }

        if (tableroT.buscarDiagonalIzquierda(i, j, lastFichaSelected)) {
            console.log("Gano linea diagonal inzquierda");
            return true;
        }

        return false;
    }

    static mostrarGanador(ganador, msg) {

        context.clearRect(0, 0, canvas.width, canvas.height);
        
        if (ganador) {
            msg = msg.replace('dato', ganador);
        }


        const imagenFondo = new Image();
        imagenFondo.src = images.fondoCanvas;
        imagenFondo.onload = function() {
            
            context.drawImage(imagenFondo, 0, 0, canvas.width, canvas.height);
            juego.drawGame()
            Helper.fillText(2,'70px Roboto', colors.colorGanadorMsg, colors.colorBordeGanadorMsg, msg, configurationsData.ganadorPosicionX, configurationsData.ganadorPosicionY);
        };
    }


    static dibujarTemporizador(tiempoRestante) {
        
        const msg = `${tiempoRestante}s`;
        const textWidth = context.measureText(msg).width;
        const x = (canvas.width - textWidth) / 2;
        const y = 50;

        Helper.fillText(2,'50px Roboto', '#E5D5FA', '#23034D', msg, 75, y);
    }
}