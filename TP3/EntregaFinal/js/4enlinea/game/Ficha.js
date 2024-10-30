class Ficha {

    constructor(jugador, posX, posY, radius, fill, context, imagePath) {

        let img = new Image();
        img.src = imagePath;
        this.circulo = new Circle(posX, posY, radius, fill, context, img, 'black');
        this.fuiSeleccionado = false;
        this.jugador = jugador;
        this.esMovible = true;
    }

    getCircle() {
        return this.circulo;
    }

    setCircle(circle) {
        this.circulo = circle;
    }

    getSeleccionado() {
        return this.fuiSeleccionado;
    }

    setSeleccionado(seleccionado) {
        this.fuiSeleccionado = seleccionado;
    }

    getJugador() {
        return this.jugador;
    }

    setJugador(jugador) {
        this.jugador = jugador;
    }

    draw() {
        this.circulo.draw();
    }

}