class Rect extends Figure {

    constructor(posX, posY, width, height, fill, context, imgP = null) {
        super(posX, posY, fill, context);

        this.width = width;
        this.height = height

        this.img = imgP;

        /* Si hay imagen, generar carga de la misma. */
        if (this.img) {
            this.img.onload = ()=> {
                this.imageLoaded = true; // Marcar la imagen como cargada
            };
            this.img.onerror = ()=> {
                console.error("Error al cargar la imagen");
            };
        }
    }

    draw() {
        super.draw();
        this.context.fillRect(this.posX, this.posY, this.width, this.height);
        // Si la imagen fue cargada correctamente, dibujarla
        if (this.imageLoaded) {
            this.context.save();
            this.context.globalAlpha = 0.3;
            this.context.drawImage(this.img, this.posX, this.posY, this.width, this.height);
            this.context.restore(); 
        }
    }

    drawRoundRect(arr) {
        super.draw();
        this.context.beginPath()
        this.context.fillStyle = this.fill;
        this.context.roundRect(this.posX, this.posY, this.width, this.height,  arr);
        this.context.fill()
        // Si la imagen fue cargada correctamente, dibujarla
        if (this.imageLoaded) {
            this.context.save();
            this.context.globalAlpha = 0.3;
            this.context.clip();
            this.context.drawImage(this.img, this.posX, this.posY, this.width, this.height);
            this.context.restore(); 
        }
    }

    drawBorder() {
        this.context.beginPath();
        this.context.lineWidth = 6;
        this.context.strokeStyle = 'rgba(0, 255, 0, 1)';
        this.context.shadowColor = 'rgba(216, 75, 32, 1)';
        //this.context.shadowBlur = 3;s
        this.context.strokeRect(this.posX, this.posY, this.width, this.height);
        this.context.closePath();
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

    isPointInside(mouse_x, mouse_y) {
        return !(mouse_x < this.posX || mouse_x > this.posX + this.width ||
        mouse_y < this.posY || mouse_y > this.posY + this.height);
    }
}