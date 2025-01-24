export class Graphics {
    constructor(gl, objects, lights, camera, input, clearColor) {
        this.gl = gl;
        this.objects = objects;
        this.lights = lights;
        this.clearColor = clearColor;
        this.camera = camera;
        this.input = input;

        this.render = this.render.bind(this);
        this.prevTime = 0;
    }

    render(currTime) {
        currTime *= 0.001; // millisecs
        const deltaTime = currTime - this.prevTime;
        this.prevTime = currTime;

        this.resizeCanvasToDisplaySize(this.gl.canvas);

        this.gl.viewport(0, 0, this.gl.drawingBufferWidth, this.gl.drawingBufferHeight);

        this.gl.clearColor(this.clearColor[0], this.clearColor[1], this.clearColor[2], this.clearColor[3]);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT);

        this.camera.updateLookAtMatrix();
        this.drawObjects();
        this.drawLights();

        this.input.handleInput(deltaTime);
        requestAnimationFrame(this.render);
    }

    drawObjects() {
        for (const object of this.objects)
            object.draw();
    }

    drawLights() {
        for (const lights of this.lights)
            lights.draw();
    }

    resizeCanvasToDisplaySize(canvas) {
        const realToCSSPixels = window.devicePixelRatio || 1;

        const displayWidth = Math.floor(canvas.clientWidth * realToCSSPixels);
        const displayHeight = Math.floor(canvas.clientHeight * realToCSSPixels);

        if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
            canvas.width = displayWidth;
            canvas.height = displayHeight;
        }
    }
}