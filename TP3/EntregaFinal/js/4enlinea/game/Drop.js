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

    /*
    drawZonaDropeable() {
        super.draw();
    }*/

    
    drawZonaDropeable() {
        //this.context.save();
        if(this.isTwinkling) {
            this.context.fillStyle = 'rgba(255, 245, 11, 1)';
        } else {
            //this.context.fillStyle = 'rgba(0, 0, 0, 0.8)'
            this.context.fillStyle = this.fill
        }
        this.context.fillRect(this.posX, this.posY, this.width, this.height);
        //this.context.restore();
    }

    setGradient() {
        let ctx = this.context;
        let gradient = ctx.createLinearGradient(this.getPosX(), this.getPosY(), this.getPosX(), this.getPosY() + this.getHeight());
        
        gradient.addColorStop(0, 'rgba(0, 0, 0, 0.8)'); 
        gradient.addColorStop(0.5, 'rgba(0, 0, 0, 0.5)');
        gradient.addColorStop(1, 'rgba(255, 0, 0, 0)');
        this.setFill(gradient);
    }

    /*
    drawZonaDropeable() {
        
        if (this.isTwinkling) {
            this.context.save();
            let gradient = this.context.createLinearGradient(this.posX, this.posY, this.posX, this.posY + this.height);
            gradient.addColorStop(0, 'rgba(0, 0, 0, 1)'); // Negro
            gradient.addColorStop(1, 'rgba(255, 255, 255, 0)'); // Blanco transparente
            this.context.fillStyle = gradient;
        } else {
            this.context.fillStyle = colors.zonaDropeableColor;
        }
        this.context.fillRect(this.posX, this.posY, this.width, this.height);
        this.context.restore();
    }


    startTwinkle() {
        if (!this.twinkleInterval) {
            this.isTwinkling = true;
            this.twinkleInterval = setInterval(() => {
                this.isTwinkling = !this.isTwinkling;
                this.drawZonaDropeable();
            }, 500); // Cambia el color cada 500ms
        }
    }

    stopTwinkle() {
        if (this.twinkleInterval) {
            clearInterval(this.twinkleInterval);
            this.twinkleInterval = null;
            this.isTwinkling = false;
            this.drawZonaDropeable();
        }
    }*/
}