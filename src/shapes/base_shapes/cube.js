import { Shape } from '../Shape.js';

export class Cube extends Shape {
    constructor(gl, program, sideLength, color) {

        const half = sideLength / 2.0;

        const vertices = [
            // Front face (z = half)
            -half, half, half,  0.0, 0.0, 1.0,
            half, half, half,   0.0, 0.0, 1.0,
            -half, -half, half, 0.0, 0.0, 1.0,
            -half, -half, half, 0.0, 0.0, 1.0,
            half, half, half,   0.0, 0.0, 1.0,
            half, -half, half,  0.0, 0.0, 1.0,

            // Back face (z = -half)
            -half, half, -half,   0.0, 0.0, -1.0,
            -half, -half, -half,  0.0, 0.0, -1.0,
            half, half, -half,    0.0, 0.0, -1.0,
            -half, -half, -half,  0.0, 0.0, -1.0,
            half, -half, -half,   0.0, 0.0, -1.0,
            half, half, -half,    0.0, 0.0, -1.0,

            // Left face (x = -half)
            -half, half, -half,   -1.0, 0.0, 0.0,
            -half, half, half,    -1.0, 0.0, 0.0,
            -half, -half, -half,  -1.0, 0.0, 0.0,
            -half, -half, -half,  -1.0, 0.0, 0.0,
            -half, half, half,    -1.0, 0.0, 0.0,
            -half, -half, half,   -1.0, 0.0, 0.0,

            // Right face (x = half)
            half, half, -half, 1.0, 0.0, 0.0,
            half, -half, -half, 1.0, 0.0, 0.0,
            half, half, half,   1.0, 0.0, 0.0,
            half, -half, -half, 1.0, 0.0, 0.0,
            half, -half, half,  1.0, 0.0, 0.0,
            half, half, half,   1.0, 0.0, 0.0,

            // Top face (y = half)
            -half, half, -half,  0.0, 1.0, 0.0,
            half, half, -half,   0.0, 1.0, 0.0,
            -half, half, half,   0.0, 1.0, 0.0,
            -half, half, half,   0.0, 1.0, 0.0,
            half, half, -half,   0.0, 1.0, 0.0,
            half, half, half,    0.0, 1.0, 0.0,

            // Bottom face (y = -half)
            -half, -half, -half,  0.0, -1.0, 0.0,
            -half, -half, half,   0.0, -1.0, 0.0,
            half, -half, -half,   0.0, -1.0, 0.0,
            -half, -half, half,   0.0, -1.0, 0.0,
            half, -half, half,    0.0, -1.0, 0.0,
            half, -half, -half,   0.0, -1.0, 0.0,
        ];

        super(gl, vertices, program, color, gl.TRIANGLES, gl.STATIC_DRAW);
    }
}