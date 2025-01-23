import { vec2 } from 'gl-matrix';
export class Input {
    constructor(camera) {
        this.camera = camera;

        this.keysDown = {};

        this.mouseSensitivity = 0.00000000000000000000000000001;
        this.lastMousePosition = null;
        this.mouseDelta = vec2.create();

        window.addEventListener('keydown', (event) => {
            this.keysDown[event.key] = true;
        });

        window.addEventListener('keyup', (event) => {
            delete this.keysDown[event.key];
        });

        window.addEventListener('mousemove', (event) => {
            this.handleMouseMove(event);
        });

    }

    handleInput(deltaTime) {
        this.cameraPositionChange(deltaTime);
        this.cameraLookAroundChange(deltaTime);
    }

    handleMouseMove(event) {
        const currentMousePosition = [event.clientX, event.clientY];

        if (this.lastMousePosition) {
            const xoffset = currentMousePosition[0] - this.lastMousePosition[0];
            const yoffset = this.lastMousePosition[1] - currentMousePosition[1]; // invert y ax

            vec2.set(this.mouseDelta, xoffset, yoffset);
        }

        this.lastMousePosition = currentMousePosition;
    }

    cameraPositionChange(deltaTime) {
        if (this.keysDown['w'] || this.keysDown['W'])
            this.camera.move("forward", deltaTime);

        if (this.keysDown['s'] || this.keysDown['S'])
            this.camera.move("backward", deltaTime);

        if (this.keysDown['d'] || this.keysDown['D'])
            this.camera.move("rightward", deltaTime);

        if (this.keysDown['a'] || this.keysDown['A'])
            this.camera.move("leftward", deltaTime);

        if (this.keysDown['ArrowUp'])
            this.camera.move("upward", deltaTime);

        if (this.keysDown['ArrowDown'])
            this.camera.move("downward", deltaTime);
    }

    cameraLookAroundChange(deltaTime) {
        const xoffset = this.mouseDelta[0] * this.mouseSensitivity;
        const yoffset = this.mouseDelta[1] * this.mouseSensitivity;

        if (xoffset !== 0 || yoffset !== 0) {
            this.camera.lookAround(xoffset, yoffset, deltaTime);
            vec2.set(this.mouseDelta, 0, 0);
        }
    }
}