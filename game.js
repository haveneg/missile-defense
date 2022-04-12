const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

function resize() {
    canvas.width = window.innerWidth - 40;
    canvas.height = window.innerHeight - 40;
}

window.addEventListener('resize', resize);