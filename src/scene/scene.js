import { Square } from "../shapes/shapes/square";
import { Triangle } from "../shapes/shapes/triangle";
import { Graphics } from "./graphics"
import { Camera } from './camera';
import { getShapeProgram } from '../shaders/shaders.js';
import vertexShaderSource from '../shaders/shaders/vertexShaderSource.vert';
import fragmentShaderSource from '../shaders/shaders/fragmentShaderSource.frag';
import { mat4 } from 'gl-matrix';

export class Scene {
    constructor(gl) {
        this.gl = gl;

        this.program = getShapeProgram(gl, vertexShaderSource, fragmentShaderSource);
        this.objects = this.setupObjects();
        this.setupProjectionMatrix();

        this.clearColor = [0.988, 0.796, 0, 1.0];

        this.camera = new Camera(gl, this.program);
        this.graphics = new Graphics(gl, this.objects, this.camera, this.clearColor);
    }

    render() {
        this.graphics.render();
    }

    setupObjects() {
        const objects = [];
        objects.push(new Triangle(this.gl, this.program, 0.7, [1.0,0.0,0.0,1.0]));
        objects.push(new Square(this.gl, this.program, 0.5, [0.0, 0.0, 1.0, 1.0]));
        return objects;
    }

    setupProjectionMatrix() {
        const projectionMatrix = mat4.create();
        mat4.perspective(projectionMatrix, Math.PI / 4.0, 800 / 600, 0.1, 1000.0);
        this.gl.useProgram(this.program);
        const uProjMatrixLoc = this.gl.getUniformLocation(this.program, 'uProjectionMatrix');
        this.gl.uniformMatrix4fv(uProjMatrixLoc, false, projectionMatrix);
    }
}