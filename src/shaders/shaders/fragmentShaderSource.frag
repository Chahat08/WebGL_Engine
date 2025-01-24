precision mediump float;

uniform vec4 uObjectColor;
uniform vec4 uLightColor;

varying vec3 vNormal;

void main(){
	vec3 normal = normalize(vNormal);

    gl_FragColor = uObjectColor*uLightColor;

    //vec3 lightDir = normalize(vec3(10.0, 1.0, -10.0)); 
    //float intensity = max(dot(normal, lightDir), 0.0);

    ///gl_FragColor = vec4(vec3(intensity), 1.0)*uFragmentColor; 

	//gl_FragColor = uFragmentColor;
}