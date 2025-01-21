import { mat4 } from 'gl-matrix';

export class Shape {

    constructor(gl, vertices, shaderProgram, primitive = gl.TRIANGLES, drawMode = gl.STATIC_DRAW) {
        this.gl = gl;
        this.drawMode = drawMode;
        this.primitive = primitive;
        this.program = shaderProgram;

        this.buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), drawMode);
        gl.bindBuffer(gl.ARRAY_BUFFER, null);

        this.vertexCount = vertices.length / 3; // each vert has 3 coords
        this.modelTransform = mat4.create();
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

        this.transform(this.modelTransform);

        gl.drawArrays(this.primitive, 0, this.vertexCount);

        gl.bindBuffer(gl.ARRAY_BUFFER, null);
    }

    transform(modelTransform) {
        if (modelTransform)
            this.modelTransform = modelTransform;

        const gl = this.gl;
        const uModelLoc = gl.getUniformLocation(this.program, 'uModelMatrix');
        gl.uniformMatrix4fv(uModelLoc, false, this.modelTransform);
    }
}
