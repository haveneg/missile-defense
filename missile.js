class Missile extends GameObject {
    constructor(config) {
        super(config);

        this.tag = config.tag || "friend";
        this.angle = config.angle || 0;
        this.xVelocity = 0;
        this.yVelocity = 0;
        this.accelerationConstant = 0.003;
        this.topSpeed = 1;
    }
    update() {
        if (utils.hypotenuse(this.xVelocity, this.yVelocity) < this.topSpeed) {
            this.xVelocity += Math.cos(this.angle) * this.accelerationConstant;
            this.yVelocity += Math.sin(this.angle) * this.accelerationConstant;
        } else if (utils.hypotenuse(this.xVelocity, this.yVelocity) >= this.topSpeed) {
            this.xVelocity = this.topSpeed * Math.cos(this.angle);
            this.yVelocity = this.topSpeed * Math.sin(this.angle);
        }
        this.x += this.xVelocity;
        this.y += this.yVelocity;

        //angle adjustments
        if (this.tag == "friend") {
            if (mouse.x - this.x >= 0) {
                this.angle = Math.atan((mouse.y - this.y) / (mouse.x - this.x));
            } else if (mouse.x - this.x < 0) {
                this.angle = Math.atan((mouse.y - this.y) / (mouse.x - this.x)) + Math.PI;
            }
        }
    }
    draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        ctx.strokeStyle = "rgb(0, 100, 0)";
        ctx.strokeRect(-10, -10, 30, 20);
        ctx.restore();
    }
}