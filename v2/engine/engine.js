/* Yotsuba Engine — web. Editor interactivo (boceto), selector de producto y formulario. */
(function () {
  'use strict';
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return [].slice.call((r || document).querySelectorAll(s)); };

  /* ---------- idioma compartido con Hybrid y Framework ---------- */
  var lang = window.__LANG__ === 'en' ? 'en' : 'es';
  var langListeners = [], EN = {}, ES = {
    'a11y.skip': 'Saltar al contenido', 'nav.label': 'Navegación principal', 'nav.editor': 'Editor', 'nav.why': 'Por qué Engine', 'nav.box': 'Contenido', 'nav.family': 'Familia', 'nav.roadmap': 'Roadmap', 'nav.community': 'Comunidad', 'nav.early': 'Acceso anticipado',
    'community.eyebrow': 'Yotsuba Open Source', 'community.t1': 'Construyamos', 'community.t2': 'Yotsuba juntos.',
    'community.desc': 'El engine es open source y está construido alrededor de C# real. Ayúdanos a dar forma al editor, el ECS y las herramientas que hacen agradable el ciclo diario de crear juegos.',
    'community.f1': 'Inspecciona y mejora el editor, el ECS y el flujo de compilación.', 'community.f2': 'Explora el código, reporta problemas y comparte ideas en GitHub.', 'community.f3': 'Conecta con creadores y desarrolladores de la comunidad.', 'community.f4': 'Propón cambios para el engine, la web y la documentación.', 'community.support': 'Apoyar el proyecto', 'community.github': 'Ver GitHub', 'community.docs': 'Leer la documentación', 'foot.support': 'Apoyar Yotsuba ♡',
    'form.title': 'Avísame del lanzamiento', 'form.desc': 'Déjanos tu correo y te avisaremos cuando haya una primera versión pública. Sin spam.', 'form.name': 'Nombre', 'form.nameP': 'Tu nombre', 'form.email': 'Correo', 'form.emailP': 'tu@correo.com', 'form.submit': 'Notificarme'
  };
  var COPY = [];
  function copy(sel, es, rich, attr) { COPY.push({ sel: sel, es: es, rich: !!rich, attr: attr || null }); }
  copy('.hero .status', 'Acceso anticipado · en desarrollo');
  copy('.hero .kick', 'el engine de juegos en C#');
  copy('.hero .lede', 'Abre el editor. Pulsa <b>Play</b>. Publica en escritorio y móvil. <b>Gratis y open source, sin regalías</b>, con un proyecto en C# normal que puedes abrir en cualquier IDE.', true);
  copy('.hero-cta .btn', ['Obtener acceso anticipado', 'Pulsa Play ↓']);
  copy('.stamps', 'Destacados', false, 'aria-label');
  copy('.stamps li', ['Gratis y open source', '2D + 3D', 'C# / .NET normal', 'Vulkan · Metal · DX12']);
  copy('.readouts span', ['01 / C# REAL', '02 / 2D + 3D', '03 / UNA FAMILIA', '04 / GRATIS']);
  copy('.readouts strong', ['Tu IDE, tu debugger', 'Un engine, dos mundos', 'No es un callejón sin salida', 'Sin regalías']);
  copy('.readouts small', ['Los scripts son clases C#. Usa Visual Studio, Rider o VS Code y cualquier paquete NuGet.', 'Sprites, tilemaps, animación glTF, materiales PBR, partículas y física.', 'Construido sobre la misma base que Yotsuba Hybrid y Framework. Profundiza cuando quieras.', 'Gratis y open source. Nadie te cobra por publicar tu juego.']);
  copy('.story .step h3', ['Componer', 'Programar', 'Jugar', 'Publicar']);
  copy('.story .step > p:not(.fine)', ['Cada elemento pintado de la escena es una entidad con componentes. Selecciona uno y el Inspector muestra exactamente qué lo hace funcionar.', 'El comportamiento es C#. Añade un script, ábrelo en tu IDE y usa el debugger que ya conoces.', 'Un botón ejecuta la escena. Al detenerla, vuelve exactamente al estado de edición que dejaste.', 'Exporta a las plataformas que elijas. Algunas están listas, otras son experimentales, y las etiquetamos todas.']);
  copy('.story .step .fine', 'Fragmento ilustrativo.');
  copy('.studio .eyebrow', 'Prueba el editor');
  copy('.studio h2', 'Pulsa <em>Play.</em>', true);
  copy('.studio .sub', 'Arrastra los sprites, cambia el Inspector, pulsa Play y después Exportar. En treinta segundos puedes sentir cómo funciona Engine.');
  copy('.studio .sim-note', '<b>Boceto interactivo.</b> Es una maqueta del editor previsto de Engine, no la versión final. El real nace del editor de Yotsuba Hybrid.', true);
  copy('#resetBtn', 'Reiniciar'); copy('#exportBtn', 'Compilar y exportar…'); copy('.hier h3', 'Escena: Level_1'); copy('.hier', 'Entidades', false, 'aria-label'); copy('.hier .add', '+ Entidad'); copy('.vp', 'Viewport de la escena', false, 'aria-label'); copy('.insp h3', 'Inspector');
  copy('.tabs button', ['Consola', 'Contenido', 'Compilar']); copy('.bnote', 'Elige un destino y pulsa <b>Compilar y exportar…</b> en la barra de herramientas.', true);
  copy('.exp-dlg h3', 'Compilar y exportar'); copy('#progTxt', 'Simulado en esta demo.'); copy('#goExport', 'Exportar'); copy('.exp-dlg .paper', 'Cerrar');
  copy('.why .eyebrow', 'Por qué Engine'); copy('.why > .wrap > h2', 'Hecho para quienes <em>aman C#.</em>', true); copy('.why > .wrap > .sub', 'La mayoría de los engines te pide aprender primero su mundo. Este empieza por el lenguaje, el IDE y las librerías que ya utilizas.');
  copy('.cards h3', ['C# real, herramientas reales', 'Gratis significa gratis', 'Sin bloqueo', 'Tus componentes aparecen', 'Reconstruye y ejecuta', 'Herencia XNA']);
  copy('.cards p', ['El gameplay vive en scripts C# conectados a entidades. Depura con tu IDE, añade cualquier paquete NuGet y conserva tus herramientas.', 'Gratis y open source. Sin regalías, pagos por instalación ni licencias por puesto. El engine es código que puedes leer.', 'Un proyecto es código .NET normal más archivos .ytb con JSON legible. Si superas el editor, conservas todo.', 'El Inspector se construye a partir de atributos y metadatos de componentes, así que los componentes que escribes aparecen sin UI adicional.', 'Reconstruye assets y relanza el juego desde el menú del editor para que la distancia entre una idea y un build siga siendo corta.', 'Construido sobre la API de XNA que conocen los desarrolladores de MonoGame, FNA y KNI.']);
  copy('.box .eyebrow', 'Contenido'); copy('.box h2', 'Qué hay <em>dentro.</em>', true);
  copy('.cols h3', ['2D', '3D', 'Flujo de trabajo']);
  copy('.cols li', ['Sprites, transforms y cámara 2D con zoom', 'Orden de profundidad y culling fuera de pantalla', 'Animación, fuentes, texto y botones', 'Tilemaps con Tiled (TMX) y hojas de TexturePacker', 'Física 2D integrada con dibujo de depuración', 'Cámaras, primitivas y sprites 2.5D', 'Modelos glTF con animación esquelética', 'Materiales PBR y shaders personalizados', 'Física 3D integrada con broad phase espacial', 'Partículas y VFX, además de consultas de oclusión por hardware', 'ECS con escenas, entidades, componentes y sistemas', 'Editor: escenas, entidades, consola, historial, selector de color y editor de modelos 3D', 'Scripting con tus propios sistemas', 'Teclado, ratón, gamepad, touch y gestos', 'Audio con canales de SFX y música']);
  copy('.box .fine', 'Proyecto en etapa temprana: la API todavía puede cambiar. Todo lo anterior existe en el código de Yotsuba Hybrid sobre el que se construye Engine.');
  copy('.family .eyebrow', 'La familia'); copy('.family > .wrap > h2', 'Tres productos. <em>Una familia.</em>', true); copy('.family > .wrap > .sub', 'El mismo engine por debajo, tres formas de entrar. Elige la que encaje con tu manera de trabajar y cambia cuando lo necesites.');
  copy('.door .for', ['Para desarrolladores code-first', 'Para quienes quieren ambas cosas', 'Para creadores · estás aquí']); copy('.door p', ['Una librería moderna con forma de XNA. Compute, Vulkan, Metal, DirectX 12, siete lenguajes de shaders. Todo se escribe en código.', 'Framework más engine. El editor vive dentro de la ventana del juego en DEBUG y desaparece en RELEASE.', 'La experiencia clásica: una app de editor con botón Play, navegador de contenido y exportación con un clic.']); copy('.door b', ['Explorar Framework →', 'Explorar Hybrid →', 'Estás aquí ✓']);
  copy('#chooser h3', '¿Qué puerta es la tuya?'); copy('#chooser .opts', 'Cómo te gusta trabajar', false, 'aria-label'); copy('#chooser .opts button', ['Escribo todo en código', 'Quiero ajustar cosas mientras el juego corre', 'Quiero una app de editor con botón Play']);
  copy('.stack h3', 'Bajo el capó'); copy('.stack', 'Cómo encajan las capas', false, 'aria-label'); copy('.stack li span', ['App de editor · hub de proyectos · exportación', 'Registro de sistemas, scripts y modelos', 'ECS · escenas · renderizado · física · input · audio', 'MonoGame · KNI · FNA', 'OpenGL · Vulkan · DirectX 12 · Metal · WebGPU']);
  copy('.plat .eyebrow', 'Plataformas'); copy('.plat h2', 'Publica <em>en todas partes.</em>', true); copy('.plat .sub', 'La columna de estado es intencional. Preferimos decirte qué es experimental antes que sorprenderte después.'); copy('.tbl .th span', ['Destino', 'Gráficos', 'Editor', 'Estado']); copy('.tbl .st', ['Destino compatible', 'Destino compatible', 'Destino compatible', 'Destino compatible', 'Experimental', 'Preview · sin audio en wasm', 'Preview']); copy('.plat .fine', 'Cada fila es un proyecto host del repositorio. La paridad de funciones entre destinos todavía no está garantizada.');
  copy('.uiroad .eyebrow', 'Roadmap'); copy('.uiroad h2', 'Del editor dentro del juego <em>a una app real.</em>', true); copy('.uiroad .sub', 'El editor de Engine parte del que ya existe en Hybrid. Esto es lo que hace hoy y lo que estamos cambiando para convertirlo en un engine completo.'); copy('.today figcaption', 'Grabación real: editor de Yotsuba Hybrid.'); copy('.plan b', ['Hub de proyectos', 'Paneles acoplables', 'Navegador de contenido', 'Jugar dentro del editor', 'Gizmos del viewport', 'Compilar y exportar']); copy('.plan span', ['Crea o abre un proyecto desde plantillas.', 'Mueve, tabula y guarda tu distribución.', 'Miniaturas para sprites, modelos, sonidos y shaders.', 'Juega, pausa, avanza y vuelve al estado de edición.', 'Mueve, rota y escala directamente en la escena.', 'Un diálogo, una lista de destinos.']);
  copy('.foot > .wrap > span', ['YOTSUBA ENGINE · Parte de la familia: Framework · Hybrid · Engine']);

  COPY.forEach(function (d) { d.nodes = $$(d.sel); d.en = d.nodes.map(function (el) { return d.attr ? el.getAttribute(d.attr) : (d.rich ? el.innerHTML : el.textContent); }); });
  $$('[data-i]').forEach(function (el) { EN[el.dataset.i] = el.textContent; });
  $$('[data-ia]').forEach(function (el) { var p = el.dataset.ia.split(':'); EN[p[1]] = el.getAttribute(p[0]); });
  function tr(k) { return lang === 'es' ? (ES[k] || EN[k] || k) : (EN[k] || ES[k] || k); }
  function onLanguage(fn) { langListeners.push(fn); }
  function applyLang(next) {
    lang = next === 'en' ? 'en' : 'es'; document.documentElement.lang = lang;
    $$('[data-i]').forEach(function (el) { el.textContent = tr(el.dataset.i); });
    $$('[data-ia]').forEach(function (el) { var p = el.dataset.ia.split(':'); el.setAttribute(p[0], tr(p[1])); });
    COPY.forEach(function (d) { var val = lang === 'es' ? d.es : null; d.nodes.forEach(function (el, i) { var v = Array.isArray(val) ? val[i] : val; if (v == null) v = d.en[i]; if (d.attr) el.setAttribute(d.attr, v); else if (d.rich) el.innerHTML = v; else el.textContent = v; }); });
    var meta = lang === 'es' ? { title: 'Yotsuba Engine — El engine de juegos en C# que es tuyo', desc: 'Yotsuba Engine — engine de juegos C# gratuito y open source con editor independiente: 2D, 3D, ECS, tilemaps, glTF, partículas y backends Vulkan, DirectX 12 y Metal.', ogTitle: 'Yotsuba Engine — Tu engine es tuyo', ogDesc: 'Un engine C# gratuito y open source con app de editor, botón Play y backends gráficos nativos.' } : { title: 'Yotsuba Engine — The C# game engine you own', desc: 'Yotsuba Engine — a free, open-source C# game engine with a standalone editor: 2D and 3D, ECS, tilemaps, glTF, particles, and Vulkan, DirectX 12 and Metal backends. Early access.', ogTitle: 'Yotsuba Engine — Own your engine', ogDesc: 'A free, open-source C# game engine with an editor app, Play button and native graphics backends. Early access.' };
    document.title = meta.title; $('#metaDescription').content = meta.desc; $('#ogTitle').content = meta.ogTitle; $('#ogDescription').content = meta.ogDesc;
    var b = $('#langBtn'); b.setAttribute('aria-label', lang === 'es' ? 'Cambiar idioma a inglés' : 'Switch language to Spanish'); $('#langCode').textContent = lang === 'es' ? 'EN' : 'ES';
    langListeners.forEach(function (fn) { fn(); });
  }

  var D = {
    en: {
      nothing: 'Nothing selected.', entity: 'Entity', transform: 'TransformComponent', sprite: 'SpriteComponent2D', particles: 'ParticleEmitter', script: 'ScriptComponent', particleInfo: 'CPU update · instanced render',
      sceneReset: 'Scene reset.', created: 'created', backend: 'set to', roadmap: 'roadmap target', playView: 'Game view · Level_1', editView: 'Perspective · Level_1', stop: 'Stop', play: 'Play', playLog: 'Level_1 — {n} entities · {backend}', scriptStarted: 'started Spin.cs, Bob.cs', restored: 'scene restored to its edit state.', reduced: 'Reduced motion is on: animation kept minimal.',
      selectTarget: 'Select at least one target.', building: 'Building… {p}% (simulated)', done: 'Done — this was a simulation. Nothing was written to disk.', exported: 'simulated for {n} target(s).',
      doorFw: 'You want <a href="../framework/index.html">Yotsuba Framework</a>: a modern XNA-shaped library where everything is code.', doorHy: 'You want <a href="../hybrid/index.html">Yotsuba Hybrid</a>: your game plus an editor that lives inside its window in DEBUG.', doorEn: 'You are in the right place. <a href="#join">Yotsuba Engine</a> gives you an editor app, a Play button and one-click export.',
      formInvalid: 'Please enter your name and a valid email.', sending: 'Sending…', formOk: 'You are on the list. Thank you!', formError: 'Something went wrong. Please try again.', notify: 'Notify me'
    },
    es: {
      nothing: 'Nada seleccionado.', entity: 'Entidad', transform: 'TransformComponent', sprite: 'SpriteComponent2D', particles: 'ParticleEmitter', script: 'ScriptComponent', particleInfo: 'Actualización CPU · render instanciado',
      sceneReset: 'Escena reiniciada.', created: 'creado', backend: 'seleccionado', roadmap: 'objetivo de roadmap', playView: 'Vista de juego · Level_1', editView: 'Perspectiva · Level_1', stop: 'Detener', play: 'Play', playLog: 'Level_1 — {n} entidades · {backend}', scriptStarted: 'inició Spin.cs y Bob.cs', restored: 'escena restaurada a su estado de edición.', reduced: 'El movimiento reducido está activo: la animación será mínima.',
      selectTarget: 'Selecciona al menos un destino.', building: 'Compilando… {p}% (simulado)', done: 'Listo — fue una simulación. No se escribió nada en disco.', exported: 'simulado para {n} destino(s).',
      doorFw: 'Quieres <a href="../framework/index.html">Yotsuba Framework</a>: una librería moderna con forma de XNA donde todo es código.', doorHy: 'Quieres <a href="../hybrid/index.html">Yotsuba Hybrid</a>: tu juego más un editor que vive dentro de su ventana en DEBUG.', doorEn: 'Estás en el lugar correcto. <a href="#join">Yotsuba Engine</a> te da una app de editor, un botón Play y exportación con un clic.',
      formInvalid: 'Escribe tu nombre y un correo válido.', sending: 'Enviando…', formOk: 'Ya estás en la lista. ¡Gracias!', formError: 'Algo salió mal. Inténtalo de nuevo.', notify: 'Notificarme'
    }
  };
  function s(key, vars) {
    var text = (D[lang] && D[lang][key]) || D.en[key] || key;
    Object.keys(vars || {}).forEach(function (k) { text = text.replace(new RegExp('\\{' + k + '\\}', 'g'), vars[k]); });
    return text;
  }

  var nav = $('#nav');
  function onScroll() { nav.classList.toggle('solid', window.scrollY > 40); }
  window.addEventListener('scroll', onScroll, { passive: true }); onScroll();
  if ('IntersectionObserver' in window) {
    var rio = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); rio.unobserve(e.target); } }); }, { threshold: .12 });
    $$('.reveal').forEach(function (el) { rio.observe(el); });
  } else { $$('.reveal').forEach(function (el) { el.classList.add('in'); }); }

  (function videoPlayback() {
    var clips = $$('video[data-autoplay-video]');
    if (!clips.length || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    function play(video) { var request = video.play(); if (request && request.catch) request.catch(function () {}); }
    if (!('IntersectionObserver' in window)) { clips.forEach(play); return; }
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) { if (entry.isIntersecting) play(entry.target); else entry.target.pause(); });
    }, { threshold: .12 });
    clips.forEach(function (video) { observer.observe(video); });
  }());

  /* bordes rasgados (clip-path con ruido estable): top / right / bottom / left */
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

  /* ---------- HERO: lente EDIT sobre Enuma Elish ---------- */
  (function () {
    var hero = $('#top'), plate = $('#plate'), lens = $('#lens'), ring = $('#lensRing'), hint = $('#hint'), code = $('.lens-code', ring), rm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
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
      var k = rm ? 1 : 1 - Math.pow(.0018, dt / 1000);
      x += (tx - x) * k; y += (ty - y) * k; r += (baseR() - r) * (rm ? 1 : 1 - Math.pow(.001, dt / 1000));
      lens.style.clipPath = 'circle(' + r.toFixed(1) + 'px at ' + x.toFixed(1) + 'px ' + y.toFixed(1) + 'px)';
      if (Math.abs(r - lastR) > .4) { ring.style.width = ring.style.height = (r * 2).toFixed(1) + 'px'; lastR = r; code.style.display = r > 128 ? '' : 'none'; }
      ring.style.transform = 'translate(' + (x - r).toFixed(1) + 'px,' + (y - r).toFixed(1) + 'px)'; ring.style.opacity = '1';
      requestAnimationFrame(frame);
    }
    x = tx = W * .5; y = ty = H * .42;
    requestAnimationFrame(frame);
    if ('IntersectionObserver' in window) new IntersectionObserver(function (es) { var v = es[0].isIntersecting; if (v && !running) { running = true; last = 0; requestAnimationFrame(frame); } else if (!v) running = false; }).observe(hero);
  }());

  /* ---------- SCROLLYTELLING sobre Enuma ---------- */
  (function () {
    var stage = $('#stage'), steps = $$('.step'), tag = $('#modeTag'), cv = $('#rain'), cx = cv.getContext('2d'), drops = [], on = false, W = 1, H = 1, raf = 0;
    var names = ['EDIT', 'EDIT', 'EDIT', 'PLAYING', 'EXPORT'];
    function fit() { var b = stage.getBoundingClientRect(), d = Math.min(2, devicePixelRatio || 1); W = b.width; H = b.height; cv.width = W * d; cv.height = H * d; cx.setTransform(d, 0, 0, d, 0, 0); }
    fit(); window.addEventListener('resize', fit);
    function rain() {
      raf = requestAnimationFrame(rain); cx.clearRect(0, 0, W, H);
      if (!on) return;
      for (var i = 0; i < 4; i++) drops.push({ x: Math.random() * W, y: -10, v: 9 + Math.random() * 7 });
      cx.strokeStyle = (window.YB_BW ? 'rgba(255,255,255,.7)' : (window.YB_C ? window.YB_C[2] : 'rgba(57,202,236,.8)')); cx.lineWidth = 1.5; cx.beginPath();
      for (var j = drops.length - 1; j >= 0; j--) { var d = drops[j]; cx.moveTo(d.x, d.y); cx.lineTo(d.x - 3, d.y + 14); d.y += d.v; d.x -= .6; if (d.y > H) drops.splice(j, 1); }
      cx.stroke();
    }
    function set(n) { stage.dataset.step = n; tag.textContent = names[n]; on = n === 3; steps.forEach(function (s) { s.classList.toggle('on', +s.dataset.s === n); }); if (on && !raf) raf = requestAnimationFrame(rain); }
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) set(+e.target.dataset.s); }); }, { rootMargin: '-42% 0px -42% 0px' });
      steps.forEach(function (s) { io.observe(s); });
    } else set(1);
    raf = requestAnimationFrame(rain);
  }());

  /* ---------------- EDITOR ---------------- */
  var ed = $('#ed'), vp = $('#vp'), layer = $('#sprites'), hier = $('#hier'), insp = $('#insp'), logEl = $('#log');
  var ents = [
    { id: 'clover', name: 'Clover', kind: 'Sprite', img: '../assets/hybrid-logo.webp', x: .26, y: .28, rot: 0, sc: 1, script: 'Spin' },
    { id: 'fw', name: 'Framework Logo', kind: 'Sprite', img: '../assets/framework-logo.webp', x: .68, y: .3, rot: 0, sc: .9, script: 'Bob' },
    { id: 'sun', name: 'Spark Emitter', kind: 'Particles', x: .5, y: .78, rot: 0, sc: 1, script: '—' }
  ];
  var init = JSON.parse(JSON.stringify(ents)), sel = 'clover', playing = false, extra = 0;
  var backend = /Mac/.test(navigator.platform) ? 'Metal' : /Win/.test(navigator.platform) ? 'DirectX 12' : 'Vulkan';
  $('#backend').value = backend;

  function log(msg, cls) { var li = document.createElement('li'); if (cls) li.className = cls; li.innerHTML = msg; logEl.appendChild(li); logEl.parentNode.scrollTop = 1e6; }
  function byId(id) { return ents.filter(function (e) { return e.id === id; })[0]; }

  function renderHier() {
    hier.innerHTML = '';
    ents.forEach(function (e) {
      var li = document.createElement('li'); li.setAttribute('role', 'option'); li.setAttribute('aria-selected', String(e.id === sel)); li.tabIndex = 0;
      li.innerHTML = e.name + '<i>' + (e.kind === 'Particles' ? s('particles') : e.kind) + '</i>';
      li.addEventListener('click', function () { select(e.id); });
      li.addEventListener('keydown', function (k) { if (k.key === 'Enter' || k.key === ' ') { k.preventDefault(); select(e.id); } });
      hier.appendChild(li);
    });
  }
  function renderSprites() {
    layer.innerHTML = '';
    ents.forEach(function (e) {
      if (!e.img) return;
      var d = document.createElement('div'); d.className = 'spr' + (e.id === sel ? ' sel' : ''); d.dataset.id = e.id;
      d.innerHTML = '<img src="' + e.img + '" alt="">'; layer.appendChild(d);
      d.addEventListener('pointerdown', function (ev) { if (playing) return; select(e.id); drag = { id: e.id, dx: ev.clientX, dy: ev.clientY, x0: e.x, y0: e.y }; d.setPointerCapture(ev.pointerId); });
    });
    place();
  }
  var drag = null;
  vp.addEventListener('pointermove', function (ev) {
    if (!drag) return; var e = byId(drag.id), b = vp.getBoundingClientRect();
    e.x = Math.max(0, Math.min(.85, drag.x0 + (ev.clientX - drag.dx) / b.width)); e.y = Math.max(0, Math.min(.85, drag.y0 + (ev.clientY - drag.dy) / b.height)); place(); syncInsp();
  });
  window.addEventListener('pointerup', function () { drag = null; });
  function place(tt) {
    var b = vp.getBoundingClientRect(); var t = tt || 0;
    $$('.spr', layer).forEach(function (d) {
      var e = byId(d.dataset.id), x = e.x, y = e.y, r = e.rot, s = e.sc;
      if (playing) { if (e.script === 'Spin') r += t * 90; if (e.script === 'Bob') y += Math.sin(t * 2.2) * .04; }
      d.style.transform = 'translate(' + (x * b.width).toFixed(1) + 'px,' + (y * b.height).toFixed(1) + 'px) rotate(' + r.toFixed(1) + 'deg) scale(' + s + ')';
    });
  }
  function select(id) { sel = id; renderHier(); $$('.spr', layer).forEach(function (d) { d.classList.toggle('sel', d.dataset.id === id); }); renderInsp(); }
  function field(lab, key, min, max, step, e) {
    return '<div class="row"><span>' + lab + '</span><input type="range" data-k="' + key + '" min="' + min + '" max="' + max + '" step="' + step + '" value="' + e[key] + '"' + (playing ? ' disabled' : '') + ' aria-label="' + lab + '"><output>' + (+e[key]).toFixed(2) + '</output></div>';
  }
  function renderInsp() {
    var e = byId(sel); if (!e) { insp.innerHTML = '<p class="none">' + s('nothing') + '</p>'; return; }
    var h = '<div class="cmp">' + e.name + '<small>' + s('entity') + ' · ' + (e.kind === 'Particles' ? s('particles') : e.kind) + '</small></div><div class="cmp">' + s('transform') + '</div>' + field('X', 'x', 0, .85, .01, e) + field('Y', 'y', 0, .85, .01, e);
    if (e.img) h += field(lang === 'es' ? 'Rotación' : 'Rotation', 'rot', -180, 180, 1, e) + field(lang === 'es' ? 'Escala' : 'Scale', 'sc', .3, 2, .05, e) + '<div class="cmp">' + s('sprite') + '<small>' + e.img.split('/').pop() + '</small></div>';
    else h += '<div class="cmp">' + s('particles') + '<small>' + s('particleInfo') + '</small></div>';
    h += '<div class="cmp">' + s('script') + '<small>' + e.script + '.cs</small></div>';
    insp.innerHTML = h;
    $$('input[type=range]', insp).forEach(function (i) { i.addEventListener('input', function () { e[i.dataset.k] = +i.value; i.nextSibling.textContent = (+i.value).toFixed(2); place(); }); });
  }
  function syncInsp() { var e = byId(sel); $$('input[type=range]', insp).forEach(function (i) { i.value = e[i.dataset.k]; i.nextSibling.textContent = (+e[i.dataset.k]).toFixed(2); }); }

  $('#addBtn').addEventListener('click', function () {
    if (playing || extra >= 4) return; extra++;
    var e = { id: 'e' + extra, name: 'Entity_' + (ents.length + 1), kind: 'Sprite', img: '../assets/kni.webp', x: .1 + extra * .14, y: .55, rot: 0, sc: .7, script: '—' };
    ents.push(e); log('<b>EntityManager</b> ' + s('created') + ' ' + e.name); renderHier(); renderSprites(); select(e.id);
  });
  $('#resetBtn').addEventListener('click', function () { if (playing) return; ents = JSON.parse(JSON.stringify(init)); extra = 0; sel = 'clover'; renderHier(); renderSprites(); renderInsp(); log(s('sceneReset')); });
  $('#backend').addEventListener('change', function (e) { backend = e.target.value; log('<b>Backend</b> ' + s('backend') + ' ' + backend + (backend.indexOf('WebGPU') === 0 ? ' — ' + s('roadmap') : '') , backend.indexOf('WebGPU') === 0 ? 'w' : ''); });

  /* partículas (canvas 2D) + bucle */
  var cv = $('#fx'), cx = cv.getContext('2d'), parts = [], t0 = 0, fpsN = 0, fpsT = 0, raf = 0, snap = null;
  function fit() { var b = vp.getBoundingClientRect(), d = Math.min(2, devicePixelRatio || 1); cv.width = b.width * d; cv.height = b.height * d; cx.setTransform(d, 0, 0, d, 0, 0); place(); }
  window.addEventListener('resize', fit);
  function loop(now) {
    raf = requestAnimationFrame(loop);
    if (!t0) t0 = now; var t = (now - t0) / 1000, b = vp.getBoundingClientRect();
    fpsN++; if (now - fpsT > 500) { if (playing) $('#fps').textContent = Math.round(fpsN * 1000 / (now - fpsT)) + ' fps'; fpsN = 0; fpsT = now; }
    place(t); cx.clearRect(0, 0, b.width, b.height);
    if (!playing) { parts.length = 0; return; }
    var em = byId('sun'); if (em) for (var i = 0; i < 3; i++) parts.push({ x: em.x * b.width + (Math.random() - .5) * 30, y: em.y * b.height, vx: (Math.random() - .5) * 50, vy: -60 - Math.random() * 90, l: 1 });
    for (var j = parts.length - 1; j >= 0; j--) { var p = parts[j]; p.l -= .014; p.x += p.vx * .016; p.y += p.vy * .016; if (p.l <= 0) { parts.splice(j, 1); continue; } cx.globalAlpha = p.l; cx.fillStyle = p.l > .5 ? (window.YB_BW ? '#fff' : (window.YB_C ? window.YB_C[0] : '#F350A5')) : (window.YB_BW ? '#bbb' : (window.YB_C ? window.YB_C[1] : '#39CAEC')); cx.beginPath(); cx.arc(p.x, p.y, 2 + 3 * p.l, 0, 6.283); cx.fill(); }
    cx.globalAlpha = 1;
  }
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  if ('IntersectionObserver' in window) new IntersectionObserver(function (es) { if (es[0].isIntersecting) { if (!raf) raf = requestAnimationFrame(loop); } else { cancelAnimationFrame(raf); raf = 0; } }).observe(ed);
  else raf = requestAnimationFrame(loop);

  $('#playBtn').addEventListener('click', function () {
    playing = !playing; var b = $('#playBtn'); b.setAttribute('aria-pressed', String(playing));
    ed.classList.toggle('playing', playing); $('#chipMode').textContent = playing ? 'PLAYING' : 'EDIT'; $('.vp-tag').textContent = playing ? s('playView') : s('editView');
    b.querySelector('span').textContent = playing ? s('stop') : s('play');
    if (playing) { snap = JSON.stringify(ents); t0 = 0; log('<b>Play</b> ' + s('playLog', { n: ents.length, backend: backend })); log('<b>ScriptSystem</b> ' + s('scriptStarted')); }
    else { ents = JSON.parse(snap); log('<b>' + s('stop') + '</b> ' + s('restored')); $('#fps').textContent = '— fps'; renderSprites(); }
    renderInsp(); if (reduce && playing) log(s('reduced'), 'w');
  });

  /* tabs */
  $$('.tabs button').forEach(function (b) { b.addEventListener('click', function () { $$('.tabs button').forEach(function (o) { o.setAttribute('aria-selected', String(o === b)); }); $$('.tabbody').forEach(function (p) { p.hidden = p.id !== 'tab-' + b.dataset.tab; }); }); });

  /* export */
  var T = [['Windows · DirectX 12', 'desktop'], ['Linux · Vulkan', 'desktop'], ['macOS · Metal', 'desktop'], ['Android · Vulkan', 'mobile'], ['iOS · Metal', 'experimental'], ['Web · WebGPU', 'roadmap']];
  $('#targets').innerHTML = T.map(function (t, i) { return '<li><label><input type="checkbox" ' + (i === 0 || (i === 2 && backend === 'Metal') ? 'checked' : '') + '> ' + t[0] + '<small>' + t[1] + '</small></label></li>'; }).join('');
  var dlg = $('#dlg'), busy = false;
  $('#exportBtn').addEventListener('click', function () { if (dlg.showModal) dlg.showModal(); else dlg.setAttribute('open', ''); });
  $('#goExport').addEventListener('click', function () {
    if (busy) return; var sel_ = $$('#targets input:checked'); if (!sel_.length) { $('#progTxt').textContent = s('selectTarget'); return; }
    busy = true; var i = 0, bar = $('#progBar'), txt = $('#progTxt'), n = sel_.length * 12;
    var iv = setInterval(function () { i++; bar.style.width = (i / n * 100) + '%'; txt.textContent = s('building', { p: Math.round(i / n * 100) }); if (i >= n) { clearInterval(iv); busy = false; txt.textContent = s('done'); log('<b>Export</b> ' + s('exported', { n: sel_.length })); } }, 60);
  });

  /* estado inicial */
  [lang === 'es' ? 'Proyecto cargado: MyGame.ytb' : 'Project loaded: MyGame.ytb', '<b>InputSystem</b> ' + (lang === 'es' ? 'inició correctamente' : 'started successfully'), '<b>RenderSystem2D</b> ' + (lang === 'es' ? 'inició correctamente' : 'started successfully'), '<b>ScriptSystem</b> ' + (lang === 'es' ? 'listo · backend: ' : 'ready · backend: ') + backend].forEach(function (m) { log(m); });
  renderHier(); renderSprites(); renderInsp(); fit();
  onLanguage(function () { renderHier(); renderInsp(); });

  /* selector de puerta */
  var A = {
    en: { fw: 'You want <a href="../framework/index.html">Yotsuba Framework</a>: a modern XNA-shaped library where everything is code.', hy: 'You want <a href="../hybrid/index.html">Yotsuba Hybrid</a>: your game plus an editor that lives inside its window in DEBUG.', en: 'You are in the right place. <a href="#join">Yotsuba Engine</a> gives you an editor app, a Play button and one-click export.' },
    es: { fw: 'Quieres <a href="../framework/index.html">Yotsuba Framework</a>: una librería moderna con forma de XNA donde todo es código.', hy: 'Quieres <a href="../hybrid/index.html">Yotsuba Hybrid</a>: tu juego más un editor que vive dentro de su ventana en DEBUG.', en: 'Estás en el lugar correcto. <a href="#join">Yotsuba Engine</a> te da una app de editor, un botón Play y exportación con un clic.' }
  };
  var ans = $('#answer'), door = 'en';
  function renderAnswer() { ans.innerHTML = A[lang][door]; }
  renderAnswer();
  $$('#chooser button').forEach(function (b) { b.addEventListener('click', function () { door = b.dataset.k; $$('#chooser button').forEach(function (o) { o.setAttribute('aria-checked', String(o === b)); }); renderAnswer(); }); });
  onLanguage(renderAnswer);

  /* lista de espera: misma tabla que Hybrid; el nombre lleva la etiqueta [Engine] */
  var form = $('#joinForm'), msg = $('#jMsg'), btn = $('#jSubmit');
  form.addEventListener('submit', function (ev) {
    ev.preventDefault();
    var nombre = $('#jName').value.trim(), correo = $('#jMail').value.trim();
    if (!nombre || !/^\S+@\S+\.\S+$/.test(correo)) { msg.textContent = s('formInvalid'); msg.className = 'msg err'; return; }
    var KEY = 'sb_publishable_I_Nn5LGuUJ2v9wlg3HPODg_8BjBHstQ';
    btn.disabled = true; btn.textContent = s('sending'); msg.textContent = '';
    fetch('https://paxcudhlpkjqkgcohonw.supabase.co/rest/v1/Personas', { method: 'POST', headers: { 'Content-Type': 'application/json', apikey: KEY, Authorization: 'Bearer ' + KEY, Prefer: 'return=minimal' }, body: JSON.stringify({ PersonaID: Date.now(), Nombre: nombre + ' [Engine]', Correo: correo, Celular: null }) })
      .then(function (r) { if (!r.ok) throw new Error(r.status); msg.textContent = s('formOk'); msg.className = 'msg ok'; form.reset(); })
      .catch(function () { msg.textContent = s('formError'); msg.className = 'msg err'; })
      .then(function () { btn.disabled = false; btn.textContent = s('notify'); });
  });

  $('#langBtn').addEventListener('click', function () {
    var next = lang === 'es' ? 'en' : 'es';
    try { localStorage.setItem('yotsuba-language', next); } catch (_) {}
    applyLang(next);
  });
  applyLang(lang);
}());
