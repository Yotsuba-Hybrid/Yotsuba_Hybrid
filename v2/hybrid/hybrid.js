/* Yotsuba Hybrid v2 — comportamiento de la página.
   Secciones: i18n · bordes rasgados · lente DEBUG del hero · editor de prueba ·
   hojas (scrollytelling) · matriz de plataformas · formulario. */
(function () {
  'use strict';

  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var coarse = window.matchMedia('(pointer: coarse)').matches;

  /* ======================================================================
     I18N — el español vive en el HTML (se captura al cargar); aquí solo el inglés
     ====================================================================== */
  var EN = {
    'a11y.skip': 'Skip to content',
    'nav.home': 'Yotsuba Hybrid — Home', 'nav.label': 'Main navigation',
    'nav.try': 'Try it', 'nav.leaves': 'The four leaves', 'nav.platforms': 'Platforms', 'nav.free': 'Free', 'nav.community': 'Community', 'nav.notify': 'Notify me',
    'hero.alt': 'Yotsuba Hybrid: a four-leaf clover painted in watercolor, with a brush in the corner',
    'hero.tag': 'no editor', 'hero.hint': 'Move your cursor!',
    'hero.status': 'In development · Coming soon',
    'hero.lede': 'Yotsuba Hybrid doesn\'t make you choose between the <b>control</b> of a framework like MonoGame and the <b>visual convenience</b> of an engine like Unity or Godot. It gives you both, on the same codebase.',
    'hero.try': 'Try it in your browser', 'hero.notify': 'Notify me at launch',
    'try.eyebrow': 'Try it · nothing to install',
    'try.t1': 'Move something.', 'try.t2': 'Watch the code appear.',
    'try.desc': 'This is how Yotsuba Hybrid feels: the editor lives inside your game\'s window, and what you do by hand becomes C#. Drag an entity, tweak its values, or switch to RELEASE and watch the editor disappear.',
    'try.note': 'Interactive mockup running in your browser. The real software is still in development; the API names shown are illustrative.',
    'ide.mode': 'Build mode', 'ide.backend': 'Backend', 'ide.scene': 'Scene', 'ide.add': '＋ Entity',
    'ide.canvas': 'Game scene: drag the entities', 'ide.inspector': 'Inspector', 'ide.entity': 'Entity',
    'ide.rot': 'Rotation', 'ide.scale': 'Scale', 'ide.comps': '2 components',
    'ide.code': 'Generated C#', 'ide.copy': 'Copy C#', 'ide.console': 'Console',
    'ide.release': 'the editor <s>#if DEBUG</s> is not part of the binary. Only your game remains.',
    'leaves.eyebrow': 'Yotsuba = "four leaves"', 'leaves.t1': 'Each leaf is', 'leaves.t2': 'a pillar.',
    'p1.nav': 'Portability', 'p2.nav': 'Architecture quality', 'p3.nav': 'One base, many targets', 'p4.nav': 'Free & open source',
    'p1.title': 'The editor lives inside your game, not beside it.',
    'p1.d1': 'In debug mode, Yotsuba Hybrid opens a visual editor inside the very window where your game renders — not in a separate app. You work from your favorite IDE, run the project, and edit while it runs in real time.',
    'p1.s1t': 'Write your game', 'p1.s1d': 'Regular code, with no ties to a proprietary editor. You still own your architecture.',
    'p1.s2t': 'Run in debug mode', 'p1.s2d': 'The visual editor appears inside the game window: no separate apps, no lost context.',
    'p1.s3t': 'Build for release', 'p1.s3d': 'Compile directives strip the editor out completely. Only your game remains, running on the backend you chose.',
    'p1.frame': 'my-game.exe — debug', 'p1.alt': 'Yotsuba Hybrid visual editor inside the game window', 'p1.video': 'Real footage of the Yotsuba Hybrid editor.',
    'p2.title': 'Two layers. Each one does its job.',
    'p2.d1': '<b>Yotsuba Framework</b> is a modern, from-scratch reimplementation of XNA, with parallel rendering, Slang shaders and automatic visibility/occlusion. <b>Yotsuba Engine</b> sits on top: entities, components, systems, scenes, scripting and editor.',
    'p2.stack': 'Yotsuba Hybrid layers', 'p2.l1': 'Your game', 'p2.l1d': 'C# / .NET — written once', 'p2.l2d': 'entities · components · systems · scenes · scripting · editor',
    'p2.l3': 'Yotsuba native backends',
    'p2.d2': 'What you decide in the editor becomes C# code at build time: less JSON to read at startup, faster loads, and visual content that lives alongside your code. The Engine ships as an editable C# project inside your solution: if you want to change how something works, you change it.',
    'p3.title': 'Platforms add up — they are not divided.',
    'p3.d1': 'Because you can run your game with MonoGame, KNI, FNA or Yotsuba Framework, every platform supported by any of the four is available to your project. Toggle backends and watch your reach grow.',
    'p3.matrix': 'Platform matrix by backend', 'p3.lg1': 'planned target', 'p3.lg2': 'needs manufacturer licenses', 'p3.lg3': 'Tap a backend to switch it on or off.',
    'p3.note': 'The coverage shown represents the project\'s announced goals and the capabilities of its backends; it does not mean every target is available today in a stable release. Consoles require approval, licenses and tools from each manufacturer.',
    'p4.title': 'Free and open source. No ceiling.',
    'p4.d1': 'Yotsuba Hybrid, Yotsuba Engine and Yotsuba Framework will be free and open source, just like MonoGame, KNI and FNA. You can build and ship your game with any of the four backends without paying licenses, and without limits tied to your project\'s size or success.',
    'p4.ticket': 'Price', 'p4.forever': 'forever', 'p4.status': 'Open source · coming soon',
    'p4.f1': 'Integrated visual editor in debug mode.', 'p4.f2': 'Switch backends without friction, based on what your project needs: compatibility or performance.', 'p4.f3': 'For hobbyists, indies and professional studios.',
    'community.eyebrow': 'Yotsuba Open Source', 'community.t1': 'Build', 'community.t2': 'Yotsuba together.',
    'community.desc': 'The code is open and so is the path. Help us improve the integrated editor, the backends and the documentation that connects the Yotsuba family.',
    'community.f1': 'Open editor, Framework and Hybrid code for anyone to inspect and improve.',
    'community.f2': 'Explore the code, report issues and share ideas on GitHub.',
    'community.f3': 'Connect with the community and follow development closely.',
    'community.f4': 'Propose changes to the code, website and documentation.',
    'community.support': 'Support the project', 'community.github': 'View GitHub', 'community.docs': 'Read the docs',
    'cta.eyebrow': 'Follow the development', 'cta.t1': 'One codebase.', 'cta.t2': 'Every platform.',
    'cta.desc': 'Yotsuba Hybrid and Yotsuba Framework will be free and open source. Leave your details and we\'ll tell you when the first public release arrives.', 'cta.donate': 'Donate',
    'form.title': 'Notify me at launch', 'form.desc': 'We\'ll let you know as soon as Yotsuba Hybrid is available. No spam.',
    'form.name': 'Name', 'form.nameP': 'Your name', 'form.email': 'Email', 'form.emailP': 'you@email.com', 'form.phone': 'Phone', 'form.opt': '(optional)', 'form.submit': 'Notify me',
    'foot.copy': '© 2026 Yotsuba Hybrid. Framework + Engine.', 'foot.fw': 'Only need the framework? Yotsuba Framework →', 'foot.engine': 'Prefer a standalone editor? Yotsuba Engine →'
  };

  // Cadenas dinámicas (se generan desde JS)
  var S = {
    es: {
      langTo: 'Cambiar idioma a inglés', langCode: 'EN',
      hint: 'Arrastra una entidad · flechas para afinar', hintRel: 'Modo juego: haz clic en las entidades',
      titleDebug: 'my-game.exe — debug', titleRel: 'my-game.exe — release',
      diff: 'MyGame.Core · 0 líneas cambiadas',
      copied: '¡Copiado!', copy: 'Copiar C#',
      note: '// Ilustrativo: la API final puede cambiar',
      backend: 'Backend → {n} · MyGame.Core sin cambios', targets: 'Destinos: {t}',
      modeDebug: 'Build: Debug · editor visual activo', modeRel: 'Build: Release · editor excluido del binario',
      moved: '{n}.Transform → ({x}, {y})', added: 'Entidad creada: {n}', removed: 'Entidad eliminada: {n}',
      up1: 'InputSystem started successfully', up2: 'RenderSystem2D started successfully', up3: 'Scene loaded: {c} entities',
      entity: 'Entidad',
      mxTarget: 'Destino', mxSum: 'Tu proyecto llega a', mxNone: '— activa un backend —',
      mobile: 'Móvil', mobileS: 'Android · iOS · iPadOS', desk: 'Escritorio', deskS: 'Windows · macOS · Linux · SteamOS',
      cons: 'Consolas', consS: 'Xbox · PlayStation · Switch', web: 'Web', webS: 'Navegador (WebGL / WebGPU)', xr: 'Realidad extendida', xrS: 'VR · AR · Vision Pro',
      sending: 'Enviando...', req: 'Por favor completa nombre y correo.', ok: '¡Listo! Te avisaremos apenas lancemos Yotsuba Hybrid.', err: 'Algo salió mal. Intenta de nuevo en unos segundos.', submit: 'Notificarme',
      docTitle: 'Yotsuba Hybrid — Framework × Engine, en uno solo',
      docDesc: 'Crea juegos y aplicaciones en C# y .NET con un editor visual integrado y cuatro backends gratuitos y open source: MonoGame, KNI, FNA y Yotsuba Framework.'
    },
    en: {
      langTo: 'Switch language to Spanish', langCode: 'ES',
      hint: 'Drag an entity · arrow keys to fine-tune', hintRel: 'Game mode: click the entities',
      titleDebug: 'my-game.exe — debug', titleRel: 'my-game.exe — release',
      diff: 'MyGame.Core · 0 lines changed',
      copied: 'Copied!', copy: 'Copy C#',
      note: '// Illustrative: the final API may change',
      backend: 'Backend → {n} · MyGame.Core unchanged', targets: 'Targets: {t}',
      modeDebug: 'Build: Debug · visual editor on', modeRel: 'Build: Release · editor excluded from the binary',
      moved: '{n}.Transform → ({x}, {y})', added: 'Entity created: {n}', removed: 'Entity removed: {n}',
      up1: 'InputSystem started successfully', up2: 'RenderSystem2D started successfully', up3: 'Scene loaded: {c} entities',
      entity: 'Entity',
      mxTarget: 'Target', mxSum: 'Your project reaches', mxNone: '— switch a backend on —',
      mobile: 'Mobile', mobileS: 'Android · iOS · iPadOS', desk: 'Desktop', deskS: 'Windows · macOS · Linux · SteamOS',
      cons: 'Consoles', consS: 'Xbox · PlayStation · Switch', web: 'Web', webS: 'Browser (WebGL / WebGPU)', xr: 'Extended reality', xrS: 'VR · AR · Vision Pro',
      sending: 'Sending...', req: 'Please enter your name and email.', ok: "You're all set! We'll let you know as soon as Yotsuba Hybrid launches.", err: 'Something went wrong. Please try again in a few seconds.', submit: 'Notify me',
      docTitle: 'Yotsuba Hybrid — Framework × Engine, all in one',
      docDesc: 'Build games and apps in C# and .NET with an integrated visual editor and four free, open-source backends: MonoGame, KNI, FNA and Yotsuba Framework.'
    }
  };

  var ES = {};   // capturado del HTML
  var lang = window.__LANG__ === 'en' ? 'en' : 'es';

  function captureES() {
    $$('[data-i]').forEach(function (el) { ES[el.dataset.i] = el.textContent; });
    $$('[data-ih]').forEach(function (el) { ES[el.dataset.ih] = el.innerHTML; });
    $$('[data-ia]').forEach(function (el) {
      var p = el.dataset.ia.split(':'); ES[p[1]] = el.getAttribute(p[0]);
    });
  }
  captureES();
  function tr(k) { var d = lang === 'en' ? EN : ES; return d[k] != null ? d[k] : (ES[k] || ''); }
  function s(k, vars) {
    var str = S[lang][k] || S.es[k] || k;
    if (vars) Object.keys(vars).forEach(function (v) { str = str.replace('{' + v + '}', vars[v]); });
    return str;
  }

  function applyLang(l) {
    lang = l;
    document.documentElement.lang = l;
    $$('[data-i]').forEach(function (el) { el.textContent = tr(el.dataset.i); });
    $$('[data-ih]').forEach(function (el) { el.innerHTML = tr(el.dataset.ih); });
    $$('[data-ia]').forEach(function (el) { var p = el.dataset.ia.split(':'); el.setAttribute(p[0], tr(p[1])); });
    document.title = s('docTitle');
    $('#metaDescription').setAttribute('content', s('docDesc'));
    var btn = $('#langBtn'); btn.setAttribute('aria-label', s('langTo')); $('#langCode').textContent = s('langCode');
    ide.refreshLang(); matrix.render();
  }

  /* ======================================================================
     NAV + REVEAL
     ====================================================================== */
  var nav = $('#nav');
  function onScroll() { nav.classList.toggle('solid', window.scrollY > 40); }
  window.addEventListener('scroll', onScroll, { passive: true }); onScroll();

  var io = 'IntersectionObserver' in window ? new IntersectionObserver(function (es) {
    es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold: .12 }) : null;
  $$('.reveal').forEach(function (el) { if (io) io.observe(el); else el.classList.add('in'); });

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

  /* ======================================================================
     BORDES RASGADOS (clip-path con ruido, estable por elemento)
     ====================================================================== */
  function rng(seed) { var a = seed >>> 0; return function () { a |= 0; a = a + 0x6D2B79F5 | 0; var t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
  function edge(r, n, amp, ph) { var out = []; for (var i = 0; i <= n; i++) out.push(amp * (.5 * r() + .5 * (.5 + .5 * Math.sin(i * .55 + ph)))); return out; }
  function tear(el, seed) {
    var sides = (el.dataset.torn || '').split(/\s+/), r = rng(seed), n = 90, amp = 13, pts = [], i, v;
    if (sides.indexOf('top') > -1) { v = edge(r, n, amp, r() * 6); for (i = 0; i <= n; i++) pts.push((i / n * 100).toFixed(2) + '% ' + v[i].toFixed(1) + 'px'); }
    else pts.push('0 0', '100% 0');
    pts.push('100% ' + (sides.indexOf('bottom') > -1 ? 'calc(100% - ' + amp + 'px)' : '100%'));
    if (sides.indexOf('bottom') > -1) { v = edge(r, n, amp, r() * 6); for (i = n; i >= 0; i--) pts.push((i / n * 100).toFixed(2) + '% calc(100% - ' + v[i].toFixed(1) + 'px)'); }
    else pts.push('0 100%');
    if (sides.indexOf('left') > -1) { v = edge(r, 60, 16, r() * 6); for (i = 60; i >= 0; i--) pts.push(v[i].toFixed(1) + 'px ' + (i / 60 * 100).toFixed(2) + '%'); }
    el.style.clipPath = 'polygon(' + pts.join(',') + ')';
  }
  $$('[data-torn]').forEach(function (el, i) { tear(el, 1234 + i * 977); });

  /* ======================================================================
     HERO — lente DEBUG
     ====================================================================== */
  (function () {
    var hero = $('#inicio'), plate = $('#plate'), lens = $('#lens'), ring = $('#lensRing'), hint = $('#hint');
    var code = $('.lens-code', ring);
    var x = 0, y = 0, tx = 0, ty = 0, r = 0, tR = 0, W = 1, H = 1, last = 0, lastR = -1;
    var interacted = false, inside = false, running = true, t0 = performance.now(), idleAt = 0;

    function measure() { var b = plate.getBoundingClientRect(); W = b.width; H = b.height; }
    function baseR() { return Math.max(118, Math.min(188, Math.min(W, H) * .27)); }
    measure(); window.addEventListener('resize', measure);

    function setTarget(e) {
      var b = plate.getBoundingClientRect();
      tx = e.clientX - b.left; ty = e.clientY - b.top;
    }
    hero.addEventListener('pointermove', function (e) {
      if (e.pointerType === 'touch') return;
      setTarget(e); if (!interacted) { interacted = true; hint.classList.add('gone'); }
      inside = true; idleAt = performance.now();
    });
    hero.addEventListener('pointerleave', function () { inside = false; idleAt = performance.now(); });
    plate.addEventListener('pointerdown', function (e) {
      setTarget(e); interacted = true; inside = true; hint.classList.add('gone'); idleAt = performance.now();
      if (e.pointerType === 'touch') { plate.style.touchAction = 'pan-y'; }
    });
    plate.addEventListener('pointermove', function (e) { if (e.pointerType === 'touch' && e.buttons) { setTarget(e); idleAt = performance.now(); } });
    plate.style.touchAction = 'pan-y';
    setTimeout(function () { hint.classList.add('gone'); }, 14000);

    function frame(now) {
      if (!running) return;
      var dt = Math.min(48, now - (last || now)); last = now;
      var t = (now - t0) / 1000;
      // sin interacción reciente, el lente pasea solo por el trébol
      if (!inside || now - idleAt > 4500) {
        tx = W * (.36 + .13 * Math.sin(t * .62)); ty = H * (.5 + .17 * Math.sin(t * .83 + 1.2));
      }
      var k = reduceMotion ? 1 : 1 - Math.pow(.0018, dt / 1000);
      x += (tx - x) * k; y += (ty - y) * k;
      tR = baseR(); r += (tR - r) * (reduceMotion ? 1 : 1 - Math.pow(.001, dt / 1000));
      lens.style.clipPath = 'circle(' + r.toFixed(1) + 'px at ' + x.toFixed(1) + 'px ' + y.toFixed(1) + 'px)';
      if (Math.abs(r - lastR) > .4) { ring.style.width = ring.style.height = (r * 2).toFixed(1) + 'px'; lastR = r; code.style.display = r > 128 ? '' : 'none'; }
      ring.style.transform = 'translate(' + (x - r).toFixed(1) + 'px,' + (y - r).toFixed(1) + 'px)';
      ring.style.opacity = '1';
      requestAnimationFrame(frame);
    }
    x = tx = W * .36; y = ty = H * .5; r = 0;
    requestAnimationFrame(frame);
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (es) {
        var v = es[0].isIntersecting; if (v && !running) { running = true; last = 0; requestAnimationFrame(frame); } else if (!v) running = false;
      }).observe(hero);
    }
  }());

  /* ======================================================================
     EDITOR DE PRUEBA
     ====================================================================== */
  var ide = (function () {
    var root = $('#ide'), stage = $('#stage'), cv = $('#game'), ctx = cv.getContext('2d');
    var W = 960, H = 540;
    var view = { s: 1, ox: 0, oy: 0, cw: 0, ch: 0, dpr: 1 };
    var assets = {}; var pending = 0;
    function load(id, src) { var im = new Image(); pending++; im.onload = im.onerror = function () { pending--; }; im.src = src; assets[id] = im; }
    load('hybrid', '../assets/hybrid-logo.webp'); load('monogame', '../assets/monogame.webp'); load('kni', '../assets/kni.webp'); load('fna', '../assets/fna.webp'); load('yotsuba', '../assets/framework-logo.webp');

    var COLORS = ['#f2467f', '#8a6bea', '#22c7b5', '#f6b72b'];
    var ents = [
      { name: 'Hybrid', tex: 'hybrid-logo', img: 'hybrid', x: 480, y: 272, rot: 0, sc: 1, w: 176, h: 176, c: '#f2467f', kind: 'logo' },
      { name: 'MonoGame', tex: 'monogame', img: 'monogame', x: 208, y: 150, rot: -6, sc: 1, w: 96, h: 96, c: '#f6b72b', kind: 'sticker' },
      { name: 'KNI', tex: 'kni', img: 'kni', x: 752, y: 142, rot: 5, sc: 1, w: 96, h: 96, c: '#f6b72b', kind: 'sticker' },
      { name: 'FNA', tex: 'fna', img: 'fna', x: 196, y: 396, rot: 4, sc: 1, w: 112, h: 84, c: '#8a6bea', kind: 'sticker' },
      { name: 'YotsubaFramework', tex: 'framework-logo', img: 'yotsuba', x: 764, y: 392, rot: -4, sc: 1, w: 104, h: 104, c: '#22c7b5', kind: 'sticker' }
    ];
    ents.forEach(function (e, i) { e.ph = i * 1.3; e.kick = 0; e.seed = 11 + i * 7; });
    var sel = 0, mode = 'debug', backend = 'yotsuba', nBlob = 0;
    var mouse = { x: W / 2, y: H / 2, in: false }, drag = null, hover = -1;

    var BE = {
      monogame: { n: 'MonoGame', es: 'Android · iOS · Desktop · Consolas', en: 'Android · iOS · Desktop · Consoles' },
      kni: { n: 'KNI', es: 'Android · iOS · Desktop · Web', en: 'Android · iOS · Desktop · Web' },
      fna: { n: 'FNA', es: 'Windows · Linux/macOS · iOS/tvOS · Consolas', en: 'Windows · Linux/macOS · iOS/tvOS · Consoles' },
      yotsuba: { n: 'Yotsuba Framework', es: 'Vulkan · Metal · WebGPU · DirectX 12', en: 'Vulkan · Metal · WebGPU · DirectX 12' }
    };

    /* ----- consola ----- */
    var logEl = $('#log');
    function stamp() { var d = new Date(); return [d.getHours(), d.getMinutes(), d.getSeconds()].map(function (n) { return String(n).padStart(2, '0'); }).join(':'); }
    function log(msg, cls) {
      var row = document.createElement('div'); row.innerHTML = '<time>' + stamp() + '</time><span class="' + (cls || '') + '"></span>';
      row.lastChild.textContent = msg; logEl.insertBefore(row, logEl.firstChild);
      while (logEl.children.length > 9) logEl.removeChild(logEl.lastChild);
    }

    /* ----- lista de escena ----- */
    var list = $('#entList');
    function renderList() {
      list.innerHTML = '';
      ents.forEach(function (e, i) {
        var li = document.createElement('li'), b = document.createElement('button');
        b.type = 'button'; b.setAttribute('aria-pressed', String(i === sel));
        b.innerHTML = '<span class="sw" style="--c:' + e.c + '"></span><span></span>'; b.lastChild.textContent = e.name;
        b.addEventListener('click', function () { select(i, true); });
        li.appendChild(b); list.appendChild(li);
      });
      $('#entCount').textContent = ents.length;
      $('#addEnt').disabled = ents.length >= 12;
    }

    /* ----- inspector ----- */
    var inX = $('#inX'), inY = $('#inY'), inR = $('#inR'), inS = $('#inS'), oR = $('#oR'), oS = $('#oS'), inName = $('#inName');
    function syncInspector() {
      var e = ents[sel]; if (!e) return;
      inName.textContent = e.name;
      if (document.activeElement !== inX) inX.value = Math.round(e.x);
      if (document.activeElement !== inY) inY.value = Math.round(e.y);
      inR.value = e.rot; inS.value = e.sc;
      oR.textContent = Math.round(e.rot) + '°'; oS.textContent = e.sc.toFixed(2) + '×';
    }
    function num(v, lo, hi, d) { v = parseFloat(v); if (!isFinite(v)) return d; return Math.max(lo, Math.min(hi, v)); }
    function edited() { syncInspector(); codegen(); }
    inX.addEventListener('input', function () { ents[sel].x = num(inX.value, 0, W, ents[sel].x); codegen(); });
    inY.addEventListener('input', function () { ents[sel].y = num(inY.value, 0, H, ents[sel].y); codegen(); });
    inR.addEventListener('input', function () { ents[sel].rot = +inR.value; edited(); });
    inS.addEventListener('input', function () { ents[sel].sc = +inS.value; edited(); });
    [inX, inY].forEach(function (i) { i.addEventListener('change', function () { logMove(); syncInspector(); }); });

    var moveLogT = 0;
    function logMove() { var e = ents[sel]; log(s('moved', { n: e.name, x: Math.round(e.x), y: Math.round(e.y) })); }

    /* ----- generador de C# ----- */
    var codeEl = $('#codeOut');
    function esc(t) { return String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;'); }
    function vname(n) { var v = n.replace(/[^A-Za-z0-9]/g, ''); return v.charAt(0).toLowerCase() + v.slice(1); }
    var codeQueued = false;
    function codegen() { if (codeQueued) return; codeQueued = true; requestAnimationFrame(function () { codeQueued = false; codegenNow(); }); }
    function codegenNow() {
      var out = [];
      out.push('<span class="c">' + esc(s('note')) + '</span>');
      out.push('<span class="k">public static class</span> <span class="t">MainScene</span>');
      out.push('{');
      out.push('    <span class="k">public static void</span> Load(<span class="t">Scene</span> scene)');
      out.push('    {');
      ents.forEach(function (e, i) {
        var v = vname(e.name), blk = [];
        blk.push('        <span class="k">var</span> ' + esc(v) + ' = scene.CreateEntity(<span class="s">"' + esc(e.name) + '"</span>);');
        blk.push('        ' + esc(v) + '.Add(<span class="k">new</span> <span class="t">TransformComponent</span> { Position = <span class="k">new</span>(<span class="n">' + Math.round(e.x) + '</span>, <span class="n">' + Math.round(e.y) + '</span>), Rotation = <span class="n">' + Math.round(e.rot) + 'f</span>, Scale = <span class="n">' + e.sc.toFixed(2) + 'f</span> });');
        blk.push('        ' + esc(v) + '.Add(<span class="k">new</span> <span class="t">SpriteComponent2D</span> { Texture = <span class="s">"' + esc(e.tex || 'blob') + '"</span> });');
        out.push(i === sel ? '<span class="hl" data-sel>' + blk.join('\n') + '</span>' : blk.join('\n'));
      });
      out.push('    }');
      out.push('}');
      codeEl.innerHTML = out.join('\n');
      var h = $('[data-sel]', codeEl), box = codeEl.parentNode;
      if (h && lastSelScroll) { box.scrollTop = Math.max(0, h.offsetTop - 40); lastSelScroll = false; }
    }
    var lastSelScroll = false;

    $('#copyCode').addEventListener('click', function () {
      var btn = this, text = codeEl.textContent;
      function done() { btn.textContent = s('copied'); setTimeout(function () { btn.textContent = s('copy'); }, 1600); }
      if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(done, done);
      else { var ta = document.createElement('textarea'); ta.value = text; document.body.appendChild(ta); ta.select(); try { document.execCommand('copy'); } catch (_) {} ta.remove(); done(); }
    });

    /* ----- selección / añadir / borrar ----- */
    function select(i, scrollCode) { sel = i; lastSelScroll = !!scrollCode; renderList(); syncInspector(); codegen(); }
    $('#addEnt').addEventListener('click', function () {
      if (ents.length >= 12) return;
      nBlob++;
      var c = COLORS[nBlob % COLORS.length];
      var e = { name: s('entity').replace(/\s/g, '') + '_' + nBlob, tex: 'blob', img: null, x: 480 + (Math.random() - .5) * 200, y: 272 + (Math.random() - .5) * 140, rot: Math.round((Math.random() - .5) * 60), sc: 1, w: 84, h: 84, c: c, kind: 'blob', ph: Math.random() * 6, kick: 1, seed: 100 + nBlob * 13 };
      e.x = Math.round(e.x); e.y = Math.round(e.y);
      ents.push(e); log(s('added', { n: e.name }), 'ok'); select(ents.length - 1, true);
    });

    /* ----- dibujo ----- */
    function rr(c, x, y, w, h, r) { c.beginPath(); c.moveTo(x + r, y); c.arcTo(x + w, y, x + w, y + h, r); c.arcTo(x + w, y + h, x, y + h, r); c.arcTo(x, y + h, x, y, r); c.arcTo(x, y, x + w, y, r); c.closePath(); }
    function blobPath(c, e, R) {
      var rnd = rng(e.seed), n = 14, pts = [];
      for (var i = 0; i < n; i++) { var a = i / n * Math.PI * 2, rad = R * (.78 + rnd() * .3); pts.push([Math.cos(a) * rad, Math.sin(a) * rad]); }
      c.beginPath();
      for (i = 0; i < n; i++) { var p0 = pts[i], p1 = pts[(i + 1) % n], mx = (p0[0] + p1[0]) / 2, my = (p0[1] + p1[1]) / 2; if (i === 0) c.moveTo(mx, my); var p2 = pts[(i + 1) % n], p3 = pts[(i + 2) % n]; c.quadraticCurveTo(p2[0], p2[1], (p2[0] + p3[0]) / 2, (p2[1] + p3[1]) / 2); }
      c.closePath();
    }
    function drawWorld(t) {
      // cielo de acuarela
      var g = ctx.createLinearGradient(0, 0, 0, H); g.addColorStop(0, '#f7ecdc'); g.addColorStop(.55, '#f5dcc6'); g.addColorStop(1, '#e8c9c0');
      ctx.fillStyle = g; ctx.fillRect(-2000, -2000, 5000, 5000);
      [[150, 110, 190, 'rgba(242,70,127,.16)'], [780, 90, 170, 'rgba(138,107,234,.16)'], [500, 300, 230, 'rgba(34,199,181,.10)']].forEach(function (b) {
        var rg = ctx.createRadialGradient(b[0], b[1], 0, b[0], b[1], b[2]); rg.addColorStop(0, b[3]); rg.addColorStop(1, 'rgba(255,255,255,0)'); ctx.fillStyle = rg; ctx.fillRect(b[0] - b[2], b[1] - b[2], b[2] * 2, b[2] * 2);
      });
      // colinas de tinta
      function hills(base, amp, f, ph, col) { ctx.beginPath(); ctx.moveTo(-2000, 3000); for (var x = -300; x <= W + 300; x += 12) ctx.lineTo(x, base + Math.sin(x * f + ph) * amp + Math.sin(x * f * 2.3 + ph * 2) * amp * .4); ctx.lineTo(W + 300, 3000); ctx.closePath(); ctx.fillStyle = col; ctx.fill(); }
      hills(430, 26, .006, 1, 'rgba(34,120,120,.28)'); hills(478, 22, .009, 3, 'rgba(21,17,13,.78)');
      if (mode === 'debug') {
        ctx.lineWidth = 1 / view.s; ctx.strokeStyle = 'rgba(21,17,13,.10)'; ctx.beginPath();
        for (var gx = 0; gx <= W; gx += 40) { ctx.moveTo(gx, 0); ctx.lineTo(gx, H); }
        for (var gy = 0; gy <= H; gy += 40) { ctx.moveTo(0, gy); ctx.lineTo(W, gy); }
        ctx.stroke();
        ctx.strokeStyle = 'rgba(21,17,13,.4)'; ctx.setLineDash([6 / view.s, 5 / view.s]); ctx.strokeRect(0, 0, W, H); ctx.setLineDash([]);
      }
    }
    function xf(e, t) {
      var bob = reduceMotion ? 0 : Math.sin(t * 1.3 + e.ph) * 3.2, wob = reduceMotion ? 0 : Math.sin(t * .9 + e.ph) * 1.6;
      var px = 0, py = 0;
      if (mode === 'release' && mouse.in && !reduceMotion) { var d = e.kind === 'logo' ? .035 : .07; px = (mouse.x - W / 2) * d * -1; py = (mouse.y - H / 2) * d * -1; }
      var k = e.kick > 0 ? 1 + .22 * Math.sin(e.kick * 9) * e.kick : 1;
      var hv = (mode === 'release' && hover === ents.indexOf(e)) ? 1.07 : 1;
      return { x: e.x + px, y: e.y + py + bob, rot: (e.rot + wob) * Math.PI / 180, s: e.sc * k * hv };
    }
    function drawEntity(e, i, t) {
      var p = xf(e, t); ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.rot); ctx.scale(p.s, p.s);
      var im = e.img && assets[e.img];
      ctx.shadowColor = 'rgba(40,25,10,.28)'; ctx.shadowBlur = 16; ctx.shadowOffsetY = 8;
      if (e.kind === 'logo') {
        if (im && im.complete && im.naturalWidth) ctx.drawImage(im, -e.w / 2, -e.h / 2, e.w, e.h);
      } else if (e.kind === 'sticker') {
        ctx.fillStyle = e.img === 'fna' ? '#1c1a17' : '#fbf3e2'; ctx.strokeStyle = '#15110d'; ctx.lineWidth = 3; rr(ctx, -e.w / 2, -e.h / 2, e.w, e.h, 14); ctx.fill(); ctx.shadowColor = 'transparent'; ctx.stroke();
        if (im && im.complete && im.naturalWidth) { var pad = 12, aw = e.w - pad * 2, ah = e.h - pad * 2, ar = im.naturalWidth / im.naturalHeight, dw = aw, dh = aw / ar; if (dh > ah) { dh = ah; dw = ah * ar; } ctx.drawImage(im, -dw / 2, -dh / 2, dw, dh); }
      } else {
        var R = e.w / 2; blobPath(ctx, e, R);
        var gr = ctx.createRadialGradient(-R * .3, -R * .3, R * .1, 0, 0, R); gr.addColorStop(0, e.c); gr.addColorStop(1, e.c + 'aa');
        ctx.fillStyle = gr; ctx.fill(); ctx.shadowColor = 'transparent'; ctx.lineWidth = 3; ctx.strokeStyle = '#15110d'; ctx.stroke();
        ctx.beginPath(); ctx.arc(-R * .25, -R * .3, R * .16, 0, 7); ctx.fillStyle = 'rgba(255,255,255,.55)'; ctx.fill();
      }
      ctx.restore();
    }
    function drawGizmo(e, t) {
      var p = xf(e, t), w = e.w * p.s, h = e.h * p.s;
      ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.rot);
      var u = 1 / view.s;
      ctx.lineWidth = 1.8 * u; ctx.strokeStyle = '#f6b72b'; ctx.setLineDash([7 * u, 5 * u]); ctx.strokeRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12); ctx.setLineDash([]);
      ctx.fillStyle = '#15110d'; ctx.lineWidth = 2 * u;
      [[-1, -1], [1, -1], [-1, 1], [1, 1], [0, -1], [0, 1], [-1, 0], [1, 0]].forEach(function (c) { var hx = c[0] * (w / 2 + 6), hy = c[1] * (h / 2 + 6); ctx.beginPath(); ctx.rect(hx - 4.5 * u, hy - 4.5 * u, 9 * u, 9 * u); ctx.fill(); ctx.stroke(); });
      ctx.restore();
      // ejes de movimiento (no rotan)
      ctx.save(); ctx.translate(p.x, p.y); ctx.lineWidth = 3 * u; ctx.lineCap = 'round';
      ctx.strokeStyle = '#f2467f'; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(54, 0); ctx.stroke(); ctx.fillStyle = '#f2467f'; ctx.beginPath(); ctx.moveTo(62, 0); ctx.lineTo(50, -6); ctx.lineTo(50, 6); ctx.fill();
      ctx.strokeStyle = '#0c8b7d'; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(0, -54); ctx.stroke(); ctx.fillStyle = '#0c8b7d'; ctx.beginPath(); ctx.moveTo(0, -62); ctx.lineTo(-6, -50); ctx.lineTo(6, -50); ctx.fill();
      ctx.restore();
      // etiqueta
      ctx.save(); ctx.font = (12 * u) + 'px "JetBrains Mono", monospace'; var tw = ctx.measureText(e.name).width + 14 * u;
      ctx.translate(p.x - w / 2 - 6, p.y - h / 2 - 12 * u - 14 * u); ctx.fillStyle = '#f6b72b'; ctx.fillRect(0, 0, tw, 20 * u); ctx.fillStyle = '#15110d'; ctx.fillText(e.name, 7 * u, 14 * u); ctx.restore();
    }
    var startT = performance.now(), running = false, raf = 0;
    function frame(now) {
      var t = (now - startT) / 1000;
      ents.forEach(function (e) { if (e.kick > 0) e.kick = Math.max(0, e.kick - .022); });
      ctx.setTransform(view.dpr, 0, 0, view.dpr, 0, 0);
      ctx.fillStyle = '#e9dcc0'; ctx.fillRect(0, 0, view.cw, view.ch);
      ctx.save(); ctx.translate(view.ox, view.oy); ctx.scale(view.s, view.s);
      drawWorld(t);
      ents.forEach(function (e, i) { drawEntity(e, i, t); });
      if (mode === 'debug' && ents[sel]) drawGizmo(ents[sel], t);
      ctx.restore();
      raf = requestAnimationFrame(frame);
    }
    function start() { if (running) return; running = true; startT = performance.now() - 0; raf = requestAnimationFrame(frame); }
    function stop() { running = false; cancelAnimationFrame(raf); }
    if ('IntersectionObserver' in window) new IntersectionObserver(function (es) { es[0].isIntersecting ? start() : stop(); }, { rootMargin: '120px' }).observe(root); else start();

    function resize() {
      var b = stage.getBoundingClientRect(); if (!b.width) return;
      view.dpr = Math.min(2, window.devicePixelRatio || 1); view.cw = b.width; view.ch = b.height;
      cv.width = Math.round(b.width * view.dpr); cv.height = Math.round(b.height * view.dpr);
      view.s = Math.min(b.width / W, b.height / H); view.ox = (b.width - W * view.s) / 2; view.oy = (b.height - H * view.s) / 2;
    }
    if ('ResizeObserver' in window) new ResizeObserver(resize).observe(stage); window.addEventListener('resize', resize); resize();

    /* ----- puntero ----- */
    function toWorld(ev) { var b = cv.getBoundingClientRect(); return { x: (ev.clientX - b.left - view.ox) / view.s, y: (ev.clientY - b.top - view.oy) / view.s }; }
    function hit(p, t) {
      for (var i = ents.length - 1; i >= 0; i--) {
        var e = ents[i], q = xf(e, t), dx = p.x - q.x, dy = p.y - q.y, c = Math.cos(-q.rot), sn = Math.sin(-q.rot), lx = (dx * c - dy * sn) / q.s, ly = (dx * sn + dy * c) / q.s;
        if (Math.abs(lx) <= e.w / 2 && Math.abs(ly) <= e.h / 2) return i;
      } return -1;
    }
    cv.addEventListener('pointerdown', function (ev) {
      var p = toWorld(ev), t = (performance.now() - startT) / 1000, i = hit(p, t); cv.focus({ preventScroll: true });
      if (i < 0) return;
      if (mode === 'release') { ents[i].kick = 1; return; }
      select(i, true); var e = ents[i]; drag = { i: i, dx: p.x - e.x, dy: p.y - e.y, id: ev.pointerId }; cv.setPointerCapture(ev.pointerId); cv.style.cursor = 'grabbing';
    });
    cv.addEventListener('pointermove', function (ev) {
      var p = toWorld(ev); mouse.x = p.x; mouse.y = p.y; mouse.in = true;
      if (drag) { var e = ents[drag.i]; e.x = Math.round(Math.max(0, Math.min(W, p.x - drag.dx))); e.y = Math.round(Math.max(0, Math.min(H, p.y - drag.dy))); syncInspector(); codegen(); return; }
      hover = hit(p, (performance.now() - startT) / 1000); cv.style.cursor = hover > -1 ? (mode === 'debug' ? 'grab' : 'pointer') : 'default';
    });
    cv.addEventListener('pointerleave', function () { mouse.in = false; hover = -1; });
    function endDrag(ev) { if (!drag) return; try { cv.releasePointerCapture(drag.id); } catch (_) {} drag = null; cv.style.cursor = 'grab'; logMove(); }
    cv.addEventListener('pointerup', endDrag); cv.addEventListener('pointercancel', endDrag);
    cv.addEventListener('keydown', function (ev) {
      if (mode !== 'debug') return; var e = ents[sel], st = ev.shiftKey ? 10 : 1, used = true;
      if (ev.key === 'ArrowLeft') e.x = Math.max(0, e.x - st); else if (ev.key === 'ArrowRight') e.x = Math.min(W, e.x + st);
      else if (ev.key === 'ArrowUp') e.y = Math.max(0, e.y - st); else if (ev.key === 'ArrowDown') e.y = Math.min(H, e.y + st);
      else if ((ev.key === 'Delete' || ev.key === 'Backspace') && e.kind === 'blob') { log(s('removed', { n: e.name }), 'w'); ents.splice(sel, 1); select(Math.max(0, sel - 1), true); }
      else used = false;
      if (used) { ev.preventDefault(); syncInspector(); codegen(); }
    });

    /* ----- modo y backend ----- */
    function setMode(m) {
      mode = m; root.dataset.mode = m;
      $$('.seg button', root).forEach(function (b) { b.setAttribute('aria-pressed', String(b.dataset.mode === m)); });
      $('#chipMode').textContent = m.toUpperCase(); $('#chipMode').classList.toggle('gold', m === 'debug');
      $('#ideTitle').textContent = s(m === 'debug' ? 'titleDebug' : 'titleRel');
      $('#stageHint').textContent = s(m === 'debug' ? 'hint' : 'hintRel');
      $$('.panel', root).forEach(function (p) { if (m === 'release') p.setAttribute('inert', ''); else p.removeAttribute('inert'); });
      $('.ide-foot', root).setAttribute('aria-hidden', String(m === 'release'));
      log(s(m === 'debug' ? 'modeDebug' : 'modeRel'), m === 'debug' ? 'ok' : 'w');
    }
    $$('.seg button', root).forEach(function (b) { b.addEventListener('click', function () { if (mode !== b.dataset.mode) setMode(b.dataset.mode); }); });

    function setBackend(k, silent) {
      backend = k;
      $$('.be button', root).forEach(function (b) { b.setAttribute('aria-checked', String(b.dataset.be === k)); });
      $('#chipBe').textContent = BE[k].n;
      var d = $('#diff'); d.textContent = s('diff'); d.animate([{ transform: 'scale(1.18)' }, { transform: 'scale(1)' }], { duration: 380, easing: 'cubic-bezier(.2,.7,.1,1)' });
      if (!silent) { log(s('backend', { n: BE[k].n }), 'ok'); log(s('targets', { t: BE[k][lang] })); }
    }
    $$('.be button', root).forEach(function (b) {
      b.addEventListener('click', function () { setBackend(b.dataset.be); });
      b.addEventListener('keydown', function (ev) {
        var all = $$('.be button', root), i = all.indexOf(b), d = ev.key === 'ArrowRight' || ev.key === 'ArrowDown' ? 1 : ev.key === 'ArrowLeft' || ev.key === 'ArrowUp' ? -1 : 0;
        if (d) { ev.preventDefault(); var n = all[(i + d + all.length) % all.length]; n.focus(); setBackend(n.dataset.be); }
      });
    });

    function refreshLang() {
      $('#ideTitle').textContent = s(mode === 'debug' ? 'titleDebug' : 'titleRel');
      $('#stageHint').textContent = s(mode === 'debug' ? 'hint' : 'hintRel');
      $('#diff').textContent = s('diff'); $('#copyCode').textContent = s('copy');
      codegen();
    }

    // arranque
    renderList(); syncInspector(); codegenNow();
    log(s('up3', { c: ents.length }), 'ok'); log(s('up2')); log(s('up1'));
    $('#stageHint').textContent = s('hint');
    return { refreshLang: refreshLang };
  }());

  /* ======================================================================
     HOJAS — scrollytelling
     ====================================================================== */
  (function () {
    var clover = $('#clover'), items = $$('#leafNav li'), arts = $$('.pillar');
    if (!('IntersectionObserver' in window)) return;
    var io2 = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (!e.isIntersecting) return;
        var n = e.target.dataset.leaf; clover.dataset.on = n;
        items.forEach(function (li) { li.classList.toggle('on', li.dataset.go === n); });
      });
    }, { rootMargin: '-42% 0px -42% 0px' });
    arts.forEach(function (a) { io2.observe(a); });
    items[0].classList.add('on');
  }());

  /* ======================================================================
     MATRIZ DE PLATAFORMAS
     ====================================================================== */
  var matrix = (function () {
    var root = $('#matrix');
    var BACK = [
      { id: 'monogame', n: 'MonoGame', img: '../assets/monogame.webp' },
      { id: 'kni', n: 'KNI', img: '../assets/kni.webp' },
      { id: 'fna', n: 'FNA', img: '../assets/fna.webp' },
      { id: 'yotsuba', n: 'Yotsuba', img: '../assets/framework-logo.webp' }
    ];
    // 1 = objetivo previsto · 2 = requiere licencias · 0 = no
    var ROWS = [
      { k: 'mobile', v: [1, 1, 1, 1] }, { k: 'desk', v: [1, 1, 1, 1] }, { k: 'cons', v: [2, 0, 2, 0] },
      { k: 'web', v: [0, 1, 0, 1] }, { k: 'xr', v: [0, 1, 0, 1] }
    ];
    var on = { monogame: true, kni: true, fna: true, yotsuba: true };
    function render() {
      root.innerHTML = '';
      var head = document.createElement('div'); head.className = 'mx-row mx-head';
      head.innerHTML = '<div><small>' + s('mxTarget') + '</small></div>';
      BACK.forEach(function (b) {
        var btn = document.createElement('button'); btn.type = 'button'; btn.setAttribute('aria-pressed', String(on[b.id]));
        btn.innerHTML = '<img src="' + b.img + '" alt=""><span>' + b.n + '</span>';
        btn.addEventListener('click', function () { on[b.id] = !on[b.id]; render(); });
        head.appendChild(btn);
      });
      root.appendChild(head);
      var reach = [];
      ROWS.forEach(function (r) {
        var row = document.createElement('div'); row.className = 'mx-row';
        var l = document.createElement('div'); l.innerHTML = s(r.k) + '<small>' + s(r.k + 'S') + '</small>'; row.appendChild(l);
        var any = false;
        r.v.forEach(function (val, i) {
          var c = document.createElement('div'); c.className = 'mx-cell' + (val === 0 ? ' no' : '') + (val === 2 ? ' lic' : '') + (on[BACK[i].id] ? '' : ' off');
          c.innerHTML = '<i>' + (val === 0 ? '·' : val === 2 ? '◐' : '●') + '</i>';
          if (val && on[BACK[i].id]) any = true; row.appendChild(c);
        });
        reach.push({ k: r.k, any: any }); root.appendChild(row);
      });
      var sum = document.createElement('div'); sum.className = 'mx-row mx-sum';
      var total = reach.some(function (x) { return x.any; });
      sum.innerHTML = '<div>' + s('mxSum') + '</div><div class="total">' + (total ? reach.map(function (x) { return '<span class="' + (x.any ? '' : 'dim') + '">' + s(x.k) + '</span>'; }).join('') : s('mxNone')) + '</div>';
      root.appendChild(sum);
    }
    return { render: render };
  }());

  /* ======================================================================
     FORMULARIO (misma tabla de Supabase que el sitio original)
     ====================================================================== */
  (function () {
    var URL_ = 'https://paxcudhlpkjqkgcohonw.supabase.co/rest/v1/Personas';
    var KEY = 'sb_publishable_I_Nn5LGuUJ2v9wlg3HPODg_8BjBHstQ';
    var form = $('#notifyForm'), msg = $('#fMsg'), btn = $('#fSubmit');
    function show(k, cls) { msg.textContent = s(k); msg.className = 'msg ' + cls; }
    form.addEventListener('submit', function (ev) {
      ev.preventDefault();
      var nombre = $('#fName').value.trim(), correo = $('#fMail').value.trim(), raw = $('#fTel').value.trim();
      var celular = raw ? Number(raw.replace(/\D/g, '')) : null;
      if (!nombre || !correo || !/^\S+@\S+\.\S+$/.test(correo)) { show('req', 'err'); return; }
      btn.disabled = true; btn.textContent = s('sending'); msg.className = 'msg'; msg.textContent = '';
      fetch(URL_, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', apikey: KEY, Authorization: 'Bearer ' + KEY, Prefer: 'return=minimal' },
        body: JSON.stringify({ PersonaID: Date.now(), Nombre: nombre, Correo: correo, Celular: celular })
      }).then(function (r) { if (!r.ok) return r.text().then(function (t) { throw new Error(t || r.status); }); show('ok', 'ok'); form.reset(); })
        .catch(function (e) { console.error('Error al enviar:', e); show('err', 'err'); })
        .then(function () { btn.disabled = false; btn.textContent = s('submit'); });
    });
  }());

  /* ======================================================================
     ARRANQUE
     ====================================================================== */
  $('#langBtn').addEventListener('click', function () {
    var n = lang === 'es' ? 'en' : 'es';
    try { localStorage.setItem('yotsuba-language', n); } catch (_) {}
    applyLang(n);
  });
  matrix.render();
  if (lang === 'en') applyLang('en');
}());
