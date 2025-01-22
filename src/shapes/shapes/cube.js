import { Shape } from '../Shape.js';

export class Cube extends Shape {
    constructor(gl, program, sideLength, color) {
        const vertices = [
            - sideLength / 2.0, sideLength / 2.0, 0.0,
            sideLength / 2.0, sideLength / 2.0, 0.0,
            - sideLength / 2.0, -sideLength / 2.0, 0.0,
            - sideLength / 2.0, -sideLength / 2.0, 0.0,
            sideLength / 2.0, sideLength / 2.0, 0.0,
            sideLength / 2.0, - sideLength / 2.0, 0.0
        ];

        super(gl, vertices, program, color, gl.TRIANGLES, gl.STATIC_DRAW);
    }
}