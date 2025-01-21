import { mat4 } from 'gl-matrix';
/**
 * Create a model matrix from translation, rotation, and scale.
 * @param {number[]} translate [tx, ty, tz]
 * @param {number[]} rotate    [rx, ry, rz] in degrees
 * @param {number[]} scale     [sx, sy, sz]
 * @returns {mat4} A 4x4 transformation matrix
 */
export function getModelMatrix(translate, rotate, scale) {
    const model = mat4.create(); 

    if(translate)
        mat4.translate(model, model, translate);

    if (rotate) {
        const radX = (rotate[0] * Math.PI) / 180;
        const radY = (rotate[1] * Math.PI) / 180;
        const radZ = (rotate[2] * Math.PI) / 180;

        mat4.rotateX(model, model, radX);
        mat4.rotateY(model, model, radY);
        mat4.rotateZ(model, model, radZ);
    }

    if(scale)
        mat4.scale(model, model, scale);

    return model;
}
