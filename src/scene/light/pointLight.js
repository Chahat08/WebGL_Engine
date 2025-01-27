import { vec3 } from 'gl-matrix';
import { Cube } from "../../shapes/base_shapes/cube";

export class PointLight {
    constructor(gl, light_program, object_program, position, color, draw = true) {
        this.gl = gl;
        this.light_program = light_program;
        this.object_program = object_program;
        this.position = position;
        this.color = color;

        if (draw) {
            gl.useProgram(this.light_program);
            // TODO: ALLOW ASSOCIATING OTHER OBJECTS WITH LIGHTS
            this.lightObject = new Cube(this.gl, this.light_program, 0.1, this.color);
            this.lightObject.translate(this.position);
        }
        else this.lightObject = null;

        this.setUniforms();
    }

    setUniforms() {
        const gl = this.gl;
        gl.useProgram(this.object_program);
        const uLightColorLoc = gl.getUniformLocation(this.object_program, 'uLightColor');
        gl.uniform4fv(uLightColorLoc, this.color);
    }

    draw() {
        if (!this.lightObject)
            return;

        this.lightObject.draw();
    }

    
}