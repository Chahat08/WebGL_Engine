export class Graphics {
    constructor(gl, objects, clearColor) {
        this.gl = gl;
        this.objects = objects;
        this.clearColor = clearColor;

        this.render = this.render.bind(this);
    }

    render() {
        this.resizeCanvasToDisplaySize(this.gl.canvas);

        this.gl.viewport(0, 0, this.gl.drawingBufferWidth, this.gl.drawingBufferHeight);

        this.gl.clearColor(this.clearColor[0], this.clearColor[1], this.clearColor[2], this.clearColor[3]);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT);

        this.drawObjects();

        requestAnimationFrame(this.render);
    }

    drawObjects() {
        for (const object of this.objects)
            object.draw();
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