import { vec3, mat4 } from 'gl-matrix';

export class Camera {
    constructor(gl, program) {
        this.gl = gl;
        this.program = program;

        this.position = vec3.fromValues(0.0, 0.0, 5.0);
        this.target = vec3.fromValues(0.0, 0.0, -1.0);
        this.up = vec3.fromValues(0.0, 1.0, 0.0);
        this.front = vec3.create();

        this.lookAt = mat4.create();
        this.updateLookAtMatrix();

        this.speed = 1.0;
    }

    updateLookAtMatrix() {
        vec3.add(this.front, this.position, this.target);
        this.lookAt = mat4.lookAt(this.lookAt, this.position, this.front, this.up);
        this.gl.useProgram(this.program);
        const uViewMatrixLoc = this.gl.getUniformLocation(this.program, 'uViewMatrix');
        this.gl.uniformMatrix4fv(uViewMatrixLoc, false, this.lookAt);
    }

    move(direction, deltaTime) {
        const speed = this.speed * deltaTime;

        console.log(this.position);

        if (direction === 'forward') {
            const forwardOffset = vec3.create();
            vec3.scale(forwardOffset, this.target, speed);
            vec3.add(this.position, this.position, forwardOffset);
        }

        else if (direction === 'backward') {
            const backwardOffset = vec3.create();
            vec3.scale(backwardOffset, this.target, speed);
            vec3.subtract(this.position, this.position, backwardOffset);
        }

        else if (direction === 'leftward') {
            const leftOffset = vec3.create();
            vec3.cross(leftOffset, this.target, this.up);
            vec3.normalize(leftOffset, leftOffset);
            vec3.scale(leftOffset, leftOffset, speed);
            vec3.subtract(this.position, this.position, leftOffset);
        }

        else {
            const rightOffset = vec3.create();
            vec3.cross(rightOffset, this.target, this.up);
            vec3.normalize(rightOffset, rightOffset);
            vec3.scale(rightOffset, rightOffset, speed);
            vec3.add(this.position, this.position, rightOffset);
        }

        this.updateLookAtMatrix();
    }
}