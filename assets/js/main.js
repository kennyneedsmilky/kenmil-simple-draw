/* ケンミル */ /* 神様最高 */ "use strict"; console.log(new Date, Date.now());

/** DOM */
const toolsBtns = document.querySelectorAll(".tools__btn"); // Tools Buttons
const toolsColorPicker = document.querySelector(".tools__color-picker"); // Tools Color Picker
const toolsColorFields = document.querySelectorAll(".tools__color-field"); // Tools Color Fields
const toolsPenSizer = document.querySelector(".tools__pen-sizer"); // Tools Pen Sizer 
const canvas01 = document.querySelector(".canvas-01"); // Canvas 01
const canvas01_ctx = canvas01.getContext("2d"); // Get 2d Context

// Coloring variables
let drawColor = "black";
let drawWidth = "1";
let isDrawing = false;

/** Event Handler */

window.onload = e => {
	toolsColorPicker.value="#000000";
	toolsPenSizer.value = 1;
	resizeCanvas01();
}
	
document.addEventListener("touchstart", e => {
	mapTouchEvents(e,"mousedown");
},true);

document.addEventListener("touchmove", e => {
	mapTouchEvents(e,"mousemove");
},true);

document.addEventListener("touchend", e => {
	mapTouchEvents(e,"mouseup");
},true);

document.addEventListener("touchcancel", e => {
	mapTouchEvents(e,"mouseup");
},true);

canvas01.addEventListener("mousedown", startDrawing, false);
canvas01.addEventListener("mousemove", drawing, false);
canvas01.addEventListener("mouseup", stopDrawing, false);
canvas01.addEventListener("mouseout", stopDrawing, false);

// Tools Buttons
toolsBtns.forEach(btn => {
	btn.addEventListener("click", e => {
		if (btn.getAttribute("data-action") === "delete") clearCanvas();
	})
})

// Tools Color Picker
toolsColorPicker.addEventListener("input", () => changeColor(toolsColorPicker.value));

// Tools Color Fields
toolsColorFields.forEach(colorField => {
	colorField.addEventListener("click", () => {
		toolsColorPicker.value = colorField.getAttribute("data-color-id");
		changeColor(toolsColorPicker.value);
	});
})

// Tools Pen Sizer
toolsPenSizer.addEventListener("input", () => changePenSize());

/** Function */

// Resize canvas
function resizeCanvas01() {
	if (screen.width < 700) {
		canvas01.width = 300;
    	canvas01.height = 300;
	} else {
		canvas01.width = 500;
    	canvas01.height = 500;
	}
    
}

// Map Touch Events
function mapTouchEvents(e, simulatedType) {
	// This ignores the default scroll behavior.
	e.preventDefault();
	// Ignore any mapping if more than 1 fingers touching.
	let touch = e.changedTouches[0];
	// https://developer.mozilla.org/en/DOM/document.createEvent
	let eventToSimulate = document.createEvent("MouseEvent");
	// https://developer.mozilla.org/en-US/docs/Web/API/event.initMouseEvent
	eventToSimulate.initMouseEvent(
		simulatedType,		//type
		true,				//bubbles
		true,				//cancelable
		window,				//view
		1,					//detail
		touch.screenX,		//screenX
		touch.screenY,		//screenY
		touch.clientX,		//clientX
		touch.clientY,		//clientY
		false,				//ctrlKey
		false,				//altKey
		false,				//shiftKey
		false,				//metaKey
		0,					//button
		null				//relatedTarget
	);
	touch.target.dispatchEvent(eventToSimulate);
}

// Check for window resize.
window.addEventListener("resize", e => resizeCanvas01());

// Clear Canvas
function clearCanvas() {
    canvas01_ctx.fillStyle = "white"; // Canvas 01 Context Fillstyle
    canvas01_ctx.fillRect(0, 0, canvas01.width, canvas01.height);
}

// Start Drawing
function startDrawing(e) {
    e.preventDefault();
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

// Change Color
function changeColor(color) {
	drawColor = color;
}

// Change Pen Size
function changePenSize() {
	console.log(toolsPenSizer.value);
	drawWidth = toolsPenSizer.value;
}