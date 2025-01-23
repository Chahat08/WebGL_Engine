import { Shape } from '../Shape.js';

export class Cube extends Shape {
    constructor(gl, program, sideLength, color) {

        const half = sideLength / 2.0;

        const vertices = [
            // Front face (z = half)
            -half, half, half, 
            half, half, half, 
            -half, -half, half, 
            -half, -half, half, 
            half, half, half, 
            half, -half, half, 

            // Back face (z = -half)
            -half, half, -half, 
            -half, -half, -half, 
            half, half, -half, 
            -half, -half, -half, 
            half, -half, -half,
            half, half, -half, 

            // Left face (x = -half)
            -half, half, -half, 
            -half, half, half, 
            -half, -half, -half,
            -half, -half, -half,
            -half, half, half, 
            -half, -half, half,

            // Right face (x = half)
            half, half, -half, 
            half, -half, -half,
            half, half, half, 
            half, -half, -half,
            half, -half, half, 
            half, half, half, 

            // Top face (y = half)
            -half, half, -half, 
            half, half, -half, 
            -half, half, half, 
            -half, half, half, 
            half, half, -half, 
            half, half, half, 

            // Bottom face (y = -half)
            -half, -half, -half, 
            -half, -half, half, 
            half, -half, -half, 
            -half, -half, half, 
            half, -half, half, 
            half, -half, -half
        ];

        super(gl, vertices, program, color, gl.TRIANGLES, gl.STATIC_DRAW);
    }
}