class Circle extends Figure {

    constructor(posX, posY, radius, fill = null, context, img = null, borderColor = null) {
        super(posX, posY, fill, context);

        this.radius = radius;
        this.img = img;
        this.borderColor = borderColor;

        /* Si hay imagen, generar carga de la misma. */
        if (this.img) {
            this.img.onload = () => {
                this.imageLoaded = true; // Marcar la imagen como cargada
            };
            this.img.onerror = () => {
                console.error("Error al cargar la imagen");
            };
        }
    }

    setImage(img) {
        this.img = img;

        if (this.img) {
            this.img.onload = () => {
                this.imageLoaded = true; // Marcar la imagen como cargada
            };
            this.img.onerror = () => {
                console.error("Error al cargar la imagen");
            };
        }
    }

    getImage() {
        return this.img;
    }

    getRadius() {
        return this.radius;
    }

    setRadius(radius) {
        this.radius = radius;
    }

    draw() {
        
        super.draw();

        // Dibuja el círculo
        this.context.beginPath();
        this.context.arc(this.posX, this.posY, this.radius, 0, Math.PI * 2);
        this.context.closePath();

        if (this.fill) {
            this.context.fill();
        }

        // Si hay color de borde, dibuja el borde
        if (this.borderColor) {
            this.context.strokeStyle = this.borderColor; /* Darle color al marco del circulo */
            this.context.lineWidth = 3; // Grosor del borde
            this.context.arc(this.posX, this.posY, this.radius, 0, 2*Math.PI);
            this.context.stroke(); /* Dibujar linea */
        }

        // Si la imagen fue cargada correctamente, dibujarla
        if (this.imageLoaded) {
            this.context.drawImage(this.img, this.posX-this.radius, this.posY-this.radius, this.radius * 2, this.radius * 2);
        }
    }

    drawBorder() {
        this.context.beginPath();
        this.context.lineWidth = 6;
        //this.context.strokeStyle = 'rgba(216, 75, 32, 1)';
        //this.context.strokeStyle = 'rgba(0, 255, 0, 1)';
        this.context.strokeStyle = '#E5D5FA'
        //this.context.shadowColor = 'rgba(216, 75, 32, 1)'; // Color de la sombra con transparencia
        //this.context.shadowBlur = 3;
        this.context.arc(this.posX, this.posY, this.radius, 0, 2*Math.PI);
        this.context.stroke();
        this.context.closePath();
    }

    removeDraw() {
        //super.draw();
        this.context.globalCompositeOperation = 'destination-out';
        this.context.globalCompositeOperation = 'xor';
        this.context.beginPath();
        this.context.arc(this.posX, this.posY, this.radius, 0, 2*Math.PI);
        this.context.fill()
        this.context.lineWidth = 2;
        this.context.strokeStyle = 'black';
        this.context.stroke();
        /*this.context.lineWidth = 2;
        this.context.strokeStyle = 'black';
        this.context.stroke();
        this.context.closePath();*/
        this.context.globalCompositeOperation = 'source-over';
    
    }

    isPointInside(mouse_x, mouse_y) {
        let _x = this.posX - mouse_x;
        let _y = this.posY - mouse_y;

        return Math.sqrt(_x*_x + _y*_y) < this.radius;
    }

}