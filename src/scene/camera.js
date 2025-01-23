import { vec3, mat4 } from 'gl-matrix';

export class Camera {
    constructor(gl, program) {
        this.gl = gl;
        this.program = program;

        this.position = vec3.fromValues(0.0, 0.0, 5.0);
        this.target = vec3.fromValues(0.0, 0.0, -1.0);
        this.up = vec3.fromValues(0.0, 1.0, 0.0);
        this.worldUp = vec3.fromValues(0.0, 1.0, 0.0);
        this.right = vec3.create();
        vec3.cross(this.right, this.target, this.up);
        vec3.normalize(this.right, this.right);

        this.pitch = 0.0;
        this.yaw = -Math.PI / 2.0;
        this.constrainPitch = true;

        this.lookAt = mat4.create();
        this.updateLookAtMatrix();

        this.speed = 1.0;
    }

    updateLookAtMatrix() {
        const front = vec3.create();
        vec3.add(front, this.position, this.target);
        this.lookAt = mat4.lookAt(this.lookAt, this.position, front, this.up);
        this.gl.useProgram(this.program);
        const uViewMatrixLoc = this.gl.getUniformLocation(this.program, 'uViewMatrix');
        this.gl.uniformMatrix4fv(uViewMatrixLoc, false, this.lookAt);
    }

    updateCameraVectors() {
        const front = vec3.create();
        front[0] = Math.cos(this.yaw) * Math.cos(this.pitch);
        front[1] = Math.sin(this.pitch);
        front[2] = Math.sin(this.yaw) * Math.cos(this.pitch);
        vec3.normalize(this.target, front);

        vec3.cross(this.right, this.target, this.worldUp);
        vec3.normalize(this.right, this.right);

        vec3.cross(this.up, this.right, this.target);
        vec3.normalize(this.up, this.up);

        this.updateLookAtMatrix();
    }

    move(direction, deltaTime) {
        const speed = this.speed * deltaTime;

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
            vec3.scale(leftOffset, this.right, speed);
            vec3.subtract(this.position, this.position, leftOffset);
        }

        else if(direction =='rightward') {
            const rightOffset = vec3.create();
            vec3.scale(rightOffset, this.right, speed);
            vec3.add(this.position, this.position, rightOffset);
        }

        else if (direction == 'upward') {
            const upOffset = vec3.create();
            vec3.scale(upOffset, this.up, speed);
            vec3.add(this.position, this.position, upOffset);
        }

        else if (direction == 'downward') {
            const downOffset = vec3.create();
            vec3.scale(downOffset, this.up, speed);
            vec3.subtract(this.position, this.position, downOffset);
        }

        this.updateLookAtMatrix();
    }

    lookAround(xoffset, yoffset, deltaTime) {
        this.yaw += xoffset * deltaTime;
        this.pitch += yoffset * deltaTime;

        if (this.constrainPitch) {
            if (this.pitch > (Math.PI/2.0) - Math.PI/180.0)
                this.pitch = (Math.PI / 2.0) - Math.PI / 180.0;
            if (this.pitch < -((Math.PI / 2.0) - Math.PI / 180.0))
                this.pitch = -((Math.PI / 2.0) - Math.PI / 180.0);
        }

        this.updateCameraVectors();
    }
}