const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

function resize() {
    canvas.width = window.innerWidth - 30;
    canvas.height = window.innerHeight - 30;
}

resize();
window.addEventListener('resize', resize);

function step() {
    console.log("step");

    ctx.fillStyle = "rgb(0, 255, 0)";
    ctx.fillRect(50, 50, 20, 20);

    requestAnimationFrame(step);
}

window.addEventListener('load', () => {
    step();
});