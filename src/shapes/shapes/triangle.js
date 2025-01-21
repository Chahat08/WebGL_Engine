import { Shape } from '../Shape.js';
import { getModelMatrix } from '../../utils/transformations.js';
import { getShapeProgram } from '../../shaders/shaders.js';
import vertexShaderSource from '../../shaders/shaders/vertexShaderSource.vert';
import fragmentShaderSource from '../../shaders/shaders/fragmentShaderSource.frag';

export class Triangle extends Shape {
    constructor(gl) {

        const vertices = [
            0.0, 0.5, 0.0,
            -0.5, -0.5, 0.0,
            0.5, -0.5, 0.0
        ];

        const modelMatrix = getModelMatrix(
            null,
            null,
            [2, 2, 2]
        );

        const program = getShapeProgram(gl, vertexShaderSource, fragmentShaderSource);
        super(gl, vertices, program, gl.TRIANGLES, gl.STATIC_DRAW, modelMatrix);
    }
}
