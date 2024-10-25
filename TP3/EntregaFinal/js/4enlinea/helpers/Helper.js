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
}




/*
function simularGravedad(i, j, lastClickedFigure, contador) {
    console.log("simular gravedad");
    const posX = tablero[i][j].getCircle().getPosX();
    const posY = tablero[i][j].getCircle().getPosY();

    let cont = contador;
    
    
    
    let posYc = lastClickedFigure.getPosY();
    velocidad += gravedad;
    posYc += velocidad;

    lastClickedFigure.setPosition(posX, posYc)
    
    if ((lastClickedFigure.getPosY() + lastClickedFigure.getRadius()) >= posY) {
        lastClickedFigure.setPosition(posX, posY);
        dibujarCanvas();
        return;
        /*if(cont==6) {
            lastClickedFigure.setPosition(posX, posY);
            dibujarCanvas();
            return;
        } else {
            velocidad *= -0.5
            cont++;
        }
    }
    
    dibujarCanvas();
    setTimeout(()=> {simularGravedad(i,j, lastClickedFigure, cont)},  1);
}
/*
function detenerAnimacion() {
    cancelAnimationFrame(animationId)
}*/

/*
let animationId;
let velocidad = 0;
const gravedad = 0.98; 

function simularGravedad(i, j, lastClickedFigure, contador) {
    console.log("simular gravedad");
    const posX = tablero[i][j].getCircle().getPosX();
    const posY = tablero[i][j].getCircle().getPosY();

    let cont = contador;
    let posYc = lastClickedFigure.getPosY();
    velocidad += gravedad;
    posYc += velocidad;

    lastClickedFigure.setPosition(posX, posYc);
    console.log("contador: " + cont);

    if ((lastClickedFigure.getPosY() + lastClickedFigure.getRadius()) >= posY) {
        console.log("entre if");
        if (cont == 6) {
            lastClickedFigure.setPosition(posX, posY);
            dibujarCanvas();
            cancelAnimationFrame(animationId);
            return;
        } else {
            velocidad *= -0.5;
            cont++;
        }
    }

    lastClickedFigure.draw();
    dibujarCanvas();
    animationId = requestAnimationFrame(() => simularGravedad(i, j, lastClickedFigure, cont));
}

function cancelarAnimacion() {
    cancelAnimationFrame(animationId);
}*/

/*
let animationId;
let velocidad = 0;
const gravedad = 0.6; // Ajusta según sea necesario
const amortiguacion = 0.7; // Factor de amortiguación para el rebote

function simularGravedad(i, j, lastClickedFigure, contador) {
    console.log("simular gravedad");
    const posX = tablero[i][j].getCircle().getPosX();
    const posY = tablero[i][j].getCircle().getPosY();

    let cont = contador;
    let posYc = lastClickedFigure.getPosY();
    velocidad += gravedad;
    posYc += velocidad;

    lastClickedFigure.setPosition(posX, posYc);
    console.log("contador: " + cont);

    if ((lastClickedFigure.getPosY() + lastClickedFigure.getRadius()) >= posY) {
        console.log("entre if: " + Math.abs(velocidad));
        if (Math.abs(velocidad) < 0.4) { // Si la velocidad es muy baja, detener la animación
            lastClickedFigure.setPosition(posX, posY);
            dibujarCanvas();
            cancelAnimationFrame(animationId);
            return;
        } else {
            velocidad *= -amortiguacion; // Aplicar amortiguación al rebote
            cont++;
        }
    }

    lastClickedFigure.draw();
    dibujarCanvas();
    animationId = requestAnimationFrame(() => simularGravedad(i, j, lastClickedFigure, cont));
}

function cancelarAnimacion() {
    cancelAnimationFrame(animationId);
}*/
/*
let animationId;
let velocidad = 0;
const gravedad = 0.98; // Ajusta según sea necesario
const amortiguacion = 0.4; // Factor de amortiguación para el rebote
const umbralVelocidad = 0.2; // Umbral para considerar la velocidad como baja

function simularGravedad(i, j, lastClickedFigure, contador) {
    console.log("simular gravedad");
    const posX = tablero[i][j].getCircle().getPosX();
    const posY = tablero[i][j].getCircle().getPosY();

    let cont = contador;
    let posYc = lastClickedFigure.getPosY();
    velocidad += gravedad;
    posYc += velocidad;

    lastClickedFigure.setPosition(posX, posYc);
    console.log("contador: " + cont);

    if ((lastClickedFigure.getPosY() + lastClickedFigure.getRadius()) >= posY) {
        console.log("entre if");
        if (Math.abs(velocidad) < umbralVelocidad) { // Si la velocidad es muy baja, detener la animación
            lastClickedFigure.setPosition(posX, posY);
            dibujarCanvas();
            cancelAnimationFrame(animationId);
            return;
        } else {
            lastClickedFigure.setPosition(posX, posY - lastClickedFigure.getRadius());
            velocidad *= -amortiguacion; // Aplicar amortiguación al rebote
            cont++;
        }
    }

    lastClickedFigure.draw();
    dibujarCanvas();
    animationId = requestAnimationFrame(() => simularGravedad(i, j, lastClickedFigure, cont));
}

function cancelarAnimacion() {
    cancelAnimationFrame(animationId);
}
*/

/*
let animationId;
let velocidad = 0;
const gravedad = 0.98; // Ajusta según sea necesario
const amortiguacion = 0.7; // Factor de amortiguación para el rebote
const umbralVelocidad = 0.5; // Umbral para considerar la velocidad como baja

function simularGravedad(i, j, lastClickedFigure, contador) {
    console.log("simular gravedad");
    const posX = tablero[i][j].getCircle().getPosX();
    const posY = tablero[i][j].getCircle().getPosY();

    let cont = contador;
    let posYc = lastClickedFigure.getPosY();
    velocidad += gravedad;
    posYc += velocidad;

    lastClickedFigure.setPosition(posX, posYc);
    console.log("contador: " + cont);

    if ((lastClickedFigure.getPosY() + lastClickedFigure.getRadius()) >= posY) {
        console.log("entre if");
        if (Math.abs(velocidad) < umbralVelocidad) { // Si la velocidad es muy baja, detener la animación
            lastClickedFigure.setPosition(posX, posY);
            dibujarCanvas();
            cancelAnimationFrame(animationId);
            return;
        } else {
            lastClickedFigure.setPosition(posX, posY - lastClickedFigure.getRadius());
            velocidad *= -amortiguacion; // Aplicar amortiguación al rebote
            cont++;
        }
    }

    //lastClickedFigure.draw();
    dibujarCanvas();
    animationId = requestAnimationFrame(() => simularGravedad(i, j, lastClickedFigure, cont));
}

function cancelarAnimacion() {
    cancelAnimationFrame(animationId);
}*/
