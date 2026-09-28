/* ==========================================================================
   YOTSUBA — comportamiento del sitio
   Cada módulo se activa solo si su marcaje existe en la página.
   ========================================================================== */
(function () {
  'use strict';

  var Y = window.YOTSUBA, D = Y.DATA, P = Y.PRECIOS;
  var $  = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var lang = window.__LANG__ === 'en' ? 'en' : 'es';
  var esc = function (t) { return String(t).replace(/[&<>"]/g, function (c) { return ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;' })[c]; }); };
  var L = function (v) { return (v && typeof v === 'object' && 'es' in v) ? v[lang] : v; };
  var m = function (k) { return (Y.MSG[lang] && Y.MSG[lang][k]) || Y.MSG.es[k] || k; };
  var money = function (n) { return P.simbolo + n; };

  /* ====================================================================== i18n
     El español se lee del propio HTML; solo el inglés vive en contenido.js. */
  var ES = {};
  $$('[data-t]').forEach(function (el) {
    /* el aspa de Hybrid vive dentro del span pero no forma parte del texto */
    var t = el.textContent, x = el.querySelector('.w-x');
    if (x) t = t.replace(x.textContent, '');
    ES[el.dataset.t] = t;
  });
  $$('[data-th]').forEach(function (el) { ES[el.dataset.th] = el.innerHTML; });
  $$('[data-ta]').forEach(function (el) { var p = el.dataset.ta.split(':'); ES[p[1]] = el.getAttribute(p[0]); });
  var tr = function (k) { var d = lang === 'en' ? Y.EN : ES; return d[k] != null ? d[k] : (ES[k] || ''); };

  var renderers = [];
  function onLang(fn) { renderers.push(fn); fn(); }

  /* La capa rellena del titular se dibuja con content:attr(data-w). Ese
     atributo NO es la clave de traducción (esa es data-t): hay que
     reescribirlo con el texto ya traducido cada vez que cambia el idioma. */
  function syncFill() {
    $$('h1.title .fill').forEach(function (el) {
      var x = $('.w-x', el);
      var txt = el.textContent;
      if (x) txt = txt.replace(x.textContent, '');
      el.setAttribute('data-w', txt.trim());
    });
  }

  function applyLang(l) {
    lang = l;
    document.documentElement.lang = l;
    $$('[data-t]').forEach(function (el) {
      if (el.classList.contains('fill')) {
        var x = $('.w-x', el) ? $('.w-x', el).outerHTML : '';
        el.innerHTML = esc(tr(el.dataset.t)) + x;
      } else { el.textContent = tr(el.dataset.t); }
    });
    $$('[data-th]').forEach(function (el) { el.innerHTML = tr(el.dataset.th); });
    $$('[data-ta]').forEach(function (el) { var p = el.dataset.ta.split(':'); el.setAttribute(p[0], tr(p[1])); });
    var t = $('#docTitle'), d = $('#docDesc');
    if (t && tr('doc.title')) document.title = tr('doc.title');
    if (d && tr('doc.desc')) d.setAttribute('content', tr('doc.desc'));
    $('#langCode').textContent = m('langCode');
    syncFill();
    renderers.forEach(function (fn) { fn(); });
  }
  $('#langBtn').addEventListener('click', function () {
    var n = lang === 'es' ? 'en' : 'es';
    try { localStorage.setItem('yotsuba-language', n); } catch (_) {}
    applyLang(n);
  });

  /* =================================================== BORDES RASGADOS ===
     clip-path con ruido estable por semilla: el desgarro no baila al recargar. */
  function rng(seed) {
    var a = seed >>> 0;
    return function () {
      a |= 0; a = a + 0x6D2B79F5 | 0;
      var t = Math.imul(a ^ a >>> 15, 1 | a);
      t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
      return ((t ^ t >>> 14) >>> 0) / 4294967296;
    };
  }
  function edge(r, n, amp, ph) {
    var out = [];
    for (var i = 0; i <= n; i++) out.push(amp * (.5 * r() + .5 * (.5 + .5 * Math.sin(i * .55 + ph))));
    return out;
  }
  function tear(el, seed) {
    var sd = (el.dataset.torn || '').split(/\s+/), has = function (s) { return sd.indexOf(s) > -1; };
    var r = rng(seed), n = 90, mm = 60, amp = 13, pts = [], i, v;
    if (has('top'))    { v = edge(r, n, amp, r() * 6); for (i = 0; i <= n; i++) pts.push((i / n * 100).toFixed(2) + '% ' + v[i].toFixed(1) + 'px'); }
    else pts.push('0 0', '100% 0');
    if (has('right'))  { v = edge(r, mm, 16, r() * 6); for (i = 0; i <= mm; i++) pts.push('calc(100% - ' + v[i].toFixed(1) + 'px) ' + (i / mm * 100).toFixed(2) + '%'); }
    else pts.push('100% 0', '100% 100%');
    if (has('bottom')) { v = edge(r, n, amp, r() * 6); for (i = n; i >= 0; i--) pts.push((i / n * 100).toFixed(2) + '% calc(100% - ' + v[i].toFixed(1) + 'px)'); }
    else pts.push('100% 100%', '0 100%');
    if (has('left'))   { v = edge(r, mm, 16, r() * 6); for (i = mm; i >= 0; i--) pts.push(v[i].toFixed(1) + 'px ' + (i / mm * 100).toFixed(2) + '%'); }
    el.style.clipPath = 'polygon(' + pts.join(',') + ')';
  }
  $$('[data-torn]').forEach(function (el, i) { tear(el, 4321 + i * 977); });

  /* ============================================================== NAV === */
  var nav = $('#nav');
  function onScroll() { nav.classList.toggle('solid', window.scrollY > 40); }
  window.addEventListener('scroll', onScroll, { passive: true }); onScroll();

  /* vídeos: arrancan en silencio al entrar en pantalla */
  if ('IntersectionObserver' in window) {
    var vio = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) e.target.play().catch(function () {}); else e.target.pause(); });
    }, { threshold: .35 });
    $$('video[data-autoplay]').forEach(function (v) { vio.observe(v); });
  }

  /* ===================================================== DEMO WEBGPU === */
  (function () {
    var links = $$('[data-demo]');
    if (!links.length) return;
    links.forEach(function (a) {
      if (Y.DEMO_WEBGPU) { a.href = Y.DEMO_WEBGPU; a.target = '_blank'; a.rel = 'noopener'; }
      else {
        a.classList.add('off');
        a.setAttribute('aria-disabled', 'true');
        a.removeAttribute('href');
        a.title = m('demoOff');
      }
    });
  }());



  /* ======================================== RECORRIDO SOBRE LA LÁMINA === */
  (function () {
    var stage = $('#stage'); if (!stage) return;
    var steps = $$('.step'), tag = $('#modeTag'), cv = $('#rain');
    var cx = cv.getContext('2d'), drops = [], on = false, W = 1, H = 1, raf = 0;
    var names = { es: ['EDIT', 'EDIT', 'EDIT', 'PLAYING', 'EXPORT'], en: ['EDIT', 'EDIT', 'EDIT', 'PLAYING', 'EXPORT'] };
    function fit() {
      var b = stage.getBoundingClientRect(), d = Math.min(2, window.devicePixelRatio || 1);
      W = b.width; H = b.height; cv.width = W * d; cv.height = H * d; cx.setTransform(d, 0, 0, d, 0, 0);
    }
    fit(); window.addEventListener('resize', fit);
    function rain() {
      raf = requestAnimationFrame(rain);
      cx.clearRect(0, 0, W, H);
      if (!on) return;
      for (var i = 0; i < 4; i++) drops.push({ x: Math.random() * W, y: -10, v: 9 + Math.random() * 7 });
      cx.strokeStyle = 'rgba(57,202,236,.8)'; cx.lineWidth = 1.5; cx.beginPath();
      for (var j = drops.length - 1; j >= 0; j--) {
        var d = drops[j];
        cx.moveTo(d.x, d.y); cx.lineTo(d.x - 3, d.y + 14);
        d.y += d.v; d.x -= .6;
        if (d.y > H) drops.splice(j, 1);
      }
      cx.stroke();
    }
    function set(n) {
      stage.dataset.step = n;
      tag.textContent = names[lang][n];
      on = n === 3;
      steps.forEach(function (s) { s.classList.toggle('on', +s.dataset.s === n); });
      if (on && !raf) raf = requestAnimationFrame(rain);
    }
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { on = false; }
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (es) {
        es.forEach(function (e) { if (e.isIntersecting) set(+e.target.dataset.s); });
      }, { rootMargin: '-42% 0px -42% 0px' });
      steps.forEach(function (s) { io.observe(s); });
    } else set(1);
    raf = requestAnimationFrame(rain);
  }());

  /* ============================================ CAPACIDADES (Framework) === */
  (function () {
    var host = $('#caps'); if (!host) return;
    var caps = D.capacidades;
    function slugIndex(sl) { for (var i = 0; i < caps.length; i++) if (caps[i].slug === sl) return i; return 0; }

    function render() {
      var cur = slugIndex(decodeURIComponent(location.hash.slice(1)));
      $('#chapters').innerHTML = caps.map(function (c, i) {
        return '<a href="#' + c.slug + '" data-slug="' + c.slug + '"' + (i === cur ? ' class="on" aria-current="page"' : '') +
               '><b>' + c.n + '</b>' + esc(L(c.tab)) + '</a>';
      }).join('');

      var c = caps[cur], prev = caps[(cur - 1 + caps.length) % caps.length], next = caps[(cur + 1) % caps.length];
      var fig = c.img
        ? '<figure class="cover frame"><img src="' + c.img + '" alt="" width="' + c.w + '" height="' + c.h + '" loading="lazy"></figure>'
        : '<figure class="cover frame wg"><div class="wg-in"><b>' + esc(L(c.tab)) + '</b><ol><li>C# · XNA</li><li>Yotsuba</li><li>' + esc(L(c.tab)) + '</li><li>GPU</li></ol></div></figure>';

      $('#art').innerHTML =
        '<header class="art-head"><div class="art-title">' +
          '<span class="eyebrow">' + esc(L(c.eyebrow)) + '</span>' +
          '<span class="bignum brush" aria-hidden="true">' + c.n + '</span>' +
          '<h2 class="art-h">' + esc(L(c.t1)) + '<em>' + esc(L(c.t2)) + '</em></h2>' +
          '<p class="art-intro">' + esc(L(c.intro)) + '</p>' +
        '</div>' + fig + '</header>' +
        '<div class="art-cols">' +
          '<p class="art-lead">' + esc(L(c.lead)) + '</p>' +
          '<div class="art-body">' +
            c.body.map(function (b) { return '<p>' + esc(L(b)) + '</p>'; }).join('') +
            '<aside class="note"><span>' + esc(L(c.noteK)) + '</span><strong>' + esc(L(c.note)) + '</strong></aside>' +
            '<div class="tags">' + c.tags.map(function (t) { return '<span>' + esc(L(t)) + '</span>'; }).join('') + '</div>' +
          '</div>' +
        '</div>' +
        '<div class="facts">' + c.facts.map(function (f) {
          return '<div><span>' + esc(L(f[0])) + '</span><b>' + esc(L(f[1])) + '</b></div>';
        }).join('') + '</div>' +
        (c.estado ? '<p class="status-note"><i></i>' + esc(L(c.estado)) + '</p>' : '') +
        '<nav class="pager"><a class="btn paper" href="#' + prev.slug + '">← ' + esc(L(prev.tab)) + '</a>' +
        '<a class="btn" href="#' + next.slug + '">' + esc(L(next.tab)) + ' →</a></nav>';

      var onTab = $('#chapters a.on');
      if (onTab && onTab.scrollIntoView) onTab.scrollIntoView({ block: 'nearest', inline: 'center' });
    }
    var first = true;
    function show() {
      render();
      if (!first) { host.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
      first = false;
    }
    window.addEventListener('hashchange', show);
    onLang(render);
    show();
  }());

  /* ================================================ PAPELETA (portada) === */
  (function () {
    var out = $('#pickOut'); if (!out) return;
    var btns = $$('.opts button'), cur = null;
    function prod(k) { return D.productos.filter(function (p) { return p.p === k; })[0]; }
    function render() {
      if (!cur) {
        out.innerHTML = '<div class="pick-empty"><span class="pe-marks" aria-hidden="true">' +
          D.productos.map(function (p) { return '<img src="' + p.logo + '" alt="">'; }).join('') +
          '</span><span class="pe-say">' + esc(m('pickSay')) + '</span></div>';
        out.dataset.p = 'fw'; return;
      }
      var p = prod(cur);
      out.dataset.p = p.p;
      out.innerHTML =
        '<div class="po-top"><img src="' + p.logo + '" alt=""><div>' +
          '<span class="po-k">' + esc(L(p.para)) + '</span><h3>Yotsuba ' + esc(p.nombre) + '</h3></div></div>' +
        '<p>' + esc(L(p.quien)) + '</p>' +
        '<ul>' + p.bullets.map(function (b) { return '<li>' + esc(L(b)) + '</li>'; }).join('') + '</ul>' +
        '<div class="po-cta"><a class="btn sm ink" href="' + p.url + '">' + esc(m('see') + ' ' + p.nombre) + '</a>' +
        '<span class="po-price">' + money(P[p.id]) + ' · ' + esc(m('once')) + '</span></div>';
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

  /* ====================================================== PRODUCTOS ===
     Los tres pilares de la portada se pintan desde DATA.productos. */
  (function () {
    var flow = $('#prodFlow'); if (!flow) return;
    function render() {
      flow.innerHTML = D.productos.map(function (p, i) {
        return '<article class="pillar" data-leaf="' + (i + 1) + '" data-p="' + p.p + '" id="p-' + p.id + '">' +
          '<span class="num">0' + (i + 1) + '</span>' +
          '<h3>Yotsuba ' + esc(p.nombre) + '</h3>' +
          '<p>' + esc(L(p.largo)) + '</p>' +
          '<ul class="steps">' + p.pasos.map(function (s) {
            return '<li><div><b>' + esc(L(s[0])) + '</b><span>' + esc(L(s[1])) + '</span></div></li>';
          }).join('') + '</ul>' +
          '<a class="btn" href="' + p.url + '">' + esc(m('see') + ' ' + p.nombre) + ' <b class="px">' + money(P[p.id]) + '</b></a>' +
        '</article>';
      }).join('');
      $('#leafNav').innerHTML = D.productos.map(function (p, i) {
        return '<li data-go="' + (i + 1) + '" data-p="' + p.p + '" style="--c:var(--p)"><a href="#p-' + p.id + '">' +
          '<b>' + (i + 1) + '</b><span class="t">Yotsuba ' + esc(p.nombre) + '</span></a></li>';
      }).join('');
    }
    onLang(render);
  }());

  /* ========================================================= PRECIOS === */
  (function () {
    var tk = $('#tickets');
    if (tk) onLang(function () {
      tk.innerHTML = D.productos.map(function (p) {
        return '<article class="ticket" data-p="' + p.p + '">' +
          (p.destacado ? '<span class="tk-stamp">' + esc(tr('pr.best') || 'MÁS COMPLETO') + '</span>' : '') +
          '<div class="tk-head"><img src="' + p.logo + '" alt=""><div>' +
            '<small>' + esc(L(p.para)) + '</small><b>' + esc(p.nombre) + '</b></div></div>' +
          '<p class="tk-claim">' + esc(L(p.claim)) + '</p>' +
          '<div class="tk-price"><span class="cur">' + P.simbolo + '</span><span class="num">' + P[p.id] + '</span></div>' +
          '<p class="tk-once">' + esc(tr('pr.once') || 'pago único · para siempre') + '</p>' +
          '<ul class="tk-list">' + p.bullets.map(function (b) { return '<li><span>' + esc(L(b)) + '</span></li>'; }).join('') + '</ul>' +
          '<a class="btn ink" href="comunidad.html">' + esc(m('buy') + ' ' + p.nombre) + '</a></article>';
      }).join('');

      var suma = P.framework + P.hybrid + P.engine, ahorro = suma - P.pack;
      $('#bundle').innerHTML =
        '<div><span class="bd-k">' + esc(tr('pr.bdK') || 'Las tres juntas') + '</span>' +
        '<h3>' + esc(tr('pr.bdH') || 'Yotsuba completo') + '</h3>' +
        '<p>' + esc(tr('pr.bdD') || '') + '</p>' +
        '<div class="bd-marks">' + D.productos.map(function (p) { return '<img src="' + p.logo + '" alt="">'; }).join('') + '</div></div>' +
        '<div class="bd-buy"><span class="bd-was">' + money(suma) + ' ' + esc(tr('pr.bdWas') || 'por separado') + '</span>' +
        '<span class="bd-now"><span class="cur">' + P.simbolo + '</span><span class="num">' + P.pack + '</span></span>' +
        '<span class="bd-save">' + esc(tr('pr.bdSave') || 'ahorras') + ' ' + money(ahorro) + '</span>' +
        '<a class="btn" href="comunidad.html">' + esc(tr('pr.bdBuy') || 'Llevarme las tres') + '</a></div>';
    });

    /* la barra de precios de la portada */
    var bar = $('#priceBar');
    if (bar) onLang(function () {
      bar.innerHTML = D.productos.map(function (p) {
        return '<div><span>Yotsuba ' + esc(p.nombre) + '</span><b>' + money(P[p.id]) + '</b>' +
               '<small>' + esc(L(p.para)) + ' · ' + esc(m('once')) + '</small></div>';
      }).join('');
    });

    /* comparativa: una barra de datos por criterio */
    var cmp = $('#compara');
    if (cmp) onLang(function () {
      cmp.innerHTML = D.comparar.map(function (r) {
        return '<div class="cmp-row"><h3>' + esc(L(r.f)) + '</h3><div class="facts">' +
          r.v.map(function (v, i) {
            return '<div><span>' + esc(D.productos[i].nombre) + '</span><b>' + esc(L(v)) + '</b></div>';
          }).join('') + '</div></div>';
      }).join('');
    });

    /* plataformas: chips por estado */
    var plat = $('#plataformas');
    if (plat) onLang(function () {
      plat.innerHTML = D.plataformas.map(function (r) {
        return '<div class="plat-row"><b>' + esc(L(r.t)) + '</b>' +
          '<div class="tags"><span>' + esc(L(r.g)) + '</span>' +
          '<span class="' + (r.st === 'ok' ? 'hot' : 'ex') + '">' + esc(L(r.s)) + '</span></div></div>';
      }).join('');
    });

    /* dudas: bloques con filete, sin acordeón */
    var du = $('#dudas');
    if (du) onLang(function () {
      du.innerHTML = D.dudas.map(function (f, i) {
        return '<div class="duda"><span class="ix">' + String(i + 1).padStart(2, '0') + '</span>' +
          '<div><h3>' + esc(L(f.q)) + '</h3><p>' + L(f.a) + '</p></div></div>';
      }).join('');
    });

    /* precios sueltos repartidos por el sitio */
    onLang(function () { $$('[data-price]').forEach(function (el) { el.textContent = money(P[el.dataset.price]); }); });
  }());

  /* ====================================================== FORMULARIO ===
     Una sola llamada al endpoint público de contactos, con los productos
     marcados separados por comas en «source». No lleva clave: ese endpoint
     autoriza por el dominio desde el que se llama. */
  (function () {
    var form = $('#notifyForm'); if (!form) return;
    var C = Y.CONTACTOS || {}, msg = $('#fMsg'), btn = $('#fSubmit');
    function show(k, cls) { msg.textContent = m(k); msg.className = 'msg ' + cls; }

    form.addEventListener('submit', function (ev) {
      ev.preventDefault();
      var nombre = $('#fName').value.trim().replace(/\s+/g, ' ');
      var correo = $('#fMail').value.trim();
      var tel    = $('#fTel').value.trim();
      var trampa = $('#fWeb') ? $('#fWeb').value : '';
      var quiere = $$('.want input:checked').map(function (i) { return i.value; });

      if (!nombre || !/^\S+@\S+\.\S+$/.test(correo)) { show('req', 'err'); return; }
      if (!quiere.length) { show('faltaProducto', 'err'); return; }
      if (!C.base || !C.companyId) { show('sinConfig', 'err'); return; }

      var origen = quiere.join(',').slice(0, 100);   /* límite del campo source */
      btn.disabled = true; btn.textContent = m('sending');
      msg.textContent = ''; msg.className = 'msg';

      fetch(C.base.replace(/\/+$/, '') + '/api/v1/public/companies/' + C.companyId + '/contacts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email:   correo.slice(0, 254),
          name:    nombre.slice(0, 200),
          phone:   tel ? tel.slice(0, 50) : undefined,   /* texto, no número */
          source:  origen,
          tags:    origen,
          website: trampa
        })
      }).then(function (r) {
        /* 200 sale igual tanto si el contacto es nuevo como si ya existía: distinguirlo
           delataría qué correos están en la lista. */
        if (r.ok) { show('ok', 'ok'); form.reset(); return; }
        return r.json().catch(function () { return {}; }).then(function (d) {
          msg.textContent = d.error || m('err');      /* el 400 sí trae cabeceras CORS */
          msg.className = 'msg err';
        });
      }).catch(function (e) {
        /* El 403 (dominio no autorizado) y el 429 (más de 10 envíos por minuto) salen
           sin cabeceras CORS, así que el navegador los entrega como un error de red
           indistinguible de una caída. Se tratan juntos y se explica en consola. */
        console.error('No se pudo enviar el contacto. Causas posibles: el dominio no est\u00e1 en la lista de or\u00edgenes autorizados de la API, se super\u00f3 el l\u00edmite de 10 env\u00edos por minuto, o el servicio no responde.', e);
        show('noEnvia', 'err');
      }).then(function () { btn.disabled = false; btn.textContent = tr('fo.submit'); });
    });
  }());

  /* ====================================== PILARES (portada y Hybrid)
     Va al final a propósito: en la portada los pilares los pinta el módulo
     de PRODUCTOS, así que el observador tiene que montarse después. === */
  (function () {
    var marks = $('#marks'), items = $$('#leafNav li'), arts = $$('.pillar');
    if (!arts.length || !('IntersectionObserver' in window)) return;
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (!e.isIntersecting) return;
        var n = e.target.dataset.leaf;
        if (marks) marks.dataset.on = n;
        items.forEach(function (li) { li.classList.toggle('on', li.dataset.go === n); });
      });
    }, { rootMargin: '-42% 0px -42% 0px' });
    arts.forEach(function (a) { io.observe(a); });
    if (items[0]) items[0].classList.add('on');
  }());

  /* ======================================================== ARRANQUE === */
  syncFill();
  if (lang === 'en') applyLang('en');
}());
