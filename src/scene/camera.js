import { vec3, mat4 } from 'gl-matrix';

export class Camera {
    constructor(gl, program) {
        this.gl = gl;
        this.program = program;

        this.position = vec3.fromValues(0.0, 0.0, 1.0);
        this.target = vec3.fromValues(0.0, 0.0, -1.0);
        this.up = vec3.fromValues(0.0, 1.0, 0.0);

        this.lookAt = mat4.create();
        this.updateLookAtMatrix();
    }

    updateLookAtMatrix() {
        this.lookAt = mat4.lookAt(this.lookAt, this.position, this.target, this.up);
        this.gl.useProgram(this.program);
        const uViewMatrixLoc = this.gl.getUniformLocation(this.program, 'uViewMatrix');
        this.gl.uniformMatrix4fv(uViewMatrixLoc, false, this.lookAt);
    }
}