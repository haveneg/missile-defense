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
let radar = new Radar({
    centered: true,
    distance: 1300
});




//mouse inputs
let mouse = {
    x: 0,
    y: 0,
    click: false,
    down: false,
};

document.addEventListener('click', (event) => { //after mouse is pressed and released
    mouse.click = true; 
    mouse.down = false; //mouse has actually been released
});

document.addEventListener("mousedown", (event) => { //fires 
    mouse.down = true;
})

document.addEventListener("mousemove", (event) => { //updates mouse position
    mouse.x = event.clientX - canvas.offsetLeft + canvas.width / 2;// - canvas.offsetLeft;
    mouse.y = event.clientY - canvas.offsetTop;
});


//arbitrarily creates game objects, game object factory
function createGameObject(type, x, y, r, tag) {
    if (type = "missile") {
        gameObjectList.push(new Missile({
            x: x,
            y: y,
            radius: r,
            tag: tag
        }));
    } else {
        gameObjectList.push(new GameObject({
            x: x,
            y: y,
            radius: r,
        }));
    }
}

//temporary testing, making 20 random objects
for (let i = 0; i < 20; i++) {
    createGameObject("missile", Math.random() * canvas.width, Math.random() * canvas.height, 10, "friend");
}



function step() {

    //fading the screen
    ctx.fillStyle = "rgba(0, 0, 0, 0.006)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);


    //Radar
    radar.draw();

    //update game objects
    gameObjectList.forEach(object => {
        object.update();
        object.draw();
    });

    //mouse drawing
    if (mouse.down) {
        ctx.fillStyle = "rgb(0, 255, 0)";
        ctx.strokeStyle = "rgb(0, 255, 0)";
    } else {
        ctx.fillStyle = "rgb(0, 100, 0)";
        ctx.strokeStyle = "rgb(0, 100, 0)";
    }
    ctx.strokeRect(mouse.x - 20, mouse.y - 15, 40, 30);
    ctx.fillRect(mouse.x - 30, mouse.y, 20, 1);
    ctx.fillRect(mouse.x + 10, mouse.y, 20, 1);
    ctx.fillRect(mouse.x, mouse.y - 25, 1, 15);
    ctx.fillRect(mouse.x, mouse.y + 10, 1, 15);

    //FROM HERE ON STAYS ON BOTTOM
    mouse.click = false;
    
    //setTimeout(() => {
        requestAnimationFrame(step);
    //}, 0);
}

window.addEventListener('load', () => {
    step();
});