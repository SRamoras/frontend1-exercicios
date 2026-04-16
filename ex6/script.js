const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let drawing = false;

canvas.onmousedown = () => drawing = true;
canvas.onmouseup = () => drawing = false;

canvas.onmousemove = (e) => {
    if (!drawing) return;
    ctx.fillStyle = "green";
    ctx.fillRect(e.offsetX, e.offsetY, 5, 5);
};



async function startScreen() {
    const stream = await navigator.mediaDevices.getDisplayMedia();

    const video = document.createElement("video");
    video.srcObject = stream;
    video.play();

    document.body.appendChild(video);
}

startScreen();