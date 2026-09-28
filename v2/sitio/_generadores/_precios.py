# -*- coding: utf-8 -*-
import io
exec(io.open('_generador.py', encoding='utf-8').read())

CUERPO = u'''
<!-- ============================================================= PORTADILLA -->
<header class="act-open" data-torn="bottom">
  <img class="act-plate" src="../assets/enuma.webp" alt="" style="--plate-pos:50% 62%" fetchpriority="high">
  <span class="act-tint" aria-hidden="true"></span>
  <span class="act-shade" aria-hidden="true"></span>
  <div class="wrap act-open-in">
    <span class="act-num" aria-hidden="true">$</span>
    <div>
      <p class="act-for" data-t="pr.for">Pago único · licencia perpetua · 0 % de regalías</p>
      <h2 class="act-title"><b data-t="pr.actB">PRECIOS</b><span class="brush">Yotsuba</span></h2>
    </div>
    <img class="act-logo" src="../assets/hybrid-logo.webp" alt="" loading="lazy">
  </div>
  <span class="act-folio">PLIEGO IV</span>
</header>

<!-- ============================================================== TARJETAS -->
<section class="sec price" data-torn="bottom">
  <div class="wrap">
    <header class="sec-head">
      <span class="folio">01<i data-t="pr.folio">precio</i></span>
      <h2 class="h" data-th="pr.h">Lo pagas una vez.<br><em>Es tuyo para siempre.</em></h2>
      <p class="sub" data-t="pr.sub">Sin regalías sobre lo que vendas. Sin cuota por puesto. Sin una factura que llega el día que a tu juego le va bien.</p>
    </header>

    <div class="tickets" id="tickets"></div>
    <div class="bundle" id="bundle"></div>

    <div class="note" style="max-width:56ch">
      <span data-t="pr.nk">Lo que no vas a pagar</span>
      <strong data-t="pr.n">Ni un porcentaje de lo que vendas, ni una cuota por cada persona del equipo, ni una tarifa por instalación, ni una pantalla de marca delante de la tuya.</strong>
    </div>

    <p class="fine" style="margin-top:34px" data-t="pr.fine">Precios en dólares estadounidenses, impuestos no incluidos. El proyecto está en desarrollo: al comprar entras en el acceso anticipado y recibes cada versión nueva de la línea que adquiriste.</p>
  </div>
</section>

<!-- =========================================================== COMPARATIVA -->
<section class="sec">
  <div class="wrap">
    <header class="sec-head sm">
      <span class="folio">02<i data-t="cmp.folio">lado a lado</i></span>
      <h2 class="h" data-t="cmp.h">Las tres, lado a lado.</h2>
      <p class="sub" data-t="cmp.sub">Lo que cambia entre ellas es el editor y cuánto te acerca al metal. El motor de abajo es el mismo.</p>
    </header>
    <div id="compara"></div>
  </div>
</section>

<!-- ================================================================= DUDAS -->
<section class="sec alt">
  <div class="wrap">
    <header class="sec-head sm">
      <span class="folio">03<i data-t="fq.folio">dudas</i></span>
      <h2 class="h" data-t="fq.h">Lo que todo el mundo pregunta primero.</h2>
      <p class="sub" data-t="fq.sub">Si falta la tuya, escríbenos y la añadimos.</p>
    </header>
    <div id="dudas"></div>
  </div>
</section>

<!-- =============================================================== CIERRE -->
<section class="cta" data-torn="top" data-p="hy">
  <div class="wrap cta-in">
    <div>
      <span class="eyebrow" style="color:var(--p2)" data-t="pr.ce">Todavía no está a la venta</span>
      <h2 data-th="pr.ch">Te avisamos<em>el primer día.</em></h2>
      <p class="d" data-t="pr.cd">Deja tu correo y te escribimos cuando abra la venta, con el precio definitivo y sin sorpresas.</p>
      <div class="cta-links">
        <a class="btn gold" href="comunidad.html"><svg aria-hidden="true"><use href="#i-heart"/></svg><span data-t="pr.ccta">Avísame del lanzamiento</span></a>
      </div>
    </div>
    <div class="facts" style="margin:0">
      <div><span data-t="pr.g1">Licencia</span><b data-t="pr.g1b">Perpetua</b><small data-t="pr.g1d">La versión que compras es tuya aunque dejes de actualizar.</small></div>
      <div><span data-t="pr.g2">Uso comercial</span><b data-t="pr.g2b">Desde el día uno</b><small data-t="pr.g2d">Sin límite de facturación ni de tamaño de estudio.</small></div>
      <div><span data-t="pr.g3">Pantalla de marca</span><b data-t="pr.g3b">La tuya</b><small data-t="pr.g3d">No metemos la nuestra delante de tu splash.</small></div>
    </div>
  </div>
</section>
'''

escribir('precios.html',
         titulo=u'Precios — Yotsuba Framework, Hybrid y Engine',
         desc=u'Pago único por herramienta, licencia perpetua y cero regalías. Framework, Hybrid y Engine, con el pack de los tres. Comparativa y dudas frecuentes.',
         pigmento=None, cuerpo=CUERPO, activa='precios.html')
