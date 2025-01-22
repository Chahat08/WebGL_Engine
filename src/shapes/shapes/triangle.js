import { Shape } from '../Shape.js';
import { getModelMatrix } from '../../utils/transformations.js';
import { getShapeProgram } from '../../shaders/shaders.js';
import vertexShaderSource from '../../shaders/shaders/vertexShaderSource.vert';
import fragmentShaderSource from '../../shaders/shaders/fragmentShaderSource.frag';

export class Triangle extends Shape {
    // equilateral tri of givne length
    constructor(gl, sideLength) {
        const halfLen = sideLength / 2.0;
        const tanThirty = Math.tan(180.0 * 30.0 / Math.PI);
        const val = halfLen * tanThirty;

        const vertices = [
            0.0, (Math.sqrt(3.0) * halfLen) - val, 0.0,
            halfLen, -val, 0.0,
            -halfLen, -val, 0.0
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
