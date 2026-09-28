/* Capability notes: un artículo a la vez, enrutado por hash (#compute, #metal…) */
(function () {
  'use strict';
  var arts = [].slice.call(document.querySelectorAll('.art'));
  var chips = [].slice.call(document.querySelectorAll('#chapters a'));
  var names = { 'compute': 'Compute Shaders', 'shader-languages': 'Shader Languages', 'mgfx': 'MGCB and MGFX support', 'directx12': 'DirectX 12 on Windows', 'metal': 'Metal on Apple', 'android-vulkan': 'Vulkan on Android', 'webgpu': 'WebGPU on the Web', 'animated-models': 'Animated 3D Models' };
  var first = true;
  function show() {
    var slug = decodeURIComponent(location.hash.slice(1));
    if (!names[slug]) slug = 'compute';
    arts.forEach(function (a) { a.hidden = a.dataset.slug !== slug; });
    chips.forEach(function (c) { var on = c.dataset.slug === slug; c.classList.toggle('on', on); if (on) c.setAttribute('aria-current', 'page'); else c.removeAttribute('aria-current'); });
    document.title = names[slug] + ' — Yotsuba Framework';
    var on = document.querySelector('#chapters a.on');
    if (on && on.scrollIntoView) on.scrollIntoView({ block: 'nearest', inline: 'center' });
    if (!first) window.scrollTo({ top: 0, behavior: 'smooth' });
    first = false;
  }
  window.addEventListener('hashchange', show);
  show();
})();
