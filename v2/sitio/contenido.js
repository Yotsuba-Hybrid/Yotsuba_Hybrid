/* ==========================================================================
   YOTSUBA — contenido editable
   ---------------------------------------------------------------------------
   Aquí vive todo lo que se cambia sin tocar la maquetación:
     · PRECIOS       los cuatro números (marcados como borrador)
     · DEMO_WEBGPU   la URL de la demo en el navegador
     · EN            la traducción al inglés. El español vive en el HTML y se
                     captura solo, así que no se pueden desincronizar.
     · DATA          productos, capacidades, plataformas, comparativa y dudas.
   ========================================================================== */
window.YOTSUBA = (function () {

  /* ------------------------------------------------------------------ PRECIO
     ⚠ BORRADOR: cambia estos cuatro números por los definitivos.
     Todo lo demás (tarjetas, barras, botones, pack) se recalcula solo. */
  var PRECIOS = {
    moneda: 'USD', simbolo: '$',
    framework: 39,
    engine:    69,
    hybrid:    99,
    pack:     149          /* los tres juntos */
  };

  /* -------------------------------------------------------------- CONTACTOS
     El formulario de «avísame del lanzamiento» escribe en la API de contactos.
     Ese endpoint es anónimo a propósito: no lleva clave, y autoriza por el dominio
     desde el que se llama. Por eso un SuperAdmin tiene que añadir el origen del
     sitio en Empresas → Claves de API → Formulario público; si no, responde 403.

     ⚠ PENDIENTE: pega el identificador de empresa (lo ves en ese mismo diálogo).
     Mientras esté vacío, el formulario avisa y no envía nada. */
  var CONTACTOS = {
    base:      'https://app-flexocable-prod-hcg7b7hpbnb0dmaj.westus2-01.azurewebsites.net',
    companyId: '930a4d93-8b19-4bac-85b5-a60adc74aa20'   /* GUID de la empresa, formato 8-4-4-4-12 */
  };

  /* ⚠ PENDIENTE: pega aquí la URL de la prueba WebGPU en el navegador.
     Mientras esté vacía, el botón «Pruébalo en el navegador» sale desactivado. */
  var DEMO_WEBGPU = '';

  var T = function (es, en) { return { es: es, en: en }; };

  /* ------------------------------------------------------------------- DATOS */
  var DATA = {

    productos: [
      { id: 'framework', p: 'fw', nombre: 'Framework', logo: '../assets/framework-logo.webp', url: 'framework.html',
        para:  T('solo código', 'code only'),
        claim: T('La biblioteca con forma de XNA, modernizada por dentro. Tú escribes cada línea.',
                 'The XNA-shaped library, modernised underneath. You write every line.'),
        quien: T('Para quien ya sabe lo que quiere y no necesita que nadie se lo dibuje.',
                 'For people who know what they want and need nobody to draw it for them.'),
        largo: T('Una reimplementación de XNA hecha desde cero con la arquitectura gráfica de hoy. Compute shaders reales, rutas nativas a Vulkan, Metal y DirectX 12, siete lenguajes de shader y compilación en tiempo de ejecución. Tus bibliotecas de MonoGame siguen funcionando sin recompilarlas.',
                 'An XNA reimplementation built from scratch on today’s graphics architecture. Real compute shaders, native paths to Vulkan, Metal and DirectX 12, seven shader languages and runtime compilation. Your MonoGame libraries keep working without a rebuild.'),
        bullets: [
          T('Compute shaders y siete lenguajes de shader', 'Compute shaders and seven shader languages'),
          T('Vulkan, Metal, DirectX 12 y WebGPU nativos', 'Native Vulkan, Metal, DirectX 12 and WebGPU'),
          T('Compatible con bibliotecas de MonoGame', 'Compatible with MonoGame libraries'),
          T('Pipeline MGCB / MGFX de siempre', 'The MGCB / MGFX pipeline you know')
        ] },

      { id: 'hybrid', p: 'hy', nombre: 'Hybrid', logo: '../assets/hybrid-logo.webp', url: 'hybrid.html', destacado: true,
        para:  T('código + editor', 'code + editor'),
        claim: T('Framework y editor en uno. El editor vive dentro de tu juego y se va al compilar.',
                 'Framework and editor in one. The editor lives inside your game and leaves at build time.'),
        quien: T('Para quien quiere tocar valores con el juego en marcha sin renunciar al control.',
                 'For people who want to tweak values with the game running, without giving up control.'),
        largo: T('En modo DEBUG abre un editor visual dentro de la misma ventana donde se renderiza tu juego, no en una app aparte. Al compilar en RELEASE las directivas se lo llevan entero: tu binario no carga con él. Corre sobre cuatro backends, así que todas las plataformas que soporte cualquiera de ellos quedan disponibles para tu proyecto.',
                 'In DEBUG it opens a visual editor inside the very window your game renders in, not in a separate app. Building in RELEASE strips it entirely: your binary does not carry it. It runs on four backends, so every platform any one of them supports becomes available to your project.'),
        bullets: [
          T('Todo lo de Framework, incluido', 'Everything in Framework, included'),
          T('Editor visual dentro de la ventana en DEBUG', 'Visual editor inside the window in DEBUG'),
          T('Cuatro backends: MonoGame, KNI, FNA y Yotsuba', 'Four backends: MonoGame, KNI, FNA and Yotsuba'),
          T('Lo que editas se compila a C#', 'What you edit compiles to C#')
        ] },

      { id: 'engine', p: 'en', nombre: 'Engine', logo: '../assets/engine-logo-neon.webp', url: 'engine.html',
        para:  T('app de editor', 'editor app'),
        claim: T('El motor completo: abrir proyecto, componer la escena, dar Play y exportar.',
                 'The full engine: open a project, compose the scene, press Play and export.'),
        quien: T('Para quien viene de Unity o Godot y quiere lo mismo, pero en C# y sin regalías.',
                 'For people coming from Unity or Godot who want the same, in C# and without royalties.'),
        largo: T('Un motor de escritorio con escena, jerarquía, inspector y exportación en un clic, donde el guion sigue siendo C# de verdad: lo abres en tu IDE, lo depuras con tu depurador y le metes cualquier paquete de NuGet. Un proyecto es código .NET normal más archivos .ytb legibles.',
                 'A desktop engine with scene, hierarchy, inspector and one-click export, where the script is still real C#: you open it in your IDE, debug it with your debugger and add any NuGet package. A project is ordinary .NET code plus readable .ytb files.'),
        bullets: [
          T('App de escritorio con escena, jerarquía e inspector', 'Desktop app with scene, hierarchy and inspector'),
          T('2D y 3D: tilemaps, glTF, PBR, física y partículas', '2D and 3D: tilemaps, glTF, PBR, physics and particles'),
          T('Compilar y exportar desde el editor', 'Build and export from the editor'),
          T('Guiones en C# abiertos en tu propio IDE', 'C# scripts open in your own IDE')
        ] }
    ],

    /* --- capacidades de Framework (páginas con pestañas) --- */
    capacidades: [
      { slug: 'compute', n: '01', tab: T('Compute','Compute'), img: '../assets/cap-compute.webp', w: 1400, h: 783,
        eyebrow: T('Capacidad / 01 · Carga de trabajo en GPU', 'Capability / 01 · GPU workloads'),
        t1: T('Compute', 'Compute'), t2: T('Shaders', 'Shaders'),
        intro: T('Lleva el trabajo paralelo a la GPU sin salir de la estructura de un framework con forma de XNA.',
                 'Push parallel work closer to the GPU without leaving the structure of an XNA-style framework.'),
        lead: T('Yotsuba Framework extiende el modelo de programación de XNA con capacidades de cómputo modernas.',
                'Yotsuba Framework extends the familiar XNA programming model with modern GPU compute capabilities.'),
        body: [ T('Los compute shaders permiten procesar grandes cantidades de datos en paralelo. Eso abre un camino práctico a efectos, sistemas de partículas, generación procedural, proceso de imagen, iluminación y cálculos de física.',
                  'Compute shaders make it possible to process large amounts of data in parallel. That opens a practical path for effects, particle systems, procedural generation, image processing, lighting and physics calculations.'),
                T('El despacho se declara con grupos de hilos, igual que en cualquier API moderna, y el framework se encarga de la traducción a la ruta gráfica de cada plataforma.',
                  'Dispatch is declared with thread groups, as in any modern API, and the framework handles the translation to each platform’s graphics path.') ],
        noteK: T('01 / Por qué importa', '01 / Why it matters'),
        note:  T('Ningún otro framework con linaje XNA ofrece cómputo en GPU de primera clase.',
                 'No other framework with XNA lineage offers first-class GPU compute.'),
        tags: ['PARALELO', 'GPU COMPUTE', 'METAL', 'WEBGPU'],
        facts: [ [T('Despacho','Dispatch'), '[numthreads(8,8,1)]'], [T('Destinos','Targets'), 'Vulkan · Metal · DX12'], [T('Web','Web'), 'WebGPU'] ] },

      { slug: 'shader-languages', n: '02', tab: T('Shaders','Shaders'), img: '../assets/cap-shaders.webp', w: 1400, h: 778,
        eyebrow: T('Capacidad / 02 · Autoría de shaders', 'Capability / 02 · Shader authoring'),
        t1: T('Siete', 'Seven'), t2: T('lenguajes', 'languages'),
        intro: T('Elige el lenguaje que le queda a cada plataforma en vez de forzar uno solo en todas partes.',
                 'Pick the language that suits each platform instead of forcing one everywhere.'),
        lead: T('MGFX, FNAFX, Slang, HLSL, GLSL, MSL y entrada binaria directa de SPIR-V.',
                'MGFX, FNAFX, Slang, HLSL, GLSL, MSL and direct binary SPIR-V input.'),
        body: [ T('Cuatro de ellos —MGFX, Slang, GLSL y HLSL— viajan además a WebGPU, así que el mismo efecto que escribes para escritorio puede acabar corriendo en el navegador.',
                  'Four of them — MGFX, Slang, GLSL and HLSL — also travel to WebGPU, so the same effect you write for desktop can end up running in the browser.'),
                T('Si ya tienes SPIR-V compilado, el framework lo acepta sin pasar por un lenguaje de alto nivel. Y la compilación en tiempo de ejecución permite generar shaders mientras el juego corre.',
                  'If you already have compiled SPIR-V, the framework takes it without going through a high-level language. Runtime compilation also lets you generate shaders while the game runs.') ],
        noteK: T('02 / Por qué importa', '02 / Why it matters'),
        note:  T('No tienes que reescribir tus efectos para cambiar de plataforma.',
                 'You do not have to rewrite your effects to change platform.'),
        tags: ['SLANG', 'MGFX', 'SPIR-V', 'WEBGPU'],
        facts: [ [T('Lenguajes','Languages'), '7'], [T('Compatibles con WebGPU','WebGPU-compatible'), '4'], [T('Entrada binaria','Binary input'), 'SPIR-V'] ] },

      { slug: 'mgfx', n: '03', tab: T('MGFX','MGFX'), img: '../assets/cap-mgfx.webp', w: 1400, h: 785,
        eyebrow: T('Capacidad / 03 · Compatibilidad de shaders', 'Capability / 03 · Shader compatibility'),
        t1: T('MGCB y MGFX', 'MGCB and MGFX'), t2: T('con perfil DesktopVK', 'with DesktopVK profile'),
        intro: T('Sigue usando el pipeline de contenido que ya conoces, sin aprender uno nuevo.',
                 'Keep using the content pipeline you already know, with nothing new to learn.'),
        lead: T('Yotsuba Framework admite efectos de MonoGame compilados con el perfil DesktopVK sobre plataformas Apple, a través del backend Metal.',
                'Yotsuba Framework supports MonoGame effects compiled with the DesktopVK profile on Apple platforms through the Metal backend.'),
        body: [ T('El framework mantiene útil tu código de juego y tus bibliotecas de contenido entre destinos. Tu proyecto puede seguir pensando en términos de MonoGame mientras el backend se ocupa de entregar una ruta Metal nativa.',
                  'The framework keeps your game code and content libraries useful across targets. Your project can carry on thinking in MonoGame terms while the backend delivers a native Metal path.'),
                T('Autoras los efectos en .fx, los compilas con MGCB y dejas que el framework haga la traducción en tiempo de ejecución a la API gráfica del destino.',
                  'You author effects in .fx, build them through MGCB, and let the framework provide the runtime translation to the target graphics API.') ],
        noteK: T('03 / Por qué importa', '03 / Why it matters'),
        note:  T('Conservas tu pipeline de contenido mientras cambias el destino de render.',
                 'Preserve your content pipeline while changing the rendering destination.'),
        tags: ['MGFX', 'DESKTOPVK', 'METAL'],
        facts: [ [T('Ruta de contenido','Content path'), '.fx → MGCB → MGFX'], [T('Perfil','Profile'), 'DesktopVK'], [T('Destino Apple','Apple target'), 'Metal'] ] },

      { slug: 'directx12', n: '04', tab: T('DirectX 12','DirectX 12'), img: '../assets/cap-dx12.webp', w: 1400, h: 785,
        eyebrow: T('Capacidad / 04 · Windows', 'Capability / 04 · Windows'),
        t1: T('DirectX 12', 'DirectX 12'), t2: T('en Windows', 'on Windows'),
        intro: T('Ruta nativa de render para GPUs de escritorio modernas, sin abandonar el modelo XNA.',
                 'A native rendering path for modern desktop GPUs, without leaving the XNA model.'),
        lead: T('En Windows, tus llamadas de dibujo se traducen a listas de comandos y descriptor heaps de DirectX 12.',
                'On Windows, your draw calls turn into DirectX 12 command lists and descriptor heaps.'),
        body: [ T('El backend expone el modelo explícito de envío de trabajo de D3D12 sin obligarte a gestionarlo: escribes el mismo SpriteBatch de siempre y el framework construye las listas por ti.',
                  'The backend exposes D3D12’s explicit submission model without making you manage it: you write the same SpriteBatch as always and the framework builds the lists for you.') ],
        noteK: T('04 / Por qué importa', '04 / Why it matters'),
        note:  T('El mismo código de juego, sobre la API que Windows usa hoy de verdad.',
                 'The same game code, on the API Windows actually uses today.'),
        tags: ['DIRECTX 12', 'WINDOWS', 'SM 6'],
        facts: [ [T('API','API'), 'Direct3D 12'], [T('Shaders','Shaders'), 'DXIL / SM 6'], [T('Destino','Target'), 'Windows'] ] },

      { slug: 'metal', n: '05', tab: T('Metal','Metal'), img: '../assets/cap-metal.webp', w: 1400, h: 784,
        eyebrow: T('Capacidad / 05 · Apple', 'Capability / 05 · Apple'),
        t1: T('Metal', 'Metal'), t2: T('en Apple', 'on Apple'),
        intro: T('macOS, iPadOS e iOS por una ruta Metal nativa, con el mismo código.',
                 'macOS, iPadOS and iOS through a native Metal path, with the same code.'),
        lead: T('Los juegos de MonoGame corren sobre Metal conservando el flujo de trabajo del framework.',
                'MonoGame games run through Metal while keeping the familiar framework workflow.'),
        body: [ T('Apple retiró OpenGL hace años; Metal es la única ruta gráfica de primera clase que queda en su ecosistema. El backend la implementa directamente, sin capas de traducción intermedias.',
                  'Apple deprecated OpenGL years ago; Metal is the only first-class graphics path left in its ecosystem. The backend implements it directly, with no intermediate translation layers.') ],
        noteK: T('05 / Por qué importa', '05 / Why it matters'),
        note:  T('Es la única ruta con futuro en el ecosistema de Apple.',
                 'It is the only path with a future in Apple’s ecosystem.'),
        tags: ['METAL', 'MACOS', 'IOS', 'IPADOS'],
        facts: [ [T('API','API'), 'Metal'], [T('Shaders','Shaders'), 'MSL / MGFX'], [T('Destinos','Targets'), 'macOS · iPadOS · iOS'] ] },

      { slug: 'android-vulkan', n: '06', tab: T('Vulkan','Vulkan'), img: '../assets/cap-vulkan.webp', w: 1400, h: 787,
        eyebrow: T('Capacidad / 06 · Móvil', 'Capability / 06 · Mobile'),
        t1: T('Vulkan', 'Vulkan'), t2: T('en Android', 'on Android'),
        intro: T('El mismo flujo de trabajo en Android sobre una ruta pensada para GPUs móviles.',
                 'The same workflow on Android over a path built for mobile GPUs.'),
        lead: T('Android y Linux apuntan a Vulkan directamente, con SPIR-V como formato de shader.',
                'Android and Linux target Vulkan directly, with SPIR-V as the shader format.'),
        body: [ T('El control explícito del envío de trabajo a la GPU importa especialmente en móvil, donde el presupuesto térmico y de batería es estrecho. Vulkan permite reducir el coste por fotograma frente a una ruta OpenGL ES.',
                  'Explicit control over GPU submission matters most on mobile, where the thermal and battery budget is tight. Vulkan lets you cut the per-frame cost compared with an OpenGL ES path.') ],
        noteK: T('06 / Por qué importa', '06 / Why it matters'),
        note:  T('En móvil, cada milisegundo de GPU se paga en batería.',
                 'On mobile, every millisecond of GPU time is paid for in battery.'),
        tags: ['VULKAN', 'ANDROID', 'LINUX', 'SPIR-V'],
        facts: [ [T('API','API'), 'Vulkan 1.x'], [T('Shaders','Shaders'), 'SPIR-V'], [T('Destinos','Targets'), 'Android · Linux'] ] },

      { slug: 'webgpu', n: '07', tab: T('WebGPU','WebGPU'), img: '', w: 0, h: 0, roadmap: true,
        eyebrow: T('Capacidad / 07 · Navegador', 'Capability / 07 · Browser'),
        t1: T('WebGPU', 'WebGPU'), t2: T('en la web', 'on the web'),
        intro: T('El mismo flujo con forma de XNA, llevado al navegador por la API gráfica moderna de la web.',
                 'The same XNA-shaped workflow, taken to the browser through the web’s modern graphics API.'),
        lead: T('Según la plataforma, el navegador traduce WebGPU a Vulkan, DirectX 12 o Metal.',
                'Depending on the platform, the browser maps WebGPU onto Vulkan, DirectX 12 or Metal.'),
        body: [ T('Tus shaders MGFX, Slang, GLSL y HLSL viajan con él, así que no hay que mantener una rama aparte para la versión web del juego.',
                  'Your MGFX, Slang, GLSL and HLSL shaders travel with it, so there is no separate branch to maintain for the web build.') ],
        noteK: T('07 / Por qué importa', '07 / Why it matters'),
        note:  T('Un enlace es la demo más barata que existe para un juego.',
                 'A link is the cheapest demo a game can have.'),
        tags: ['WEBGPU', 'NAVEGADOR', 'COMPUTE'],
        estado: T('El soporte de WebGPU está en la hoja de ruta anunciada.', 'WebGPU support is on the announced roadmap.'),
        facts: [ [T('API','API'), 'WebGPU / WGSL'], [T('Se apoya en','Backed by'), 'Vulkan · DX12 · Metal'], [T('Estado','Status'), 'Roadmap'] ] },

      { slug: 'animated-models', n: '08', tab: T('Modelos 3D','3D models'), img: '../assets/cap-models.webp', w: 1400, h: 788,
        eyebrow: T('Capacidad / 08 · Contenido 3D', 'Capability / 08 · 3D content'),
        t1: T('Modelos 3D', '3D models'), t2: T('animados', 'animated'),
        intro: T('Carga y reproducción de animación por el flujo de contenido de siempre.',
                 'Model loading and animation playback through the content workflow you already use.'),
        lead: T('Datos de modelo, esqueletos y clips de animación, sin herramientas nuevas que aprender.',
                'Model data, skeletons and animation clips, with no new tooling to learn.'),
        body: [ T('El pipeline MGCB procesa los modelos igual que las texturas y las fuentes, así que el paso de contenido a juego no cambia respecto a lo que ya haces.',
                  'The MGCB pipeline processes models just like textures and fonts, so the step from content to game does not change from what you already do.') ],
        noteK: T('08 / Por qué importa', '08 / Why it matters'),
        note:  T('El 3D deja de ser un caso aparte dentro del pipeline.',
                 '3D stops being a special case inside the pipeline.'),
        tags: ['MODELOS 3D', 'ANIMACIÓN', 'MGCB'],
        facts: [ [T('Pipeline','Pipeline'), 'MGCB'], [T('Datos','Data'), T('Malla · esqueleto · clips','Mesh · skeleton · clips')], [T('Reproducción','Playback'), T('En tiempo de ejecución','At runtime')] ] },

      { slug: 'krita', n: '09', tab: T('Krita','Krita'), img: '', w: 0, h: 0,
        eyebrow: T('Capacidad / 09 · Arte', 'Capability / 09 · Art'),
        t1: T('Krita', 'Krita'), t2: T('.kra por capas', 'layered .kra'),
        intro: T('Arte por capas directo del archivo de Krita, dentro del pipeline visual.',
                 'Layered art straight from the Krita file, inside the visual pipeline.'),
        lead: T('La ilustración que acompaña a todo este sitio es uno de esos archivos.',
                'The painting running through this whole site is one of those files.'),
        body: [ T('No hace falta exportar a PNG y volver a importar cada vez que el arte cambia: el .kra entra tal cual y conserva sus capas.',
                  'There is no need to export to PNG and re-import every time the art changes: the .kra goes in as is and keeps its layers.') ],
        noteK: T('09 / Por qué importa', '09 / Why it matters'),
        note:  T('Una ida y vuelta menos entre quien dibuja y quien programa.',
                 'One less round trip between whoever draws and whoever codes.'),
        tags: ['KRITA', '.KRA', T('ARTE POR CAPAS','LAYERED ART')],
        facts: [ [T('Formato','Format'), '.kra'], [T('Capas','Layers'), T('Se conservan','Preserved')], [T('Herramienta','Tool'), 'Krita'] ] }
    ],

    /* --- plataformas --- */
    plataformas: [
      { t: 'Windows', g: 'DirectX 12', e: T('Sí','Yes'), st: 'ok', s: T('Destino soportado','Supported target') },
      { t: 'Linux',   g: 'Vulkan',     e: T('Sí','Yes'), st: 'ok', s: T('Destino soportado','Supported target') },
      { t: 'macOS',   g: 'Metal',      e: T('Sí','Yes'), st: 'ok', s: T('Destino soportado','Supported target') },
      { t: 'Android', g: 'Vulkan',     e: '—',           st: 'ok', s: T('Destino soportado','Supported target') },
      { t: 'iOS',     g: 'Metal',      e: '—',           st: 'ex', s: T('Experimental','Experimental') },
      { t: 'Web',     g: 'WebGPU',     e: T('No','No'),  st: 'ex', s: T('Vista previa · sin audio en wasm','Preview · no audio in wasm') },
      { t: T('Web (KNI)','Web (KNI)'), g: 'WebGL', e: T('No','No'), st: 'ex', s: T('Vista previa','Preview') },
      { t: T('Consolas','Consoles'), g: T('Según fabricante','Per manufacturer'), e: '—', st: 'no', s: T('Requiere licencia del fabricante','Requires manufacturer licence') }
    ],

    /* --- comparativa: una barra de datos por criterio --- */
    comparar: [
      { f: T('Cómo trabajas','How you work'),
        v: [T('Solo código, en tu IDE','Code only, in your IDE'), T('Código + editor dentro del juego','Code + editor inside the game'), T('App de editor con botón Play','Editor app with a Play button')] },
      { f: T('Editor visual','Visual editor'),
        v: [T('No lleva','None'), T('Dentro de la ventana, en DEBUG','Inside the window, in DEBUG'), T('Aplicación de escritorio completa','A full desktop application')] },
      { f: T('En el binario final','In the final binary'),
        v: [T('Nada que quitar','Nothing to strip'), T('El editor sale en RELEASE','The editor leaves in RELEASE'), T('El juego se exporta aparte','The game exports separately')] },
      { f: T('Backends XNA','XNA backends'),
        v: ['Yotsuba Framework', 'MonoGame · KNI · FNA · Yotsuba', 'MonoGame · KNI · FNA · Yotsuba'] },
      { f: T('Compute shaders','Compute shaders'),
        v: [T('Sí','Yes'), T('Sí','Yes'), T('Por el Framework','Through the Framework')] },
      { f: T('Curva de entrada','Learning curve'),
        v: [T('Alta — tú montas todo','Steep — you build it all'), T('Media','Medium'), T('Baja — abre y empieza','Gentle — open and go')] },
      { f: T('Mejor si vienes de','Best if you come from'),
        v: [T('MonoGame · FNA · XNA','MonoGame · FNA · XNA'), T('MonoGame y quieres editor','MonoGame and want an editor'), T('Unity · Godot · GameMaker','Unity · Godot · GameMaker')] }
    ],

    /* --- dudas --- */
    dudas: [
      { q: T('Las webs anteriores decían «gratis y open source». ¿Qué cambió?',
             'The earlier sites said “free and open source”. What changed?'),
        a: T('El proyecto pasa a un modelo de pago único por herramienta. Lo que no cambia es lo importante: sigue sin regalías, sin cuota por puesto y sin límite por lo que factures. <b>Revisa y ajusta esta respuesta antes de publicar</b>, según lo que decidas sobre la licencia del código.',
             'The project moves to a one-time payment per tool. What does not change is the part that matters: still no royalties, no per-seat fee and no cap on what you earn. <b>Review and adjust this answer before publishing</b>, according to what you decide about the code licence.') },
      { q: T('¿Tengo que elegir una y quedarme ahí para siempre?', 'Do I have to pick one and stay there forever?'),
        a: T('No. Las tres se apoyan en el mismo motor, así que un proyecto empezado en Engine se puede seguir en Hybrid o en Framework. Cambias de puerta, no de casa.',
             'No. All three sit on the same engine, so a project started in Engine can carry on in Hybrid or Framework. You change doors, not houses.') },
      { q: T('¿Pago otra vez cuando salga una versión nueva?', 'Do I pay again when a new version comes out?'),
        a: T('La licencia es perpetua: la versión que compras es tuya. Mientras el proyecto esté en acceso anticipado, cada versión nueva de la línea que compraste te llega incluida.',
             'The licence is perpetual: the version you buy is yours. While the project is in early access, every new release of the line you bought comes included.') },
      { q: T('¿Puedo publicar y vender mi juego sin pagar nada más?', 'Can I ship and sell my game without paying anything else?'),
        a: T('Sí. Cero regalías, sin reporte de instalaciones y sin límite de facturación. Lo que vendas es tuyo entero.',
             'Yes. Zero royalties, no install reporting and no revenue cap. What you sell is entirely yours.') },
      { q: T('¿Hace falta saber MonoGame o XNA para empezar?', 'Do I need to know MonoGame or XNA to start?'),
        a: T('No hace falta, pero ayuda mucho. La API tiene forma de XNA, así que cualquier tutorial de MonoGame, FNA o KNI te sirve casi tal cual. Si vienes de Unity o Godot, Engine es la puerta pensada para ti.',
             'You do not need it, but it helps a lot. The API is XNA-shaped, so almost any MonoGame, FNA or KNI tutorial works nearly as is. Coming from Unity or Godot, Engine is the door built for you.') },
      { q: T('¿En qué estado está de verdad el proyecto?', 'What state is the project really in?'),
        a: T('En desarrollo, y lo decimos en cada página. Hay grabaciones reales del editor de Hybrid y una captura real de WebGPU. La tabla de plataformas marca qué es experimental y qué no.',
             'In development, and we say so on every page. There is real footage of the Hybrid editor and a real WebGPU capture. The platform table marks what is experimental and what is not.') },
      { q: T('¿Sirve para un estudio, o solo para proyectos personales?', 'Is it for a studio, or only for personal projects?'),
        a: T('Para los dos. No hay licencia por puesto ni límite de tamaño de equipo, y el proyecto es código .NET normal, así que entra en el control de versiones y la integración continua que ya uses.',
             'For both. There is no per-seat licence and no team-size limit, and the project is ordinary .NET code, so it fits the version control and CI you already use.') }
    ]
  };

  /* Los tres puntos que resume cada producto en la portada.
     Pares [titulo, descripcion]; salen como lista numerada con filetes. */
  DATA.productos[0].pasos = [
    [T('Compute shaders','Compute shaders'), T('Trabajo masivamente paralelo en la GPU dentro de un framework con forma de XNA.','Massively parallel GPU work inside an XNA-shaped framework.')],
    [T('Siete lenguajes de shader','Seven shader languages'), T('MGFX, FNAFX, Slang, HLSL, GLSL, MSL y entrada directa de SPIR-V.','MGFX, FNAFX, Slang, HLSL, GLSL, MSL and direct SPIR-V input.')],
    [T('Compatible con MonoGame','MonoGame compatible'), T('Reutiliza tus bibliotecas y tu flujo MGCB/MGFX sin recompilar para Yotsuba.','Reuse your libraries and your MGCB/MGFX workflow without rebuilding for Yotsuba.')]
  ];
  DATA.productos[1].pasos = [
    [T('El editor vive dentro','The editor lives inside'), T('En DEBUG aparece dentro de la ventana del juego. Nada de apps aparte ni de contexto perdido.','In DEBUG it appears inside the game window. No separate apps, no lost context.')],
    [T('RELEASE queda limpio','RELEASE stays clean'), T('Las directivas de compilación se llevan el editor entero. Tu binario no carga con él.','Compilation directives take the whole editor away. Your binary does not carry it.')],
    [T('Cuatro backends','Four backends'), T('MonoGame, KNI, FNA y Yotsuba Framework. Las plataformas se suman, no se reparten.','MonoGame, KNI, FNA and Yotsuba Framework. Platforms add up, they do not split.')]
  ];
  DATA.productos[2].pasos = [
    [T('Tu IDE, tu depurador','Your IDE, your debugger'), T('Los guiones son clases de C#. Visual Studio, Rider o VS Code, y cualquier paquete de NuGet.','Scripts are C# classes. Visual Studio, Rider or VS Code, and any NuGet package.')],
    [T('2D y 3D','2D and 3D'), T('Sprites, tilemaps, animación glTF, materiales PBR, partículas y física.','Sprites, tilemaps, glTF animation, PBR materials, particles and physics.')],
    [T('Proyecto legible','A readable project'), T('Código .NET normal más archivos .ytb, que son JSON que puedes abrir y leer.','Ordinary .NET code plus .ytb files, which are JSON you can open and read.')]
  ];

  /* mensajes de estado */
  var MSG = {
    es: { langCode: 'EN', sending: 'Enviando…',
          req: 'Escribe al menos tu nombre y un correo válido.',
          ok: '¡Listo! Te escribimos en cuanto abra la venta.',
          err: 'Algo salió mal. Inténtalo otra vez en unos segundos.',
          demoOff: 'La demo estará disponible muy pronto.',
          faltaProducto: 'Marca al menos un producto que te interese.',
          sinConfig: 'El formulario todavía no está conectado. Escríbenos por correo mientras tanto.',
          noEnvia: 'No pudimos enviarlo. Si acabas de intentarlo varias veces, espera un minuto y vuelve a probar.',
          pickSay: 'Elige una y te respondemos', see: 'Ver', buy: 'Comprar', once: 'pago único' },
    en: { langCode: 'ES', sending: 'Sending…',
          req: 'Please enter at least your name and a valid email.',
          ok: 'All set! We will write as soon as the store opens.',
          err: 'Something went wrong. Try again in a few seconds.',
          demoOff: 'The demo will be available very soon.',
          faltaProducto: 'Tick at least one product you are interested in.',
          sinConfig: 'The form is not connected yet. Write to us by email in the meantime.',
          noEnvia: 'We could not send it. If you have just tried a few times, wait a minute and try again.',
          pickSay: 'Pick one and we answer', see: 'See', buy: 'Buy', once: 'one payment' }
  };

  return { PRECIOS: PRECIOS, DEMO_WEBGPU: DEMO_WEBGPU, CONTACTOS: CONTACTOS, EN: window.YOTSUBA_EN || {}, MSG: MSG, DATA: DATA };
}());
