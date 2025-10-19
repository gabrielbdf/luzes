precision mediump float;

varying vec2 vUv;
varying vec3 vPos;

uniform float time;

void main() {
  vUv = uv;
  vPos = position;
  vec3 pos = position;
  // give a slight vertex distortion so the plane feels wavy
  float wave = sin((uv.x + time * 0.2) * 6.2831) * 0.02 + cos((uv.y - time * 0.15) * 6.2831) * 0.02;
  pos.z += wave;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
