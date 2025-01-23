import { Shape } from '../Shape.js';
export class Triangle extends Shape {
    // equilateral tri of givne length
    constructor(gl, program, sideLength, color) {
        const halfLen = sideLength / 2.0;
        const tanThirty = Math.tan(180.0 * 30.0 / Math.PI);
        const val = halfLen * tanThirty;

        const vertices = [
            // vertex coords                                // normals
            0.0, (Math.sqrt(3.0) * halfLen) - val, 0.0,    0.0, 0.0, 1.0,
            halfLen, -val, 0.0,                            0.0, 0.0, 1.0,
            -halfLen, -val, 0.0,                           0.0, 0.0, 1.0
        ];

        super(gl, vertices, program, color, gl.TRIANGLES, gl.STATIC_DRAW);
    }
}
