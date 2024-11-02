class Juego {


    constructor (context, cantidadFichasGanadoras, nombreJugador1, nombreJugador2, imgJ1, imgJ2) {
        this.context = context;
        /* Generar tablero del juego */
        this.tablero = new Tablero(cantidadFichasGanadoras, context);

        /* Obtener la cantidad de fichas por jugador */
        this.cantidadFichasPerJugador = (this.tablero.getFilas()*this.tablero.getColumnas())/2;

        /* Generar conjunto de fichas para el jugador 1 */
        this.arrFichasJug1 = this.generarFichas(nombreJugador1, configurationsData.jugador1PosicionX,
        configurationsData.jugador1PosicionY, "red", imgJ1);
        /* Generar conjunto de fichas para el jugador 2 */
        this.arrFichasJug2 = this.generarFichas(nombreJugador2, configurationsData.jugador2PosicionX,
        configurationsData.jugador2PosicionY, 'green', imgJ2);

        this.turno = nombreJugador1;

        this.jugador1 = nombreJugador1;
        this.jugador2 = nombreJugador2;
       
    }



    /**
     * Getter && Setters
    **/

    getTurno() {
        return this.turno;
    }

    setTurno(turno) {
        this.turno = turno;
    }

    /* Obtener arreglo de fichas del jugador 1 */
    getFichasJug1() {
        return this.arrFichasJug1;
    }

    /* Obtener arreglo de fichas del jugador 2 */
    getFichasJug2() {
        return this.arrFichasJug2;
    }

    /* Obtener matriz de datos / tablero */
    getTablero() {
        return this.tablero;
    }

    /* Dibujar el juego */
    drawGame() {

        this.tablero.dibujarZonaDropeable();
        this.tablero.dibujarTablero();
         
        let rectJ1 = new Rect(15, 225, 100, 500, colors.colorZonaFichas, this.context);
        rectJ1.drawRoundRect([18, 18, 18, 18]);
        Helper.fillText(2,'52px Roboto', '#FF8C33', '#FF8C33', this.arrFichasJug1.length, configurationsData.fichaJug1ContadorPosX, configurationsData.fichaJug1ContadorPosY);
        
        this.dibujarFichas(this.arrFichasJug1);

        
        let rectJ2 = new Rect(825, 225, 100, 500, colors.colorZonaFichas, this.context);
        rectJ2.drawRoundRect([18, 18, 18, 18]);
        Helper.fillText(2,'52px Roboto', '#FF8C33', '#FF8C33', this.arrFichasJug2.length, configurationsData.fichaJug2ContadorPosX, configurationsData.fichaJug2ContadorPosY);
        

        this.dibujarFichas(this.arrFichasJug2);
        switch(String(this.turno)) {
            case String(this.jugador1):
                //Helper.fillText(2,'52px Roboto', '#FF8C33', '#FF8C33', this.arrFichasJug1.length, configurationsData.fichaJug1ContadorPosX, configurationsData.fichaJug1ContadorPosY);
                Helper.fillText(2,'52px Roboto', colors.colorStrokeTurnoAlert, colors.colorStrokeTurnoAlert, this.arrFichasJug1.length, configurationsData.fichaJug1ContadorPosX, configurationsData.fichaJug1ContadorPosY);
        
                this.arrFichasJug1[this.arrFichasJug1.length-1].getCircle().drawBorder();
                break;
            case String(this.jugador2):
                //Helper.fillText(2,'52px Roboto', '#FF8C33', '#FF8C33', this.arrFichasJug2.length, configurationsData.fichaJug2ContadorPosX, configurationsData.fichaJug2ContadorPosY);
                Helper.fillText(2,'52px Roboto', colors.colorStrokeTurnoAlert, colors.colorStrokeTurnoAlert, this.arrFichasJug2.length, configurationsData.fichaJug2ContadorPosX, configurationsData.fichaJug2ContadorPosY);
        
                this.arrFichasJug2[this.arrFichasJug2.length-1].getCircle().drawBorder();
                //rect2.drawBorder();
                break;
        }
    }

    /* Dibujar fichas */
    dibujarFichas(arr) {
        
        arr.forEach(element => {
                const circle = element.getCircle();
                circle.draw();
        });
    }

    /* Generar fichas del juego. */
    generarFichas(jugador, posX, posY, fill, imagePath) {
        let arr = [];

        let pos_Y = posY;
        for(let i = 0; i < this.cantidadFichasPerJugador; i ++) {
            const casilleroData = Helper.calcularDimensionesCasillero(configurationsData.tableroWidth, configurationsData.tableroHeight, this.tablero.getColumnas(), this.tablero.getFilas());
            const width = casilleroData.width;
            const height = casilleroData.height;
            const radius = Helper.calcularCirculo(posX, pos_Y, width, height).radius;
            arr.push(new Ficha(jugador, posX, pos_Y, radius, fill, this.context, imagePath));
            if (i<=20) {
                pos_Y = pos_Y - configurationsData.fichasDistanciaPosicionY;
            }
        }
        return arr;
    }

    cambiarTurnoJugador() {
        switch(String(this.turno)) {
            case String(this.jugador1):
                this.turno = this.jugador2;
                break;
            case String(this.jugador2):
                this.turno = this.jugador1;
                break;
        }

    }
}