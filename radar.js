class Radar {
    constructor() {
        this.angle = 0;
        this.angleIncrement = 0.01;
        this.currentPointX = 0;
        this.currentPointY = 0;
        this.currentPointState = "dormant";
    }

    draw() {
        this.currentPointX = canvas.width / 2;
        this.currentPointY = canvas.height / 2;
        for (let i = 0; i < 1300; i++) {
            this.currentPointX += Math.cos(this.angle);
            this.currentPointY += Math.sin(this.angle);
            gameObjectList.forEach(object => {
                if (utils.distance(this.currentPointX, this.currentPointY, object.x, object.y) <= object.radius) {
                    this.currentPointState = "active";
                }
            });
            if (this.currentPointState == "active") {
                ctx.fillStyle = "rgb(0, 255, 0)";
            } else if (this.currentPointState == "dormant") {
                ctx.fillStyle = "rgb(0, 100, 0)";
            }
            ctx.fillRect(this.currentPointX, this.currentPointY, 2, 2);

            this.currentPointState = "dormant";
        }
        
        this.angle += this.angleIncrement;
    }
}