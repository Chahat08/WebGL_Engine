export class Graphics {
    constructor(gl, objects) {
        this.gl = gl;
        this.objects = objects;

        this.render = this.render.bind(this);
    }

    render() {
        this.resizeCanvasToDisplaySize(this.gl.canvas);

        this.gl.viewport(0, 0, this.gl.drawingBufferWidth, this.gl.drawingBufferHeight);

        this.gl.clearColor(0.988, 0.796, 0, 1.0);
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