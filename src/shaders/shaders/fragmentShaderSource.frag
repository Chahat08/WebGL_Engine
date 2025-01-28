precision mediump float;

uniform vec4 uObjectColor;
uniform vec4 uLightColor;
uniform vec3 uLightPos;

varying vec3 vNormal;
varying vec3 vFragPos;

void main(){
    // ambient
    float ambientStrength = 0.1;
    vec4 ambientComponent = vec4(ambientStrength*uLightColor.xyz, 1.0);

    // diffuse
	vec3 normal = normalize(vNormal);
    vec3 lightDir = normalize(uLightPos - vFragPos);
    float diffuseStrength = max(dot(normal, lightDir), 0.0);
    vec4 diffuseComponent = vec4(diffuseStrength*uLightColor.xyz, 1.0);

    // specular

    gl_FragColor = (ambientComponent+diffuseComponent)*uObjectColor;
}