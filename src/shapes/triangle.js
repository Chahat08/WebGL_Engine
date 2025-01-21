import { createShaderProgram } from '../utils/shaders.js';
import vertexShaderSource from '../shaders/vertexShaderSource.vert';
import fragmentShaderSource from '../shaders/fragmentShaderSource.frag';

export function drawTriangle(gl) {
    console.log(vertexShaderSource);
    console.log(fragmentShaderSource);

    const vertices = new Float32Array([
        0.0,  0.5, 0.0,
       -0.5, -0.5, 0.0,
        0.5, -0.5, 0.0
    ]);

    const vao = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vao);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    const program = createShaderProgram(gl, vertexShaderSource, fragmentShaderSource);
    if (!program) {
        console.error('Failed to create shader program');
        return;
    }

    gl.useProgram(program);

    const aPositionLocation = gl.getAttribLocation(program, 'aPosition');
    gl.enableVertexAttribArray(aPositionLocation);
    gl.vertexAttribPointer(
        aPositionLocation,
        3,
        gl.FLOAT,
        false,
        0,
        0
    );

    gl.drawArrays(gl.TRIANGLES, 0, 3);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);

}