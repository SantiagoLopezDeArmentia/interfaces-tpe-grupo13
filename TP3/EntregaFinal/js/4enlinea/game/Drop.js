class Drop extends Rect {

    constructor(posX, posY, width, height, fill, context, numeroColumna) {
        super(posX, posY, width, height, fill, context, null);

        this.esZonaDropeable = true;
        this.numeroColumna = numeroColumna;

        this.context = context;

        this.isTwinkling = false;
        this.twinkleInterval = null;
    }

    getEsZonaDropeable() {
        return this.esZonaDropeable;
    }

    getNumeroColumna() {
        return this.numeroColumna;
    }
    
    drawZonaDropeable() {
        if(this.isTwinkling) {
            this.context.fillStyle = 'rgba(255, 245, 11, 1)';
        } else {
            this.context.fillStyle = this.fill
        }
        this.context.fillRect(this.posX, this.posY, this.width, this.height);
    }

    setGradient() {
        let ctx = this.context;
        let gradient = ctx.createLinearGradient(this.getPosX(), this.getPosY(), this.getPosX(), this.getPosY() + this.getHeight());
        
        gradient.addColorStop(0, 'rgba(0, 0, 0, 0.8)'); 
        gradient.addColorStop(0.5, 'rgba(0, 0, 0, 0.5)');
        gradient.addColorStop(1, 'rgba(255, 0, 0, 0)');
        this.setFill(gradient);
    }
}