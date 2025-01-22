import { mat4, vec4 } from 'gl-matrix';

export class Shape {

    constructor(gl, vertices, shaderProgram, color = [0.176, 0.431, 0.878, 1.0], primitive = gl.TRIANGLES, drawMode = gl.STATIC_DRAW) {
        this.gl = gl;
        this.drawMode = drawMode;
        this.primitive = primitive;
        this.program = shaderProgram;

        this.color = color

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

        const uColorLoc = gl.getUniformLocation(this.program, 'uFragmentColor');
        gl.uniform4fv(uColorLoc, this.color);

        const uModelLoc = gl.getUniformLocation(this.program, 'uModelMatrix');
        gl.uniformMatrix4fv(uModelLoc, false, this.modelTransform);

        gl.drawArrays(this.primitive, 0, this.vertexCount);

        gl.bindBuffer(gl.ARRAY_BUFFER, null);
    }

    translate(translationVector) {
        mat4.translate(this.modelTransform, this.modelTransform, translationVector);
    }

    rotate(rotationVector) {
        const radX = (rotationVector[0] * Math.PI) / 180;
        const radY = (rotationVector[1] * Math.PI) / 180;
        const radZ = (rotationVector[2] * Math.PI) / 180;

        mat4.rotateX(this.modelTransform, this.modelTransform, radX);
        mat4.rotateY(this.modelTransform, this.modelTransform, radY);
        mat4.rotateZ(this.modelTransform, this.modelTransform, radZ);
    }

    scale(scalingVector) {
        mat4.scale(this.modelTransform, this.modelTransform, scalingVector)
    }

}
