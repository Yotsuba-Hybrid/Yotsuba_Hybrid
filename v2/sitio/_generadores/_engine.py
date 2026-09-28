# -*- coding: utf-8 -*-
import io
exec(io.open('_generador.py', encoding='utf-8').read())

ENTS = u'''<svg class="ents" viewBox="0 0 1333 2000" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><g><rect x="265" y="360" width="840" height="850"/><text x="275" y="394">Angel · SpriteComponent2D</text></g><g><rect x="235" y="1440" width="320" height="390"/><text x="245" y="1474">Hero_L · Sprite · Script</text></g><g><rect x="760" y="1440" width="350" height="410"/><text x="770" y="1474">Hero_R · Sprite · Script</text></g><g><rect x="650" y="1630" width="240" height="300"/><text x="660" y="1664">Tiger · Sprite · Animation</text></g><g><rect x="1015" y="700" width="265" height="500"/><text x="1025" y="734">Maw · Sprite · Collider</text></g><g><rect x="1120" y="1290" width="210" height="560"/><text x="1130" y="1324">Palm · Sprite</text></g><g><rect x="545" y="0" width="570" height="330"/><text x="555" y="34">Storm · Light2D · VFX</text></g><g class="gz" transform="translate(685 780)"><path d="M0 0H190"/><path d="M0 0V-190"/><path d="M170 -18L196 0L170 18Z"/><path d="M-18 -170L0 -196L18 -170Z"/><circle r="12"/></g></svg>'''

