/*4page4.js*/

window.addEventListener('load', function() {
  const canvas = document.getElementById('glCanvas');
  let gl = canvas.getContext('webgl');
  
  if (!gl) {
    alert('WebGL not supported, falling back on experimental-webgl');
    gl = canvas.getContext('experimental-webgl');
  }

  if (!gl) {
    alert('Your browser does not support WebGL');
    return;
  }

  gl.clearColor(0, 0, 0, 1);
  gl.clear(gl.COLOR_BUFFER_BIT);

  const vsSource = `
    attribute vec4 aVertexPosition;
    void main(void) {
      gl_Position = aVertexPosition;
    }
  `;

  const fsSource = `
  precision mediump float;
  
  uniform vec2 u_resolution;
  uniform float u_time;
  
  vec3 palette(float t) {
    vec3 a = vec3(-0.132, 0.258, 0.648);
    vec3 b = vec3(1.713, -1.047, -0.002); 
    vec3 c = vec3(1.028, -3.142, 3.138);
    vec3 d = vec3(2.007, 1.447, 3.417);
    return a + b * cos(6.28318 * (c * t + d));
  }
  
  void main() {
    vec2 uv = (gl_FragCoord.xy * 2.0 - u_resolution) / u_resolution.y;
    vec2 uv0 = uv;
    uv = fract(uv * 2.0) - 0.5;
    float d = length(uv);
    vec3 col = palette(length(uv0) + u_time);
    d = sin(d * 8.0 + u_time) / 8.0;
    d = abs(d);
    d = 0.02 / d;
    col *= d;
    gl_FragColor = vec4(col, 1.0); 
  }
`;


  function compileShader(gl, source, type) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.error('An error occurred compiling the shaders: ' + gl.getShaderInfoLog(shader));
      gl.deleteShader(shader);
      return null;
    }
    return shader;
  }

  const vertexShader = compileShader(gl, vsSource, gl.VERTEX_SHADER);
  const fragmentShader = compileShader(gl, fsSource, gl.FRAGMENT_SHADER);

  const program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error('Unable to initialize the shader program: ' + gl.getProgramInfoLog(program));
  }

  gl.useProgram(program);

  const vertices = new Float32Array([
    -1, -1,  
     1, -1,
    -1,  1,
    -1,  1,
     1, -1,
     1,  1
  ]);

  const vertexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

  const positionAttrib = gl.getAttribLocation(program, 'aVertexPosition');
  gl.enableVertexAttribArray(positionAttrib);
  gl.vertexAttribPointer(positionAttrib, 2, gl.FLOAT, false, 0, 0);

  function animate() {
    const u_time = gl.getUniformLocation(program, 'u_time');
    const u_resolution = gl.getUniformLocation(program, 'u_resolution');
    
    gl.uniform1f(u_time, performance.now() / 1000);
    gl.uniform2f(u_resolution, canvas.width, canvas.height);
  
    gl.drawArrays(gl.TRIANGLES, 0, 6);
  
    requestAnimationFrame(animate);
  }

  animate();

  const combineButton = document.getElementById("combineButton");

const combineButton = document.getElementById("combineButton");

combineButton.addEventListener("click", function() {
  // Navigate to 5page5
  console.log("Redirecting to:", "https://al-hum.github.io/111/5page5.html");
  window.location.href = "https://al-hum.github.io/111/5page5.html";
});

});

/* fin 4page4.js Ø*/
