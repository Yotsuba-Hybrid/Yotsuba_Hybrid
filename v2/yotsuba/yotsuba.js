/* ==========================================================================
   YOTSUBA — comportamiento del sitio único
   El contenido editable está en copy.js. Aquí solo va la mecánica.
   ========================================================================== */
(function () {
  'use strict';

  var Y = window.YOTSUBA, D = Y.DATA, P = Y.PRECIOS;

  /* El movimiento solo se activa si este script corre y el usuario no pidió
     lo contrario. Sin JS, la página se ve entera: nada nace en opacity 0. */
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.documentElement.classList.add('motion');
  }
  var $  = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var lang = window.__LANG__ === 'en' ? 'en' : 'es';
  var esc = function (t) { return String(t).replace(/[&<>"]/g, function (c) { return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]; }); };
  var L = function (v) { return (v && typeof v === 'object' && 'es' in v) ? v[lang] : v; };
  var m = function (k, vars) {
    var s = (Y.MSG[lang] && Y.MSG[lang][k]) || Y.MSG.es[k] || k;
    if (vars) Object.keys(vars).forEach(function (v) { s = s.replace('{' + v + '}', vars[v]); });
    return s;
  };
  var money = function (n) { return P.simbolo + n; };

  /* ====================================================================== i18n
     El español se lee del propio HTML; solo el inglés vive en copy.js. */
  var ES = {};
  $$('[data-t]').forEach(function (el) { ES[el.dataset.t] = el.textContent; });
  $$('[data-th]').forEach(function (el) { ES[el.dataset.th] = el.innerHTML; });
  $$('[data-ta]').forEach(function (el) { var p = el.dataset.ta.split(':'); ES[p[1]] = el.getAttribute(p[0]); });
  var tr = function (k) { var d = lang === 'en' ? Y.EN : ES; return d[k] != null ? d[k] : (ES[k] || ''); };

  var renderers = [];
  function onLang(fn) { renderers.push(fn); fn(); }

  function applyLang(l) {
    lang = l;
    document.documentElement.lang = l;
    $$('[data-t]').forEach(function (el) { el.textContent = tr(el.dataset.t); });
    $$('[data-th]').forEach(function (el) { el.innerHTML = tr(el.dataset.th); });
    $$('[data-ta]').forEach(function (el) { var p = el.dataset.ta.split(':'); el.setAttribute(p[0], tr(p[1])); });
    document.title = m('docTitle');
    $('#docDesc').setAttribute('content', m('docDesc'));
    $('#langCode').textContent = m('langCode');
    renderers.forEach(function (fn) { fn(); });
    overprint();
  }

  $('#langBtn').addEventListener('click', function () {
    var n = lang === 'es' ? 'en' : 'es';
    try { localStorage.setItem('yotsuba-language', n); } catch (_) {}
    applyLang(n);
  });

  /* ============================================================ nav + reveal */
  var nav = $('#nav');
  var secs = $$('main section[id]');
  var links = $$('.nav-links a');
  function onScroll() {
    nav.classList.toggle('solid', window.scrollY > 40);
    var y = window.scrollY + 140, cur = '';
    secs.forEach(function (s) { if (s.offsetTop <= y) cur = s.id; });
    links.forEach(function (a) { a.classList.toggle('on', a.getAttribute('href') === '#' + cur); });
  }
  window.addEventListener('scroll', onScroll, { passive: true }); onScroll();

  /* Movimiento con un trabajo que hacer, no decoración:
     la lámina del capítulo se asienta, los tickets entran en cascada, y el
     tachón de la factura se traza al llegar — eso último cuenta algo. */
  var io = 'IntersectionObserver' in window ? new IntersectionObserver(function (es) {
    es.forEach(function (e) {
      /* visible, o ya pasado de largo (por ejemplo al llegar con un #enlace):
         en los dos casos hay que mostrarlo, nunca dejarlo invisible */
      if (e.isIntersecting || e.boundingClientRect.bottom < 0) {
        e.target.classList.add('in'); io.unobserve(e.target);
      }
    });
  }, { threshold: .18 }) : null;
  function watch(el) { if (io) io.observe(el); else el.classList.add('in'); }
  $$('.act-open, .receipt, .versus-say, .feat').forEach(function (el) {
    if (el.getBoundingClientRect().top < window.innerHeight) el.classList.add('in');
    else watch(el);
  });

  /* los tickets, escalonados */
  if (io) {
    var tio = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (!e.isIntersecting) return;
        $$('.ticket', e.target).forEach(function (el, i) { el.style.transitionDelay = (i * 90) + 'ms'; el.classList.add('in'); });
        tio.unobserve(e.target);
      });
    }, { threshold: .2 });
    var tk = $('#tickets'); if (tk) tio.observe(tk);
  }

  /* la palabra sobreimpresa del titular: las dos tintas desregistradas leen
     el texto de este atributo, así que hay que refrescarlo al cambiar idioma */
  function overprint() {
    $$('.display .fill').forEach(function (el) { el.setAttribute('data-word', el.textContent); });
  }

  /* vídeos: arrancan solos al entrar en pantalla, en silencio */
  if ('IntersectionObserver' in window) {
    var vio = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        var v = e.target;
        if (e.isIntersecting) { v.play().catch(function () {}); } else { v.pause(); }
      });
    }, { threshold: .35 });
    $$('video[data-autoplay]').forEach(function (v) { vio.observe(v); });
  }

  /* ==================================================== tira de credenciales */
  (function () {
    var row = D.ticker.map(function (t) { return '<span>' + esc(t) + '</span>'; }).join('');
    $('#ticker').innerHTML = row + row;
  }());

  /* ============================================================== HERO: lente */
  var LENS = {
    fw: { tag: 'COMPUTE', code: '[<u>numthreads</u>(8, 8, 1)]\n<i>void</i> CSMain(<i>uint3</i> id : SV_DispatchThreadID)\n{ Output[id.xy] = Simulate(id.xy); }' },
    hy: { tag: 'DEBUG',   code: '<i>var</i> angel = <i>new</i> Entity(<u>"Angel"</u>);\nangel.Add(<i>new</i> TransformComponent());\nangel.Add(<i>new</i> SpriteComponent2D());' },
    en: { tag: 'EDIT MODE', code: 'Entity_2 <i>SpriteComponent2D</i>\nTransform { x: 0, y: 0, z: 1 }\n<u>[Play]</u> to run the scene' }
  };
  (function () {
    var host = $('.hero'), plate = $('#plate'), lens = $('#lens'), ring = $('#lensRing'), hint = $('#hint');
    var inner = $('.plate-in'), used = false;

    function setDoor(k) {
      host.dataset.p = k;
      $('#lensTag').textContent = LENS[k].tag;
      $('#lensCode').innerHTML = LENS[k].code;
      $$('.doorbar button').forEach(function (b) { b.setAttribute('aria-selected', String(b.dataset.door === k)); });
    }
    $$('.doorbar button').forEach(function (b) {
      b.addEventListener('click', function () { setDoor(b.dataset.door); });
    });
    setDoor('fw');

    function move(cx, cy) {
      var r = inner.getBoundingClientRect();
      var x = cx - r.left, y = cy - r.top;
      lens.style.setProperty('--x', x + 'px');
      lens.style.setProperty('--y', y + 'px');
      ring.style.transform = 'translate(' + (x + (inner.offsetLeft || 0)) + 'px,' + (y + (inner.offsetTop || 0)) + 'px)';
      if (!used) { used = true; hint.classList.add('off'); }
    }
    plate.addEventListener('pointerenter', function () { plate.classList.add('on'); });
    plate.addEventListener('pointerleave', function () { plate.classList.remove('on'); });
    plate.addEventListener('pointermove', function (e) { move(e.clientX, e.clientY); });
    plate.addEventListener('touchmove', function (e) {
      var t = e.touches[0]; if (!t) return;
      plate.classList.add('on'); move(t.clientX, t.clientY);
    }, { passive: true });

    /* sin ratón (móvil): la lente pasea sola para que igual se entienda */
    if (!window.matchMedia('(hover: hover)').matches) {
      var t0 = 0;
      plate.classList.add('on');
      (function loop(ts) {
        if (!t0) t0 = ts;
        var p = (ts - t0) / 5200, r = inner.getBoundingClientRect();
        move(r.left + r.width * (.5 + .3 * Math.cos(p * 6.28)), r.top + r.height * (.5 + .28 * Math.sin(p * 6.28)));
        requestAnimationFrame(loop);
      }(0));
    }
  }());

  /* ========================================================== ELIGE TU PUERTA */
  (function () {
    var out = $('#pickOut'), btns = $$('.opts button'), cur = null;
    function prod(id) { return D.productos.filter(function (p) { return p.p === id; })[0]; }

    function render() {
      if (!cur) {
        out.innerHTML = '<div class="pick-empty">' +
          '<span class="pe-marks" aria-hidden="true">' + D.productos.map(function (p) {
            return '<img src="' + p.logo + '" alt="">';
          }).join('') + '</span>' +
          '<span class="pe-say">' + esc(lang === 'en' ? 'Pick one and we answer' : 'Elige una y te respondemos') + '</span>' +
          '</div>';
        out.dataset.p = 'fw';
        return;
      }
      var p = prod(cur);
      out.dataset.p = p.p;
      out.innerHTML =
        '<div class="po-top"><img src="' + p.logo + '" alt=""><div>' +
          '<span class="po-k">' + esc(L(p.para)) + '</span>' +
          '<h3>Yotsuba ' + esc(p.nombre) + '</h3></div></div>' +
        '<p>' + esc(L(p.para_quien)) + '</p>' +
        '<ul>' + p.bullets.map(function (b) { return '<li>' + esc(L(b)) + '</li>'; }).join('') + '</ul>' +
        '<div class="po-cta"><a class="btn sm" href="' + p.ancla + '">' +
          esc(lang === 'en' ? 'See ' + p.nombre : 'Ver ' + p.nombre) + '</a>' +
          '<span class="po-price">' + money(P[p.id]) + ' · ' + esc(lang === 'en' ? 'one payment' : 'pago único') + '</span></div>';
    }
    btns.forEach(function (b) {
      b.addEventListener('click', function () {
        cur = b.dataset.k;
        btns.forEach(function (x) { x.setAttribute('aria-checked', String(x === b)); });
        render();
      });
    });
    onLang(render);
  }());

  /* ================================================ FRAMEWORK: enrutador APIs */
  (function () {
    var box = $('#targets'), i = 0;
    function paint() {
      var a = D.apis[i];
      $('#apiKind').textContent = L(a.kind);
      $('#apiName').textContent = a.api;
      $('#apiLogo').innerHTML = /^\.\./.test(a.logo) ? '<img src="' + a.logo + '" alt="">' : '<b>' + esc(a.logo) + '</b>';
      $('#gpuLine').textContent = a.gpu;
      $('#apiDesc').textContent = L(a.d);
      $$('button', box).forEach(function (b, j) { b.setAttribute('aria-checked', String(j === i)); });
    }
    function render() {
      box.innerHTML = D.apis.map(function (a, j) {
        return '<button type="button" role="radio" aria-checked="' + (j === i) + '">' + esc(a.k) + '</button>';
      }).join('');
      $$('button', box).forEach(function (b, j) { b.addEventListener('click', function () { i = j; paint(); }); });
      paint();
    }
    onLang(render);
  }());

  /* ====================================================== FRAMEWORK: shaders */
  (function () {
    var tabs = $('#shTabs'), i = 0;
    function paint() {
      var s = D.shaders[i];
      $('#shName').textContent = s.f;
      $('#shCode').textContent = s.c;
      $('#shTitle').textContent = s.n;
      $('#shDesc').textContent = L(s.d);
      var bd = $('#shBadge');
      bd.textContent = s.wg ? m('wgpuOn') : m('wgpuOff');
      bd.className = 'badge' + (s.wg ? '' : ' off');
      $$('button', tabs).forEach(function (b, j) { b.setAttribute('aria-selected', String(j === i)); });
    }
    function render() {
      tabs.innerHTML = D.shaders.map(function (s, j) {
        return '<button type="button" role="tab" aria-selected="' + (j === i) + '">' + esc(s.n) + '</button>';
      }).join('');
      $$('button', tabs).forEach(function (b, j) { b.addEventListener('click', function () { i = j; paint(); }); });
      paint();
    }
    onLang(render);
    $('#shCopy').addEventListener('click', function () {
      var b = this;
      navigator.clipboard.writeText(D.shaders[i].c).then(function () {
        b.textContent = m('copied');
        setTimeout(function () { b.textContent = m('copySrc'); }, 1600);
      });
    });
  }());

  /* ====================================================== HYBRID: editor vivo */
  (function () {
    var ide = $('#ide'), canvas = $('#game'), ctx = canvas.getContext('2d');
    var stage = $('#stage'), listEl = $('#entList'), logEl = $('#log'), out = $('#codeOut');
    var img = new Image(); img.src = '../assets/hybrid-logo.webp';
    var sprites = ['../assets/hybrid-logo.webp', '../assets/framework-logo.webp', '../assets/engine-logo-neon.webp'];
    var cache = {};
    sprites.forEach(function (s) { var i = new Image(); i.src = s; cache[s] = i; });

    var ents = [
      { n: 'Clover',  x: .30, y: .40, r: 0,   s: 1.20, t: sprites[0] },
      { n: 'Brush',   x: .66, y: .32, r: -18, s: .78,  t: sprites[1] },
      { n: 'Spark',   x: .52, y: .70, r: 22,  s: .62,  t: sprites[2] },
      { n: 'Petal',   x: .82, y: .66, r: -6,  s: .52,  t: sprites[0] }
    ];
    var base = JSON.stringify(ents), sel = 0, drag = null, changes = 0;

    function log(t) {
      var li = document.createElement('div');
      li.innerHTML = '<b>&rsaquo;</b> ' + esc(t);
      logEl.appendChild(li); logEl.scrollTop = logEl.scrollHeight;
      while (logEl.children.length > 40) logEl.removeChild(logEl.firstChild);
    }

    function fit() {
      var r = stage.getBoundingClientRect(), d = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.round(r.width * d));
      canvas.height = Math.max(1, Math.round(r.height * d));
      ctx.setTransform(d, 0, 0, d, 0, 0);
      draw();
    }
    function draw() {
      var w = canvas.width / (Math.min(window.devicePixelRatio || 1, 2));
      var h = canvas.height / (Math.min(window.devicePixelRatio || 1, 2));
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = '#0C0906'; ctx.fillRect(0, 0, w, h);
      var debug = ide.dataset.mode === 'debug';
      if (debug) {
        ctx.strokeStyle = 'rgba(232,53,111,.12)'; ctx.lineWidth = 1;
        for (var gx = 0; gx < w; gx += 34) { ctx.beginPath(); ctx.moveTo(gx, 0); ctx.lineTo(gx, h); ctx.stroke(); }
        for (var gy = 0; gy < h; gy += 34) { ctx.beginPath(); ctx.moveTo(0, gy); ctx.lineTo(w, gy); ctx.stroke(); }
      }
      ents.forEach(function (e, i) {
        var im = cache[e.t]; if (!im || !im.complete) return;
        var sz = Math.min(w, h) * .3 * e.s, x = e.x * w, y = e.y * h;
        ctx.save(); ctx.translate(x, y); ctx.rotate(e.r * Math.PI / 180);
        ctx.drawImage(im, -sz / 2, -sz / 2, sz, sz);
        ctx.restore();
        if (debug) {
          var on = i === sel;
          ctx.strokeStyle = on ? '#7CF3D8' : 'rgba(232,53,111,.5)';
          ctx.lineWidth = on ? 2 : 1.2;
          ctx.setLineDash(on ? [] : [4, 4]);
          ctx.strokeRect(x - sz / 2, y - sz / 2, sz, sz);
          ctx.setLineDash([]);
          ctx.fillStyle = on ? '#7CF3D8' : 'rgba(255,210,225,.7)';
          ctx.font = '10px ui-monospace, monospace';
          ctx.fillText(e.n, x - sz / 2, y - sz / 2 - 6);
          if (on) [[-1,-1],[1,-1],[-1,1],[1,1]].forEach(function (c) {
            ctx.fillRect(x + c[0] * sz / 2 - 3, y + c[1] * sz / 2 - 3, 6, 6);
          });
        }
      });
    }
    function code() {
      var e = ents[sel];
      var s = '// MyGame.Core/Scenes/Level1.cs\n' +
        'var ' + e.n.toLowerCase() + ' = new Entity("' + e.n + '");\n' +
        e.n.toLowerCase() + '.Add(new TransformComponent\n{\n' +
        '    Position = new Vector2(' + Math.round(e.x * 1920) + 'f, ' + Math.round(e.y * 1080) + 'f),\n' +
        '    Rotation = ' + (e.r * Math.PI / 180).toFixed(3) + 'f,\n' +
        '    Scale    = new Vector2(' + e.s.toFixed(2) + 'f)\n});\n' +
        e.n.toLowerCase() + '.Add(new SpriteComponent2D(Content.Load<Texture2D>("' + e.n + '")));\n' +
        'scene.Add(' + e.n.toLowerCase() + ');';
      out.textContent = s;
      $('#diff').textContent = 'MyGame.Core · ' + changes + ' ' + m('lines');
    }
    function panel() {
      var e = ents[sel];
      $('#inName').textContent = e.n;
      $('#inX').value = Math.round(e.x * 1920); $('#oX').textContent = Math.round(e.x * 1920);
      $('#inY').value = Math.round(e.y * 1080); $('#oY').textContent = Math.round(e.y * 1080);
      $('#inR').value = e.r; $('#oR').textContent = e.r + '°';
      $('#inS').value = e.s; $('#oS').textContent = e.s.toFixed(2) + '×';
      $('#entCount').textContent = ents.length;
      listEl.innerHTML = ents.map(function (x, i) {
        return '<li role="option" aria-selected="' + (i === sel) + '" data-i="' + i + '">' + esc(x.n) + '<i>2</i></li>';
      }).join('');
      $$('li', listEl).forEach(function (li) {
        li.addEventListener('click', function () { sel = +li.dataset.i; panel(); code(); draw(); });
      });
      code(); draw();
    }

    /* arrastrar */
    function at(cx, cy) {
      var r = stage.getBoundingClientRect(), w = r.width, h = r.height;
      var px = cx - r.left, py = cy - r.top;
      for (var i = ents.length - 1; i >= 0; i--) {
        var e = ents[i], sz = Math.min(w, h) * .3 * e.s;
        if (Math.abs(px - e.x * w) < sz / 2 && Math.abs(py - e.y * h) < sz / 2) return i;
      }
      return -1;
    }
    stage.addEventListener('pointerdown', function (ev) {
      if (ide.dataset.mode !== 'debug') return;
      var i = at(ev.clientX, ev.clientY); if (i < 0) return;
      sel = i; drag = i; stage.setPointerCapture(ev.pointerId); panel();
    });
    stage.addEventListener('pointermove', function (ev) {
      if (drag === null) return;
      var r = stage.getBoundingClientRect();
      var e = ents[drag];
      e.x = Math.min(.97, Math.max(.03, (ev.clientX - r.left) / r.width));
      e.y = Math.min(.97, Math.max(.03, (ev.clientY - r.top) / r.height));
      changes++; panel();
    });
    ['pointerup', 'pointercancel'].forEach(function (k) {
      stage.addEventListener(k, function () {
        if (drag !== null) { log(ents[drag].n + '.Transform.Position → (' + Math.round(ents[drag].x * 1920) + ', ' + Math.round(ents[drag].y * 1080) + ')'); }
        drag = null;
      });
    });
    canvas.addEventListener('keydown', function (ev) {
      var d = { ArrowLeft: [-.008, 0], ArrowRight: [.008, 0], ArrowUp: [0, -.008], ArrowDown: [0, .008] }[ev.key];
      if (!d) return; ev.preventDefault();
      ents[sel].x += d[0]; ents[sel].y += d[1]; changes++; panel();
    });

    /* inspector */
    [['#inX', 'x', 1920], ['#inY', 'y', 1080]].forEach(function (f) {
      $(f[0]).addEventListener('input', function () { ents[sel][f[1]] = (+this.value || 0) / f[2]; changes++; panel(); });
    });
    $('#inR').addEventListener('input', function () { ents[sel].r = +this.value; changes++; panel(); });
    $('#inS').addEventListener('input', function () { ents[sel].s = +this.value; changes++; panel(); });

    $('#addEnt').addEventListener('click', function () {
      var n = 'Entity_' + (ents.length + 1);
      ents.push({ n: n, x: .2 + Math.random() * .6, y: .2 + Math.random() * .6, r: 0, s: .55, t: sprites[ents.length % 3] });
      sel = ents.length - 1; changes++; panel();
      log('scene.Add(new Entity("' + n + '"));');
    });
    $('#copyCode').addEventListener('click', function () {
      var b = this;
      navigator.clipboard.writeText(out.textContent).then(function () {
        b.textContent = m('copied'); setTimeout(function () { b.textContent = m('copy'); }, 1600);
      });
    });

    /* modo y backend */
    $$('.seg button', ide).forEach(function (b) {
      b.addEventListener('click', function () {
        ide.dataset.mode = b.dataset.mode;
        $$('.seg button', ide).forEach(function (x) { x.setAttribute('aria-pressed', String(x === b)); });
        $('#chipMode').textContent = b.dataset.mode.toUpperCase();
        $('#ideTitle').textContent = 'my-game.exe — ' + b.dataset.mode;
        log(b.dataset.mode === 'release' ? 'dotnet build -c Release  →  editor stripped' : 'dotnet build -c Debug  →  editor attached');
        setTimeout(function () { fit(); }, 60);
      });
    });
    $$('.ide-be button').forEach(function (b) {
      b.addEventListener('click', function () {
        $$('.ide-be button').forEach(function (x) { x.setAttribute('aria-checked', String(x === b)); });
        $('#chipBe').textContent = b.textContent.trim();
        log('Backend → ' + b.textContent.trim());
      });
    });

    onLang(function () {
      $('#stageHint').textContent = m('dragHint');
      $('#copyCode').textContent = tr('hy.copy');
      code();
    });
    window.addEventListener('resize', fit);
    Object.keys(cache).forEach(function (k) { cache[k].onload = draw; });
    panel(); fit();
    log('Yotsuba.Hybrid 0.9 — editor attached (#if DEBUG)');
    log('Backend → Yotsuba Framework · Vulkan');
  }());

  /* ============================================== HYBRID: matriz de alcance */
  (function () {
    var root = $('#matrix'), on = { monogame: true, kni: true, fna: true, yotsuba: true };
    function render() {
      var html = D.backends.map(function (b) {
        return '<button type="button" class="mx-be' + (on[b.id] ? '' : ' off') + '" data-b="' + b.id + '" aria-pressed="' + !!on[b.id] + '">' +
          '<img src="' + b.logo + '" alt="">' + esc(b.n) + '</button>';
      }).join('');
      var cells = D.destinos.map(function (d) {
        var act = d.by.filter(function (x) { return on[x]; });
        return '<div class="mx-cell' + (act.length ? '' : ' off') + '">' +
          '<h4>' + esc(L(d.n)) + '</h4><span class="mx-s">' + esc(L(d.s)) + '</span>' +
          '<div class="mx-by">' + act.map(function (x) {
            var b = D.backends.filter(function (z) { return z.id === x; })[0];
            return '<span' + (d.lic ? ' class="lic"' : '') + '>' + esc(b.n) + '</span>';
          }).join('') + '</div></div>';
      }).join('');
      var n = D.destinos.filter(function (d) { return d.by.some(function (x) { return on[x]; }); }).length;
      root.innerHTML = '<div class="mx-bar">' + html + '</div>' + cells +
        '<div class="mx-sum"><b>' + n + ' / ' + D.destinos.length + '</b><span>' + esc(m(n ? 'reach' : 'none')) + '</span></div>';
      $$('.mx-be', root).forEach(function (b) {
        b.addEventListener('click', function () { on[b.dataset.b] = !on[b.dataset.b]; render(); });
      });
    }
    onLang(render);
  }());

  /* ======================================================= ENGINE: maqueta */
  (function () {
    var ed = $('#ed'), vp = $('#vp'), box = $('#sprites'), hier = $('#hier'), insp = $('#edInsp'), logEl = $('#edLog');
    var fx = $('#fx'), fctx = fx.getContext('2d');
    var items = [
      { n: 'Angel',  t: '../assets/engine-logo-neon.webp', x: 41, y: 18, s: 1.5,  r: 0,  c: ['Sprite', 'Light2D', 'Script'] },
      { n: 'Hero_L', t: '../assets/hybrid-logo.webp',      x: 16, y: 62, s: .85, r: -8, c: ['Sprite', 'Script'] },
      { n: 'Hero_R', t: '../assets/framework-logo.webp',   x: 66, y: 62, s: .85, r: 8,  c: ['Sprite', 'Script'] },
      { n: 'Tiger',  t: '../assets/hybrid-logo.webp',      x: 44, y: 74, s: .6,  r: 0,  c: ['Sprite', 'Animation'] }
    ];
    var start = JSON.stringify(items), sel = 0, playing = false, raf = 0, drag = null;

    function log(t) { var li = document.createElement('li'); li.innerHTML = '<b>&rsaquo;</b> ' + esc(t); logEl.appendChild(li); logEl.scrollTop = logEl.scrollHeight; while (logEl.children.length > 30) logEl.removeChild(logEl.firstChild); }

    function build() {
      box.innerHTML = items.map(function (e, i) {
        return '<div class="spr' + (i === sel ? ' sel' : '') + '" data-i="' + i + '"><img src="' + e.t + '" alt=""></div>';
      }).join('');
      place();
      $$('.spr', box).forEach(function (el) {
        el.addEventListener('pointerdown', function (ev) {
          if (playing) return;
          sel = +el.dataset.i; drag = sel; el.setPointerCapture(ev.pointerId);
          el.dataset.ox = ev.clientX; el.dataset.oy = ev.clientY;
          refresh();
        });
        el.addEventListener('pointermove', function (ev) {
          if (drag === null || playing) return;
          var r = vp.getBoundingClientRect(), e = items[drag];
          e.x = Math.min(92, Math.max(0, e.x + (ev.clientX - +el.dataset.ox) / r.width * 100));
          e.y = Math.min(88, Math.max(0, e.y + (ev.clientY - +el.dataset.oy) / r.height * 100));
          el.dataset.ox = ev.clientX; el.dataset.oy = ev.clientY;
          place(); fields();
        });
        ['pointerup', 'pointercancel'].forEach(function (k) { el.addEventListener(k, function () { drag = null; }); });
      });
    }
    function place() {
      $$('.spr', box).forEach(function (el, i) {
        var e = items[i];
        el.style.left = e.x + '%';
        el.style.top = e.y + '%';
        el.style.transform = 'rotate(' + e.r + 'deg) scale(' + e.s + ')';
      });
    }
    function fields() {
      var e = items[sel];
      var rows = [['X', 'x', 0, 92], ['Y', 'y', 0, 88], [lang === 'en' ? 'Scale' : 'Escala', 's', .3, 2.2], [lang === 'en' ? 'Rotation' : 'Rotación', 'r', -180, 180]];
      insp.innerHTML = '<span class="comp-tag">' + esc(e.n) + '</span>' +
        rows.map(function (r) {
          var step = r[1] === 's' ? .05 : 1;
          return '<div class="row"><span>' + esc(r[0]) + '</span>' +
            '<input type="range" min="' + r[2] + '" max="' + r[3] + '" step="' + step + '" value="' + e[r[1]] + '" data-f="' + r[1] + '">' +
            '<u>' + (r[1] === 's' ? e.s.toFixed(2) : Math.round(e[r[1]])) + '</u></div>';
        }).join('') +
        e.c.map(function (c) { return '<span class="comp-tag">' + esc(c) + 'Component</span>'; }).join('');
      $$('input', insp).forEach(function (inp) {
        inp.addEventListener('input', function () { items[sel][inp.dataset.f] = +inp.value; place(); fields(); });
      });
    }
    function refresh() {
      hier.innerHTML = items.map(function (e, i) {
        return '<li role="option" aria-selected="' + (i === sel) + '" data-i="' + i + '">' + esc(e.n) + '<i>' + e.c.length + '</i></li>';
      }).join('');
      $$('li', hier).forEach(function (li) { li.addEventListener('click', function () { sel = +li.dataset.i; refresh(); }); });
      $$('.spr', box).forEach(function (el, i) { el.classList.toggle('sel', i === sel); });
      fields();
    }

    /* lluvia + play */
    var drops = [];
    function sizeFx() { var r = vp.getBoundingClientRect(); fx.width = r.width; fx.height = r.height; }
    function tick() {
      sizeFx();
      fctx.clearRect(0, 0, fx.width, fx.height);
      if (drops.length < 90) drops.push({ x: Math.random() * fx.width, y: -20, v: 4 + Math.random() * 7, l: 8 + Math.random() * 14 });
      fctx.strokeStyle = 'rgba(160,220,255,.45)'; fctx.lineWidth = 1.2;
      drops.forEach(function (d) {
        fctx.beginPath(); fctx.moveTo(d.x, d.y); fctx.lineTo(d.x - 2, d.y + d.l); fctx.stroke();
        d.y += d.v; if (d.y > fx.height) { d.y = -20; d.x = Math.random() * fx.width; }
      });
      var t = performance.now() / 1000;
      items.forEach(function (e, i) {
        var el = $$('.spr', box)[i]; if (!el) return;
        el.style.transform = 'rotate(' + (e.r + Math.sin(t * 1.6 + i) * 3) + 'deg) scale(' + e.s + ')';
        el.style.top = (e.y + Math.sin(t * 2 + i * 1.3) * .9) + '%';
      });
      $('#fps').textContent = (58 + Math.round(Math.sin(t * 3) * 2)) + ' fps';
      raf = requestAnimationFrame(tick);
    }
    function setPlay(v) {
      playing = v; ed.classList.toggle('playing', v);
      $('#edChip').textContent = v ? 'PLAY' : 'EDIT';
      $('#playBtn').setAttribute('aria-pressed', String(v));
      $('#vpTag').textContent = (v ? 'Runtime' : 'Perspective') + ' · Level_1';
      if (v) { log('Play → Level_1'); tick(); }
      else {
        cancelAnimationFrame(raf); fctx.clearRect(0, 0, fx.width, fx.height);
        $('#fps').textContent = '— fps'; place(); log(lang === 'en' ? 'Stop → edit state restored' : 'Stop → estado de edición restaurado');
      }
    }
    $('#playBtn').addEventListener('click', function () { setPlay(!playing); });
    $('#resetBtn').addEventListener('click', function () {
      items = JSON.parse(start); sel = 0; if (playing) setPlay(false);
      build(); refresh(); log(lang === 'en' ? 'Scene reset' : 'Escena reiniciada');
    });
    $('#edAdd').addEventListener('click', function () {
      items.push({ n: 'Entity_' + (items.length + 1), t: '../assets/hybrid-logo.webp', x: 20 + Math.random() * 55, y: 20 + Math.random() * 50, s: .6, r: 0, c: ['Sprite'] });
      sel = items.length - 1; build(); refresh(); log('scene.Add(new Entity("' + items[sel].n + '"));');
    });
    $('#edBackend').addEventListener('change', function () { log('Graphics backend → ' + this.value); });
    $$('.ed .tabs button').forEach(function (b) {
      b.addEventListener('click', function () {
        $$('.ed .tabs button').forEach(function (x) { x.setAttribute('aria-selected', String(x === b)); });
        ['console', 'content', 'build'].forEach(function (t) { $('#tab-' + t).hidden = t !== b.dataset.tab; });
      });
    });

    /* exportar */
    var dlg = $('#dlg'), TARG = ['Windows', 'Linux', 'macOS', 'Android', 'iOS', 'Web'];
    function drawTargets() {
      $('#edTargets').innerHTML = TARG.map(function (t, i) {
        return '<li><label><input type="checkbox" value="' + t + '"' + (i < 3 ? ' checked' : '') + '><span>' + t + '</span></label></li>';
      }).join('');
    }
    $('#exportBtn').addEventListener('click', function () { drawTargets(); $('#progBar').style.width = '0'; $('#progTxt').textContent = tr('en.dlgP'); dlg.showModal(); });
    $('#goExport').addEventListener('click', function () {
      var picks = $$('#edTargets input:checked').map(function (i) { return i.value; });
      if (!picks.length) { $('#progTxt').textContent = m('pickTarget'); return; }
      var i = 0;
      (function step() {
        if (i >= picks.length) { $('#progTxt').textContent = m('exported', { t: picks.join(', ') }); log('Build ✓ ' + picks.join(', ')); return; }
        $('#progTxt').textContent = m('exporting', { t: picks[i] });
        $('#progBar').style.width = Math.round(((i + 1) / picks.length) * 100) + '%';
        i++; setTimeout(step, 520);
      }());
    });

    onLang(function () { fields(); });
    build(); refresh();
    log('Yotsuba Engine 0.4 — MyGame.ytb');
    log('Level_1 · ' + items.length + ' entities');
  }());

  /* ================================================== COMPARADOR + PLATAFORMAS */
  (function () {
    function cmp() {
      var head = '<thead><tr><th>' + esc(lang === 'en' ? 'Feature' : 'Qué mira') + '</th>' +
        D.productos.map(function (p) {
          return '<th data-p="' + p.p + '"><span class="th-in"><img src="' + p.logo + '" alt=""><span>' +
            '<b>' + esc(p.nombre) + '</b><small>' + esc(L(p.para)) + '</small></span></span></th>';
        }).join('') + '</tr></thead>';
      var rows = D.comparar.map(function (r) {
        return '<tr><th scope="row">' + esc(L(r.f)) + '</th>' +
          r.v.map(function (v) { return '<td>' + esc(L(v)) + '</td>'; }).join('') + '</tr>';
      }).join('');
      var price = '<tr class="row-price"><th scope="row">' + esc(lang === 'en' ? 'Price' : 'Precio') + '</th>' +
        D.productos.map(function (p) { return '<td>' + money(P[p.id]) + '</td>'; }).join('') + '</tr>';
      $('#cmpTable').innerHTML = head + '<tbody>' + rows + price + '</tbody>';
    }
    function plat() {
      var head = '<thead><tr>' +
        [lang === 'en' ? 'Target' : 'Destino', lang === 'en' ? 'Graphics' : 'Gráficos', 'Editor', lang === 'en' ? 'Status' : 'Estado']
          .map(function (h) { return '<th>' + esc(h) + '</th>'; }).join('') + '</tr></thead>';
      var rows = D.plataformas.map(function (r) {
        return '<tr><th scope="row">' + esc(L(r.t)) + '</th><td>' + esc(L(r.g)) + '</td><td>' + esc(L(r.e)) +
          '</td><td><span class="st ' + r.st + '">' + esc(L(r.s)) + '</span></td></tr>';
      }).join('');
      $('#platTable').innerHTML = head + '<tbody>' + rows + '</tbody>';
    }
    onLang(function () { cmp(); plat(); });
  }());

  /* ====================================================================== PRECIO */
  (function () {
    function render() {
      $('#tickets').innerHTML = D.productos.map(function (p) {
        return '<article class="ticket" data-p="' + p.p + '">' +
          (p.destacado ? '<span class="tk-stamp">' + esc(tr('pr.best') || 'MÁS COMPLETO') + '</span>' : '') +
          '<div class="tk-head"><img src="' + p.logo + '" alt=""><div>' +
            '<small>' + esc(L(p.para)) + '</small><b>' + esc(p.nombre) + '</b></div></div>' +
          '<p class="tk-claim">' + esc(L(p.claim)) + '</p>' +
          '<div class="tk-price"><span class="cur">' + P.simbolo + '</span><span class="num">' + P[p.id] + '</span></div>' +
          '<p class="tk-once">' + esc(lang === 'en' ? 'one payment · forever' : 'pago único · para siempre') + '</p>' +
          '<ul class="tk-list">' + p.bullets.map(function (b) {
            return '<li><svg aria-hidden="true"><use href="#i-check"/></svg><span>' + esc(L(b)) + '</span></li>';
          }).join('') + '</ul>' +
          '<a class="btn" href="' + p.ancla + '">' + esc(lang === 'en' ? 'Buy ' + p.nombre : 'Comprar ' + p.nombre) + '</a>' +
        '</article>';
      }).join('');

      var suma = P.framework + P.hybrid + P.engine, ahorro = suma - P.pack;
      $('#bundle').innerHTML =
        '<div><span class="bd-k">' + esc(lang === 'en' ? 'The three of them' : 'Las tres juntas') + '</span>' +
        '<h3>' + esc(lang === 'en' ? 'The whole workshop' : 'El taller completo') + '</h3>' +
        '<p>' + esc(lang === 'en'
          ? 'Framework, Hybrid and Engine together. One purchase, three ways of working, and the freedom to change your mind halfway through a project.'
          : 'Framework, Hybrid y Engine juntos. Una sola compra, tres formas de trabajar, y la libertad de cambiar de idea a mitad de un proyecto.') + '</p>' +
        '<div class="bd-marks">' + D.productos.map(function (p) { return '<img src="' + p.logo + '" alt="">'; }).join('') + '</div></div>' +
        '<div class="bd-buy">' +
          '<span class="bd-was">' + money(suma) + ' ' + esc(lang === 'en' ? 'separately' : 'por separado') + '</span>' +
          '<span class="bd-now"><span class="cur">' + P.simbolo + '</span><span class="num">' + P.pack + '</span></span>' +
          '<span class="bd-save">' + esc(lang === 'en' ? 'you save ' : 'ahorras ') + money(ahorro) + '</span>' +
          '<a class="btn" href="#comunidad">' + esc(lang === 'en' ? 'Get the three' : 'Llevarme las tres') + '</a>' +
        '</div>';

      $$('[data-price]').forEach(function (el) { el.textContent = money(P[el.dataset.price]); });
    }
    onLang(render);
  }());

  /* ========================================================================= FAQ */
  (function () {
    var root = $('#faqList');
    function render() {
      root.innerHTML = D.faq.map(function (f, i) {
        return '<div class="faq-item"><button class="faq-q" type="button" aria-expanded="false">' +
          '<span class="ix">' + String(i + 1).padStart(2, '0') + '</span>' +
          '<span>' + esc(L(f.q)) + '</span><span class="pm" aria-hidden="true">+</span></button>' +
          '<div class="faq-a"><div><p>' + L(f.a) + '</p></div></div></div>';
      }).join('');
      $$('.faq-q', root).forEach(function (b) {
        b.addEventListener('click', function () {
          var it = b.parentNode, open = it.classList.toggle('open');
          b.setAttribute('aria-expanded', String(open));
        });
      });
    }
    onLang(render);
  }());

  /* ================================================================== FORMULARIO */
  (function () {
    var URL_ = 'https://paxcudhlpkjqkgcohonw.supabase.co/rest/v1/Personas';
    var KEY = 'sb_publishable_I_Nn5LGuUJ2v9wlg3HPODg_8BjBHstQ';
    var form = $('#notifyForm'), msg = $('#fMsg'), btn = $('#fSubmit');
    function show(k, cls) { msg.textContent = m(k); msg.className = 'msg ' + cls; }
    form.addEventListener('submit', function (ev) {
      ev.preventDefault();
      var nombre = $('#fName').value.trim(), correo = $('#fMail').value.trim(), raw = $('#fTel').value.trim();
      var celular = raw ? Number(raw.replace(/\D/g, '')) : null;
      var want = $$('.want input:checked').map(function (i) { return i.value; });
      if (!nombre || !/^\S+@\S+\.\S+$/.test(correo)) { show('req', 'err'); return; }
      btn.disabled = true; btn.textContent = m('sending'); msg.textContent = ''; msg.className = 'msg';
      fetch(URL_, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', apikey: KEY, Authorization: 'Bearer ' + KEY, Prefer: 'return=minimal' },
        body: JSON.stringify({ PersonaID: Date.now(), Nombre: nombre + (want.length ? ' [' + want.join('/') + ']' : ''), Correo: correo, Celular: celular })
      }).then(function (r) {
        if (!r.ok) return r.text().then(function (t) { throw new Error(t || r.status); });
        show('ok', 'ok'); form.reset();
      }).catch(function (e) { console.error(e); show('err', 'err'); })
        .then(function () { btn.disabled = false; btn.textContent = tr('fo.submit'); });
    });
  }());

  /* ====================================================================== arranque */
  overprint();
  if (lang === 'en') applyLang('en');
}());
