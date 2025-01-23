import { vec3 } from 'gl-matrix';

export class PointLight {
    constructor(program, position, color) {
        this.program = program;
        this.position = position;
        this.color = color;
    }
}