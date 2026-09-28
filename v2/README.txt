YOTSUBA — rediseño v2 (las webs originales no se han tocado)

  sitio/                 ★★ SITIO DEFINITIVO (ES/EN) — seis páginas: portada con los tres
                         productos unificados, una página por producto, precios y comunidad.
                         El navbar solo lleva a otras páginas. Ver sitio/LEEME.md.
                         PENDIENTE: la URL de la demo WebGPU y los precios definitivos.

  yotsuba/index.html     Intento anterior de página única. Descartado: el usuario marcó qué
                         partes le gustaban y el sitio definitivo las recoge. Se conserva.

  hybrid/index.html      Yotsuba Hybrid   (ES/EN, mismo formulario y tabla de Supabase que el original)
  framework/index.html   Yotsuba Framework (EN, con WebGPU) — hermana de Hybrid: papel, tinta y cobalto
  engine/index.html      Yotsuba Engine (NUEVO, EN): tercera hermana, paleta neón del logo (cian→violeta→rosa, degradado firma); hero con Enuma Elish y lente EDIT. Editor interactivo (boceto).
                         Ver engine/ESTRATEGIA.md (apuesta comercial + cambios de UI).
  framework/capability.html  Artículos de capacidades (8) en el estilo hermano, enrutados por #hash.
  assets/                Recursos optimizados (WebP). assets/video/ incluye MP4 H.264 listos para web y sus posters; los MOV originales se conservan como fuente.
  _descartado-framework-oscuro/   Primera versión de Framework (oscura, con shader de fondo). Guardada por si acaso.

Cómo verlas (recomendado, para que la prueba de WebGPU funcione):
  cd Landing && python3 -m http.server 8000
  http://localhost:8000/v2/hybrid/index.html
  http://localhost:8000/v2/framework/index.html

Con doble clic (file://) ambas webs se ven completas; solo la prueba de WebGPU de Framework exige
https:// o localhost.

Ideas que sostienen cada web
  Hybrid     Cuaderno de acuarela con una capa de debug. Lente DEBUG en el hero, editor de prueba
             (DEBUG/RELEASE, 4 backends, C# generado) y las cuatro hojas = los cuatro pilares.
  Framework  El mismo cuaderno en cobalto y cian. Enuma Elish como lámina con un lente COMPUTE,
             una prueba real de compute WebGPU (1/4/8 M de elementos, verificada contra la CPU),
             capacidades con el trébol azul girando, ruteador de APIs y siete lenguajes de shader.

Pendiente de decidir por el equipo
  - WebGPU aparece con etiqueta ROADMAP (backend 04 y capacidad 07). Si ya está en producción,
    quitar la etiqueta y la nota "Roadmap" de la sección Graphics APIs.
  - Las páginas secundarias (docs, capabilities, capability-detail, apple) NO se rehicieron: los
    enlaces "Docs" y "Read the article" apuntan a las páginas originales en yotsuba-framework-site/.
  - Los nombres de API mostrados en el editor de Hybrid (SpriteComponent2D, etc.) son ilustrativos.
