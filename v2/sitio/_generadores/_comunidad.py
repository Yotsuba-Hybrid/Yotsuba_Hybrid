# -*- coding: utf-8 -*-
import io
exec(io.open('_generador.py', encoding='utf-8').read())

CUERPO = u'''
<!-- ============================================================= PORTADILLA -->
<header class="act-open" data-torn="bottom">
  <img class="act-plate" src="../assets/enuma.webp" alt="" style="--plate-pos:50% 78%" fetchpriority="high">
  <span class="act-tint" aria-hidden="true"></span>
  <span class="act-shade" aria-hidden="true"></span>
  <div class="wrap act-open-in">
    <span class="act-num" aria-hidden="true">✛</span>
    <div>
      <p class="act-for" data-t="co.for">Código abierto · desarrollo en público</p>
      <h2 class="act-title"><b data-t="co.actB">COMUNIDAD</b><span class="brush">Yotsuba</span></h2>
    </div>
    <img class="act-logo" src="../assets/hybrid-logo.webp" alt="" loading="lazy">
  </div>
  <span class="act-folio">PLIEGO V</span>
</header>

<!-- ============================================================= COMUNIDAD -->
<section class="cta">
  <div class="wrap cta-in">
    <div>
      <span class="eyebrow" style="color:var(--p2)" data-t="co.eyebrow">Yotsuba Open Source</span>
      <h2 data-th="co.h">Construyamos<em>Yotsuba juntos.</em></h2>
      <p class="d" data-t="co.d">El proyecto está en desarrollo y el camino está abierto. Ayúdanos a afinar el editor, los backends y la documentación que conecta a toda la familia.</p>
      <ul class="co-points">
        <li><svg aria-hidden="true"><use href="#i-leaf"/></svg><span data-t="co.f1">Inspecciona y mejora el editor, el ECS y el flujo de compilación.</span></li>
        <li><svg aria-hidden="true"><use href="#i-leaf"/></svg><span data-t="co.f2">Explora el código, reporta problemas y comparte ideas en GitHub.</span></li>
        <li><svg aria-hidden="true"><use href="#i-leaf"/></svg><span data-t="co.f3">Conecta con creadores y desarrolladores que hacen juegos en C#.</span></li>
        <li><svg aria-hidden="true"><use href="#i-leaf"/></svg><span data-t="co.f4">Propón cambios para el código, la web y la documentación.</span></li>
      </ul>
      <div class="cta-links">
        <a class="btn gold" href="https://github.com/sponsors/Yotsuba-Hybrid" target="_blank" rel="noopener"><svg aria-hidden="true"><use href="#i-heart"/></svg><span data-t="co.sup">Apoyar el proyecto</span></a>
        <a class="btn paper" href="https://github.com/Yotsuba-Hybrid" target="_blank" rel="noopener"><svg aria-hidden="true"><use href="#i-github"/></svg><span data-t="co.gh">Ver GitHub</span></a>
        <a class="co-docs" href="../../yotsuba-framework-site/docs.html" data-t="co.docs">Leer la documentación</a>
      </div>
      <div class="contacto">
        <span class="ct-k" data-t="co.ctk">Escríbenos directamente</span>
        <a class="ct-mail" href="mailto:yotsubahybrid.official@outlook.com">
          <svg aria-hidden="true"><use href="#i-mail"/></svg>yotsubahybrid.official@outlook.com
        </a>
        <span class="ct-by"><b>Yotsuba Studios</b> · Memphis Yomael Núñez Cruz, <span data-t="co.ceo">CEO</span></span>
      </div>
      <div class="cta-links">
        <div class="socials">
          <a class="social" href="https://discord.gg/35M8e8fE3Q" target="_blank" rel="noopener" aria-label="Discord"><svg aria-hidden="true"><use href="#i-discord"/></svg></a>
          <a class="social" href="https://www.youtube.com/@YTBHybrid" target="_blank" rel="noopener" aria-label="YouTube"><svg aria-hidden="true"><use href="#i-youtube"/></svg></a>
          <a class="social" href="https://www.instagram.com/yotsubahybrid.official/" target="_blank" rel="noopener" aria-label="Instagram"><svg aria-hidden="true"><use href="#i-insta"/></svg></a>
          <a class="social" href="mailto:yotsubahybrid.official@outlook.com" aria-label="Email"><svg aria-hidden="true"><use href="#i-mail"/></svg></a>
        </div>
      </div>
    </div>

    <form class="form" id="notifyForm" novalidate>
      <h3 data-t="fo.title">Avísame del lanzamiento</h3>
      <p data-t="fo.desc">Te escribimos cuando abra la venta y cuando salga cada versión. Sin spam.</p>
      <label for="fName" data-t="fo.name">Nombre</label>
      <input id="fName" name="nombre" type="text" autocomplete="name" required data-ta="placeholder:fo.nameP" placeholder="Tu nombre">
      <label for="fMail" data-t="fo.email">Correo</label>
      <input id="fMail" name="correo" type="email" autocomplete="email" required data-ta="placeholder:fo.emailP" placeholder="tu@correo.com">
      <label for="fTel"><span data-t="fo.phone">Celular</span> <small data-t="fo.opt">(opcional)</small></label>
      <input id="fTel" name="celular" type="tel" inputmode="numeric" autocomplete="tel" placeholder="8091234567">
      <fieldset class="want">
        <legend data-t="fo.want">Me interesa</legend>
        <label><input type="checkbox" value="YotsubaFramework" checked><span>Framework</span></label>
        <label><input type="checkbox" value="YotsubaHybrid"><span>Hybrid</span></label>
        <label><input type="checkbox" value="YotsubaEngine"><span>Engine</span></label>
      </fieldset>
      <!-- Campo trampa: nadie lo ve ni lo rellena; un robot sí. La API lo entiende
           y en ese caso responde «correcto» sin crear nada. -->
      <input class="trampa" id="fWeb" type="text" name="website" tabindex="-1" autocomplete="off" aria-hidden="true">
      <button class="btn cape" type="submit" id="fSubmit" data-t="fo.submit">Avísame</button>
      <div class="msg" id="fMsg" role="status" aria-live="polite"></div>
    </form>
  </div>
</section>

<!-- =============================================================== METRAJE -->
<section class="sec">
  <div class="wrap">
    <header class="sec-head sm">
      <span class="folio">01<i data-t="co.mf">en marcha</i></span>
      <h2 class="h" data-t="co.mh">Esto no es una maqueta.</h2>
      <p class="sub" data-t="co.ms">Grabación real del editor de Yotsuba Hybrid corriendo dentro de la ventana del juego.</p>
    </header>
    <figure class="frame" style="--c:var(--p)">
      <div class="bar"><span>my-game.exe — debug</span><em>DEBUG</em></div>
      <video controls muted loop playsinline preload="none" poster="../assets/video/editor-poster.webp" data-autoplay data-ta="aria-label:co.filmA" aria-label="Grabación del editor de Yotsuba en funcionamiento"><source src="../assets/video/editor.mp4" type="video/mp4"></video>
      <figcaption data-t="co.filmC">El editor aparece en DEBUG y desaparece del binario al compilar en RELEASE.</figcaption>
    </figure>
  </div>
</section>
'''

escribir('comunidad.html',
         titulo=u'Comunidad — Yotsuba',
         desc=u'Sigue el desarrollo de Yotsuba, reporta problemas y propón ideas en GitHub. Deja tu correo y te avisamos del lanzamiento.',
         pigmento='en', cuerpo=CUERPO, activa='comunidad.html')
