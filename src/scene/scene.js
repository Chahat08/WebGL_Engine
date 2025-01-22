import { Square } from "../shapes/shapes/square";
import { Triangle } from "../shapes/shapes/triangle";
import { Graphics } from "./graphics"

export class Scene {
    constructor(gl) {
        this.gl = gl;

        this.objects = this.setupObjects();

        this.graphics = new Graphics(gl, this.objects);
    }

    render() {
        this.graphics.render();
    }

    setupObjects() {
        const objects = [];
        objects.push(new Triangle(this.gl));
        objects.push(new Square(this.gl, 0.5));
        return objects;
    }
}