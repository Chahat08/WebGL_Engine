attribute vec3 aPosition;
attribute vec3 aNormal;

uniform mat4 uModelMatrix;
uniform mat4 uViewMatrix;
uniform mat4 uProjectionMatrix;

varying vec3 vNormal;
varying vec3 vFragPos;

void main(){
	gl_Position = uProjectionMatrix*uViewMatrix*uModelMatrix*vec4(aPosition, 1.0);
	vFragPos = vec3(uModelMatrix*vec4(aPosition, 1.0));
	vNormal = aNormal;
}