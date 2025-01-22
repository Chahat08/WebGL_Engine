import { Shape } from '../Shape.js';

export class Square extends Shape {
    constructor(gl, program, sideLength, color) {
        const half = sideLength / 2.0;

        const vertices = [
            - half, half, 0.0,
            half, half, 0.0,
            - half, -half, 0.0,
            - half, -half, 0.0,
            half, half, 0.0,
            half, - half, 0.0
        ];
      
        super(gl, vertices, program, color, gl.TRIANGLES, gl.STATIC_DRAW);
    }
}
