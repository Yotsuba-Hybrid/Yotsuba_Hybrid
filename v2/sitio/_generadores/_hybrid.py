# -*- coding: utf-8 -*-
import io
exec(io.open('_generador.py', encoding='utf-8').read())

CUERPO = u'''
<!-- ================================================================ HÉROE -->
<section class="hero">
  <div class="plate wide" id="plate" style="--art-pos:52% 46%">
    <div class="plate-in" data-torn="left bottom">
      <div class="art-box"><img src="../assets/hybrid-hero.webp" alt="Yotsuba Hybrid: un trébol de cuatro hojas pintado en acuarela" data-ta="alt:hy.art" width="2200" height="1200" fetchpriority="high"></div>
    </div>
    <span class="plate-tag" data-t="plate.hy">YOTSUBA HYBRID · ACUARELA</span></span>
  </div>


  <div class="hero-copy">
    <span class="status" data-t="hy.status">En desarrollo · Próximamente</span>
    <h1 class="title" aria-label="Framework × Engine"
        style="--fill-img:url('../assets/hybrid-hero.webp') no-repeat -400px -690px / 2600px auto;
               --fill-grad:linear-gradient(96deg,#f2467f 0%,#e2509f 34%,#8a6bea 64%,#22c7b5 100%)">
      <span class="l" data-t="hy.h1a" aria-hidden="true">Framework</span>
      <span class="l fill" data-t="hy.h1b" aria-hidden="true">Engine<span class="w-x" aria-hidden="true">×</span></span>
    </h1>
    <p class="lede" data-th="hy.lede">El editor visual <b>vive dentro de la ventana de tu juego</b>, no en una app aparte. En <code>DEBUG</code> aparece; al compilar en <code>RELEASE</code> desaparece del binario.</p>
    <div class="hero-cta">
      <a class="btn" href="#hojas"><span data-t="hy.cta1">Ver cómo funciona</span><svg aria-hidden="true"><use href="#i-down"/></svg></a>
      <a class="btn paper" href="precios.html" data-t="hy.cta2">Ver precio</a>
    </div>
    <ul class="stamps">
      <li data-t="hy.s1">Editor en la ventana</li>
      <li data-t="hy.s2">4 backends</li>
      <li data-t="hy.s3">Se compila a C#</li>
    </ul>
  </div>
</section>

<!-- ============================================================== ENTRADA -->
<div class="wrap">
  <div class="act-lead">
    <p class="act-claim" data-th="hy.claim">Framework y editor en uno. Escribes el juego con tu IDE, lo ejecutas, y <b>lo ajustas con el juego en marcha</b> sin salir de la ventana.</p>
    <dl class="spec">
      <div><dt data-t="hy.r1">Editor en la ventana</dt><dd data-t="hy.r1d">Nada de cambiar de app ni de perder el contexto. Editas mientras el juego corre.</dd></div>
      <div><dt data-t="hy.r2">RELEASE sin editor</dt><dd data-t="hy.r2d">Las directivas de compilación se llevan el editor entero. Tu binario no carga con él.</dd></div>
      <div><dt data-t="hy.r3">Cuatro backends</dt><dd data-t="hy.r3d">MonoGame, KNI, FNA y Yotsuba Framework. Las plataformas se suman, no se reparten.</dd></div>
      <div><dt data-t="hy.r4">Se convierte en C#</dt><dd data-t="hy.r4d">Lo que decides en el editor se compila a código: menos JSON al arrancar, cargas más rápidas.</dd></div>
    </dl>
  </div>
</div>

<!-- ============================================= PLIEGO II · LAS CUATRO HOJAS -->
<header class="act-open" data-torn="top bottom">
  <img class="act-plate" src="../assets/enuma.webp" alt="" loading="lazy" style="--plate-pos:50% 78%">
  <span class="act-tint" aria-hidden="true"></span>
  <span class="act-shade" aria-hidden="true"></span>
  <div class="wrap act-open-in">
    <span class="act-num" aria-hidden="true">II</span>
    <div>
      <p class="act-for" data-t="hy.for">Yotsuba quiere decir «cuatro hojas»</p>
      <h2 class="act-title"><b data-t="hy.actB">LOS PILARES</b><span class="brush">Hybrid</span></h2>
    </div>
    <img class="act-logo" src="../assets/hybrid-logo.webp" alt="" loading="lazy">
  </div>
  <span class="act-folio">PLIEGO II</span>
</header>

<!-- ======================================================= LAS CUATRO HOJAS -->
<section class="leaves" id="hojas">
  <div class="wrap">
    <div class="leaves-head">
      <span class="eyebrow" data-t="hy.leavesE">Cuatro hojas, cuatro pilares</span>
      <h2 class="h" data-th="hy.leavesH">Cada hoja es <span class="brush">un pilar.</span></h2>
    </div>
    <div class="leaves-grid">
      <div class="leaves-sticky">
        <div class="clover" id="marks" data-on="1" aria-hidden="true">
          <img class="base" src="../assets/hybrid-logo.webp" alt="">
          <img class="q q1" src="../assets/hybrid-logo.webp" alt="">
          <img class="q q2" src="../assets/hybrid-logo.webp" alt="">
          <img class="q q3" src="../assets/hybrid-logo.webp" alt="">
          <img class="q q4" src="../assets/hybrid-logo.webp" alt="">
        </div>
        <ol class="leaf-nav" id="leafNav">
          <li data-go="1" style="--c:var(--p)"><a href="#hoja1"><b>1</b><span class="t" data-t="hy.n1">El editor por dentro</span></a></li>
          <li data-go="2" style="--c:#8a6bea"><a href="#hoja2"><b>2</b><span class="t" data-t="hy.n2">Dos capas</span></a></li>
          <li data-go="3" style="--c:#22c7b5"><a href="#hoja3"><b>3</b><span class="t" data-t="hy.n3">Las plataformas se suman</span></a></li>
          <li data-go="4" style="--c:var(--gold)"><a href="#hoja4"><b>4</b><span class="t" data-t="hy.n4">Tu código sigue siendo tuyo</span></a></li>
        </ol>
      </div>

      <div class="leaves-flow">
        <article class="pillar" id="hoja1" data-leaf="1">
          <span class="num">01</span>
          <h3 data-t="hy.p1t">El editor vive dentro de tu juego, no al lado.</h3>
          <p data-t="hy.p1d">En modo debug, Hybrid abre un editor visual dentro de la misma ventana donde se renderiza tu juego, no en una app externa. Trabajas desde tu IDE favorito, ejecutas, y editas mientras corre en tiempo real.</p>
          <ul class="steps">
            <li><div><b data-t="hy.p1s1">Escribe tu juego</b><span data-t="hy.p1s1d">Código normal, sin ataduras a un editor propietario. Tu arquitectura sigue siendo tuya.</span></div></li>
            <li><div><b data-t="hy.p1s2">Ejecuta en debug</b><span data-t="hy.p1s2d">El editor aparece dentro de la ventana del juego: nada de apps aparte, nada de contexto perdido.</span></div></li>
            <li><div><b data-t="hy.p1s3">Compila para release</b><span data-t="hy.p1s3d">Las directivas quitan el editor por completo. Solo queda tu juego, en el backend que elegiste.</span></div></li>
          </ul>
          <figure class="frame">
            <div class="bar"><span data-t="hy.p1f">my-game.exe — debug</span><em>DEBUG</em></div>
            <video controls muted loop playsinline preload="none" poster="../assets/video/editor-poster.webp" data-autoplay data-ta="aria-label:hy.p1v" aria-label="Grabación del editor de Yotsuba en funcionamiento"><source src="../assets/video/editor.mp4" type="video/mp4"></video>
            <figcaption data-t="hy.p1c">Grabación real del editor de Yotsuba Hybrid. No es una maqueta.</figcaption>
          </figure>
        </article>

        <article class="pillar" id="hoja2" data-leaf="2" style="--c:#8a6bea">
          <span class="num">02</span>
          <h3 data-t="hy.p2t">Dos capas. Cada una con su trabajo.</h3>
          <p data-th="hy.p2d"><b>Yotsuba Framework</b> es la reimplementación moderna de XNA: renderizado paralelo, shaders en Slang y visibilidad automática. <b>Yotsuba Engine</b> se apoya encima: entidades, componentes, sistemas, escenas, scripting y editor. Hybrid te da las dos.</p>
          <ul class="steps">
            <li><div><b data-t="hy.p2s1">Tu juego</b><span data-t="hy.p2s1d">C# y .NET, escrito una sola vez.</span></div></li>
            <li><div><b data-t="hy.p2s2">El motor</b><span data-t="hy.p2s2d">Entidades, componentes, sistemas, escenas, scripting y editor, como proyecto C# editable dentro de tu solución.</span></div></li>
            <li><div><b data-t="hy.p2s3">Los backends</b><span data-t="hy.p2s3d">MonoGame, KNI, FNA o Yotsuba Framework, y debajo Vulkan, Metal, DirectX 12 y WebGPU.</span></div></li>
          </ul>
        </article>

        <article class="pillar" id="hoja3" data-leaf="3" style="--c:#22c7b5">
          <span class="num">03</span>
          <h3 data-t="hy.p3t">Las plataformas se suman, no se reparten.</h3>
          <p data-t="hy.p3d">Como puedes ejecutar tu juego con MonoGame, KNI, FNA o Yotsuba Framework, todas las plataformas que soporte cualquiera de los cuatro quedan disponibles para tu proyecto. No eliges backend al empezar: lo cambias cuando el proyecto lo pide.</p>
          <div class="plat-list" id="plataformas"></div>
          <p class="fine" data-t="hy.p3f">Lo mostrado son los objetivos anunciados del proyecto y las capacidades de sus backends; no significa que cada destino esté hoy en una versión estable. Las consolas exigen aprobación, licencias y herramientas de cada fabricante.</p>
        </article>

        <article class="pillar" id="hoja4" data-leaf="4" style="--c:var(--gold)">
          <span class="num">04</span>
          <h3 data-t="hy.p4t">Tu código sigue siendo tuyo.</h3>
          <p data-t="hy.p4d">Un proyecto de Hybrid es código .NET normal. Lo abres en Visual Studio, Rider o VS Code, le metes cualquier paquete de NuGet y lo pones en el control de versiones que ya usas. Si el día de mañana quieres bajar a Framework puro, el proyecto se va contigo entero.</p>
          <div class="note">
            <span data-t="hy.p4nk">04 / Por qué importa</span>
            <strong data-t="hy.p4n">Nadie tiene que empezar de cero por haber elegido mal al principio.</strong>
          </div>
        </article>
      </div>
    </div>
  </div>
</section>

<!-- =============================================================== PRECIO -->
<section class="cta" data-torn="top">
  <div class="wrap cta-in">
    <div>
      <span class="eyebrow" style="color:var(--p2)" data-t="hy.cpre">Yotsuba Hybrid</span>
      <h2 data-th="hy.ch">Las dos cosas<em>en una sola.</em></h2>
      <p class="d" data-t="hy.cd">Todo lo de Framework más el editor dentro del juego. Pago único, licencia perpetua y cero regalías.</p>
      <div class="cta-links">
        <a class="btn gold" href="precios.html"><span data-t="hy.cbuy">Comprar Hybrid</span> <b class="px" data-price="hybrid"></b></a>
        <a class="btn paper" href="precios.html" data-t="hy.ccmp">Comparar las tres</a>
      </div>
    </div>
    <div class="facts" style="margin:0">
      <div><span data-t="hy.f1">Editor</span><b data-t="hy.f1b">En la ventana</b><small data-t="hy.f1d">Solo en DEBUG. RELEASE queda limpio.</small></div>
      <div><span data-t="hy.f2">Backends</span><b>4</b><small data-t="hy.f2d">MonoGame · KNI · FNA · Yotsuba</small></div>
      <div><span data-t="hy.f3">Regalías</span><b>0 %</b><small data-t="hy.f3d">Publica y vende sin compartir ingresos.</small></div>
    </div>
  </div>
</section>
'''

escribir('hybrid.html',
         titulo=u'Yotsuba Hybrid — el editor vive dentro de la ventana de tu juego',
         desc=u'Framework y editor visual en uno. En DEBUG el editor aparece dentro de la ventana del juego; en RELEASE desaparece del binario. Cuatro backends: MonoGame, KNI, FNA y Yotsuba.',
         pigmento='hy', cuerpo=CUERPO, activa='hybrid.html')
