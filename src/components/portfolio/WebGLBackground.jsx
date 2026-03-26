import { useEffect, useRef } from 'react';

// GLSL Noise + distortion WebGL background
export default function WebGLBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext('webgl');
    if (!gl) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resize();
    window.addEventListener('resize', resize);

    const vert = `
      attribute vec2 a_position;
      void main() { gl_Position = vec4(a_position, 0.0, 1.0); }
    `;

    const frag = `
      precision highp float;
      uniform float u_time;
      uniform vec2 u_resolution;
      uniform vec2 u_mouse;

      vec3 mod289(vec3 x) { return x - floor(x * (1.0/289.0)) * 289.0; }
      vec4 mod289(vec4 x) { return x - floor(x * (1.0/289.0)) * 289.0; }
      vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
      vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
      
      float snoise(vec3 v) {
  const vec2 C = vec2(1.0/6.0, 1.0/3.0);
  const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
  vec3 i = floor(v + dot(v, C.yyyy));
  vec3 x0 = v - i + dot(i, C.xxx);
  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min(g.xyz, l.zxy);
  vec3 i2 = max(g.xyz, l.zxy);
  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;
  i = mod289(i);
  vec4 p = permute(permute(permute(
            i.z + vec4(0.0, i1.z, i2.z, 1.0))
          + i.y + vec4(0.0, i1.y, i2.y, 1.0))
          + i.x + vec4(0.0, i1.x, i2.x, 1.0));
  float n_ = 0.142857142857;
  vec3 ns = n_ * D.wyz - D.xzx;
  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_);
  vec4 x = x_ * ns.x + ns.yyyy;
  vec4 y = y_ * ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);
  vec4 b0 = vec4(x.xy, y.xy);
  vec4 b1 = vec4(x.zw, y.zw);
  vec4 s0 = floor(b0)*2.0 + 1.0;
  vec4 s1 = floor(b1)*2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));
  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
  vec3 p0 = vec3(a0.xy, h.x);
  vec3 p1 = vec3(a0.zw, h.y);
  vec3 p2 = vec3(a1.xy, h.z);
  vec3 p3 = vec3(a1.zw, h.w);
  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
  p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
  m = m * m;
        return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  vec2 mouse = u_mouse / u_resolution;

  float t = u_time * 0.12;

  // Layered noise
  float n1 = snoise(vec3(uv * 2.5, t));
  float n2 = snoise(vec3(uv * 5.0 + 0.5, t * 1.3));
  float n3 = snoise(vec3(uv * 1.2, t * 0.7));

  // Mouse distortion
  float dist = length(uv - mouse);
  float ripple = sin(dist * 18.0 - u_time * 3.0) * 0.03 / (dist + 0.3);

  float noise = (n1 * 0.5 + n2 * 0.3 + n3 * 0.2) + ripple;

  // Color palette: deep space cyan/purple
  vec3 col1 = vec3(0.0, 0.04, 0.08);      // near black
  vec3 col2 = vec3(0.0, 0.3, 0.35) * 0.12;   // dark cyan
  vec3 col3 = vec3(0.2, 0.05, 0.35) * 0.10;  // dark purple
  
        vec3 color = col1 + col2 * smoothstep(-0.2, 0.6, noise) + col3 * smoothstep(0.1, 0.9, n2);

// Vignette
float vignette = 1.0 - smoothstep(0.4, 1.2, length(uv - 0.5) * 1.6);
color *= vignette;

gl_FragColor = vec4(color, 1.0);
}
`;

const compile = (type, src) => {
  const s = gl.createShader(type);
  gl.shaderSource(s, src);
  gl.compileShader(s);
  return s;
};

const prog = gl.createProgram();
gl.attachShader(prog, compile(gl.VERTEX_SHADER, vert));
gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, frag));
gl.linkProgram(prog);
gl.useProgram(prog);

const buf = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, 1,1]), gl.STATIC_DRAW);

const pos = gl.getAttribLocation(prog, 'a_position');
gl.enableVertexAttribArray(pos);
gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);

const uTime = gl.getUniformLocation(prog, 'u_time');
const uRes = gl.getUniformLocation(prog, 'u_resolution');
const uMouse = gl.getUniformLocation(prog, 'u_mouse');

let mouseX = 0.5, mouseY = 0.5;
const onMouse = (e) => { mouseX = e.clientX; mouseY = e.clientY; };
window.addEventListener('mousemove', onMouse);

let start = performance.now();
let rafId;
const render = () => {
  const t = (performance.now() - start) / 1000;
  gl.uniform1f(uTime, t);
  gl.uniform2f(uRes, canvas.width, canvas.height);
  gl.uniform2f(uMouse, mouseX, canvas.height - mouseY);
  gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  rafId = requestAnimationFrame(render);
};
render();

return () => {
  cancelAnimationFrame(rafId);
  window.removeEventListener('mousemove', onMouse);
  window.removeEventListener('resize', resize);
};
}, []);

return (
  <canvas
    ref={canvasRef}
    className="fixed inset-0 z-0 pointer-events-none"
  />
);
}
