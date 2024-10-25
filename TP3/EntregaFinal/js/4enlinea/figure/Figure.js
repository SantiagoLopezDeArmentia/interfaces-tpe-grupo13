class Figure {

    constructor(posX, posY, fill, context) {
        this.posX = posX;
        this.posY = posY;
        this.fill = fill;
        this.context = context;
    }

    getContext() {
        return this.context;
    }

    setFill(fill) {
        this.fill = fill;
    }

    setPosX(posX) {
        this.posX = posX;
    }

    setPosY(posY) {
        this.posY = posY;
    }

    setPosition(posX, posY) {
        this.setPosX(posX);
        this.setPosY(posY);
    }

    getFill() {
        return this.fill;
    }

    getPosX() {
        return this.posX;
    }

    getPosY() {
        return this.posY;
    }

    getPosition() {
        return {
            x: this.getPosX(),
            y: this.getPosY()
        };
    }

    draw() {
        this.context.fillStyle = this.fill;
    }
    
    isPointInside(mouse_x, mouse_y) {}
}