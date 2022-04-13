//basic canvas setup
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

//window resizing
function resize() {
    canvas.width = window.innerWidth - 30;
    canvas.height = window.innerHeight - 30;
}
resize();
window.addEventListener('resize', resize);



//variables

let radarAngle = 0;
let utils = new Utility();
let gameObjectList = [];
let radar = new Radar();

//arbitrarily creates game objects
function createGameObject(x, y, r) {
    gameObjectList.push(new GameObject({
        x: x,
        y: y,
        radius: r
    }));
}

//temporary testing, making 20 random objects
for (let i = 0; i < 20; i++) {
    createGameObject(Math.random() * canvas.width, Math.random() * canvas.height, 10);
}



function step() {

    //fading the screen
    ctx.fillStyle = "rgba(0, 0, 0, 0.009)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);


    //Radar
    radar.draw();

    requestAnimationFrame(step);
}

window.addEventListener('load', () => {
    step();
});