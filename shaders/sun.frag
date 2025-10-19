precision mediump float;

// Simple 2D noise by IQ (small, fast)
// from https://www.shadertoy.com/view/4dS3Wd

varying vec2 vUv;
varying vec3 vPos;

uniform float time;
uniform vec3 color;
uniform float brightness;
uniform float opacity;

float hash(vec2 p) {
  p = 50.0 * fract(p * 0.3183099 + vec2(0.71, 0.113));
  return fract(p.x * p.y * (p.x + p.y));
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), u.x),
             mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
}

// fbm
float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  mat2 m = mat2(1.6, 1.2, -1.2, 1.6);
  for (int i = 0; i < 5; i++) {
    v += a * noise(p);
    p = m * p * 1.6;
    a *= 0.5;
  }
  return v;
}

void main() {
  vec2 uv = vUv - 0.5;
  float dist = length(uv);
  // base color variation
  float n = fbm(uv * 4.0 + time * 0.7);
  // create filament structure
  float fil = smoothstep(0.15, 0.55, sin((uv.x + uv.y * 2.0) * 30.0 + n * 10.0 + time * 4.0));
  fil *= fbm(uv * 12.0 + time * 3.0);

  // core falloff
  float core = smoothstep(0.9, 0.0, dist);
  // combine
  vec3 col = color * (0.6 + 0.6 * n) + vec3(1.0, 0.7, 0.3) * fil * 1.6;
  // apply radial glow and brightness
  float glow = pow(1.0 - dist, 3.0) * brightness;
  vec3 outCol = col * glow;

  gl_FragColor = vec4(outCol, clamp(opacity * (core + 0.2 + fil * 0.6), 0.0, 1.0));
}
