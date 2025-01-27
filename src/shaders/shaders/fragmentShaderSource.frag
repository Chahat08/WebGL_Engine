precision mediump float;

uniform vec4 uObjectColor;
uniform vec4 uLightColor;

varying vec3 vNormal;

void main(){
	vec3 normal = normalize(vNormal);

    float ambientStrength = 0.1;
    vec4 ambientComponent = vec4(ambientStrength*uLightColor.xyz, 1.0);

    gl_FragColor = ambientComponent*uObjectColor;
}