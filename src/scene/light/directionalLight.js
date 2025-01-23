import { vec3 } from 'gl-matrix';

export class DirectionalLight {
    constructor(program, direction, color) {
        this.program = program;
        this.direction = direction;
        this.color = color;
    }
}