/* ケンミル */ /* 神様最高 */ "use strict"; console.log(new Date);

/** DOM */

const canvas01 = document.querySelector(".canvas-01"); // Canvas 01
const canvas01_ctx = canvas01.getContext("2d"); // Get 2d Context

// Coloring variables
let drawColor = "black";
let drawWidth = "2";
let isDrawing = false;

/** Event Handler */

// Events for both mouse and touch.
canvas01.addEventListener("touchstart", startDrawing, false);
canvas01.addEventListener("touchmove", drawing, false);
canvas01.addEventListener("touchend", stopDrawing, false);

canvas01.addEventListener("mousedown", startDrawing, false);
canvas01.addEventListener("mousemove", drawing, false);
canvas01.addEventListener("mouseup", stopDrawing, false);
canvas01.addEventListener("mouseout", stopDrawing, false);

/** Function */

// Clear Canvas
function clearCanvas() {
    canvas01_ctx.fillStyle = "white"; // Canvas 01 Context Fillstyle
    canvas01_ctx.fillRect(0, 0, canvas01.width, canvas01.height); 
}

// Start Drawing
function startDrawing(e) {
    e.preventDefault();
    console.log(e.clientX - canvas01.offsetLeft, e.clientY - canvas01.offsetTop); // How to fix this for touch?
    isDrawing = true;
    canvas01_ctx.beginPath();
    canvas01_ctx.moveTo(e.clientX - canvas01.offsetLeft, e.clientY - canvas01.offsetTop);
}

// Drawing
function drawing(e) {
    e.preventDefault();
    if (isDrawing === true) {
        // It seems like the problem starts here for touch screens.
        canvas01_ctx.lineTo( e.clientX - canvas01.offsetLeft, e.clientY - canvas01.offsetTop ); 
        canvas01_ctx.strokeStyle = drawColor;
        canvas01_ctx.lineWidth = drawWidth;
        canvas01_ctx.lineCap = "round";
        canvas01_ctx.lineJoin = "round";
        canvas01_ctx.stroke();
    }
}

// Stop Drawing
function stopDrawing(e) {
    e.preventDefault();
    if (isDrawing) {
        canvas01_ctx.stroke();
        canvas01_ctx.closePath();
        isDrawing = false;
    }
}
