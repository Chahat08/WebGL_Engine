import { Square } from "../shapes/base_shapes/square";
import { Triangle } from "../shapes/base_shapes/triangle";
import { Graphics } from "./graphics"
import { Camera } from './camera';
import { Input } from './input';
import { createShaderProgram } from '../shaders/shaders.js';
import vertexShaderSource from '../shaders/shaders/vertexShaderSource.vert';
import object_fragmentShaderSource from '../shaders/shaders/fragmentShaderSource.frag';
import light_fragmentShaderSource from '../shaders/shaders/Light_fragmentShaderSource.frag';
import { mat4 } from 'gl-matrix';
import { Cube } from "../shapes/base_shapes/cube";
import { PointLight } from './light/pointLight.js';

export class Scene {
    constructor(gl) {
        this.gl = gl;

        this.objectShader = createShaderProgram(gl, vertexShaderSource, object_fragmentShaderSource);
        this.lightShader = createShaderProgram(gl, vertexShaderSource, light_fragmentShaderSource);
        this.objects = this.setupObjects();
        this.lights = this.setupLights();
        this.setupProjectionMatrix();

        this.clearColor = [0.0, 0.0, 0, 1.0];

        this.camera = new Camera();
        this.input = new Input(this.gl.canvas, this.camera);
        this.graphics = new Graphics(gl, this.objects, this.lights, this.objectShader, this.lightShader,
            this.camera, this.input, this.clearColor);
    }

    render() {
        requestAnimationFrame(this.graphics.render);
    }

    setupObjects() {
        const objects = [];
        objects.push(new Cube(this.gl, this.objectShader, 1.0, [1.0, 0.5, 0.31, 1.0]));
        return objects;
    }

    setupLights() {
        const lights = [];
        lights.push(new PointLight(this.gl, this.lightShader, this.objectShader, [1.2, 1.0, 2.0], [1.0, 1.0, 1.0, 1.0], true));
        return lights;
    }

    setupProjectionMatrix() {
        const projectionMatrix = mat4.create();
        mat4.perspective(projectionMatrix, Math.PI / 4.0, 800 / 600, 0.1, 1000.0);

        this.gl.useProgram(this.objectShader);
        const uProjMatrixLoc_ObjectShader = this.gl.getUniformLocation(this.objectShader, 'uProjectionMatrix');
        this.gl.uniformMatrix4fv(uProjMatrixLoc_ObjectShader, false, projectionMatrix);

        this.gl.useProgram(this.lightShader);
        const uProjMatrixLoc_LightShader = this.gl.getUniformLocation(this.lightShader, 'uProjectionMatrix');
        this.gl.uniformMatrix4fv(uProjMatrixLoc_LightShader, false, projectionMatrix);
    }
}