import './styles.css';
import { Triangle } from './shapes/shapes/triangle.js';
import { Square } from './shapes/shapes/square.js';

function initWebGL() {
    const canvas = document.getElementById("game");
    const gl = canvas.getContext('webgl');

    if (!gl) {
        alert("WebGL is not supported.");
        return null;
    }

    return gl;
}

function main() {
    const gl = initWebGL();
    if (!gl) return;

    resizeCanvasToDisplaySize(gl.canvas);

    gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);

    gl.clearColor(0.988, 0.796, 0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    const triangle = new Triangle(gl);
    const square = new Square(gl);

    triangle.draw();
    square.draw();
}

function resizeCanvasToDisplaySize(canvas) {
    const realToCSSPixels = window.devicePixelRatio || 1;

    const displayWidth = Math.floor(canvas.clientWidth * realToCSSPixels);
    const displayHeight = Math.floor(canvas.clientHeight * realToCSSPixels);

    if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
        canvas.width = displayWidth;
        canvas.height = displayHeight;
    }
}

window.onload = main;