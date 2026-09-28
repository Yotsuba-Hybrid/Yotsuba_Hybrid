/* Yotsuba Framework v2 (hermana de Hybrid).
   Secciones: nav/reveal · bordes rasgados · lente COMPUTE del hero · video WebGPU ·
   capacidades · ruteador de APIs · lenguajes de shader. */
(function () {
  'use strict';

  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- idioma compartido con Hybrid ---------- */
  var lang = window.__LANG__ === 'en' ? 'en' : 'es';
  var langListeners = [];
  var EN = {}, ES = {
    'a11y.skip': 'Saltar al contenido', 'nav.label': 'Navegación principal',
    'nav.try': 'Pruébalo', 'nav.capabilities': 'Capacidades', 'nav.apis': 'APIs gráficas', 'nav.shaders': 'Shaders', 'nav.community': 'Comunidad', 'nav.docs': 'Docs', 'nav.support': 'Apoyar Yotsuba ♡',
    'community.eyebrow': 'Yotsuba Open Source', 'community.t1': 'Construyamos', 'community.t2': 'Yotsuba juntos.',
    'community.desc': 'La capa gráfica está abierta y hecha para mejorarla en público. Ayúdanos a evolucionar los backends nativos, los shaders y la documentación que los conecta.',
    'community.f1': 'Inspecciona y mejora Framework, sus backends y su pipeline de shaders.', 'community.f2': 'Explora el código, reporta problemas y comparte ideas en GitHub.', 'community.f3': 'Conecta con desarrolladores que disfrutan los gráficos modernos.', 'community.f4': 'Propón cambios para el código, la web y la documentación.', 'community.support': 'Apoyar el proyecto', 'community.github': 'Ver GitHub ↗', 'community.docs': 'Leer la documentación', 'foot.support': 'Apoyar Yotsuba ♡',
    'form.title': 'Avísame del lanzamiento', 'form.desc': 'Déjanos tu correo y te avisaremos cuando haya una primera versión pública. Sin spam.', 'form.name': 'Nombre', 'form.nameP': 'Tu nombre', 'form.email': 'Correo', 'form.emailP': 'tu@correo.com', 'form.submit': 'Notificarme',
    'film.caption': 'GPU del navegador · escena 3D interactiva', 'c7.probe': 'El soporte WebGPU está en el roadmap.'
  };
  var COPY = [];
  function copy(sel, es, rich, attr) { COPY.push({ sel: sel, es: es, rich: !!rich, attr: attr || null }); }
  copy('.hero .status', 'Linaje XNA / arquitectura GPU moderna');
  copy('.hero .hint .brush', '¡Mueve el cursor!');
  copy('.hero .lede', 'El único framework basado en XNA que moderniza por completo su arquitectura gráfica: <b>Compute Shaders</b>, <b>Vulkan</b> en Android, <b>WebGPU</b> para la web y <b>siete lenguajes de shaders</b>. También permite compilar shaders en tiempo de ejecución.', true);
  copy('.hero-cta .btn', ['Pruébalo en tu GPU', 'Explora los backends']);
  copy('.readouts > div span', ['01 / CÓMPUTO', '02 / ANDROID', '03 / WEB', '04 / ECOSISTEMA']);
  copy('.readouts > div strong', ['Compute Shaders', 'Backend Vulkan', 'Destino WebGPU', 'Compatible con MonoGame']);
  copy('.readouts > div small', ['Cómputo GPU moderno dentro de un framework con forma de XNA.', 'Android y Linux apuntan directamente a Vulkan.', 'La API GPU moderna del navegador desde el mismo código con forma de XNA.', 'Reutiliza librerías y flujos MGFX sin reconstruirlos para Yotsuba.']);
  copy('.try .eyebrow', 'WebGPU · captura real');
  copy('.try h2', 'Mira WebGPU <em>en acción.</em>', true);
  copy('.try .sub', 'Una escena en tiempo real dentro del navegador, renderizada con WebGPU. La misma API gráfica moderna que sustenta el destino web anunciado para Yotsuba Framework.');
  copy('.try .sim-note', 'Grabación de una ejecución real de WebGPU. El soporte WebGPU de Yotsuba Framework sigue en el roadmap anunciado.');
  copy('.caps-head .eyebrow', 'Capacidades');
  copy('.caps-head h2', 'Funciones del framework, <em>XNA de nueva generación.</em>', true);
  copy('.caps-head .sub', 'El conjunto actual se centra en cargas de trabajo GPU modernas, compatibilidad de shaders y rutas gráficas nativas, conservando el modelo de desarrollo familiar de XNA y MonoGame.');
  copy('.cap-nav a', ['<b>1</b>Compute Shaders', '<b>2</b>7 lenguajes de shaders', '<b>3</b>MGCB y MGFX', '<b>4</b>DirectX 12', '<b>5</b>Metal', '<b>6</b>Vulkan', '<b>7</b>WebGPU', '<b>8</b>3D animado', '<b>9</b>Krita'], true);
  copy('.caps-flow .cap h3', ['Compute Shaders', 'Compatibilidad con 7 lenguajes de shaders', 'MGCB y MGFX con perfil DesktopVK', 'DirectX 12 en Windows', 'Metal en Apple', 'Vulkan en Android', 'WebGPU en la web <span class="pill">ROADMAP</span>', 'Compatibilidad con modelos 3D animados', 'Ilustraciones de Krita (.kra) compatibles'], true);
  copy('.caps-flow .cap > p:not(.probe)', [
    'Ejecuta cargas masivamente paralelas directamente en la GPU para efectos avanzados, simulaciones de partículas, generación procedural, procesamiento de imagen, iluminación y cálculos de física.',
    'Elige el lenguaje de shader adecuado para cada plataforma: MGFX, FNAFX, Slang, HLSL, GLSL, MSL y entrada SPIR-V directa. MGFX, Slang, GLSL y HLSL también son compatibles con WebGPU.',
    'Conserva el pipeline MGCB y MGFX. Los efectos MonoGame compilados con el perfil DesktopVK pueden ejecutarse en Apple mediante Metal, y MGFX también será compatible con WebGPU.',
    'Usa una ruta de renderizado DirectX 12 nativa en Windows para GPUs de escritorio modernas, manteniendo el modelo familiar de XNA y MonoGame.',
    'Ejecuta juegos MonoGame mediante una ruta Metal nativa en macOS, iPadOS e iOS, con el mismo código y un flujo familiar.',
    'Lleva el flujo de trabajo con forma de XNA a Android mediante una ruta Vulkan nativa pensada para GPUs móviles modernas.',
    'Lleva el mismo flujo con forma de XNA al navegador mediante WebGPU, la API gráfica y de cómputo moderna de la web. El navegador puede mapearla a Vulkan, DirectX 12 o Metal.',
    'Carga y anima modelos 3D mediante un flujo de contenido familiar, con soporte para datos de modelos, esqueletos y reproducción de animaciones.',
    'Integra ilustraciones de Krita directamente en el flujo del proyecto y utiliza arte .kra por capas como parte del pipeline visual.'
  ]);
  copy('.cap .more', ['Ejecuta uno en tu GPU ↑', 'Lee el artículo →', 'Verlos lado a lado →', 'Lee el artículo →', 'Lee el artículo →', 'Lee el artículo →', 'Lee el artículo →', 'Lee el artículo →', 'Lee el artículo →', 'Lee el artículo →']);
  copy('.apis .eyebrow', 'APIs gráficas');
  copy('.apis h2', 'APIs nativas para <em>cada destino.</em>', true);
  copy('.apis .sub', 'Yotsuba conserva una superficie familiar con forma de XNA y dirige el trabajo de renderizado a la API gráfica que corresponde a cada plataforma. Elige un destino y sigue la señal.');
  copy('.flow .node small', ['Tu juego', 'Framework', 'Backend', 'Hardware']);
  copy('.flow .node .sub2', ['Llamadas de dibujo', 'Ruta nativa']);
  copy('.cap-cap', 'Mismo código. Solo cambia el destino.');
  copy('.roadmap', '<b>Roadmap:</b> el destino web mediante WebGPU forma parte del roadmap anunciado.', true);
  copy('.compat .eyebrow', 'Compatibilidad con el ecosistema MonoGame');
  copy('.compat h2', 'Tus librerías. <em>Sin recompilar.</em>', true);
  copy('.compat .sub', 'Usa tus librerías MonoGame existentes directamente desde Yotsuba Framework sin recompilarlas específicamente para Yotsuba. Conserva el ecosistema del que ya dependes, incluido el flujo familiar MGCB y MGFX.');
  copy('.dtab div:first-child span', ['Pieza', 'Perfil', 'Propósito']);
  copy('.dtab div:not(:first-child) span:last-child', ['Construir texturas, fuentes y modelos.', 'Crear efectos usando el flujo de shaders de MonoGame.', 'Reutilizar librerías compatibles sin reconstruirlas para Yotsuba.']);
  copy('.compat .hero-cta .btn', ['Empezar con la documentación', 'Ver capacidades →']);
  copy('.compat figcaption', 'Paquetes NuGet compatibles con MonoGame');
  copy('.shaders .eyebrow', 'Sistema de shaders');
  copy('.shaders h2', 'Seis lenguajes de shaders. <em>Más SPIR-V directo.</em>', true);
  copy('.shaders .sub', 'Yotsuba Framework ofrece varias rutas para escribir shaders en vez de forzar un único lenguaje. El mismo efecto ripple, en todos ellos. MGFX, Slang, GLSL y HLSL son compatibles con WebGPU.');
  copy('.tabs', 'Lenguajes de shaders', false, 'aria-label');
  copy('.win-h span:last-child', 'mismo efecto · cualquier lenguaje');
  copy('#copyLang', 'Copiar código');
  copy('.foot .wrap > span:first-child', 'YOTSUBA FRAMEWORK · Compute / Vulkan / DirectX 12 / Metal / WebGPU / MonoGame / Shaders multilenguaje');
  copy('.foot .wrap > span:nth-child(2)', 'Hybrid · Engine');

  COPY.forEach(function (d) { d.nodes = $$(d.sel); d.en = d.nodes.map(function (el) { return d.attr ? el.getAttribute(d.attr) : (d.rich ? el.innerHTML : el.textContent); }); });
  $$('[data-i]').forEach(function (el) { EN[el.dataset.i] = el.textContent; });
  $$('[data-ia]').forEach(function (el) { var p = el.dataset.ia.split(':'); EN[p[1]] = el.getAttribute(p[0]); });
  function tr(k) { return lang === 'es' ? (ES[k] || EN[k] || k) : (EN[k] || ES[k] || k); }
  var D = {
    en: {
      apiBackend: 'Backend', apiNative: 'Native path', apiRoadmap: 'Roadmap', shaderWeb: 'WebGPU-compatible', shaderNative: 'Native path', copied: 'Copied!'
    },
    es: {
      apiBackend: 'Backend', apiNative: 'Ruta nativa', apiRoadmap: 'Roadmap', shaderWeb: 'Compatible con WebGPU', shaderNative: 'Ruta nativa', copied: '¡Copiado!'
    }
  };
  function s(k, vars) { var str = D[lang][k] || D.en[k] || k; Object.keys(vars || {}).forEach(function (v) { str = str.replace('{' + v + '}', vars[v]); }); return str; }
  function onLanguage(fn) { langListeners.push(fn); }
  function applyLang(next) {
    lang = next === 'en' ? 'en' : 'es';
    document.documentElement.lang = lang;
    $$('[data-i]').forEach(function (el) { el.textContent = tr(el.dataset.i); });
    $$('[data-ia]').forEach(function (el) { var p = el.dataset.ia.split(':'); el.setAttribute(p[0], tr(p[1])); });
    COPY.forEach(function (d) {
      var val = lang === 'es' ? d.es : null;
      d.nodes.forEach(function (el, i) {
        var v = Array.isArray(val) ? val[i] : val;
        if (v == null) v = d.en[i];
        if (d.attr) el.setAttribute(d.attr, v); else if (d.rich) el.innerHTML = v; else el.textContent = v;
      });
    });
    var meta = lang === 'es' ? {
      title: 'Yotsuba Framework — XNA de nueva generación: Compute, Vulkan, Metal, DX12 y WebGPU',
      desc: 'Yotsuba Framework — framework basado en XNA con Compute Shaders, backends Vulkan, DirectX 12, Metal y WebGPU, compatibilidad con librerías MonoGame y pipeline de shaders multilenguaje.',
      ogTitle: 'Yotsuba Framework — XNA de nueva generación', ogDesc: 'Compute Shaders, Vulkan en Android, Metal en Apple, DirectX 12 en Windows y WebGPU en la web, con compatibilidad MonoGame y siete lenguajes de shaders.'
    } : { title: 'Yotsuba Framework — Next Gen XNA: Compute, Vulkan, Metal, DX12 & WebGPU', desc: 'Yotsuba Framework — an XNA-based framework with Compute Shaders, native Vulkan, DirectX 12, Metal and WebGPU backends, MonoGame library compatibility and a multi-language shader pipeline.', ogTitle: 'Yotsuba Framework — Next Gen XNA', ogDesc: 'Compute Shaders, Vulkan on Android, Metal on Apple, DirectX 12 on Windows, WebGPU on the web — with MonoGame compatibility and seven shader languages.' };
    document.title = meta.title; $('#metaDescription').content = meta.desc; $('#ogTitle').content = meta.ogTitle; $('#ogDescription').content = meta.ogDesc;
    var lb = $('#langBtn'); lb.setAttribute('aria-label', lang === 'es' ? 'Cambiar idioma a inglés' : 'Switch language to Spanish'); $('#langCode').textContent = lang === 'es' ? 'EN' : 'ES';
    langListeners.forEach(function (fn) { fn(); });
  }

  /* ---------- nav + reveal ---------- */
  var nav = $('#nav');
  function onScroll() { nav.classList.toggle('solid', window.scrollY > 40); }
  window.addEventListener('scroll', onScroll, { passive: true }); onScroll();
  if ('IntersectionObserver' in window) {
    var rio = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); rio.unobserve(e.target); } });
    }, { threshold: .12 });
    $$('.reveal').forEach(function (el) { rio.observe(el); });
  } else { $$('.reveal').forEach(function (el) { el.classList.add('in'); }); }

  (function videoPlayback() {
    var clips = $$('video[data-autoplay-video]');
    if (!clips.length || reduceMotion) return;
    function play(video) { var request = video.play(); if (request && request.catch) request.catch(function () {}); }
    if (!('IntersectionObserver' in window)) { clips.forEach(play); return; }
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) { if (entry.isIntersecting) play(entry.target); else entry.target.pause(); });
    }, { threshold: .12 });
    clips.forEach(function (video) { observer.observe(video); });
  }());

  /* ---------- bordes rasgados (clip-path con ruido estable) ---------- */
  function rng(seed) { var a = seed >>> 0; return function () { a |= 0; a = a + 0x6D2B79F5 | 0; var t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
  function edge(r, n, amp, ph) { var out = []; for (var i = 0; i <= n; i++) out.push(amp * (.5 * r() + .5 * (.5 + .5 * Math.sin(i * .55 + ph)))); return out; }
  function tear(el, seed) {
    var sd = (el.dataset.torn || '').split(/\s+/), has = function (s) { return sd.indexOf(s) > -1; };
    var r = rng(seed), n = 90, m = 60, amp = 13, pts = [], i, v;
    if (has('top')) { v = edge(r, n, amp, r() * 6); for (i = 0; i <= n; i++) pts.push((i / n * 100).toFixed(2) + '% ' + v[i].toFixed(1) + 'px'); } else pts.push('0 0', '100% 0');
    if (has('right')) { v = edge(r, m, 16, r() * 6); for (i = 0; i <= m; i++) pts.push('calc(100% - ' + v[i].toFixed(1) + 'px) ' + (i / m * 100).toFixed(2) + '%'); } else pts.push('100% 0', '100% 100%');
    if (has('bottom')) { v = edge(r, n, amp, r() * 6); for (i = n; i >= 0; i--) pts.push((i / n * 100).toFixed(2) + '% calc(100% - ' + v[i].toFixed(1) + 'px)'); } else pts.push('100% 100%', '0 100%');
    if (has('left')) { v = edge(r, m, 16, r() * 6); for (i = m; i >= 0; i--) pts.push(v[i].toFixed(1) + 'px ' + (i / m * 100).toFixed(2) + '%'); }
    el.style.clipPath = 'polygon(' + pts.join(',') + ')';
  }
  $$('[data-torn]').forEach(function (el, i) { tear(el, 4321 + i * 977); });

  /* ---------- HERO: lente COMPUTE ---------- */
  (function () {
    var hero = $('#top'), plate = $('#plate'), lens = $('#lens'), ring = $('#lensRing'), hint = $('#hint'), code = $('.lens-code', ring);
    var x = 0, y = 0, tx = 0, ty = 0, r = 0, W = 1, H = 1, last = 0, lastR = -1, inside = false, running = true, t0 = performance.now(), idleAt = 0;
    function measure() { var b = plate.getBoundingClientRect(); W = b.width; H = b.height; }
    function baseR() { return Math.max(112, Math.min(176, Math.min(W, H) * .27)); }
    measure(); window.addEventListener('resize', measure);
    function setT(e) { var b = plate.getBoundingClientRect(); tx = e.clientX - b.left; ty = e.clientY - b.top; }
    hero.addEventListener('pointermove', function (e) { if (e.pointerType === 'touch') return; setT(e); inside = true; idleAt = performance.now(); hint.classList.add('gone'); });
    hero.addEventListener('pointerleave', function () { inside = false; idleAt = performance.now(); });
    plate.addEventListener('pointerdown', function (e) { setT(e); inside = true; idleAt = performance.now(); hint.classList.add('gone'); });
    plate.addEventListener('pointermove', function (e) { if (e.pointerType === 'touch' && e.buttons) { setT(e); idleAt = performance.now(); } });
    plate.style.touchAction = 'pan-y';
    setTimeout(function () { hint.classList.add('gone'); }, 14000);
    function frame(now) {
      if (!running) return;
      var dt = Math.min(48, now - (last || now)); last = now; var t = (now - t0) / 1000;
      if (!inside || now - idleAt > 4500) { tx = W * (.5 + .2 * Math.sin(t * .6)); ty = H * (.42 + .2 * Math.sin(t * .8 + 1.2)); }
      var k = reduceMotion ? 1 : 1 - Math.pow(.0018, dt / 1000);
      x += (tx - x) * k; y += (ty - y) * k; r += (baseR() - r) * (reduceMotion ? 1 : 1 - Math.pow(.001, dt / 1000));
      lens.style.clipPath = 'circle(' + r.toFixed(1) + 'px at ' + x.toFixed(1) + 'px ' + y.toFixed(1) + 'px)';
      if (Math.abs(r - lastR) > .4) { ring.style.width = ring.style.height = (r * 2).toFixed(1) + 'px'; lastR = r; code.style.display = r > 128 ? '' : 'none'; }
      ring.style.transform = 'translate(' + (x - r).toFixed(1) + 'px,' + (y - r).toFixed(1) + 'px)'; ring.style.opacity = '1';
      requestAnimationFrame(frame);
    }
    x = tx = W * .5; y = ty = H * .42;
    requestAnimationFrame(frame);
    if ('IntersectionObserver' in window) new IntersectionObserver(function (es) { var v = es[0].isIntersecting; if (v && !running) { running = true; last = 0; requestAnimationFrame(frame); } else if (!v) running = false; }).observe(hero);
  }());

  /* ---------- capacidades: trébol que gira + índice ---------- */
  (function caps() {
    var arts = $$('.cap'), items = $$('#capNav li'), spin = $('#spin');
    if (!('IntersectionObserver' in window)) return;
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (!e.isIntersecting) return;
        var i = +e.target.dataset.capIndex;
        items.forEach(function (li, k) { li.classList.toggle('on', k === i); });
        spin.style.transform = 'rotate(' + (i * 40) + 'deg)';
      });
    }, { rootMargin: '-42% 0px -42% 0px' });
    arts.forEach(function (a) { io.observe(a); });
  }());

  /* ---------- ruteador de APIs ---------- */
  (function router() {
    var API = {
      vulkan: { n: 'Vulkan', kind: 'Backend / 01', kindEs: 'Backend / 01', logo: '<img src="../assets/logo-vulkan.svg" alt="Vulkan">', d: 'A modern explicit graphics path for mobile and Linux targets.', esD: 'Una ruta gráfica explícita y moderna para destinos móviles y Linux.', plat: 'Android · Linux · SteamOS', esPlat: 'Android · Linux · SteamOS', hw: 'Explicit, low-overhead', esHw: 'Explícita y de baja sobrecarga' },
      dx12: { n: 'DirectX 12', kind: 'Backend / 02', kindEs: 'Backend / 02', logo: '<img src="../assets/logo-dx12.webp" alt="DirectX 12">', d: 'The native modern graphics path for the Microsoft platform family.', esD: 'La ruta gráfica moderna y nativa para la familia de plataformas de Microsoft.', plat: 'Windows · Xbox', esPlat: 'Windows · Xbox', hw: 'Native Microsoft path', esHw: 'Ruta nativa de Microsoft' },
      metal: { n: 'Metal', kind: 'Backend / 03', kindEs: 'Backend / 03', logo: '<img src="../assets/logo-metal.webp" alt="Metal">', d: 'Apple-native rendering across desktop, mobile and television targets.', esD: 'Renderizado nativo de Apple en destinos de escritorio, móviles y televisión.', plat: 'iOS · iPadOS · macOS · tvOS · Vision Pro', esPlat: 'iOS · iPadOS · macOS · tvOS · Vision Pro', hw: 'Apple silicon & GPUs', esHw: 'Apple silicon y GPUs' },
      webgpu: { n: 'WebGPU', kind: 'Backend / 04 · Roadmap', kindEs: 'Backend / 04 · Roadmap', logo: '<span class="wm2">Web<i>GPU</i></span>', d: 'The browser\'s modern graphics and compute API, reached from the same XNA-shaped code. Depending on the platform, the browser maps WebGPU onto Vulkan, DirectX 12 or Metal.', esD: 'La API gráfica y de cómputo moderna del navegador, alcanzada desde el mismo código con forma de XNA. Según la plataforma, el navegador puede mapear WebGPU a Vulkan, DirectX 12 o Metal.', plat: 'Web browsers', esPlat: 'Navegadores web', hw: 'Via the browser', esHw: 'A través del navegador' }
    };
    var T = [['Android', 'vulkan'], ['Linux', 'vulkan'], ['SteamOS', 'vulkan'], ['Windows', 'dx12'], ['Xbox', 'dx12'], ['iOS', 'metal'], ['iPadOS', 'metal'], ['macOS', 'metal'], ['tvOS', 'metal'], ['Vision Pro', 'metal'], ['Web', 'webgpu']];
    var box = $('#targets'), btns = [];
    function show(i) {
      var a = API[T[i][1]];
      btns.forEach(function (b, k) { b.setAttribute('aria-checked', String(k === i)); b.tabIndex = k === i ? 0 : -1; });
      $('#apiKind').textContent = lang === 'es' ? a.kindEs : a.kind; $('#apiLogo').innerHTML = a.logo; $('#apiName').textContent = a.n; $('#gpuLine').textContent = lang === 'es' ? a.esHw : a.hw;
      var d = $('#apiDesc'); d.innerHTML = '';
      var p = document.createElement('span'); p.textContent = lang === 'es' ? a.esD : a.d; var pl = document.createElement('span'); pl.className = 'plat'; pl.textContent = '→ ' + (lang === 'es' ? a.esPlat : a.plat);
      d.appendChild(p); d.appendChild(pl);
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
    show(0); onLanguage(function () { show(btns.findIndex ? btns.findIndex(function (b) { return b.getAttribute('aria-checked') === 'true'; }) : 0); });
  }());

  /* ---------- lenguajes de shader ---------- */
  (function langs() {
    var BODY = [
      '    float2 p = (uv - 0.5) * float2(Resolution.x / Resolution.y, 1.0);',
      '    float d = length(p);',
      '    float wave = sin(d * 38.0 - Time * 3.0) * exp(-d * 3.2);',
      '    float3 deep = float3(0.02, 0.10, 0.28);',
      '    float3 glow = float3(0.16, 0.85, 0.78);',
      '    float3 col = lerp(deep, glow, 0.5 + 0.5 * wave);'].join('\n');
    var L = [
      { id: 'mgfx', name: 'MGFX', file: 'Ripple.fx', wg: true, d: 'The MonoGame effect workflow: author .fx, build it through MGCB. Effects compiled with the DesktopVK profile can run on Apple platforms through Metal, and MGFX will be compatible with WebGPU.', esD: 'El flujo de efectos de MonoGame: escribe .fx y compílalos mediante MGCB. Los efectos compilados con DesktopVK pueden ejecutarse en Apple mediante Metal, y MGFX será compatible con WebGPU.',
        code: ['// Ripple.fx — built by MGCB', '#if OPENGL', '    #define PS_SHADERMODEL ps_3_0', '#else', '    #define PS_SHADERMODEL ps_4_0_level_9_1', '#endif', '', 'float2 Resolution;', 'float Time;', '', 'float4 MainPS(float2 uv : TEXCOORD0) : COLOR0', '{', BODY, '    return float4(col, 1.0);', '}', '', 'technique Ripple', '{', '    pass P0', '    {', '        PixelShader = compile PS_SHADERMODEL MainPS();', '    }', '}', ''].join('\n') },
      { id: 'fnafx', name: 'FNAFX', file: 'Ripple.fx', wg: false, d: 'The FNA effect path for XNA-style effects: the same technique and pass structure you already know, compiled for FNA.', esD: 'La ruta de efectos FNA para efectos con forma de XNA: la misma estructura de técnicas y pases que ya conoces, compilada para FNA.',
        code: ['// Ripple.fx — XNA-style effect for FNA', 'float2 Resolution;', 'float Time;', '', 'float4 MainPS(float2 uv : TEXCOORD0) : COLOR0', '{', BODY, '    return float4(col, 1.0);', '}', '', 'technique Ripple', '{', '    pass P0', '    {', '        PixelShader = compile ps_3_0 MainPS();', '    }', '}', ''].join('\n') },
      { id: 'slang', name: 'Slang', file: 'ripple.slang', wg: true, d: 'Modular, reusable and portable: split shaders across files, import shared code and avoid per-platform #if branches. Slang is also WebGPU-compatible.', esD: 'Modular, reutilizable y portable: divide shaders entre archivos, importa código compartido y evita ramas #if por plataforma. Slang también es compatible con WebGPU.',
        code: ['// ripple.slang', 'struct Frame { float2 resolution; float time; };', 'ParameterBlock<Frame> frame;', '', '[shader("fragment")]', 'float4 rippleMain(float2 uv : TEXCOORD0) : SV_Target', '{', '    float2 p = (uv - 0.5) * float2(frame.resolution.x / frame.resolution.y, 1.0);', '    float d = length(p);', '    float wave = sin(d * 38.0 - frame.time * 3.0) * exp(-d * 3.2);', '    float3 deep = float3(0.02, 0.10, 0.28);', '    float3 glow = float3(0.16, 0.85, 0.78);', '    return float4(lerp(deep, glow, 0.5 + 0.5 * wave), 1.0);', '}', ''].join('\n') },
      { id: 'hlsl', name: 'HLSL', file: 'Ripple.hlsl', wg: true, d: 'Native HLSL for the DirectX family, and WebGPU-compatible.', esD: 'HLSL nativo para la familia DirectX y compatible con WebGPU.',
        code: ['// Ripple.hlsl', 'cbuffer Frame : register(b0)', '{', '    float2 Resolution;', '    float Time;', '};', '', 'float4 PS(float2 uv : TEXCOORD0) : SV_Target', '{', BODY, '    return float4(col, 1.0);', '}', ''].join('\n') },
      { id: 'glsl', name: 'GLSL', file: 'ripple.frag', wg: true, d: 'Native GLSL, and WebGPU-compatible.', esD: 'GLSL nativo y compatible con WebGPU.',
        code: ['// ripple.frag', 'precision highp float;', 'uniform vec2 u_res;', 'uniform float u_time;', '', 'void main() {', '  vec2 uv = gl_FragCoord.xy / u_res;', '  vec2 p = (uv - 0.5) * vec2(u_res.x / u_res.y, 1.0);', '  float d = length(p);', '  float wave = sin(d * 38.0 - u_time * 3.0) * exp(-d * 3.2);', '  vec3 deep = vec3(0.02, 0.10, 0.28);', '  vec3 glow = vec3(0.16, 0.85, 0.78);', '  vec3 col = mix(deep, glow, 0.5 + 0.5 * wave);', '  gl_FragColor = vec4(col, 1.0);', '}', ''].join('\n') },
      { id: 'msl', name: 'MSL', file: 'ripple.metal', wg: false, d: 'Metal Shading Language for Apple targets, where Yotsuba routes rendering through Metal.', esD: 'Metal Shading Language para destinos Apple, donde Yotsuba dirige el renderizado mediante Metal.',
        code: ['// ripple.metal', '#include <metal_stdlib>', 'using namespace metal;', '', 'struct Frame { float2 resolution; float time; };', 'struct VOut { float4 position [[position]]; float2 uv; };', '', 'fragment float4 ripple(VOut in [[stage_in]], constant Frame& f [[buffer(0)]])', '{', '    float2 p = (in.uv - 0.5) * float2(f.resolution.x / f.resolution.y, 1.0);', '    float d = length(p);', '    float wave = sin(d * 38.0 - f.time * 3.0) * exp(-d * 3.2);', '    float3 deep = float3(0.02, 0.10, 0.28);', '    float3 glow = float3(0.16, 0.85, 0.78);', '    return float4(mix(deep, glow, 0.5 + 0.5 * wave), 1.0);', '}', ''].join('\n') },
      { id: 'spirv', name: 'SPIR-V', file: 'ripple.spv', wg: false, d: 'Direct compiled input: bring the shader binaries your pipeline already produces, with no source language required.', esD: 'Entrada compilada directa: utiliza los binarios de shader que ya produce tu pipeline, sin necesitar un lenguaje fuente.',
        code: ['# Already have compiled shader binaries?', '# Feed the .spv straight in.', '', '# your toolchain  →  ripple.spv  →  Yotsuba Framework', 'glslangValidator -V ripple.frag -o ripple.spv', ''].join('\n') }
    ];
    function esc(s) { return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
    var RX = /(\/\/.*|^#.*)|("[^"\n]*")|\b(\d+\.?\d*f?)\b|\b(float[234]?|half[234]?|vec[234]|uint|int|bool|Texture2D|sampler2D)\b|\b(uniform|struct|return|void|technique|pass|cbuffer|register|fragment|constant|using|namespace|include|import|precision|highp|mediump|const|compile|PixelShader|ParameterBlock|shader)\b/gm;
    function hl(src) { return esc(src).replace(RX, function (m, c, s, n, t) { return '<span class="' + (c ? 'c' : s ? 's' : n ? 'n' : t ? 't' : 'k') + '">' + m + '</span>'; }); }
    var tabs = $('#tabs'), cur = 'mgfx';
    function byId(id) { return L.filter(function (l) { return l.id === id; })[0]; }
    function select(id) {
      cur = id; var l = byId(id);
      $$('button', tabs).forEach(function (b) { var on = b.dataset.id === id; b.setAttribute('aria-selected', String(on)); b.tabIndex = on ? 0 : -1; });
      $('#codeName').textContent = l.file; $('#shaderCode').innerHTML = hl(l.code);
      $('#langName').textContent = l.name; $('#langDesc').textContent = lang === 'es' ? l.esD : l.d;
      var bd = $('#langBadge'); bd.textContent = l.wg ? s('shaderWeb') : s('shaderNative'); bd.classList.toggle('off', !l.wg);
    }
    L.forEach(function (l, i) {
      var b = document.createElement('button'); b.type = 'button'; b.setAttribute('role', 'tab'); b.dataset.id = l.id;
      b.innerHTML = l.name + (l.wg ? '<span class="gp" title="WebGPU-compatible">WEBGPU</span>' : '');
      b.addEventListener('click', function () { select(l.id); });
      b.addEventListener('keydown', function (e) { var d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0; if (!d) return; e.preventDefault(); var n = (i + d + L.length) % L.length; select(L[n].id); tabs.children[n].focus(); });
      tabs.appendChild(b);
    });
    select('mgfx');
    onLanguage(function () { select(cur); });
    $('#copyLang').addEventListener('click', function () {
      var btn = this, txt = byId(cur).code, old = btn.textContent;
      function done() { btn.textContent = s('copied'); setTimeout(function () { btn.textContent = old; }, 1400); }
      if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(txt).then(done, done);
      else { var ta = document.createElement('textarea'); ta.value = txt; document.body.appendChild(ta); ta.select(); try { document.execCommand('copy'); } catch (_) {} ta.remove(); done(); }
    });
  }());

  $('#langBtn').addEventListener('click', function () {
    var next = lang === 'es' ? 'en' : 'es';
    try { localStorage.setItem('yotsuba-language', next); } catch (_) {}
    applyLang(next);
  });
  applyLang(lang);
}());
