class Tablero {
    

    constructor(fichasGanadoras, context) {
        const DEFAULT_FICHAS_GANADORAS = 4; /* Cantidad de fichas ganadoras por defecto. */
        const DEFAULT_FILAS_TABLERO = 6; /* Cantidad de filas por defecto del tablero de juego */
        const DEFAULT_COLUMNAS_TABLERO = 7; /* Cantidad de columnas por defecto del tablero de juego */
        /**
         * Se calcula la diferencia entre la cantidad por defecto de fichas ganadoras
         * y la cantidad provista mediante argumento al flujo.
         * 
         * Este dato sirver para poder redimensionar el tablero de ser necesario.
         */
        const diff = fichasGanadoras - DEFAULT_FICHAS_GANADORAS;
        this.filas = DEFAULT_FILAS_TABLERO + diff;
        this.columnas = DEFAULT_COLUMNAS_TABLERO + diff;
        this.fichasGanadoras = fichasGanadoras;

        /* Calcular la cantidad de fichas para cada jugador. */
        this.cantidadFichasPerJugador = (this.filas * this.columnas)/2; 
        this.context = context;
    
        /* Generar tablero. */
        this.tablero = this.generarMatriz(context);

        this.zonaDropeable = this.generarZonaDropeable();
    }

    /* Obtener la cantidad de filas */
    getFilas() {
        return this.filas;
    }

    /* Obtener la cantidad de columnas */
    getColumnas() {
        return this.columnas;
    }

    /* Obtener matriz de datos / tablero */
    getMatriz() {
        return this.tablero;
    }

    /* Obtener arreglo de zona dropeable. */
    getZonaDropeable() {
        return this.zonaDropeable;
    }

    generarZonaDropeable() {
        let zonaDropeable = [];
        for (let i = 0; i < this.columnas; i ++) {
            const casilleroData = Helper.calcularDimensionesCasillero(configurationsData.tableroWidth, 
                configurationsData.zonaDropeableHeight, this.columnas, 1); /* Hay que ver la forma de que esto sea dinamico. */
            
            const posX = (configurationsData.startZonaDropeableX + casilleroData.width*(i+1));
            const posY = (configurationsData.startZonaDropeableY + casilleroData.height);
            zonaDropeable.push(new Drop(posX, posY, casilleroData.width,
                casilleroData.height, colors.zonaDropeableColor, this.context, i));
        }

        return zonaDropeable;
    }

    /* Genera la matriz de casilleros, ademas le proporciona las coordenadas x, y y sus respectivos tamanios a los casilleros. */
    generarMatriz(context) {
        let matriz = new Array(this.filas);
        const casilleroData = Helper.calcularDimensionesCasillero(configurationsData.tableroWidth, configurationsData.tableroHeight, this.columnas, this.filas); /* Hay que ver la forma de que esto sea dinamico. */

        for(let i = 0; i < this.filas; i++) {
            matriz[i] = new Array(this.columnas);

            for (let j = 0; j < this.columnas; j++) {
                /* Calcular la coordenada 'x' => 
                * columna donde se debe posicionar la ficha cuando sea dibujada. 
                */
                const posX = (configurationsData.startTableroPosX + casilleroData.width*(j+1)); 
                /* Calcular la coordenada 'y' =>
                * fila donde se debe posicionar la ficha cuando sea dibujada. 
                */
                const posY = (configurationsData.startTableroPosY + casilleroData.height*(i)); 
                const width = casilleroData.width;
                const height = casilleroData.height;
                /*if(i==0) {
                    matriz[i][j] = new Casillero(posX, posY, width, height, 'rgba(0, 0, 0, 0)', context, true);
                } else {
                    matriz[i][j] = new Casillero(posX, posY, width, height, 'rgba(162, 120, 218, 0.8)', context);
                }*/
                matriz[i][j] = new Casillero(posX, posY, width, height, colors.colorTablero, context);
                
            }
        }
        return matriz;
    }

    /* Dibuja el tablero en la pantalla */
    dibujarTablero() {
        for(let i = 0; i < this.filas; i++) {
            for (let j = 0; j < this.columnas; j++) {
                this.tablero[i][j].drawCasillero(i, j, this.filas, this.columnas);
            }
        }
    }

    dibujarZonaDropeable() {
        for (let j = 0; j < this.columnas; j++) {
            this.zonaDropeable[j].drawZonaDropeable();
            this.zonaDropeable[j].drawZonaDropeable();
        }
    }

    /**
     * A continuacion logicas para validar ganador del juego
     * 
     * Validar linea horizontal, vertical, diagonales.
     * 
    */

    /* Busca las fichas del jugador que jugo */
    buscar(x, y, pieza, x_sum, y_sum, contadorPieza) {

        x+=x_sum;
        y+=y_sum;

        //console.log(pieza.getJugador())
        if (x < 0 || y < 0 || x == this.filas || y == this.columnas || this.tablero[x][y].getFicha() == null || !(String(this.tablero[x][y].getFicha().getJugador()) == String(pieza.getJugador()))) {
            return false;
        } else {
            contadorPieza.contador++;
        }

        if(contadorPieza.contador == this.fichasGanadoras) {
            return true;
        }

        return this.buscar(x, y, pieza, x_sum, y_sum, contadorPieza);
    }

    /* Verifica si la linea horizontal forma al ganador */
    buscarHorizontal(x, y, pieza) {
        let contador = {contador: 1};
        
        if (this.buscar(x, y, pieza, 0, 1, contador)) {
            console.log(`${pieza.getJugador()} gano el juego`);
            return;
        }

        if (this.buscar(x, y, pieza, 0, -1, contador)) {
            console.log(`${pieza.getJugador()} gano el juego`);
            return;
        }
    }

    /* Verifica si la linea vertical forma al ganador */
    buscarVertical(x, y, pieza) {
        let data = {contador: 1};
        
        if(this.buscar(x, y, pieza, 1, 0, data)) {
            console.log(`${pieza.getJugador()} gano el juego`);
            return;
        }

    }

    /* Verifica si la linea diagonal derecha superior/izquierda inferior a la pieza forma al ganador */
    buscarDiagonalDerecha(x, y, pieza) {
        let data = {contador: 1};

        if(this.buscar(x, y, pieza, -1, 1, data)) {
            console.log(`${pieza.getJugador()} gano el juego`);
            return;
        }

        if(this.buscar(x, y, pieza, 1, -1, data)) {
            console.log(`${pieza.getJugador()} gano el juego`);
            return;
        }
    }

    /* Verifica si la linea diagonal izquierda superior/derecha inferior a la pieza forma al ganador */
    buscarDiagonalIzquierda(x, y, pieza) {
        let data = {contador: 1};

        if(this.buscar(x, y, pieza, -1, -1, data)) {
            console.log(`${pieza.getJugador()} gano el juego`);
            return;
        }

        if(this.buscar(x, y, pieza, 1, 1, data)) {
            console.log(`${pieza.getJugador()} gano el juego`);
            return;
        }
    }

    /* Buscar la posicion para colocar una nueva pieza
    en el tablero segun la columna en la que se solto la ficha */
    buscarPosicion(columna) {
        let i = this.filas -1

        while(i >= 0 && this.tablero[i][columna].getFicha()!=null) {
            i--;
        }

        return i;
    }


}



