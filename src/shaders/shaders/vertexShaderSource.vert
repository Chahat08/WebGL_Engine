attribute vec3 aPosition;
attribute vec3 aNormal;

uniform mat4 uModelMatrix;
uniform mat4 uViewMatrix;
uniform mat4 uProjectionMatrix;

varying vec3 vNormal;

void main(){
	gl_Position = uProjectionMatrix*uViewMatrix*uModelMatrix*vec4(aPosition, 1.0);
	vNormal = mat3(uModelMatrix) * aNormal;
}