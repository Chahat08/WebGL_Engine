import { Square } from "../shapes/base_shapes/square";
import { Triangle } from "../shapes/base_shapes/triangle";
import { Graphics } from "./graphics"
import { Camera } from './camera';
import { Input } from './input';
import { getShapeProgram } from '../shaders/shaders.js';
import vertexShaderSource from '../shaders/shaders/vertexShaderSource.vert';
import fragmentShaderSource from '../shaders/shaders/fragmentShaderSource.frag';
import { mat4 } from 'gl-matrix';
import { Cube } from "../shapes/base_shapes/cube";

export class Scene {
    constructor(gl) {
        this.gl = gl;

        this.program = getShapeProgram(gl, vertexShaderSource, fragmentShaderSource);
        this.objects = this.setupObjects();
        this.setupProjectionMatrix();

        this.clearColor = [0.988, 0.796, 0, 1.0];

        this.camera = new Camera(gl, this.program);
        this.input = new Input(this.gl.canvas, this.camera);
        this.graphics = new Graphics(gl, this.objects, this.camera, this.input, this.clearColor);
    }

    render() {
        requestAnimationFrame(this.graphics.render);
    }

    setupObjects() {
        const objects = [];
        objects.push(new Triangle(this.gl, this.program, 0.7, [1.0,0.0,0.0,1.0]));
        objects.push(new Square(this.gl, this.program, 0.5, [0.0, 0.0, 1.0, 1.0]));
        objects.push(new Cube(this.gl, this.program, 1.0, [0.0, 1.0, 0.0, 1.0]));
        objects[0].translate([2, 0, 0]);
        objects[1].translate([-2, 0, 0]);
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