CUERPO = u'''
<!-- ================================================================ HÉROE -->
<section class="hero">
  <div class="plate" id="plate" style="--art-pos:50% 30%">
    <div class="plate-in" data-torn="left bottom">
      <div class="art-box"><img src="../assets/engine-enuma.webp" alt="Ilustración neón de Yotsuba Engine" data-ta="alt:en.art" width="1024" height="1536" fetchpriority="high"></div>
    </div>
    <span class="plate-tag" data-t="plate.en">ENUMA ELISH · VARIANTE NEÓN</span>
  </div>


  <div class="hero-copy">
    <span class="status" data-t="en.status">Acceso anticipado · en desarrollo</span>
    <span class="kick brush" data-t="en.kick">el motor de juegos en C#</span>
    <h1 class="title" aria-label="Tu motor es tuyo"
        style="--fill-img:url('../assets/engine-enuma.webp') no-repeat -200px -980px / 1500px auto;
               --fill-grad:linear-gradient(110deg,#2683DE 0%,#9447E5 48%,#F350A5 100%)">
      <span class="l" data-t="en.h1a" aria-hidden="true">Tu motor</span>
      <span class="l fill" data-t="en.h1b" aria-hidden="true">es tuyo.</span>
    </h1>
    <p class="lede" data-th="en.lede">Abre el editor. Pulsa <b>Play</b>. Exporta a escritorio y móvil. El guion sigue siendo <b>C# de verdad</b>, abierto en tu IDE, con tu depurador y tus paquetes de NuGet.</p>
    <div class="hero-cta">
      <a class="btn" href="#recorrido"><span data-t="en.cta1">Ver el recorrido</span><svg aria-hidden="true"><use href="#i-down"/></svg></a>
      <a class="btn paper" href="precios.html" data-t="en.cta2">Ver precio</a>
    </div>
    <ul class="stamps">
      <li data-t="en.s1">2D + 3D</li>
      <li data-t="en.s2">C# / .NET puro</li>
      <li data-t="en.s3">Sin regalías</li>
    </ul>
  </div>
</section>

<!-- ============================================================== ENTRADA -->
<div class="wrap">
  <div class="act-lead">
    <p class="act-claim" data-th="en.claim">Un motor de escritorio completo con escena, jerarquía, inspector y exportación en un clic — donde <b>el proyecto sigue siendo .NET normal</b> que puedes abrir en cualquier IDE.</p>
    <dl class="spec">
      <div><dt data-t="en.r1">Tu IDE, tu depurador</dt><dd data-t="en.r1d">Los guiones son clases de C#. Visual Studio, Rider o VS Code, y cualquier paquete de NuGet.</dd></div>
      <div><dt data-t="en.r2">Los dos mundos</dt><dd data-t="en.r2d">Sprites, tilemaps, animación glTF, materiales PBR, partículas y física, en 2D y en 3D.</dd></div>
      <div><dt data-t="en.r3">Proyecto legible</dt><dd data-t="en.r3d">Código .NET normal más archivos .ytb, que son JSON que puedes abrir y leer.</dd></div>
      <div><dt data-t="en.r4">No es un callejón</dt><dd data-t="en.r4d">Mismo motor que Hybrid y Framework. Baja de capa cuando el proyecto lo pida.</dd></div>
    </dl>
  </div>
</div>

<!-- ============================================= PLIEGO III · EL RECORRIDO -->
<header class="act-open" data-torn="top bottom">
  <img class="act-plate" src="../assets/enuma.webp" alt="" loading="lazy" style="--plate-pos:50% 53%">
  <span class="act-tint" aria-hidden="true"></span>
  <span class="act-shade" aria-hidden="true"></span>
  <div class="wrap act-open-in">
    <span class="act-num" aria-hidden="true">III</span>
    <div>
      <p class="act-for" data-t="en.for">De la escena al juego exportado</p>
      <h2 class="act-title"><b data-t="en.actB">EL RECORRIDO</b><span class="brush">Engine</span></h2>
    </div>
    <img class="act-logo" src="../assets/engine-logo-neon.webp" alt="" loading="lazy">
  </div>
  <span class="act-folio">PLIEGO III</span>
</header>

<!-- =========================================================== EL RECORRIDO -->
<section class="story" id="recorrido">
  <div class="wrap story-in">
    <div class="story-stage" id="stage" data-step="0">
      <div class="sheet" data-torn="top bottom">
        <div class="art-box"><img src="../assets/engine-enuma.webp" alt="" loading="lazy"></div>
        <div class="ov ov1">__ENTS__</div>
        <canvas id="rain" class="ov ov3" aria-hidden="true"></canvas>
        <div class="ov flash ov3" aria-hidden="true"></div>
        <pre class="ov ov2"><code>[<u>Entity</u>("Angel")]
<i>public class</i> Descend : BaseScript
{
    <i>public override void</i> Update(GameTime t)
    {
        Transform.Position.Y += 40f * t.Delta;
    }
}</code></pre>
        <ul class="ov ov4"><li>Windows<small>DX12</small></li><li>Linux<small>Vulkan</small></li><li>macOS<small>Metal</small></li><li>Android<small>Vulkan</small></li><li class="ex">iOS<small data-t="en.exp">experimental</small></li><li class="ex">Web<small data-t="en.pre">vista previa</small></li></ul>
        <span class="mode" id="modeTag">EDIT</span>
      </div>
    </div>
    <div class="steps-flow">
      <article class="step" data-s="1"><span class="num">01</span><h3 data-t="en.st1">Componer</h3><p data-t="en.st1d">Cada elemento pintado de la escena es una entidad con componentes. Selecciona uno y el Inspector muestra exactamente qué lo hace funcionar.</p></article>
      <article class="step" data-s="2"><span class="num">02</span><h3 data-t="en.st2">Programar</h3><p data-t="en.st2d">El comportamiento es C#. Añade un script, ábrelo en tu IDE y usa el depurador que ya conoces.</p><p class="fine" data-t="en.st2f">Fragmento ilustrativo.</p></article>
      <article class="step" data-s="3"><span class="num">03</span><h3 data-t="en.st3">Jugar</h3><p data-t="en.st3d">Un botón ejecuta la escena. Al detenerla, vuelve exactamente al estado de edición que dejaste.</p></article>
      <article class="step" data-s="4"><span class="num">04</span><h3 data-t="en.st4">Exportar</h3><p data-t="en.st4d">Exporta a las plataformas que te interesen. Algunas están listas y otras son experimentales: etiquetamos todas.</p></article>
    </div>
  </div>
</section>

<!-- ========================================================== EN LA CAJA -->
<section class="sec">
  <div class="wrap">
    <header class="sec-head sm">
      <span class="folio">02<i data-t="en.boxF">en la caja</i></span>
      <h2 class="h" data-t="en.boxH">Todo esto ya está construido.</h2>
      <p class="sub" data-t="en.boxS">Proyecto en etapa temprana: la API todavía puede cambiar. Todo lo de abajo existe en la base de código sobre la que se construye el Engine.</p>
    </header>
    <div class="facts">
      <div><span>2D</span><b data-t="en.b2">Sprites y tilemaps</b><small data-t="en.b2d">Transformadas, cámara con zoom, orden por profundidad, descarte fuera de pantalla, animación, fuentes, texto, botones, Tiled (TMX), TexturePacker y física 2D con dibujo de depuración.</small></div>
      <div><span>3D</span><b data-t="en.b3">glTF y PBR</b><small data-t="en.b3d">Cámaras, primitivas, sprites 2.5D, modelos glTF con animación esquelética, materiales PBR, shaders propios, física 3D con fase amplia espacial, partículas, VFX y consultas de oclusión por hardware.</small></div>
      <div><span data-t="en.bwF">Flujo</span><b data-t="en.bw">ECS y editor</b><small data-t="en.bwd">Escenas, entidades, componentes y sistemas; editor con consola, historial, selector de color y editor de modelos 3D; guiones propios; teclado, ratón, mando, táctil y gestos; audio con canales de efectos y música.</small></div>
    </div>
  </div>
</section>

<!-- =============================================================== PRECIO -->
<section class="cta" data-torn="top">
  <div class="wrap cta-in">
    <div>
      <span class="eyebrow" style="color:var(--p2)" data-t="en.cpre">Yotsuba Engine</span>
      <h2 data-th="en.ch">Un motor<em>que sí es tuyo.</em></h2>
      <p class="d" data-t="en.cd">Pago único, licencia perpetua y cero regalías. Nadie te manda una factura el día que a tu juego le va bien.</p>
      <div class="cta-links">
        <a class="btn gold" href="precios.html"><span data-t="en.cbuy">Comprar Engine</span> <b class="px" data-price="engine"></b></a>
        <a class="btn paper" href="precios.html" data-t="en.ccmp">Comparar las tres</a>
      </div>
    </div>
    <div class="facts" style="margin:0">
      <div><span data-t="en.f1">Guiones</span><b>C# / .NET</b><small data-t="en.f1d">Clases normales, abiertas en tu propio IDE.</small></div>
      <div><span data-t="en.f2">Proyecto</span><b>.ytb + .cs</b><small data-t="en.f2d">JSON legible más código .NET. Sin formatos cerrados.</small></div>
      <div><span data-t="en.f3">Regalías</span><b>0 %</b><small data-t="en.f3d">Publica y vende sin compartir ingresos.</small></div>
    </div>
  </div>
</section>
'''.replace(u'__ENTS__', ENTS)

escribir('engine.html',
         titulo=u'Yotsuba Engine — el motor de juegos en C# que sí es tuyo',
         desc=u'Motor de escritorio con escena, jerarquía, inspector y exportación en un clic. Los guiones son C# de verdad, abiertos en tu IDE. 2D y 3D, pago único y sin regalías.',
         pigmento='en', cuerpo=CUERPO, activa='engine.html')
