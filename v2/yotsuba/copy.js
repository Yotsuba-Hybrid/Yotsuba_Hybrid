/* ==========================================================================
   YOTSUBA — contenido editable
   ---------------------------------------------------------------------------
   Aquí vive TODO lo que se cambia sin tocar la maquetación:
     · PRECIOS  — los números de la sección de precio (marcados como borrador)
     · EN       — la traducción al inglés. El español vive en el HTML y se
                  captura solo, así que las dos versiones no se desincronizan.
     · DATA     — las tablas: APIs, shaders, plataformas, comparador y FAQ.
   ========================================================================== */
window.YOTSUBA = (function () {

  /* ------------------------------------------------------------------ PRECIO
     ⚠ BORRADOR: cambia estos cuatro números por los definitivos.
     Todo lo demás (tarjetas, tabla, botones) se recalcula solo. */
  var PRECIOS = {
    moneda: 'USD', simbolo: '$',
    framework: 39,
    engine:    69,
    hybrid:    99,
    pack:     149          /* los tres juntos */
  };

  /* ------------------------------------------------------------------ INGLÉS */
  var EN = {
    'a11y.skip': 'Skip to content',
    'nav.tag': 'the workshop', 'nav.core': 'The core', 'nav.fw': 'Framework', 'nav.hy': 'Hybrid',
    'nav.en': 'Engine', 'nav.compare': 'Compare', 'nav.price': 'Pricing', 'nav.buy': 'Buy',
    'nav.label': 'Primary navigation', 'nav.langTo': 'Cambiar idioma a español',

    'hero.eyebrow': 'Three tools · one C# core',
    'hero.kick': 'the Yotsuba workshop',
    'hero.h1a': 'One engine.', 'hero.h1b': 'Three doors.',
    'hero.lede': 'Framework, Hybrid and Engine share the same engine underneath. Come in through the door that fits how you work, and move to another whenever you like — <b>without rewriting your game</b>.',
    'hero.cta1': 'Find your door', 'hero.cta2': 'See pricing',
    'hero.s1': 'Real C# / .NET', 'hero.s2': '2D + 3D', 'hero.s3': 'Vulkan · Metal · DX12', 'hero.s4': 'Pay once · no royalties',
    'hero.art': 'Enuma Elish: a winged figure descends through a stormy sea while two caped travellers and a white tiger watch from the shore',
    'hero.hint': 'Move your cursor!', 'hero.doors': 'Choose a door',
    'hero.tagA': 'PAINTED', 'hero.tagB': 'COMPUTED',
    'door.fw': 'code only', 'door.hy': 'code + editor', 'door.en': 'editor app',

    'core.folio': 'the core',
    'core.h': 'Outside they are three.<br><em>Inside they are one.</em>',
    'core.sub': 'All three tools sit on the same engine written in C#. What you learn in one carries to the others, and a project can move up or down a door without starting over.',
    'core.yours': 'yours', 'core.ours': 'ours', 'core.doorsL': 'Your door',
    'core.l0': 'Your game', 'core.d1': 'library only', 'core.d2': 'editor inside the game', 'core.d3': 'editor app',
    'core.l2': 'Yotsuba core', 'core.l2d': 'ECS · scenes · rendering · physics · input · audio',
    'core.l3': 'XNA adapter', 'core.l4': 'Native graphics',
    'core.n1t': 'Learn it once', 'core.n1d': 'The same XNA-shaped API in all three. What you know from MonoGame, FNA or KNI walks straight in.',
    'core.n2t': 'Never a dead end', 'core.n2d': 'If the editor gets in your way, drop down to Hybrid or Framework and take the whole project with you.',
    'core.n3t': 'Your code stays yours', 'core.n3d': 'A project is ordinary .NET. Open it in Visual Studio, Rider or VS Code and use any NuGet package.',

    'pick.folio': 'which one is yours',
    'pick.h': 'How do you like to work?',
    'pick.sub': 'Answer one thing. We will tell you where to start — and no answer locks you in.',
    'pick.aria': 'How do you like to work?',
    'pick.o1': 'I write everything in code', 'pick.o1d': 'Give me a library and my IDE. Nothing else.',
    'pick.o2': 'I want to tweak things while it runs', 'pick.o2d': 'Change values with the game running, without leaving the window.',
    'pick.o3': 'I want to open an editor and press Play', 'pick.o3d': 'Scene, hierarchy, inspector, export. The classic way.',
    'pick.empty': 'Pick one and we answer',

    'tag.roadmap': 'ROADMAP',

    'fw.for': 'For people who write everything in code',
    'fw.claim': 'The only framework with XNA lineage that <b>modernised its whole graphics architecture</b>: compute shaders, Vulkan, Metal, DirectX&nbsp;12, WebGPU and seven shader languages.',
    'fw.r1': 'Compute shaders', 'fw.r1d': 'Massively parallel GPU work inside an XNA-shaped framework.',
    'fw.r2': 'Seven languages', 'fw.r2d': 'MGFX, FNAFX, Slang, HLSL, GLSL, MSL and direct SPIR-V. Shader compilation at runtime.',
    'fw.r3': 'Native paths', 'fw.r3d': 'Vulkan on Android and Linux, Metal on Apple, DirectX 12 on Windows, WebGPU in the browser.',
    'fw.r4': 'MonoGame compatible', 'fw.r4d': 'Reuse your libraries and your MGCB/MGFX workflow without rebuilding for Yotsuba.',
    'fw.routerE': 'Graphics router', 'fw.routerH': 'The same code. <em>Only the destination changes.</em>',
    'fw.routerD': 'Yotsuba keeps an XNA-style surface and sends the rendering work to the API that belongs on each platform. Pick a target and follow the signal.',
    'fw.targets': 'Target platform', 'fw.n1': 'Your game', 'fw.n1d': 'Draw calls', 'fw.n2': 'Framework', 'fw.n4': 'Hardware',
    'fw.codeC': '// The same code on every target',
    'fw.capsE': 'Capabilities', 'fw.capsH': 'Nine things <em>no other XNA</em> has together.',
    'fw.c1': 'Compute shaders', 'fw.c1d': 'Particle simulation, procedural generation, image processing, lighting and physics, running in parallel on the GPU.',
    'fw.c2': 'Seven shader languages', 'fw.c2d': 'MGFX, FNAFX, Slang, HLSL, GLSL, MSL and direct SPIR-V input. MGFX, Slang, GLSL and HLSL are WebGPU-compatible too.',
    'fw.c3': 'MGCB and MGFX with the DesktopVK profile', 'fw.c3d': 'Keep the pipeline you already know. MonoGame effects compiled with DesktopVK run on Apple through Metal.',
    'fw.c4': 'DirectX 12 on Windows', 'fw.c4d': 'A native rendering path for modern desktop GPUs, without leaving the XNA model.',
    'fw.c5': 'Metal on Apple', 'fw.c5d': 'macOS, iPadOS and iOS through a native Metal path, with the same code.',
    'fw.c6': 'Vulkan on Android', 'fw.c6d': 'The same workflow on Android over a Vulkan path built for mobile GPUs.',
    'fw.c7': 'WebGPU in the browser', 'fw.c7d': 'The browser maps WebGPU onto Vulkan, DirectX 12 or Metal depending on the platform. Your MGFX, Slang, GLSL and HLSL shaders travel with it.',
    'fw.c8': 'Animated 3D models', 'fw.c8d': 'Loading and playback with model data, skeletons and clips, through the content workflow you already use.',
    'fw.c9': 'Krita (.kra) illustrations', 'fw.c9d': 'Layered art straight from the .kra inside the visual pipeline. The painting on this page is one of them.',
    'fw.f1v': 'Live browser capture of a scene rendered with WebGPU',
    'fw.f1c': 'A real capture of a scene running in the browser through WebGPU.',
    'fw.f2c': 'Seven ways to write the same effect. Four of them travel to WebGPU too.',
    'fw.shE': 'Shader system', 'fw.shH': 'The same effect, <em>in seven languages.</em>',
    'fw.shD': 'Instead of forcing one language everywhere, you pick the one that suits each platform.',
    'fw.shTabs': 'Shader languages', 'fw.shSame': 'the same effect · every language', 'fw.copy': 'Copy source',
    'fw.buy': 'Buy Framework', 'fw.docs': 'Read the documentation',

    'hy.for': 'For people who want both',
    'hy.claim': 'The visual editor <b>lives inside your game window</b>, not in a separate app. In <code>DEBUG</code> it shows up; when you build in <code>RELEASE</code> it leaves the binary entirely and only your game remains.',
    'hy.r1': 'Editor in the window', 'hy.r1d': 'No app switching, no lost context. You edit while the game runs.',
    'hy.r2': 'RELEASE without the editor', 'hy.r2d': 'Compilation directives take the whole editor away. Your binary does not carry it.',
    'hy.r3': 'Four backends', 'hy.r3d': 'MonoGame, KNI, FNA and Yotsuba Framework. Platforms add up, they do not split.',
    'hy.r4': 'It becomes C#', 'hy.r4d': 'What you decide in the editor compiles to code: less JSON to read at startup, faster loads.',
    'hy.demoE': 'Try it · nothing to install', 'hy.demoH': 'Move something. <em>Watch the code appear.</em>',
    'hy.demoD': 'Drag an entity, change its values, then switch to RELEASE and watch the editor vanish.',
    'hy.demoN': 'An interactive mock-up running in your browser. The real software is still in development and the API names you see are illustrative.',
    'hy.mode': 'Build mode', 'hy.backend': 'Backend', 'hy.scene': 'Scene', 'hy.inspector': 'Inspector',
    'hy.canvas': 'Game scene: drag the entities', 'hy.add': '＋ Entity', 'hy.entity': 'Entity',
    'hy.rot': 'Rotation', 'hy.scale': 'Scale', 'hy.comps': '2 components',
    'hy.code': 'Generated C#', 'hy.copy': 'Copy C#', 'hy.console': 'Console',
    'hy.releaseN': 'the <s>#if DEBUG</s> editor is not part of the binary. Only your game is left.',
    'hy.mxE': 'Reach', 'hy.mxH': 'Four backends. <em>Platforms add up.</em>',
    'hy.mxD': 'Because you can run your game on any of the four backends, everything any one of them supports becomes available to your project. Switch backends on and off and watch your reach grow.',
    'hy.mxAria': 'Platform matrix by backend',
    'hy.mxNote': 'What is shown are the announced targets of the project and the capabilities of its backends; it does not mean every destination ships today in a stable release. Consoles require approval, licences and tooling from each manufacturer.',
    'hy.video': 'Recording of the Yotsuba editor running', 'hy.videoC': 'Real footage of the Yotsuba Hybrid editor at work.',
    'hy.buy': 'Buy Hybrid', 'hy.cmp': 'Compare it with the other two',

    'en.for': 'For people who want to open, press Play and export',
    'en.claim': 'A complete desktop engine with scene, hierarchy, inspector and one-click export — where the script is still <b>real C#</b>, open in your IDE, with your debugger and your NuGet packages.',
    'en.r1': 'Your IDE, your debugger', 'en.r1d': 'Scripts are C# classes. Visual Studio, Rider or VS Code, and any NuGet package.',
    'en.r2': 'Both worlds', 'en.r2d': 'Sprites, tilemaps, glTF animation, PBR materials, particles and physics.',
    'en.r3': 'A readable project', 'en.r3d': 'Ordinary .NET code plus .ytb files, which are JSON you can open and read.',
    'en.r4': 'Not a dead end', 'en.r4d': 'Same engine as Hybrid and Framework. Drop a layer whenever you need to.',
    'en.demoE': 'Try the editor', 'en.demoH': 'Press <em>Play.</em>',
    'en.demoD': 'Drag the sprites, change the inspector, press Play, then Export. Thirty seconds to feel what the engine is like.',
    'en.demoN': 'An interactive sketch. This is a mock-up of the planned editor, not the shipping build. The real one grows out of the editor Yotsuba Hybrid already has.',
    'en.play': 'Play', 'en.reset': 'Reset', 'en.backend': 'Backend', 'en.export': 'Build & export…',
    'en.sceneT': 'Scene: Level_1', 'en.hier': 'Hierarchy', 'en.ents': 'Entities', 'en.add': '+ Entity',
    'en.vp': 'Scene viewport', 'en.insp': 'Inspector', 'en.inspT': 'Inspector',
    'en.tab1': 'Console', 'en.tab2': 'Content', 'en.tab3': 'Build',
    'en.bnote': 'Pick a target and press <b>Build & export…</b> in the toolbar.',
    'en.dlgT': 'Build & export', 'en.dlgP': 'Simulated in this demo.', 'en.dlgGo': 'Export', 'en.dlgX': 'Close',
    'en.boxE': 'In the box', 'en.boxH': 'All of this <em>is already built.</em>', 'en.bwT': 'Workflow',
    'en.b2a': 'Sprites, transforms and a zoomable 2D camera',
    'en.b2b': 'Depth ordering and off-screen culling',
    'en.b2c': 'Animation, fonts, text and buttons',
    'en.b2d': 'Tilemaps with Tiled (TMX) and TexturePacker sheets',
    'en.b2e': 'Built-in 2D physics with debug drawing',
    'en.b3a': 'Cameras, primitives and 2.5D sprites',
    'en.b3b': 'glTF models with skeletal animation',
    'en.b3c': 'PBR materials and custom shaders',
    'en.b3d': 'Built-in 3D physics with a spatial broad phase',
    'en.b3e': 'Particles, VFX and hardware occlusion queries',
    'en.bwa': 'ECS with scenes, entities, components and systems',
    'en.bwb': 'Editor: scenes, console, history, colour picker, 3D model editor',
    'en.bwc': 'Scripting with your own systems',
    'en.bwd': 'Keyboard, mouse, gamepad, touch and gestures',
    'en.bwe': 'Audio with SFX and music channels',
    'en.boxFine': 'Early-stage project: the API may still change. Everything above exists in the Yotsuba Hybrid codebase the Engine is built on.',
    'en.buy': 'Buy Engine', 'en.plat': 'See platforms and status',

    'cmp.folio': 'side by side', 'cmp.h': 'All three, side by side.',
    'cmp.sub': 'What changes between doors is the editor and how close it puts you to the metal. The engine underneath is the same.',

    'pr.folio': 'pricing', 'pr.h': 'Pay once.<br><em>It is yours for good.</em>',
    'pr.sub': 'No royalties on what you sell. No per-seat fee. No invoice arriving the day your game does well.',
    'pr.a1': 'Perpetual licence: the version you buy stays yours even if you stop updating.',
    'pr.a3': 'Commercial use from day one, with no revenue cap and no studio-size limit.',
    'pr.a4': 'Your splash screen is yours. We do not put ours in front of it.',
    'pr.vsH': 'What you will <em>not</em> be paying',
    'pr.vsD': 'This is the invoice another engine sends you every year for making your game. With Yotsuba, every one of these lines is struck out before you start.',
    'pr.rcAria': 'What other engines charge, struck out',
    'pr.rcT': 'ANNUAL INVOICE', 'pr.rcS': 'indie studio \u00b7 3 people \u00b7 one shipped game',
    'pr.v1': 'Revenue royalties', 'pr.v1a': '% of everything you sell', 'pr.v1d': 'A cut of every copy, every month, forever.',
    'pr.v2': 'Per-seat licence', 'pr.v2a': '\u00d7 person \u00d7 year', 'pr.v2d': 'A recurring charge for every person on the team.',
    'pr.v3': 'Fee per install', 'pr.v3a': '\u00d7 every download', 'pr.v3d': 'A charge that climbs exactly when the game does well.',
    'pr.v5': 'Mandatory splash screen', 'pr.v5a': '\u00d7 your first impression', 'pr.v5d': 'Somebody else\u2019s logo in front of yours, every time anyone opens your game.',
    'pr.rcTot': 'Yearly total with Yotsuba', 'pr.rcCur': 'USD', 'pr.rcStamp': 'paid once, and only once',
    'pr.fine': 'Prices in US dollars, taxes not included. The project is in development: buying now puts you in early access and gets you every new release of the line you bought.',
    'pr.once': 'one payment · forever', 'pr.buy': 'Buy', 'pr.best': 'BEST VALUE',
    'pr.bdK': 'The three of them', 'pr.bdH': 'The whole workshop',
    'pr.bdD': 'Framework, Hybrid and Engine together. One purchase, three ways of working, and the freedom to change your mind halfway through a project.',
    'pr.bdWas': 'separately', 'pr.bdSave': 'you save', 'pr.bdBuy': 'Get the three',

    'pl.folio': 'where it reaches', 'pl.h': 'Where it runs, and in what state.',
    'pl.sub': 'The status column is deliberate. We would rather tell you what is experimental than surprise you later.',
    'pl.fine': 'Each row is a host project inside the repository. We do not guarantee feature parity between targets yet. Consoles require approval, licences and tooling from each manufacturer.',

    'fq.folio': 'questions', 'fq.h': 'What everyone asks first.',

    'co.eyebrow': 'Yotsuba community', 'co.h': 'Build it<br><em>with us.</em>',
    'co.sub': 'The road is open. Help us sharpen the editor, the backends and the documentation that ties the whole family together.',
    'co.f1': 'Report issues and share ideas on GitHub.',
    'co.f2': 'Follow development closely and try the early builds.',
    'co.f3': 'Meet people who make games in C#.',
    'co.f4': 'Propose changes to the code, the website and the docs.',
    'co.gh': 'View GitHub', 'co.docs': 'Read the documentation',

    'fo.title': 'Tell me when it launches', 'fo.desc': 'We write when the store opens and when each release lands. No spam.',
    'fo.name': 'Name', 'fo.nameP': 'Your name', 'fo.email': 'Email', 'fo.emailP': 'you@email.com',
    'fo.phone': 'Phone', 'fo.opt': '(optional)', 'fo.want': 'I am interested in', 'fo.submit': 'Notify me',
    'foot.copy': '© 2026 Yotsuba. Made by hand, in C#.'
  };

  /* mensajes de estado (no viven en el HTML) */
  var MSG = {
    es: {
      langCode: 'EN', sending: 'Enviando…',
      req: 'Escribe al menos tu nombre y un correo válido.',
      ok: '¡Listo! Te escribimos en cuanto abra la venta.',
      err: 'Algo salió mal. Inténtalo otra vez en unos segundos.',
      copied: 'Copiado ✓', copy: 'Copiar C#', copySrc: 'Copiar fuente',
      docTitle: 'Yotsuba — Un motor. Tres puertas.',
      docDesc: 'Framework, Hybrid y Engine: tres herramientas para hacer videojuegos en C# sobre el mismo núcleo. Pago único, sin regalías.',
      dragHint: 'Arrastra una entidad · flechas para afinar',
      lines: 'líneas cambiadas', reach: 'Tu proyecto llega a', none: '— enciende un backend —',
      wgpuOn: 'compatible con WebGPU', wgpuOff: 'solo nativo',
      exporting: 'Compilando {t}…', exported: 'Exportado a {t} ✓', pickTarget: 'Elige al menos un destino.'
    },
    en: {
      langCode: 'ES', sending: 'Sending…',
      req: 'Please enter at least your name and a valid email.',
      ok: 'All set! We will write as soon as the store opens.',
      err: 'Something went wrong. Try again in a few seconds.',
      copied: 'Copied ✓', copy: 'Copy C#', copySrc: 'Copy source',
      docTitle: 'Yotsuba — One engine. Three doors.',
      docDesc: 'Framework, Hybrid and Engine: three tools for making games in C# on one shared core. Pay once, no royalties.',
      dragHint: 'Drag an entity · arrow keys to nudge',
      lines: 'lines changed', reach: 'Your project reaches', none: '— switch a backend on —',
      wgpuOn: 'WebGPU-compatible', wgpuOff: 'native only',
      exporting: 'Building {t}…', exported: 'Exported to {t} ✓', pickTarget: 'Pick at least one target.'
    }
  };

  /* ------------------------------------------------------------------- DATOS
     Cada texto va como { es: '…', en: '…' }. */
  var T = function (es, en) { return { es: es, en: en }; };

  var DATA = {

    /* --- productos: lo que alimenta tarjetas de precio, selector y tabla --- */
    productos: [
      { id: 'framework', p: 'fw', nombre: 'Framework', logo: '../assets/framework-logo.webp', ancla: '#framework',
        para: T('solo código', 'code only'),
        claim: T('La biblioteca con forma de XNA, modernizada por dentro. Tú escribes cada línea.',
                 'The XNA-shaped library, modernised underneath. You write every line.'),
        para_quien: T('Para quien ya sabe lo que quiere y no necesita que nadie se lo dibuje.',
                      'For people who know what they want and need nobody to draw it for them.'),
        bullets: [
          T('Compute shaders y siete lenguajes de shader', 'Compute shaders and seven shader languages'),
          T('Vulkan, Metal, DirectX 12 y WebGPU nativos', 'Native Vulkan, Metal, DirectX 12 and WebGPU'),
          T('Compatible con bibliotecas de MonoGame', 'Compatible with MonoGame libraries'),
          T('Pipeline MGCB / MGFX de siempre', 'The MGCB / MGFX pipeline you know')
        ] },
      { id: 'hybrid', p: 'hy', nombre: 'Hybrid', logo: '../assets/hybrid-logo.webp', ancla: '#hybrid',
        para: T('código + editor', 'code + editor'), destacado: true,
        claim: T('Framework y editor en uno. El editor vive dentro de tu juego y se va al compilar.',
                 'Framework and editor in one. The editor lives inside your game and leaves at build time.'),
        para_quien: T('Para quien quiere tocar valores con el juego en marcha sin renunciar al control.',
                      'For people who want to tweak values with the game running, without giving up control.'),
        bullets: [
          T('Todo lo de Framework, incluido', 'Everything in Framework, included'),
          T('Editor visual dentro de la ventana en DEBUG', 'Visual editor inside the window in DEBUG'),
          T('Cuatro backends: MonoGame, KNI, FNA y Yotsuba', 'Four backends: MonoGame, KNI, FNA and Yotsuba'),
          T('Lo que editas se compila a C#', 'What you edit compiles to C#')
        ] },
      { id: 'engine', p: 'en', nombre: 'Engine', logo: '../assets/engine-logo-neon.webp', ancla: '#engine',
        para: T('app de editor', 'editor app'),
        claim: T('El motor completo: abrir proyecto, componer la escena, dar Play y exportar.',
                 'The full engine: open a project, compose the scene, press Play and export.'),
        para_quien: T('Para quien viene de Unity o Godot y quiere lo mismo, pero en C# y sin regalías.',
                      'For people coming from Unity or Godot who want the same, in C# and without royalties.'),
        bullets: [
          T('App de escritorio con escena, jerarquía e inspector', 'Desktop app with scene, hierarchy and inspector'),
          T('2D y 3D: tilemaps, glTF, PBR, física y partículas', '2D and 3D: tilemaps, glTF, PBR, physics and particles'),
          T('Compilar y exportar desde el editor', 'Build and export from the editor'),
          T('Guiones en C# abiertos en tu propio IDE', 'C# scripts open in your own IDE')
        ] }
    ],

    /* --- enrutador de gráficos --- */
    apis: [
      { k: 'Windows', api: 'DirectX 12', kind: T('API nativa', 'Native API'), logo: '../assets/logo-dx12.webp', gpu: 'D3D12 · SM 6',
        d: T('En Windows, Yotsuba traduce tus llamadas de dibujo a DirectX 12: listas de comandos, descriptor heaps y compute sobre GPUs de escritorio modernas.',
             'On Windows, Yotsuba turns your draw calls into DirectX 12: command lists, descriptor heaps and compute on modern desktop GPUs.') },
      { k: 'Android', api: 'Vulkan', kind: T('API nativa', 'Native API'), logo: '../assets/logo-vulkan.svg', gpu: 'Vulkan 1.x · SPIR-V',
        d: T('En Android y Linux el destino es Vulkan directo, con SPIR-V como formato de shader y control explícito del envío de trabajo a la GPU.',
             'On Android and Linux the target is Vulkan directly, with SPIR-V as the shader format and explicit control over GPU submission.') },
      { k: 'Apple', api: 'Metal', kind: T('API nativa', 'Native API'), logo: '../assets/logo-metal.webp', gpu: 'Metal · MSL',
        d: T('macOS, iPadOS e iOS pasan por Metal. Los efectos MGFX compilados con el perfil DesktopVK también corren por aquí.',
             'macOS, iPadOS and iOS go through Metal. MGFX effects compiled with the DesktopVK profile run here too.') },
      { k: 'Web', api: 'WebGPU', kind: T('En ruta', 'Roadmap'), logo: 'WG', gpu: 'WebGPU · WGSL',
        d: T('En el navegador, WebGPU se apoya a su vez en Vulkan, DirectX 12 o Metal según el sistema. Sigue en la hoja de ruta anunciada.',
             'In the browser, WebGPU itself sits on Vulkan, DirectX 12 or Metal depending on the system. Still part of the announced roadmap.') }
    ],

    /* --- lenguajes de shader --- */
    shaders: [
      { n: 'MGFX', f: 'Ripple.fx', wg: true,
        d: T('El formato de efectos de MonoGame. Si vienes de MGCB, tus .fx entran tal cual.',
             'MonoGame’s effect format. Coming from MGCB, your .fx files walk right in.'),
        c: 'float4 PS(VSOut i) : COLOR0\n{\n    float2 uv = i.TexCoord;\n    float  d  = distance(uv, Center);\n    uv += normalize(uv - Center) * sin(d * 40 - Time * 4) * 0.02;\n    return tex2D(Screen, uv);\n}\n\ntechnique Ripple\n{\n    pass P0 { PixelShader = compile ps_3_0 PS(); }\n}' },
      { n: 'Slang', f: 'Ripple.slang', wg: true,
        d: T('Lenguaje moderno con módulos y genéricos que compila a SPIR-V, HLSL, MSL y WGSL.',
             'A modern language with modules and generics that compiles to SPIR-V, HLSL, MSL and WGSL.'),
        c: '[shader("fragment")]\nfloat4 fragMain(VSOut i) : SV_Target\n{\n    float2 uv = i.uv;\n    float  d  = distance(uv, center);\n    uv += normalize(uv - center) * sin(d * 40 - time * 4) * 0.02;\n    return screen.Sample(samp, uv);\n}' },
      { n: 'HLSL', f: 'Ripple.hlsl', wg: true,
        d: T('El lenguaje de DirectX. Compila a DXIL en Windows y a SPIR-V en el resto.',
             'The DirectX language. Compiles to DXIL on Windows and SPIR-V elsewhere.'),
        c: 'Texture2D    Screen : register(t0);\nSamplerState Samp   : register(s0);\n\nfloat4 PSMain(VSOut i) : SV_Target\n{\n    float2 uv = i.uv;\n    float  d  = distance(uv, Center);\n    uv += normalize(uv - Center) * sin(d * 40 - Time * 4) * 0.02;\n    return Screen.Sample(Samp, uv);\n}' },
      { n: 'GLSL', f: 'ripple.frag', wg: true,
        d: T('El clásico de OpenGL y Vulkan, compilado a SPIR-V por el pipeline.',
             'The OpenGL and Vulkan classic, compiled to SPIR-V by the pipeline.'),
        c: '#version 450\nlayout(location = 0) in  vec2 vUV;\nlayout(location = 0) out vec4 fragColor;\nlayout(binding  = 0) uniform sampler2D screen;\n\nvoid main() {\n    vec2  uv = vUV;\n    float d  = distance(uv, center);\n    uv += normalize(uv - center) * sin(d * 40.0 - time * 4.0) * 0.02;\n    fragColor = texture(screen, uv);\n}' },
      { n: 'MSL', f: 'Ripple.metal', wg: false,
        d: T('Metal Shading Language, el camino nativo en macOS, iPadOS e iOS.',
             'Metal Shading Language, the native path on macOS, iPadOS and iOS.'),
        c: '#include <metal_stdlib>\nusing namespace metal;\n\nfragment float4 ripple(VSOut in [[stage_in]],\n                       texture2d<float> screen [[texture(0)]],\n                       sampler samp [[sampler(0)]])\n{\n    float2 uv = in.uv;\n    float  d  = distance(uv, center);\n    uv += normalize(uv - center) * sin(d * 40.0 - time * 4.0) * 0.02;\n    return screen.sample(samp, uv);\n}' },
      { n: 'FNAFX', f: 'Ripple.fxb', wg: false,
        d: T('El formato de efectos de FNA, para proyectos que ya vienen de ese ecosistema.',
             'FNA’s effect format, for projects already coming from that ecosystem.'),
        c: '// FNAFX — Effect compilado desde .fx con fxc\nsampler2D Screen : register(s0);\n\nfloat4 main(float2 uv : TEXCOORD0) : COLOR0\n{\n    float d = distance(uv, Center);\n    uv += normalize(uv - Center) * sin(d * 40 - Time * 4) * 0.02;\n    return tex2D(Screen, uv);\n}' },
      { n: 'SPIR-V', f: 'ripple.spv', wg: false,
        d: T('Entrada binaria directa: si ya tienes SPIR-V compilado, Yotsuba lo acepta sin pasar por un lenguaje de alto nivel.',
             'Direct binary input: if you already have compiled SPIR-V, Yotsuba takes it without going through a high-level language.'),
        c: '; SPIR-V 1.5 — entrada binaria directa\n               OpCapability Shader\n          %1 = OpExtInstImport "GLSL.std.450"\n               OpMemoryModel Logical GLSL450\n               OpEntryPoint Fragment %main "main" %vUV %fragColor\n               OpExecutionMode %main OriginUpperLeft\n       %void = OpTypeVoid\n      %float = OpTypeFloat 32\n    %v2float = OpTypeVector %float 2' }
    ],

    /* --- matriz de plataformas por backend (Hybrid) --- */
    backends: [
      { id: 'monogame', n: 'MonoGame', logo: '../assets/monogame.webp' },
      { id: 'kni',      n: 'KNI',      logo: '../assets/kni.webp' },
      { id: 'fna',      n: 'FNA',      logo: '../assets/fna.webp' },
      { id: 'yotsuba',  n: 'Yotsuba Framework', logo: '../assets/framework-logo.webp' }
    ],
    destinos: [
      { n: T('Escritorio','Desktop'), s: T('Windows · macOS · Linux · SteamOS','Windows · macOS · Linux · SteamOS'), by: ['monogame','kni','fna','yotsuba'] },
      { n: T('Móvil','Mobile'),       s: T('Android · iOS · iPadOS','Android · iOS · iPadOS'),                       by: ['monogame','kni','fna','yotsuba'] },
      { n: T('Web','Web'),            s: T('Navegador (WebGL / WebGPU)','Browser (WebGL / WebGPU)'),                 by: ['kni','yotsuba'] },
      { n: T('Consolas','Consoles'),  s: T('Xbox · PlayStation · Switch','Xbox · PlayStation · Switch'),             by: ['monogame','fna'], lic: true },
      { n: T('Realidad extendida','Extended reality'), s: T('VR · AR · Vision Pro','VR · AR · Vision Pro'),           by: ['monogame','yotsuba'] },
      { n: T('TV y set-top','TV and set-top'), s: T('tvOS · Android TV','tvOS · Android TV'),                         by: ['monogame','kni'] }
    ],

    /* --- comparador --- */
    comparar: [
      { f: T('Cómo trabajas','How you work'),
        v: [T('Solo código, en tu IDE','Code only, in your IDE'), T('Código + editor dentro del juego','Code + editor inside the game'), T('App de editor con botón Play','Editor app with a Play button')] },
      { f: T('Editor visual','Visual editor'),
        v: [T('—','—'), T('Dentro de la ventana, en DEBUG','Inside the window, in DEBUG'), T('Aplicación de escritorio completa','A full desktop application')] },
      { f: T('En el binario final','In the final binary'),
        v: [T('Nada que quitar','Nothing to strip'), T('El editor sale en RELEASE','The editor leaves in RELEASE'), T('El juego se exporta aparte','The game exports separately')] },
      { f: T('Lenguaje','Language'), v: [T('C# / .NET','C# / .NET'), T('C# / .NET','C# / .NET'), T('C# / .NET','C# / .NET')] },
      { f: T('Backends XNA','XNA backends'), v: [T('Yotsuba Framework','Yotsuba Framework'), T('MonoGame · KNI · FNA · Yotsuba','MonoGame · KNI · FNA · Yotsuba'), T('MonoGame · KNI · FNA · Yotsuba','MonoGame · KNI · FNA · Yotsuba')] },
      { f: T('APIs gráficas','Graphics APIs'), v: ['Vulkan · Metal · DX12 · WebGPU', 'Vulkan · Metal · DX12 · WebGPU · OpenGL', 'Vulkan · Metal · DX12 · WebGPU · OpenGL'] },
      { f: T('Compute shaders','Compute shaders'), v: [T('Sí','Yes'), T('Sí','Yes'), T('Por el Framework','Through the Framework')] },
      { f: T('Lenguajes de shader','Shader languages'), v: ['7', '7', T('7, por el Framework','7, through the Framework')] },
      { f: T('Curva de entrada','Learning curve'), v: [T('Alta — tú montas todo','Steep — you build it all'), T('Media','Medium'), T('Baja — abre y empieza','Gentle — open and go')] },
      { f: T('Mejor si vienes de','Best if you come from'), v: [T('MonoGame · FNA · XNA','MonoGame · FNA · XNA'), T('MonoGame y quieres editor','MonoGame and want an editor'), T('Unity · Godot · GameMaker','Unity · Godot · GameMaker')] },
      { f: T('Regalías','Royalties'), v: ['0 %', '0 %', '0 %'] }
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

    /* --- preguntas frecuentes --- */
    faq: [
      { q: T('Las webs anteriores decían «gratis y open source». ¿Qué cambió?',
             'The earlier sites said “free and open source”. What changed?'),
        a: T('El proyecto pasa a un modelo de <b>pago único</b> por herramienta. Lo que no cambia es lo importante: sigue sin regalías, sin cuota por puesto y sin límite por lo que factures. <b>Revisa y ajusta esta respuesta antes de publicar</b>, según lo que decidas sobre la licencia del código.',
             'The project moves to a <b>one-time payment</b> per tool. What does not change is the part that matters: still no royalties, no per-seat fee and no cap on what you earn. <b>Review and adjust this answer before publishing</b>, according to what you decide about the code licence.') },
      { q: T('¿Tengo que elegir una y quedarme ahí para siempre?',
             'Do I have to pick one and stay there forever?'),
        a: T('No. Las tres se apoyan en el mismo núcleo, así que un proyecto empezado en Engine se puede seguir en Hybrid o en Framework. Cambias de puerta, no de casa.',
             'No. All three sit on the same core, so a project started in Engine can carry on in Hybrid or Framework. You change doors, not houses.') },
      { q: T('¿Pago otra vez cuando salga una versión nueva?',
             'Do I pay again when a new version comes out?'),
        a: T('La licencia es perpetua: la versión que compras es tuya. Mientras el proyecto esté en acceso anticipado, cada versión nueva de la línea que compraste te llega incluida.',
             'The licence is perpetual: the version you buy is yours. While the project is in early access, every new release of the line you bought comes included.') },
      { q: T('¿Puedo publicar y vender mi juego sin pagar nada más?',
             'Can I ship and sell my game without paying anything else?'),
        a: T('Sí. Cero regalías, sin reporte de instalaciones y sin límite de facturación. Lo que vendas es tuyo entero.',
             'Yes. Zero royalties, no install reporting and no revenue cap. What you sell is entirely yours.') },
      { q: T('¿Hace falta saber MonoGame o XNA para empezar?',
             'Do I need to know MonoGame or XNA to start?'),
        a: T('No hace falta, pero ayuda mucho. La API tiene forma de XNA, así que cualquier tutorial de MonoGame, FNA o KNI te sirve casi tal cual. Si vienes de Unity o Godot, Engine es la puerta pensada para ti.',
             'You do not need it, but it helps a lot. The API is XNA-shaped, so almost any MonoGame, FNA or KNI tutorial works nearly as is. Coming from Unity or Godot, Engine is the door built for you.') },
      { q: T('¿En qué estado está de verdad el proyecto?',
             'What state is the project really in?'),
        a: T('En desarrollo, y lo decimos en cada página. Hay grabaciones reales del editor de Hybrid y una captura real de WebGPU; las demos interactivas de esta web son maquetas. La tabla de plataformas marca qué es experimental y qué no.',
             'In development, and we say so on every page. There is real footage of the Hybrid editor and a real WebGPU capture; the interactive demos on this site are mock-ups. The platform table marks what is experimental and what is not.') },
      { q: T('¿Puedo probarlo antes de comprar?',
             'Can I try it before buying?'),
        a: T('Las demos de esta página corren en tu navegador sin instalar nada. Déjanos tu correo abajo y te avisamos en cuanto haya una build pública que puedas ejecutar en tu máquina.',
             'The demos on this page run in your browser with nothing to install. Leave your email below and we will tell you as soon as there is a public build you can run on your own machine.') },
      { q: T('¿Sirve para un estudio, o solo para proyectos personales?',
             'Is it for a studio, or only for personal projects?'),
        a: T('Para los dos. No hay licencia por puesto ni límite de tamaño de equipo, y el proyecto es código .NET normal, así que entra en el control de versiones y la integración continua que ya uses.',
             'For both. There is no per-seat licence and no team-size limit, and the project is ordinary .NET code, so it fits the version control and CI you already use.') }
    ],

    /* --- tira de credenciales --- */
    ticker: ['C# / .NET', 'VULKAN', 'METAL', 'DIRECTX 12', 'WEBGPU', 'COMPUTE SHADERS', 'MONOGAME', 'KNI', 'FNA',
             'ECS', 'glTF', 'PBR', 'TILED TMX', 'SPIR-V', 'SLANG', 'HLSL', 'GLSL', 'MSL',
             '0 % ROYALTIES', '2D + 3D', 'KRITA .KRA']
  };

  return { PRECIOS: PRECIOS, EN: EN, MSG: MSG, DATA: DATA };
}());
