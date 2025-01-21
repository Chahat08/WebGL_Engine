export function compileShader(gl, source, type) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    if (!success) {
        console.error('Could not compile shader: ', gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
    }

    return shader;
}

export function createShaderProgram(gl, vertexShaderSource, fragmentShaderSource) {
    const vertexShader = compileShader(gl, vertexShaderSource, gl.VERTEX_SHADER);
    const fragmentShader = compileShader(gl, fragmentShaderSource, gl.FRAGMENT_SHADER);

    if (!vertexShader || !fragmentShader) {
        console.error('Error compilgin shaders');
        return null;
    }

    const shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);

    gl.linkProgram(shaderProgram);

    const success = gl.getProgramParameter(shaderProgram, gl.LINK_STATUS);
    if (!success) {
        console.error('Program link failure: ', gl.getProgramInfoLog(shaderProgram));
        gl.deleteProgram(shaderProgram);
        return null;
    }

    return shaderProgram;
}

let cachedProgram = null; 

export function getShapeProgram(gl, vertexSource, fragmentSource) {
    if (!cachedProgram) {
        console.log(vertexSource);
        console.log(fragmentSource);
        cachedProgram = createShaderProgram(gl, vertexSource, fragmentSource);
    }
    return cachedProgram;
}