/* Yotsuba Framework v2 — el fondo es un shader; el resto es instrumentación.
   Secciones: fondo WebGL (Enuma Elish) · medidor · capacidades · WebGPU ·
   ruteador de APIs · laboratorio de shaders. */
(function () {
  'use strict';

  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var clamp = function (v, a, b) { return Math.max(a, Math.min(b, v)); };

  /* ======================================================================
     CABECERA + REVEAL
     ====================================================================== */
  var top = $('#top');
  function onScrollTop() { top.classList.toggle('solid', window.scrollY > 40); }
  window.addEventListener('scroll', onScrollTop, { passive: true }); onScrollTop();

  if ('IntersectionObserver' in window) {
    var rio = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); rio.unobserve(e.target); } });
    }, { threshold: .1 });
    $$('.reveal').forEach(function (el) { rio.observe(el); });
  } else { $$('.reveal').forEach(function (el) { el.classList.add('in'); }); }

  /* ======================================================================
     EL MAR — fragment shader que pinta toda la página
     ====================================================================== */
  var SEA_FS = [
    '// sea.frag — pinta la ilustración Enuma Elish detrás de la página.',
    '// Uniforms ajustables desde "Tune the storm".',
    '#ifdef GL_FRAGMENT_PRECISION_HIGH',
    'precision highp float;',
    '#else',
    'precision mediump float;',
    '#endif',
    '',
    'uniform sampler2D u_tex;',
    'uniform vec2  u_res;    // tamaño del canvas en px',
    'uniform vec4  u_view;   // ancho, alto y desplazamiento (px) de la imagen',
    'uniform float u_time;',
    'uniform float u_flash;  // envolvente del relámpago 0..1',
    'uniform vec2  u_bolt;   // punto del rayo (uv de la imagen)',
    'uniform vec3  u_click;  // onda: uv.x, uv.y, instante',
    'uniform vec4  u_k;      // rayos, refracción, nieve marina, cáusticas',
    '',
    'float hash(vec2 p) { p = fract(p * vec2(123.34, 456.21)); p += dot(p, p + 45.32); return fract(p.x * p.y); }',
    'float noise(vec2 p) {',
    '  vec2 i = floor(p), f = fract(p); f = f * f * (3.0 - 2.0 * f);',
    '  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),',
    '             mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x), f.y);',
    '}',
    '',
    '// cáustica teselable (variante del clásico de Dave Hoskins)',
    'float caustic(vec2 uv, float t) {',
    '  vec2 p = mod(uv * 6.28318, 6.28318) - 250.0;',
    '  vec2 i = p; float c = 1.0; const float inten = 0.005;',
    '  for (int n = 0; n < 4; n++) {',
    '    float tt = t * (1.0 - (3.5 / float(n + 1)));',
    '    i = p + vec2(cos(tt - i.x) + sin(tt + i.y), sin(tt - i.y) + cos(tt + i.x));',
    '    c += 1.0 / length(vec2(p.x / (sin(i.x + tt) / inten), p.y / (cos(i.y + tt) / inten)));',
    '  }',
    '  c /= 4.0; c = 1.17 - pow(c, 1.4);',
    '  return pow(abs(c), 8.0);',
    '}',
    '',
    'void main() {',
    '  vec2 frag = gl_FragCoord.xy;',
    '  float py = u_res.y - frag.y;',
    '  vec2 uv = vec2((frag.x + (u_view.x - u_res.x) * 0.5) / u_view.x, (py + u_view.z) / u_view.y);',
    '  float asp = u_view.x / u_view.y;',
    '',
    '  const float SURFACE = 0.165;  // línea del mar en la ilustración',
    '  const float SHORE = 0.725;    // orilla',
    '  float water = smoothstep(SURFACE - 0.004, SURFACE + 0.012, uv.y) * (1.0 - smoothstep(SHORE - 0.02, SHORE + 0.005, uv.y));',
    '  float depth = clamp((uv.y - SURFACE) / (SHORE - SURFACE), 0.0, 1.0);',
    '',
    '  // refracción bajo el agua',
    '  vec2 q = uv * vec2(asp * 22.0, 22.0);',
    '  vec2 d = vec2(noise(q + vec2(0.0, u_time * 0.35)) - 0.5, noise(q * 1.3 + vec2(u_time * 0.28, 7.0)) - 0.5);',
    '  vec2 off = d * 0.0065 * u_k.y * water;',
    '  float band = smoothstep(0.03, 0.0, abs(uv.y - SURFACE));',
    '  off.y += sin(uv.x * asp * 140.0 + u_time * 1.6) * 0.0012 * band * u_k.y;',
    '',
    '  // onda al hacer clic',
    '  float age = u_time - u_click.z;',
    '  if (age > 0.0 && age < 3.5) {',
    '    vec2 dv = (uv - u_click.xy) * vec2(asp, 1.0);',
    '    float r = length(dv), front = age * 0.28;',
    '    float ring = sin((r - front) * 95.0) * exp(-age * 1.4) * smoothstep(0.05, 0.0, abs(r - front));',
    '    off += normalize(dv + 1e-5) * ring * 0.004;',
    '  }',
    '',
    '  vec3 col = texture2D(u_tex, uv + off).rgb;',
    '  float lum = dot(col, vec3(0.299, 0.587, 0.114));',
    '',
    '  // cáusticas',
    '  float cz = caustic(uv * vec2(asp, 1.0) * 1.6 + off * 20.0, u_time * 0.5);',
    '  col += vec3(0.18, 0.95, 0.85) * cz * u_k.w * water * (1.0 - depth * 0.75) * (0.25 + 1.5 * lum);',
    '',
    '  // nieve marina',
    '  float snow = 0.0;',
    '  for (int L = 0; L < 3; L++) {',
    '    float fl = float(L);',
    '    vec2 g = uv * vec2(asp * (70.0 + fl * 45.0), 95.0 + fl * 55.0);',
    '    g.y -= u_time * (0.35 + fl * 0.22); g.x += sin(u_time * 0.4 + fl) * 0.5;',
    '    vec2 id = floor(g), f = fract(g) - 0.5;',
    '    float h = hash(id + fl * 17.31);',
    '    if (h > 0.9) {',
    '      vec2 o = (vec2(hash(id + 3.1), hash(id + 7.7)) - 0.5) * 0.5;',
    '      snow += smoothstep(0.11, 0.0, length(f - o)) * (h - 0.9) * 10.0 * (1.0 - fl * 0.25);',
    '    }',
    '  }',
    '  col += vec3(0.75, 0.95, 1.0) * snow * u_k.z * water * 0.55;',
    '',
    '  // relámpago',
    '  float F = u_flash * u_k.x;',
    '  float sky = 1.0 - smoothstep(SURFACE - 0.01, SURFACE + 0.02, uv.y);',
    '  float glow = exp(-length((uv - u_bolt) * vec2(asp, 1.0)) * 5.5);',
    '  col += vec3(0.55, 0.68, 1.0) * F * glow * (0.55 * sky + 0.18 * water * (1.0 - depth));',
    '  col += vec3(0.75, 0.88, 1.0) * smoothstep(0.55, 0.85, lum) * F * 1.4 * sky;',
    '  col *= 1.0 + F * 0.12;',
    '',
    '  // viñeta + grano',
    '  vec2 sc = frag / u_res;',
    '  col *= mix(0.72, 1.0, smoothstep(1.15, 0.35, length(sc - 0.5)));',
    '  col += (hash(frag + u_time) - 0.5) * 0.018;',
    '  gl_FragColor = vec4(col, 1.0);',
    '}'
  ].join('\n');

  (function sea() {
    var cv = $('#sea');
    var gl = null, prog, tex, loc = {}, IW = 2000, IH = 3000, ok = false;
    try {
      gl = cv.getContext('webgl2', { antialias: false, alpha: false }) || cv.getContext('webgl', { antialias: false, alpha: false });
    } catch (_) {}
    if (!gl) return;
    var isGL2 = typeof WebGL2RenderingContext !== 'undefined' && gl instanceof WebGL2RenderingContext;

    function shader(type, src) { var s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s); if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) { console.warn(gl.getShaderInfoLog(s)); return null; } return s; }
    var vs = shader(gl.VERTEX_SHADER, 'attribute vec2 p; void main(){ gl_Position = vec4(p, 0.0, 1.0); }');
    var fs = shader(gl.FRAGMENT_SHADER, SEA_FS);
    if (!vs || !fs) return;
    prog = gl.createProgram(); gl.attachShader(prog, vs); gl.attachShader(prog, fs); gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
    gl.useProgram(prog);
    var buf = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    var pl = gl.getAttribLocation(prog, 'p'); gl.enableVertexAttribArray(pl); gl.vertexAttribPointer(pl, 2, gl.FLOAT, false, 0, 0);
    ['u_tex', 'u_res', 'u_view', 'u_time', 'u_flash', 'u_bolt', 'u_click', 'u_k'].forEach(function (n) { loc[n] = gl.getUniformLocation(prog, n); });

    var state = { q: 1, k: [1, 1, 1, 1], flash: 0, strikeAt: -10, bolt: [.68, .09], click: [0, 0, -100], W: 1, H: 1, dpr: 1, dw: 1, dh: 1, shoreTop: 1, t0: performance.now() };
    var DEF_BOLT = [.68, .09];

    function layout() {
      var dpr = Math.min(window.devicePixelRatio || 1, window.innerWidth < 800 ? 1.25 : 1.5) * state.q;
      state.dpr = dpr;
      state.W = Math.round(window.innerWidth * dpr); state.H = Math.round(window.innerHeight * dpr);
      cv.width = state.W; cv.height = state.H; gl.viewport(0, 0, state.W, state.H);
      var s = Math.max(state.W / IW, state.H * 1.7 / IH);
      state.dw = IW * s; state.dh = IH * s;
      var sh = $('#shore'); state.shoreTop = Math.max(1, sh.offsetTop);
    }
    function progress() { return clamp(window.scrollY / state.shoreTop, 0, 1); }

    function envelope(t) {
      if (t < 0) return 0;
      var a = Math.exp(-t * 7.5) * (.65 + .35 * Math.sin(t * 90));
      var b = t > .2 ? .75 * Math.exp(-(t - .2) * 6) : 0;
      return clamp(a + b, 0, 1);
    }
    function strike(uvx, uvy, now) { state.strikeAt = now; state.bolt = (uvy != null && uvy < .2) ? [uvx, uvy] : DEF_BOLT.slice(); }

    var nextStrike = 1.3, lastFlashCss = -1;
    function render(now) {
      var t = reduceMotion ? 4.2 : (now - state.t0) / 1000;
      if (!reduceMotion) {
        if (t > nextStrike) { strike(.6 + Math.random() * .2, .05 + Math.random() * .07, t); nextStrike = t + 3 + Math.random() * 5; }
        state.flash = envelope(t - state.strikeAt);
      } else state.flash = 0;
      var off = progress() * (state.dh - state.H);
      gl.uniform1i(loc.u_tex, 0);
      gl.uniform2f(loc.u_res, state.W, state.H);
      gl.uniform4f(loc.u_view, state.dw, state.dh, off, 0);
      gl.uniform1f(loc.u_time, t); gl.uniform1f(loc.u_flash, state.flash);
      gl.uniform2f(loc.u_bolt, state.bolt[0], state.bolt[1]);
      gl.uniform3f(loc.u_click, state.click[0], state.click[1], state.click[2]);
      gl.uniform4f(loc.u_k, state.k[0], state.k[1], state.k[2], state.k[3]);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      if (window.scrollY < window.innerHeight && Math.abs(state.flash - lastFlashCss) > .03) { document.documentElement.style.setProperty('--flash', state.flash.toFixed(2)); lastFlashCss = state.flash; }
      state.t = t;
    }
    var raf = 0, running = false;
    // calidad adaptativa: si el equipo no da fps, baja la resolución del shader
    var lastT = 0, seen = 0, slow = 0;
    function adapt(now) {
      var dt = lastT ? now - lastT : 0; lastT = now;
      if (!dt || dt > 500 || now - state.t0 < 2500) return;
      seen++; if (dt > 42) slow++;
      if (seen >= 60) { if (slow > 36 && state.q > .5) { state.q = state.q > .9 ? .7 : .5; layout(); } seen = 0; slow = 0; }
    }
    function loop(now) { render(now); adapt(now); raf = requestAnimationFrame(loop); }
    function play() { if (reduceMotion || running) return; running = true; raf = requestAnimationFrame(loop); }
    function pause() { running = false; cancelAnimationFrame(raf); }
    document.addEventListener('visibilitychange', function () { document.hidden ? pause() : play(); });
    var still = function () { if (reduceMotion && ok) requestAnimationFrame(render); };
    window.addEventListener('resize', function () { layout(); still(); });
    window.addEventListener('scroll', still, { passive: true });
    window.addEventListener('load', function () { layout(); still(); });

    // clic en el cielo → relámpago; clic en el agua → onda
    document.addEventListener('click', function (e) {
      if (!ok || e.target.closest('a,button,input,textarea,label,select,dialog,.slab,.storm,.readouts,.gauge,.top')) return;
      var uvx = (e.clientX * state.dpr + (state.dw - state.W) / 2) / state.dw;
      var uvy = (e.clientY * state.dpr + progress() * (state.dh - state.H)) / state.dh;
      var now = reduceMotion ? 4.2 : (performance.now() - state.t0) / 1000;
      state.click = [uvx, uvy, now];
      strike(uvx, uvy, now); nextStrike = now + 4 + Math.random() * 3;
      $('#strikeHint').classList.add('gone'); still();
    });
    setTimeout(function () { $('#strikeHint').classList.add('gone'); }, 16000);

    // mandos
    function bind(id, out, idx) { var el = $(id); el.addEventListener('input', function () { state.k[idx] = +el.value; $(out).textContent = (+el.value).toFixed(1); still(); }); }
    bind('#kL', '#oL', 0); bind('#kR', '#oR', 1); bind('#kS', '#oS', 2); bind('#kC', '#oC', 3);
    $('#stormBtn').addEventListener('click', function () {
      var open = !$('#stormPanel').classList.contains('open');
      $('#stormPanel').classList.toggle('open', open); this.setAttribute('aria-expanded', String(open));
    });
    $('#srcBtn').addEventListener('click', function () {
      $('#srcPre').textContent = SEA_FS; var d = $('#srcDlg');
      if (d.showModal) d.showModal(); else d.setAttribute('open', '');
    });
    $('#srcClose').addEventListener('click', function () { $('#srcDlg').close(); });
    $('#srcDlg').addEventListener('click', function (e) { if (e.target === this) this.close(); });

    // textura
    var img = new Image();
    img.onload = function () {
      try {
        IW = img.naturalWidth; IH = img.naturalHeight;
        tex = gl.createTexture(); gl.activeTexture(gl.TEXTURE0); gl.bindTexture(gl.TEXTURE_2D, tex);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, img);   // lanza en file:// (textura cruzada)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        if (isGL2) { gl.generateMipmap(gl.TEXTURE_2D); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR); }
        else gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        if (gl.getError() !== gl.NO_ERROR) throw new Error('texture upload failed');
        ok = true; layout(); document.body.classList.add('has-gl'); render(performance.now()); play();
      } catch (err) { console.warn('Shader background disabled, using static image:', err && err.message); }
    };
    img.src = '../assets/enuma.webp';
    layout();
    window.__sea = state;
  }());

  /* ======================================================================
     MEDIDOR DE PROFUNDIDAD
     ====================================================================== */
  (function gauge() {
    var g = $('#gauge'), mark = $('#gMark'), depth = $('#gDepth'), labs = $$('.g-lab', g);
    var secs = labs.map(function (l) { return document.getElementById(l.dataset.sec); });
    var shore = $('#shore'), tops = [], maxS = 1;
    function measure() { maxS = Math.max(1, shore.offsetTop); tops = secs.map(function (s) { return s.offsetTop; }); labs.forEach(function (l, i) { l.style.top = clamp(tops[i] / maxS * 100, 0, 100) + '%'; }); }
    function tick() {
      var p = clamp(window.scrollY / maxS, 0, 1);
      mark.style.top = (p * 100) + '%';
      depth.textContent = p > .985 ? 'SHORE' : String(Math.round(p * 420)).padStart(4, '0') + ' m';
      var y = window.scrollY + window.innerHeight * .4, cur = 0;
      tops.forEach(function (t, i) { if (t <= y) cur = i; });
      labs.forEach(function (l, i) { l.classList.toggle('on', i === cur); });
    }
    window.addEventListener('scroll', tick, { passive: true });
    window.addEventListener('resize', function () { measure(); tick(); });
    window.addEventListener('load', function () { measure(); tick(); });
    measure(); tick();
  }());

  /* ======================================================================
     CAPACIDADES
     ====================================================================== */
  (function caps() {
    var items = $$('#caps > li'), btns = items.map(function (li) { return $('.cap-btn', li); });
    function set(i) { items.forEach(function (li, k) { li.classList.toggle('on', k === i); btns[k].setAttribute('aria-expanded', String(k === i)); }); }
    btns.forEach(function (b, i) {
      b.addEventListener('click', function () { set(i); });
      b.addEventListener('pointerenter', function (e) { if (e.pointerType === 'mouse' && window.innerWidth >= 980) set(i); });
      b.addEventListener('keydown', function (e) {
        var d = e.key === 'ArrowDown' ? 1 : e.key === 'ArrowUp' ? -1 : 0; if (!d) return;
        e.preventDefault(); var n = (i + d + btns.length) % btns.length; btns[n].focus(); set(n);
      });
    });
  }());

  /* ======================================================================
     WEBGPU — detección real + compute real
     ====================================================================== */
  var gpuP = (function () {
    var cache = null;
    return function () {
      if (cache) return cache;
      cache = (async function () {
        if (!window.isSecureContext) return { ok: false, why: 'insecure' };
        if (!navigator.gpu) return { ok: false, why: 'none' };
        try {
          var a = await navigator.gpu.requestAdapter();
          if (!a) return { ok: false, why: 'noadapter' };
          var info = a.info || (a.requestAdapterInfo ? await a.requestAdapterInfo() : null);
          return { ok: true, adapter: a, info: info };
        } catch (e) { return { ok: false, why: 'error' }; }
      }());
      return cache;
    };
  }());
  (function probe() {
    gpuP().then(function (r) {
      var msg;
      if (r.ok) {
        var name = r.info ? [r.info.vendor, r.info.architecture].filter(Boolean).join(' · ') : '';
        msg = '✓ WebGPU is available in this browser' + (name ? ' — GPU: ' + name : '.');
      } else if (r.why === 'insecure') msg = '✕ WebGPU needs a secure context (https:// or localhost). Serve this folder to try it.';
      else msg = '✕ WebGPU isn\'t available in this browser.';
      $$('[data-probe]').forEach(function (el) { el.textContent = msg; el.classList.toggle('err', !r.ok); });
    });
  }());

  $('#runCompute').addEventListener('click', async function () {
    var out = $('#computeOut'), btn = this; out.className = 'out'; out.textContent = 'Compiling WGSL and dispatching…'; btn.disabled = true;
    try {
      var r = await gpuP();
      if (!r.ok) throw new Error(r.why === 'insecure' ? 'WebGPU needs https:// or localhost.' : 'WebGPU isn\'t available in this browser.');
      var device = await r.adapter.requestDevice();
      var N = 1 << 20, src = new Float32Array(N); for (var i = 0; i < N; i++) src[i] = i % 1000;
      var bIn = device.createBuffer({ size: N * 4, usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_DST, mappedAtCreation: true });
      new Float32Array(bIn.getMappedRange()).set(src); bIn.unmap();
      var bOut = device.createBuffer({ size: N * 4, usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_SRC });
      var bRead = device.createBuffer({ size: N * 4, usage: GPUBufferUsage.MAP_READ | GPUBufferUsage.COPY_DST });
      var module = device.createShaderModule({ code: [
        '@group(0) @binding(0) var<storage, read> src : array<f32>;',
        '@group(0) @binding(1) var<storage, read_write> dst : array<f32>;',
        '@compute @workgroup_size(64)',
        'fn main(@builtin(global_invocation_id) id : vec3<u32>) {',
        '  let i = id.x;',
        '  if (i < arrayLength(&src)) { dst[i] = sqrt(src[i]) * 2.0 + 1.0; }',
        '}'].join('\n') });
      var pipe = device.createComputePipeline({ layout: 'auto', compute: { module: module, entryPoint: 'main' } });
      var bind = device.createBindGroup({ layout: pipe.getBindGroupLayout(0), entries: [{ binding: 0, resource: { buffer: bIn } }, { binding: 1, resource: { buffer: bOut } }] });
      var t0 = performance.now();
      var enc = device.createCommandEncoder(), pass = enc.beginComputePass();
      pass.setPipeline(pipe); pass.setBindGroup(0, bind); pass.dispatchWorkgroups(Math.ceil(N / 64)); pass.end();
      enc.copyBufferToBuffer(bOut, 0, bRead, 0, N * 4); device.queue.submit([enc.finish()]);
      await bRead.mapAsync(GPUMapMode.READ);
      var res = new Float32Array(bRead.getMappedRange()), ms = performance.now() - t0, bad = 0;
      for (var k = 0; k < N; k += 4093) { if (Math.abs(res[k] - (Math.sqrt(src[k]) * 2 + 1)) > 1e-3) bad++; }
      bRead.unmap(); device.destroy();
      out.textContent = bad ? '✕ Result mismatch on ' + bad + ' samples.' : '✓ ' + N.toLocaleString('en-US') + ' elements computed on your GPU in ' + ms.toFixed(1) + ' ms (dispatch + readback) — results verified against the CPU.';
      out.classList.toggle('err', !!bad);
    } catch (err) { out.classList.add('err'); out.textContent = '✕ ' + (err && err.message ? err.message : 'Could not run the compute shader.'); }
    btn.disabled = false;
  });

  /* ======================================================================
     RUTEADOR DE APIs
     ====================================================================== */
  (function router() {
    var API = {
      vulkan: { n: 'Vulkan', kind: 'Backend / 01', logo: '<img src="../assets/logo-vulkan.svg" alt="Vulkan">', d: 'A modern explicit graphics path for mobile and Linux targets.', plat: 'Android · Linux · SteamOS', hw: 'Explicit, low-overhead' },
      dx12: { n: 'DirectX 12', kind: 'Backend / 02', logo: '<img src="../assets/logo-dx12.webp" alt="DirectX 12">', d: 'The native modern graphics path for the Microsoft platform family.', plat: 'Windows · Xbox', hw: 'Native Microsoft path' },
      metal: { n: 'Metal', kind: 'Backend / 03', logo: '<img src="../assets/logo-metal.webp" alt="Metal">', d: 'Apple-native rendering across desktop, mobile and television targets.', plat: 'iOS · iPadOS · macOS · tvOS · Vision Pro', hw: 'Apple silicon & GPUs' },
      webgpu: { n: 'WebGPU', kind: 'Backend / 04 · Roadmap', logo: '<span class="wm2">Web<i>GPU</i></span>', d: 'The browser\'s modern graphics and compute API, reached from the same XNA-shaped code. Depending on the platform, the browser maps WebGPU onto Vulkan, DirectX 12 or Metal.', plat: 'Web browsers', hw: 'Via the browser' }
    };
    var T = [['Android', 'vulkan'], ['Linux', 'vulkan'], ['SteamOS', 'vulkan'], ['Windows', 'dx12'], ['Xbox', 'dx12'], ['iOS', 'metal'], ['iPadOS', 'metal'], ['macOS', 'metal'], ['tvOS', 'metal'], ['Vision Pro', 'metal'], ['Web', 'webgpu']];
    var box = $('#targets'), btns = [];
    function show(i) {
      var a = API[T[i][1]];
      btns.forEach(function (b, k) { b.setAttribute('aria-checked', String(k === i)); b.tabIndex = k === i ? 0 : -1; });
      $('#apiKind').textContent = a.kind; $('#apiLogo').innerHTML = a.logo; $('#apiName').textContent = a.n; $('#gpuLine').textContent = a.hw;
      $('#apiDesc').innerHTML = '';
      var p = document.createElement('span'); p.textContent = a.d; var pl = document.createElement('span'); pl.className = 'plat'; pl.textContent = '→ ' + a.plat;
      $('#apiDesc').appendChild(p); $('#apiDesc').appendChild(pl);
    }
    T.forEach(function (t, i) {
      var b = document.createElement('button'); b.type = 'button'; b.setAttribute('role', 'radio'); b.textContent = t[0];
      b.addEventListener('click', function () { show(i); });
      b.addEventListener('keydown', function (e) {
        var d = (e.key === 'ArrowRight' || e.key === 'ArrowDown') ? 1 : (e.key === 'ArrowLeft' || e.key === 'ArrowUp') ? -1 : 0; if (!d) return;
        e.preventDefault(); var n = (i + d + T.length) % T.length; btns[n].focus(); show(n);
      });
      box.appendChild(b); btns.push(b);
    });
    show(0);
  }());

  /* ======================================================================
     SHADER LAB
     ====================================================================== */
  (function lab() {
    var GLSL = [
      'precision highp float;',
      'uniform vec2 u_res;',
      'uniform float u_time;',
      '',
      'void main() {',
      '  vec2 uv = gl_FragCoord.xy / u_res;',
      '  vec2 p = (uv - 0.5) * vec2(u_res.x / u_res.y, 1.0);',
      '  float d = length(p);',
      '  float wave = sin(d * 38.0 - u_time * 3.0) * exp(-d * 3.2);',
      '  vec3 deep = vec3(0.02, 0.10, 0.28);',
      '  vec3 glow = vec3(0.16, 0.85, 0.78);',
      '  vec3 col = mix(deep, glow, 0.5 + 0.5 * wave);',
      '  gl_FragColor = vec4(col, 1.0);',
      '}', ''].join('\n');

    var BODY_HLSL = [
      '    float2 p = (uv - 0.5) * float2(Resolution.x / Resolution.y, 1.0);',
      '    float d = length(p);',
      '    float wave = sin(d * 38.0 - Time * 3.0) * exp(-d * 3.2);',
      '    float3 deep = float3(0.02, 0.10, 0.28);',
      '    float3 glow = float3(0.16, 0.85, 0.78);',
      '    float3 col = lerp(deep, glow, 0.5 + 0.5 * wave);'].join('\n');

    var LANGS = [
      { id: 'mgfx', name: 'MGFX', file: 'Ripple.fx', wg: true,
        d: 'The MonoGame effect workflow: author .fx, build it through MGCB. Effects compiled with the DesktopVK profile can run on Apple platforms through Metal, and MGFX will be compatible with WebGPU.',
        code: ['// Ripple.fx — built by MGCB', '#if OPENGL', '    #define PS_SHADERMODEL ps_3_0', '#else', '    #define PS_SHADERMODEL ps_4_0_level_9_1', '#endif', '', 'float2 Resolution;', 'float Time;', '',
          'float4 MainPS(float2 uv : TEXCOORD0) : COLOR0', '{', BODY_HLSL, '    return float4(col, 1.0);', '}', '', 'technique Ripple', '{', '    pass P0', '    {', '        PixelShader = compile PS_SHADERMODEL MainPS();', '    }', '}', ''].join('\n') },
      { id: 'fnafx', name: 'FNAFX', file: 'Ripple.fx', wg: false,
        d: 'The FNA effect path for XNA-style effects: the same technique/pass structure you already know, compiled for FNA.',
        code: ['// Ripple.fx — XNA-style effect for FNA', 'float2 Resolution;', 'float Time;', '', 'float4 MainPS(float2 uv : TEXCOORD0) : COLOR0', '{', BODY_HLSL, '    return float4(col, 1.0);', '}', '', 'technique Ripple', '{', '    pass P0', '    {', '        PixelShader = compile ps_3_0 MainPS();', '    }', '}', ''].join('\n') },
      { id: 'slang', name: 'Slang', file: 'ripple.slang', wg: true,
        d: 'Modular, reusable and portable: split shaders across files, import shared code and avoid per-platform #if branches. Slang is also WebGPU-compatible.',
        code: ['// ripple.slang', 'struct Frame { float2 resolution; float time; };', 'ParameterBlock<Frame> frame;', '', '[shader("fragment")]', 'float4 rippleMain(float2 uv : TEXCOORD0) : SV_Target', '{',
          '    float2 p = (uv - 0.5) * float2(frame.resolution.x / frame.resolution.y, 1.0);', '    float d = length(p);', '    float wave = sin(d * 38.0 - frame.time * 3.0) * exp(-d * 3.2);', '    float3 deep = float3(0.02, 0.10, 0.28);', '    float3 glow = float3(0.16, 0.85, 0.78);', '    return float4(lerp(deep, glow, 0.5 + 0.5 * wave), 1.0);', '}', ''].join('\n') },
      { id: 'hlsl', name: 'HLSL', file: 'Ripple.hlsl', wg: true,
        d: 'Native HLSL for the DirectX family, and WebGPU-compatible.',
        code: ['// Ripple.hlsl', 'cbuffer Frame : register(b0)', '{', '    float2 Resolution;', '    float Time;', '};', '', 'float4 PS(float2 uv : TEXCOORD0) : SV_Target', '{', BODY_HLSL, '    return float4(col, 1.0);', '}', ''].join('\n') },
      { id: 'glsl', name: 'GLSL', file: 'ripple.frag', wg: true, editable: true,
        d: 'Native GLSL, and WebGPU-compatible. This is the version running in the preview: change a number and watch the water respond.',
        code: GLSL },
      { id: 'msl', name: 'MSL', file: 'ripple.metal', wg: false,
        d: 'Metal Shading Language for Apple targets, where Yotsuba routes rendering through Metal.',
        code: ['// ripple.metal', '#include <metal_stdlib>', 'using namespace metal;', '', 'struct Frame { float2 resolution; float time; };', 'struct VOut { float4 position [[position]]; float2 uv; };', '',
          'fragment float4 ripple(VOut in [[stage_in]], constant Frame& f [[buffer(0)]])', '{', '    float2 p = (in.uv - 0.5) * float2(f.resolution.x / f.resolution.y, 1.0);', '    float d = length(p);', '    float wave = sin(d * 38.0 - f.time * 3.0) * exp(-d * 3.2);', '    float3 deep = float3(0.02, 0.10, 0.28);', '    float3 glow = float3(0.16, 0.85, 0.78);', '    return float4(mix(deep, glow, 0.5 + 0.5 * wave), 1.0);', '}', ''].join('\n') },
      { id: 'spirv', name: 'SPIR-V', file: 'ripple.spv', wg: false,
        d: 'Direct compiled input: bring the shader binaries your pipeline already produces, with no source language required.',
        code: ['# Already have compiled shader binaries?', '# Feed the .spv straight in.', '', '# your toolchain  →  ripple.spv  →  Yotsuba Framework', 'glslangValidator -V ripple.frag -o ripple.spv', ''].join('\n') }
    ];

    var tabs = $('#labTabs'), ed = $('#glslEditor'), pre = $('#staticCode'), log = $('#labLog'), cur = 'glsl';

    /* resaltado mínimo */
    function esc(s) { return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
    var RX = /(\/\/.*|^#.*)|("[^"\n]*")|\b(\d+\.?\d*f?)\b|\b(float[234]?|half[234]?|vec[234]|uint|int|bool|float4x4|Texture2D|SamplerState|sampler2D)\b|\b(uniform|struct|return|void|technique|pass|cbuffer|register|fragment|constant|using|namespace|include|import|precision|highp|mediump|const|compile|PixelShader|ParameterBlock|shader)\b/gm;
    function hl(src) { return esc(src).replace(RX, function (m, c, s, n, t, k) { return '<span class="' + (c ? 'c' : s ? 's' : n ? 'n' : t ? 't' : 'k') + '">' + m + '</span>'; }); }

    LANGS.forEach(function (L, i) {
      var b = document.createElement('button'); b.type = 'button'; b.setAttribute('role', 'tab'); b.dataset.id = L.id;
      b.innerHTML = L.name + (L.wg ? '<span class="gp" title="WebGPU-compatible">WEBGPU</span>' : '');
      b.addEventListener('click', function () { select(L.id); });
      b.addEventListener('keydown', function (e) { var d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0; if (!d) return; e.preventDefault(); var n = (i + d + LANGS.length) % LANGS.length; select(LANGS[n].id); tabs.children[n].focus(); });
      tabs.appendChild(b);
    });
    function byId(id) { return LANGS.filter(function (l) { return l.id === id; })[0]; }
    function select(id) {
      cur = id; var L = byId(id);
      $$('button', tabs).forEach(function (b) { var on = b.dataset.id === id; b.setAttribute('aria-selected', String(on)); b.tabIndex = on ? 0 : -1; });
      $('#codeName').textContent = L.file; $('#langDesc').textContent = L.d;
      $('#codeMode').innerHTML = L.editable ? '<b>EDITABLE</b> · runs live →' : 'read-only · equivalent source';
      ed.hidden = !L.editable; pre.hidden = !!L.editable;
      if (!L.editable) pre.innerHTML = hl(L.code);
    }
    ed.value = GLSL; select('glsl');

    /* preview WebGL */
    var cv = $('#labCanvas'), gl = null, prog = null, vbuf, loc = {}, running = false, raf = 0, t0 = performance.now(), lastF = 0, fps = 60, visible = false;
    try { gl = cv.getContext('webgl', { antialias: false }); } catch (_) {}
    if (!gl) { log.textContent = 'WebGL is not available in this browser: the live preview is disabled.'; log.className = 'lab-log err'; return; }
    var VS = 'attribute vec2 p; void main(){ gl_Position = vec4(p, 0.0, 1.0); }';
    function sh(type, src) { var s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s); return { s: s, ok: gl.getShaderParameter(s, gl.COMPILE_STATUS), log: gl.getShaderInfoLog(s) || '' }; }
    vbuf = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, vbuf); gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    var vsh = sh(gl.VERTEX_SHADER, VS);
    function build(src) {
      var f = sh(gl.FRAGMENT_SHADER, src);
      if (!f.ok) return { ok: false, log: f.log };
      var p = gl.createProgram(); gl.attachShader(p, vsh.s); gl.attachShader(p, f.s); gl.linkProgram(p);
      if (!gl.getProgramParameter(p, gl.LINK_STATUS)) return { ok: false, log: gl.getProgramInfoLog(p) || 'link error' };
      return { ok: true, p: p };
    }
    function use(p) {
      if (prog) gl.deleteProgram(prog); prog = p; gl.useProgram(prog);
      var a = gl.getAttribLocation(prog, 'p'); gl.enableVertexAttribArray(a); gl.vertexAttribPointer(a, 2, gl.FLOAT, false, 0, 0);
      loc.res = gl.getUniformLocation(prog, 'u_res'); loc.time = gl.getUniformLocation(prog, 'u_time');
    }
    function compile(src) {
      var r = build(src);
      if (r.ok) { use(r.p); log.textContent = 'Compiled OK'; log.className = 'lab-log'; }
      else { log.textContent = r.log.replace(/\0/g, '').split('\n').filter(Boolean).slice(0, 3).join('\n'); log.className = 'lab-log err'; }
    }
    function size() { var d = Math.min(window.devicePixelRatio || 1, 1.5), w = cv.clientWidth, h = cv.clientHeight; if (cv.width !== Math.round(w * d) || cv.height !== Math.round(h * d)) { cv.width = Math.round(w * d); cv.height = Math.round(h * d); } gl.viewport(0, 0, cv.width, cv.height); }
    function draw(now) {
      if (!prog) return; size();
      gl.uniform2f(loc.res, cv.width, cv.height); gl.uniform1f(loc.time, reduceMotion ? 3.0 : (now - t0) / 1000);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    }
    function loop(now) {
      if (lastF) { var dt = now - lastF; if (dt > 0) fps += (1000 / dt - fps) * .08; } lastF = now;
      draw(now); if (!reduceMotion && Math.floor(now / 500) !== Math.floor((now - 16) / 500)) $('#fps').textContent = Math.round(fps) + ' fps';
      raf = requestAnimationFrame(loop);
    }
    function play() { if (running || reduceMotion) { if (reduceMotion) draw(0); return; } running = true; lastF = 0; raf = requestAnimationFrame(loop); }
    function pause() { running = false; cancelAnimationFrame(raf); }
    if ('IntersectionObserver' in window) new IntersectionObserver(function (es) { visible = es[0].isIntersecting; visible ? play() : pause(); }, { rootMargin: '80px' }).observe($('#lab')); else play();
    window.addEventListener('resize', function () { if (reduceMotion) draw(0); });

    compile(GLSL);
    var deb = 0;
    ed.addEventListener('input', function () { clearTimeout(deb); deb = setTimeout(function () { compile(ed.value); if (reduceMotion) draw(0); }, 220); });
    ed.addEventListener('keydown', function (e) {
      if (e.key === 'Tab') { e.preventDefault(); var s = ed.selectionStart; ed.value = ed.value.slice(0, s) + '  ' + ed.value.slice(ed.selectionEnd); ed.selectionStart = ed.selectionEnd = s + 2; ed.dispatchEvent(new Event('input')); }
    });
    $('#labReset').addEventListener('click', function () { ed.value = GLSL; compile(GLSL); if (cur !== 'glsl') select('glsl'); });
    $('#labCopy').addEventListener('click', function () {
      var btn = this, txt = byId(cur).editable ? ed.value : byId(cur).code, old = btn.textContent;
      function done() { btn.textContent = 'Copied!'; setTimeout(function () { btn.textContent = old; }, 1400); }
      if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(txt).then(done, done);
      else { var ta = document.createElement('textarea'); ta.value = txt; document.body.appendChild(ta); ta.select(); try { document.execCommand('copy'); } catch (_) {} ta.remove(); done(); }
    });
  }());
}());
