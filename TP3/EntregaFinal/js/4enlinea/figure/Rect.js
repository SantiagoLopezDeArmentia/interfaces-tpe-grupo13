class Rect extends Figure {

    constructor(posX, posY, width, height, fill, context) {
        super(posX, posY, fill, context);

        this.width = width;
        this.height = height
    }

    draw() {
        super.draw();
        this.context.fillRect(this.posX, this.posY, this.width, this.height);
    }

    drawRoundRect(arr) {
        super.draw();
        //context.strokeStyle = "l";
        context.beginPath()
        context.fillStyle = this.fill;
        context.roundRect(this.posX, this.posY, this.width, this.height,  arr);
        //context.stroke()
        this.context.fill()
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