import { vec3 } from 'gl-matrix';
export class Input {
    constructor(camera) {
        this.keysDown = {};

        window.addEventListener('keydown', (event) => {
            this.keysDown[event.key] = true;
        });

        window.addEventListener('keyup', (event) => {
            delete this.keysDown[event.key];
        });

        this.camera = camera;
    }

    handleInput(deltaTime) {
        if (this.keysDown['w'] || this.keysDown['W']) 
            this.camera.move("forward", deltaTime); 
        
        if (this.keysDown['s'] || this.keysDown['S']) 
            this.camera.move("backward", deltaTime);
        
        if (this.keysDown['d'] || this.keysDown['D']) 
            this.camera.move("rightward", deltaTime);
 
        if (this.keysDown['a'] || this.keysDown['A']) 
            this.camera.move("leftward", deltaTime); 
    }
}