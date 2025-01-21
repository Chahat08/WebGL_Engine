import { Shape } from '../Shape.js';
import { getShapeProgram } from '../../shaders/shaders.js';
import vertexShaderSource from '../../shaders/shaders/vertexShaderSource.vert';
import fragmentShaderSource from '../../shaders/shaders/fragmentShaderSource.frag';

export class Square extends Shape {
    constructor(gl, sideLength) {
        const vertices = [
            - sideLength / 2.0, sideLength / 2.0, 0.0,
            sideLength / 2.0, sideLength / 2.0, 0.0,
            - sideLength / 2.0, -sideLength / 2.0, 0.0,
            - sideLength / 2.0, -sideLength / 2.0, 0.0,
            sideLength / 2.0, sideLength / 2.0, 0.0,
            sideLength / 2.0, - sideLength / 2.0, 0.0
        ];
      
        const program = getShapeProgram(gl, vertexShaderSource, fragmentShaderSource);
        super(gl, vertices, program, gl.TRIANGLES, gl.STATIC_DRAW);
    }
}
