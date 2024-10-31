class Drop extends Rect {

    constructor(posX, posY, width, height, fill, context, numeroColumna) {
        super(posX, posY, width, height, fill, context, null);

        this.esZonaDropeable = true;
        this.numeroColumna = numeroColumna;

        this.context = context;
    }

    getEsZonaDropeable() {
        return this.esZonaDropeable;
    }

    getNumeroColumna() {
        return this.numeroColumna;
    }

    
    drawZonaDropeable() {
        super.draw();
    }
}