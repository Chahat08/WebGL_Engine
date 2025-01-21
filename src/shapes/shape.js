import { createShaderProgram } from '../utils/shaders.js';

export class Shape {

    constructor(gl, vertices, vertexShaderSource, fragmentShaderSource, primitive = gl.TRIANGLES, drawMode = gl.STATIC_DRAW) {
        this.gl = gl;
        this.drawMode = drawMode;
        this.primitive = primitive;

        this.buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), drawMode);
        gl.bindBuffer(gl.ARRAY_BUFFER, null);

        this.vertexCount = vertices.length / 3; // each vert has 3 coords

        this.program = createShaderProgram(gl, vertexShaderSource, fragmentShaderSource);
        if (!this.program) {
            console.error('Failed to create shader program');
        }
    }

    draw() {
        const gl = this.gl;
        if (!this.program) return;

        gl.useProgram(this.program);
        
        gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);

        const aPositionLoc = gl.getAttribLocation(this.program, 'aPosition');
        if (aPositionLoc === -1) {
            console.error('Cannot find attribute aPosition in shader');
            return;
        }

        gl.enableVertexAttribArray(aPositionLoc);
        gl.vertexAttribPointer(
            aPositionLoc,
            3,          
            gl.FLOAT,
            false,      
            0,           
            0            
        );

        gl.drawArrays(this.primitive, 0, this.vertexCount);

        gl.bindBuffer(gl.ARRAY_BUFFER, null);
    }
}
