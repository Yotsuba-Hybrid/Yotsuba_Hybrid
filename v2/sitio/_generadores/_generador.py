# -*- coding: utf-8 -*-
"""Arma las seis páginas a partir de los fragmentos comunes.
Se ejecuta una sola vez: después los .html quedan estáticos y editables a mano.
Si cambias el navbar o el pie, vuelve a ejecutarlo."""
import io, os

CABEZA = io.open('_cabeza.html', encoding='utf-8').read().rstrip()
ICONOS = io.open('_iconos.html', encoding='utf-8').read().rstrip()

PAGS = [
    ('framework.html', 'Framework'),
    ('hybrid.html',    'Hybrid'),
    ('engine.html',    'Engine'),
    ('precios.html',   'Precios'),
    ('comunidad.html', 'Comunidad'),
]

def nav(activa, comprar='Comprar'):
    links = []
    for href, txt in PAGS:
        cur = ' aria-current="page"' if href == activa else ''
        key = 'nav.' + href.split('.')[0]
        links.append('    <a href="%s" data-t="%s"%s>%s</a>' % (href, key, cur, txt))
    return '''<header class="nav" id="nav">
  <a class="brand" href="index.html" aria-label="Yotsuba">
    <img src="../assets/hybrid-logo.webp" alt="" width="46" height="46">
    <span class="brand-word"><b>YOTSUBA</b><span class="brush" data-t="nav.tag">Game Studio</span></span>
  </a>
  <nav class="nav-links" aria-label="Navegación principal" data-ta="aria-label:nav.label">
%s
  </nav>
  <div class="nav-right">
    <button type="button" class="lang" id="langBtn" data-ta="aria-label:nav.langTo" aria-label="Switch language to English">
      <svg aria-hidden="true"><use href="#i-globe"/></svg><span id="langCode">EN</span>
    </button>
    <a class="btn sm cape" href="precios.html" data-t="nav.buy">%s</a>
  </div>
</header>''' % ('\n'.join(links), comprar)

FOOT = '''<footer class="foot">
  <div class="wrap foot-in">
    <a class="brand" href="index.html" aria-label="Yotsuba">
      <img src="../assets/hybrid-logo.webp" alt="" width="38" height="38">
      <span class="brand-word"><b>YOTSUBA</b><span class="brush" data-t="nav.tag">Game Studio</span></span>
    </a>
    <nav aria-label="Pie">
      <a href="framework.html">Yotsuba Framework</a><a href="hybrid.html">Yotsuba Hybrid</a><a href="engine.html">Yotsuba Engine</a>
      <a href="precios.html" data-t="nav.precios">Precios</a><a href="comunidad.html" data-t="nav.comunidad">Comunidad</a>
      <a href="../../yotsuba-framework-site/docs.html" data-t="foot.docs">Documentación</a>
      <a href="https://github.com/Yotsuba-Hybrid" target="_blank" rel="noopener">GitHub</a>
    </nav>
    <a class="foot-mail" href="mailto:yotsubahybrid.official@outlook.com">
      <svg aria-hidden="true"><use href="#i-mail"/></svg>yotsubahybrid.official@outlook.com
    </a>
  </div>
  <div class="wrap foot-cred">
    <p class="fc-by">
      <span class="fc-k" data-t="foot.by">Desarrollado por</span>
      <b>Yotsuba Studios</b>
      <span class="fc-ceo">Memphis Yomael Núñez Cruz <i data-t="foot.ceo">CEO</i></span>
    </p>
    <span class="foot-c" data-t="foot.copy">© 2026 Yotsuba Studios. Todos los derechos reservados.</span>
  </div>
</footer>'''

def pagina(archivo, titulo, desc, pigmento, cuerpo, activa):
    return '''<!DOCTYPE html>
<html lang="es">
<head>
%s
<title id="docTitle">%s</title>
<meta name="description" id="docDesc" content="%s">
<meta property="og:title" content="%s">
<meta property="og:description" content="%s">
</head>
<body%s>

%s

<a class="skip" href="#main" data-t="a11y.skip">Saltar al contenido</a>

%s

<main id="main">
%s
</main>

%s

<script src="ingles.js?v=4"></script>
<script src="contenido.js?v=4"></script>
<script src="sitio.js?v=4"></script>
</body>
</html>
''' % (CABEZA, titulo, desc, titulo, desc, (' data-p="%s"' % pigmento) if pigmento else '',
       ICONOS, nav(activa), cuerpo.rstrip(), FOOT)

def escribir(archivo, **kw):
    io.open(archivo, 'w', encoding='utf-8').write(pagina(archivo, **kw))
    print('  %-16s %6d bytes' % (archivo, os.path.getsize(archivo)))
