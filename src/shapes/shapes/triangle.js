import { Shape } from '../Shape.js';
import vertexShaderSource from '../../shaders/vertexShaderSource.vert';
import fragmentShaderSource from '../../shaders/fragmentShaderSource.frag';

export class Triangle extends Shape {
    constructor(gl) {

        const vertices = [
            0.0, 0.5, 0.0,
            -0.5, -0.5, 0.0,
            0.5, -0.5, 0.0
        ];

        super(gl, vertices, vertexShaderSource, fragmentShaderSource, gl.TRIANGLES);
    }
}
