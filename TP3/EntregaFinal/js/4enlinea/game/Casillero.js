class Casillero {

    constructor(posX, posY, width, height, fill, context) {
        this.posX = posX;
        this.posY = posY;
        this.width = width;
        this.height = height;
        this.circulo = null;
        this.ficha = null;

        let img = new Image();
        img.src = images.imagenFondoTablero;

        this.cuadrado = new Rect(posX, posY, width, height, fill, context, img);
        const circuloData = Helper.calcularCirculo(posX, posY, width, height);
        this.circulo = new Circle(circuloData.posX, circuloData.posY, circuloData.radius, colors.colorCircCasillero, context, null,'black');   
    }

    getWidth() {
        return this.width;
    }

    getHeight() {
        return this.height;
    }

    setWidth(width) {
        this.width = width;
    }

    setHeight(height) {
        this.height = height;
    }

    /* Devuelve el cuadrado del casillero */
    getRect() {
        return this.cuadrado;
    }

    /* Devuelve el circulo del casillero */
    getCircle() {
        return this.circulo;
    }

    /* Asigna una ficha al casillero */
    setFicha(ficha) {
        this.ficha = ficha;
    }

    /* Devuelve la ficha asiganda al casillero.*/
    getFicha() {
        return this.ficha;
    }

    /* Dibujar casillero */
    drawCasillero(i, j, filas, columnas) {

        if(i==0 && j==0) {
            /* Redondea la esquina superior izquierda. */
            this.cuadrado.drawRoundRect([18, 0, 0, 0]); 
        } else if (i==0 && j==columnas-1) {
            /* Redondea la esquina superior derecha. */
            this.cuadrado.drawRoundRect([0, 18, 0, 0]); 
        } else if(i==filas-1 && j==0) {
            /* Redondea la esquina inferior derecha. */
            this.cuadrado.drawRoundRect([0, 0, 0, 18]); 
        } else if(i==filas-1 && j==columnas-1) {
            /* Redondea la esquina inferior izquierda. */
            this.cuadrado.drawRoundRect([0, 0, 18, 0]); 
        } else {
            /* Dibuja el cuadrado tradicional. */
            this.cuadrado.draw(); 
        }
        this.circulo.draw(); /* Dibuja el circulo tradicional */

        if(this.ficha!=null) {
            this.ficha.draw();
        }
    }
}