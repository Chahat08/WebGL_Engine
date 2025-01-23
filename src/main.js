import './styles.css';
import { Scene } from './scene/scene';

function initWebGL() {
    const canvas = document.getElementById("canvas");
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

    const scene = new Scene(gl);
    scene.render();
}

window.onload = main;