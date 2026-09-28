# -*- coding: utf-8 -*-
import io
exec(io.open('_generador.py', encoding='utf-8').read())

CUERPO = u'''
<!-- ================================================================ HÉROE -->
<section class="hero">
  <div class="plate" id="plate" style="--art-pos:50% 30%">
    <div class="plate-in" data-torn="left bottom">
      <div class="art-box"><img src="../assets/enuma.webp" alt="Ilustración de Yotsuba Framework" data-ta="alt:fw.art" width="2000" height="3000" fetchpriority="high"></div>
    </div>
    <span class="plate-tag" data-t="plate.fw">ENUMA ELISH · PINTADO EN KRITA</span>
  </div>


  <div class="hero-copy">
    <span class="status" data-t="fw.status">Linaje XNA · arquitectura gráfica nueva</span>
    <span class="kick brush">Yotsuba Framework</span>
    <h1 class="title" aria-label="Next Gen XNA"
        style="--fill-img:url('../assets/enuma.webp') no-repeat -260px -1080px / 1500px auto;
               --fill-grad:linear-gradient(96deg,#2456ff 0%,#2f8bff 40%,#21c4f0 72%,#25d0b0 100%)">
      <span class="l" data-t="fw.h1a" aria-hidden="true">Next Gen</span>
      <span class="l fill" data-t="fw.h1b" aria-hidden="true">XNA.</span>
    </h1>
    <p class="lede" data-th="fw.lede">El único framework con linaje XNA que modernizó entera su arquitectura gráfica: <b>compute shaders</b>, Vulkan, Metal, DirectX&nbsp;12, WebGPU y siete lenguajes de shader, con <b>compilación en tiempo de ejecución</b>.</p>
    <div class="hero-cta">
      <a class="btn" data-demo href="#" data-t="fw.demo">Pruébalo en tu GPU</a>
      <a class="btn paper" href="#capacidades"><span data-t="fw.cta2">Ver las capacidades</span><svg aria-hidden="true"><use href="#i-down"/></svg></a>
    </div>
    <ul class="stamps">
      <li data-t="fw.s1">Compute shaders</li>
      <li data-t="fw.s2">7 lenguajes de shader</li>
      <li data-t="fw.s3">Compatible con MonoGame</li>
    </ul>
  </div>
</section>

<!-- ============================================================== ENTRADA -->
<div class="wrap">
  <div class="act-lead">
    <p class="act-claim" data-th="fw.claim">Una reimplementación de XNA hecha desde cero sobre la arquitectura gráfica de hoy. <b>Tus bibliotecas de MonoGame siguen funcionando</b> sin recompilarlas.</p>
    <dl class="spec">
      <div><dt data-t="fw.r1">Compute shaders</dt><dd data-t="fw.r1d">Trabajo masivamente paralelo en la GPU dentro de un framework con forma de XNA.</dd></div>
      <div><dt data-t="fw.r2">Siete lenguajes de shader</dt><dd data-t="fw.r2d">MGFX, FNAFX, Slang, HLSL, GLSL, MSL y entrada directa de SPIR-V. Cuatro viajan a WebGPU.</dd></div>
      <div><dt data-t="fw.r3">Rutas gráficas nativas</dt><dd data-t="fw.r3d">Vulkan en Android y Linux, Metal en Apple, DirectX 12 en Windows, WebGPU en el navegador.</dd></div>
      <div><dt data-t="fw.r4">Pipeline de siempre</dt><dd data-t="fw.r4d">MGCB y MGFX con perfil DesktopVK: no hay herramientas nuevas que aprender.</dd></div>
    </dl>
  </div>
</div>

<!-- ============================================== PLIEGO I · CAPACIDADES -->
<header class="act-open" data-torn="top bottom">
  <img class="act-plate" src="../assets/enuma.webp" alt="" loading="lazy" style="--plate-pos:50% 33%">
  <span class="act-tint" aria-hidden="true"></span>
  <span class="act-shade" aria-hidden="true"></span>
  <div class="wrap act-open-in">
    <span class="act-num" aria-hidden="true">I</span>
    <div>
      <p class="act-for" data-t="fw.for">Nueve capacidades, una por una</p>
      <h2 class="act-title"><b data-t="fw.actB">CAPACIDADES</b><span class="brush">Framework</span></h2>
    </div>
    <img class="act-logo" src="../assets/framework-logo.webp" alt="" loading="lazy">
  </div>
  <span class="act-folio">PLIEGO I</span>
</header>

<!-- =========================================================== CAPACIDADES -->
<section class="sec" id="capacidades">
  <div class="wrap" id="caps">
    <a class="back" href="index.html" data-t="fw.back">← Volver a los tres productos</a>
    <nav class="chapters" id="chapters" aria-label="Capacidades"></nav>
    <div class="art" id="art"></div>
  </div>
</section>

<!-- =========================================================== PLATAFORMAS -->
<section class="sec alt">
  <div class="wrap">
    <header class="sec-head sm">
      <span class="folio">02<i data-t="pl.folio">a dónde llega</i></span>
      <h2 class="h" data-t="pl.h">Dónde corre, y en qué estado.</h2>
      <p class="sub" data-t="pl.sub">La columna de estado es a propósito: preferimos decirte qué es experimental antes que sorprenderte después.</p>
    </header>
    <div class="plat-list" id="plataformas"></div>
    <p class="fine" data-t="pl.fine">Cada fila es un proyecto anfitrión dentro del repositorio. Todavía no garantizamos paridad de características entre destinos. Las consolas requieren aprobación, licencias y herramientas de cada fabricante.</p>
  </div>
</section>

<!-- =============================================================== PRECIO -->
<section class="cta" data-torn="top">
  <div class="wrap cta-in">
    <div>
      <span class="eyebrow" style="color:var(--p2)" data-t="fw.cpre">Yotsuba Framework</span>
      <h2 data-th="fw.ch">Solo la biblioteca<em>y nada más.</em></h2>
      <p class="d" data-t="fw.cd">Pago único, licencia perpetua y cero regalías sobre lo que vendas. Si más adelante quieres el editor, Hybrid y Engine están a un paso.</p>
      <div class="cta-links">
        <a class="btn gold" href="precios.html"><span data-t="fw.cbuy">Comprar Framework</span> <b class="px" data-price="framework"></b></a>
        <a class="btn paper" href="precios.html" data-t="fw.ccmp">Comparar las tres</a>
      </div>
    </div>
    <div class="facts" style="margin:0">
      <div><span data-t="fw.f1">API</span><b>XNA</b><small data-t="fw.f1d">La misma superficie que MonoGame, FNA y KNI.</small></div>
      <div><span data-t="fw.f2">Gráficos</span><b>Vulkan · Metal · DX12</b><small data-t="fw.f2d">Más WebGPU en la hoja de ruta.</small></div>
      <div><span data-t="fw.f3">Regalías</span><b>0 %</b><small data-t="fw.f3d">Publica y vende sin compartir ingresos.</small></div>
    </div>
  </div>
</section>
'''

escribir('framework.html',
         titulo=u'Yotsuba Framework — XNA con compute shaders, Vulkan, Metal y DirectX 12',
         desc=u'La biblioteca con forma de XNA modernizada por dentro: compute shaders, siete lenguajes de shader y rutas nativas de Vulkan, Metal, DirectX 12 y WebGPU. Compatible con MonoGame.',
         pigmento='fw', cuerpo=CUERPO, activa='framework.html')
