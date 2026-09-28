# -*- coding: utf-8 -*-
import io
exec(io.open('_generador.py', encoding='utf-8').read())

CUERPO = u'''
<!-- ================================================================ HÉROE -->
<section class="hero">
  <div class="plate wide" id="plate" style="--art-pos:50% 34%">
    <div class="plate-in" data-torn="left bottom">
      <div class="art-box"><img src="../assets/enuma.webp" alt="Ilustración de Yotsuba: una figura alada desciende sobre un mar de tormenta mientras dos viajeros con capa y un tigre blanco miran desde la orilla" data-ta="alt:hero.art" width="2000" height="3000" fetchpriority="high"></div>
    </div>
    <span class="plate-tag" data-t="plate.index">ENUMA ELISH · PINTADO EN KRITA</span>
  </div>


  <div class="hero-copy">
    <span class="status" data-t="hero.status">En desarrollo · Próximamente</span>
    <span class="kick brush" data-t="hero.kick">Game Development Platform</span>
    <h1 class="title" aria-label="3 enfoques. 1 ecosistema."
        style="--fill-img:url('../assets/enuma.webp') no-repeat -260px -1080px / 1500px auto;
               --fill-grad:linear-gradient(96deg,#2456ff 0%,#f2467f 44%,#9447E5 72%,#39CAEC 100%)">
      <span class="l" data-t="hero.h1a" aria-hidden="true">3 enfoques.</span>
      <span class="l fill" data-t="hero.h1b" aria-hidden="true">1 ecosistema.</span>
    </h1>
    <p class="lede" data-th="hero.lede">La única <b>plataforma de desarrollo de videojuegos</b> que integra tres enfoques en un mismo ecosistema: <b>Game Framework</b>, <b>Game Engine</b> y una solución <b>híbrida</b> entre ambos. Basada en XNA y diseñada para videojuegos <b>Next-Gen</b>.</p>
    <p class="lede-2" data-th="hero.lede2">Soporte para tecnologías gráficas modernas — <b>DirectX 12</b>, <b>Vulkan</b>, <b>Metal</b> y <b>WebGPU</b> — además de <b>Compute Shaders</b> y compatibilidad con <b>7 lenguajes de shaders</b>, para darte el máximo control, rendimiento y flexibilidad multiplataforma.</p>
    <div class="hero-cta">
      <a class="btn" data-demo href="#" data-t="hero.demo">Pruébalo en el navegador</a>
      <a class="btn paper" href="#productos"><span data-t="hero.cta2">Ver los tres enfoques</span><svg aria-hidden="true"><use href="#i-down"/></svg></a>
    </div>
    <ul class="stamps">
      <li data-t="hero.s1">C# / .NET</li>
      <li data-t="hero.s2">2D + 3D</li>
      <li data-t="hero.s3">Pago único</li>
      <li data-t="hero.s4">0 % de regalías</li>
    </ul>
  </div>
</section>

<!-- =========================================================== PRODUCTOS -->
<section class="leaves" id="productos" data-torn="top bottom">
  <div class="wrap">
    <div class="leaves-head">
      <span class="eyebrow" data-t="prod.eyebrow">Un motor por dentro, tres maneras de usarlo</span>
      <h2 class="h" data-th="prod.h">Elige por dónde <em>entras.</em></h2>
    </div>
    <div class="leaves-grid">
      <div class="leaves-sticky">
        <div class="marks" id="marks" data-on="1" aria-hidden="true">
          <img src="../assets/framework-logo.webp" alt="">
          <img src="../assets/hybrid-logo.webp" alt="">
          <img src="../assets/engine-logo-neon.webp" alt="">
        </div>
        <ol class="leaf-nav" id="leafNav"></ol>
      </div>
      <div class="leaves-flow" id="prodFlow"></div>
    </div>
  </div>
</section>

<!-- ============================================================ PAPELETA -->
<section class="sec" id="elige">
  <div class="wrap">
    <header class="sec-head sm">
      <span class="folio">01<i data-t="pick.folio">cuál es la tuya</i></span>
      <h2 class="h" data-t="pick.h">¿Cómo te gusta trabajar?</h2>
      <p class="sub" data-t="pick.sub">Responde una sola cosa. Te decimos por dónde empezar — y ninguna respuesta te deja encerrado.</p>
    </header>
    <div class="pick-box">
      <div class="opts" role="radiogroup" data-ta="aria-label:pick.aria" aria-label="¿Cómo te gusta trabajar?">
        <button role="radio" aria-checked="false" data-k="fw"><b data-t="pick.o1">Escribo todo en código</b><small data-t="pick.o1d">Quiero una biblioteca y mi IDE. Nada más.</small></button>
        <button role="radio" aria-checked="false" data-k="hy"><b data-t="pick.o2">Quiero tocar mientras corre</b><small data-t="pick.o2d">Ajustar valores con el juego en marcha, sin salir de la ventana.</small></button>
        <button role="radio" aria-checked="false" data-k="en"><b data-t="pick.o3">Quiero abrir el editor y dar Play</b><small data-t="pick.o3d">Escena, jerarquía, inspector, exportar. Lo clásico.</small></button>
      </div>
      <div class="pick-out" id="pickOut" data-p="fw" aria-live="polite"></div>
    </div>
  </div>
</section>

<!-- ============================================================= PRECIOS -->
<section class="sec alt" id="precio">
  <div class="wrap">
    <header class="sec-head sm">
      <span class="folio">02<i data-t="pr.folio">precio</i></span>
      <h2 class="h" data-t="pr.hi">Lo pagas una vez y es tuyo.</h2>
      <p class="sub" data-t="pr.subi">Sin regalías sobre lo que vendas, sin cuota por puesto y sin una factura que llega el día que a tu juego le va bien.</p>
    </header>
    <div class="facts" id="priceBar"></div>
    <div class="hero-cta">
      <a class="btn" href="precios.html" data-t="pr.ver">Ver precios y comparativa</a>
    </div>
  </div>
</section>

<!-- =========================================================== COMUNIDAD -->
<section class="cta" data-torn="top" data-p="hy">
  <div class="wrap cta-in">
    <div>
      <span class="eyebrow" style="color:var(--p2)" data-t="co.eyebrow">Comunidad Yotsuba</span>
      <h2 data-th="co.hi">Constrúyelo<em>con nosotros.</em></h2>
      <p class="d" data-t="co.di">El proyecto está en desarrollo y el camino está abierto. Deja tu correo y te avisamos cuando abra la venta y cuando salga cada versión.</p>
      <div class="cta-links">
        <a class="btn gold" href="comunidad.html"><svg aria-hidden="true"><use href="#i-heart"/></svg><span data-t="co.cta">Avísame del lanzamiento</span></a>
        <a class="btn paper" href="https://github.com/Yotsuba-Hybrid" target="_blank" rel="noopener"><svg aria-hidden="true"><use href="#i-github"/></svg><span data-t="co.gh">Ver GitHub</span></a>
      </div>
    </div>
    <figure class="frame" style="--c:var(--p2);margin:0">
      <div class="bar"><span data-t="co.film">Editor de Yotsuba Hybrid</span><em>DEBUG</em></div>
      <video controls muted loop playsinline preload="none" poster="../assets/video/editor-poster.webp" data-autoplay data-ta="aria-label:co.filmA" aria-label="Grabación del editor de Yotsuba en funcionamiento"><source src="../assets/video/editor.mp4" type="video/mp4"></video>
      <figcaption data-t="co.filmC">Grabación real, no una maqueta.</figcaption>
    </figure>
  </div>
</section>
'''

escribir('index.html',
         titulo=u'Yotsuba — la plataforma de desarrollo de videojuegos con tres enfoques',
         desc=u'La única plataforma que integra Game Framework, Game Engine y una solución híbrida en un mismo ecosistema. Basada en XNA, con DirectX 12, Vulkan, Metal, WebGPU, Compute Shaders y 7 lenguajes de shaders.',
         pigmento=None, cuerpo=CUERPO, activa='index.html')
