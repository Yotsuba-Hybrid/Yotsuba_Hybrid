**YOTSUBA PROJECT**  
Herramienta de Creación de videojuegos y apps empresariales.

# Yotsuba Hybrid

## **June 09, 2026**

# Overview

¿Qué es Yotsuba Hybrid? Yotsuba Hybrid es un híbrido entre un framework y un engine, que propone una forma mucho más eficiente de desarrollar videojuegos. Combina la versatilidad y control total de un framework, con herramientas visuales de un Engine para simplificar el desarrollo, aprovechando todas las capacidades del ecosistema de .NET, sin salir de este, como si lo hacen los Game Engine comerciales.

El nombre *“Yotsuba”* tiene un significado literal “Cuatro Hojas”, y cada una de sus hojas representan los 4 Pilares de Yotsuba: 

# Pilares

1. **Portabilidad:** En Yotsuba Hybrid, el editor visual no funciona como una aplicación externa separada del juego. El editor está integrado dentro del propio proyecto y puede abrirse directamente al ejecutar el juego en una configuración especial de desarrollo.

   Esto significa que el desarrollador no necesita abrir un motor aparte para construir su videojuego. Puede trabajar desde su IDE favorito y ejecutar el proyecto para acceder al editor visual dentro de la misma ventana donde se renderiza el juego.

   En lugar de tratar el engine y el código como dos mundos separados, Yotsuba los une en un mismo flujo de trabajo. El resultado es una experiencia más natural para desarrolladores de C\# y .NET, especialmente para quienes prefieren mantener el control del proyecto desde el código fuente.

   El editor visual está protegido mediante directivas de compilación. Esto permite que, al compilar el proyecto en modo Release o Publish para producción, el código del editor no forme parte del binario final. De esta manera, el juego publicado no carga ni incluye herramientas internas de desarrollo que solo tienen sentido durante la creación del proyecto.

   En términos prácticos, el desarrollador puede crear, editar y probar su juego desde el mismo entorno, sin sacrificar limpieza, portabilidad ni rendimiento en la versión final.

   

2. **Calidad en Arquitectura:** Yotsuba Hybrid está formado por dos conceptos principales: Yotsuba Framework y Yotsuba Engine. Aunque durante el desarrollo ambos funcionan como una experiencia unificada, internamente tienen responsabilidades distintas.

   Esta separación permite que el sistema sea más ordenado, más extensible y más fácil de mantener a largo plazo.

   **Yotsuba Framework** Yotsuba Framework es una reimplementación moderna, desde cero, inspirada en el antiguo XNA Framework de Microsoft. Su propósito es conservar una API familiar para desarrolladores que conocen XNA, MonoGame o KNI, pero reemplazando las limitaciones internas heredadas por una arquitectura preparada para las APIs gráficas actuales.

   La meta no es copiar XNA de forma literal, sino reconstruir su experiencia de desarrollo sobre una base más eficiente, más escalable y mejor preparada para renderizado moderno.

   Yotsuba Framework conserva firmas, patrones y namespaces compatibles con el estilo XNA cuando esto aporta valor al desarrollador. Sin embargo, internamente está diseñado para aprovechar mejor la GPU, permitir una organización más moderna de los comandos de renderizado y ofrecer mayor rendimiento en escenarios con muchos sprites, modelos 3D o elementos visuales en pantalla.

   Uno de los objetivos principales de Yotsuba Framework es permitir renderizado paralelo de sprites y modelos 3D. Esta capacidad busca superar una de las limitaciones de frameworks tradicionales basados en XNA, donde muchas operaciones de renderizado se ejecutan siguiendo un flujo más antiguo y menos adaptado a las capacidades de Vulkan, WebGPU, Metal o DirectX 12\. 

   Yotsuba Framework también integra backends gráficos específicos para cada plataforma. La intención es utilizar la API gráfica más adecuada según el destino:

* Vulkan para Windows, Linux, Android y SteamOS.  
* Metal para iOS, iPadOS, macOS, Apple TV y Apple Vision Pro.  
* WebGPU para la web.  
* DirectX 12 Ultimate para plataformas Microsoft compatibles.

  Esto permite que el mismo proyecto pueda adaptarse a distintas plataformas sin depender siempre de una única tecnología gráfica genérica.

  **Sistema de shaders con Slang** 

  Yotsuba propone reemplazar el uso tradicional de shaders `.fx`, heredados de XNA, por Slang como lenguaje principal de shaders en los backends modernos.

  La razón principal es que Slang permite escribir shaders de forma más modular, reutilizable y portable. En lugar de mantener versiones separadas del mismo shader para Vulkan, Metal, DirectX, OpenGL o WebGPU, Slang permite trabajar con una fuente más unificada que luego puede traducirse a diferentes destinos gráficos.

  Esto reduce la necesidad de llenar el código shader con condiciones específicas por plataforma, como `#if Vulkan`, `#if OpenGL` o `#if DirectX`. También facilita dividir los shaders en varios archivos, importar código común, reutilizar funciones y organizar mejor el pipeline gráfico.

  Para Yotsuba, esto es importante porque el proyecto no busca depender de una sola plataforma. Si el objetivo es ejecutar el mismo juego en escritorio, móvil, web, consolas y dispositivos Apple, entonces el sistema de shaders debe estar diseñado desde el principio para esa realidad multiplataforma.


  **Sistema de visibilidad y oclusión** 

  Yotsuba Hybrid también contempla un sistema automático de visibilidad y oclusión. Su función es evitar que el motor dedique recursos a renderizar elementos que no son visibles para la cámara o que están completamente ocultos detrás de otros objetos.

  Esto ayuda a mejorar el rendimiento, especialmente en escenas grandes o con muchos modelos. En lugar de enviar todo a la GPU sin distinguir qué se ve y qué no, Yotsuba analiza la escena y prioriza los elementos que realmente deben ser dibujados.

  Este sistema busca acercarse al objetivo que persiguen las tecnologías modernas de optimización visual: renderizar más contenido útil, reducir trabajo innecesario y mantener estabilidad en la tasa de cuadros por segundo.


  **Yotsuba Engine** es una capa superior construida sobre Yotsuba Framework. Su función no es reemplazar al framework, sino ampliar sus capacidades con herramientas de alto nivel para construir juegos y aplicaciones de forma más rápida.

  Yotsuba Engine se encarga de elementos como:

* Entidades.  
* Componentes.  
* Sistemas.  
* Escenas.  
* Scripting.  
* Editor visual.  
* Herramientas de desarrollo.  
* Flujo de trabajo para prototipado.  
* Conversión de contenido visual a código C\#.  
  Una característica importante es que Yotsuba Engine es agnóstico a la implementación XNA sobre la que se ejecute. Esto significa que puede funcionar sobre Yotsuba Framework, MonoGame, KNI o FNA. Todos estos backends son gratuitos y open source.  
  Además, Yotsuba Engine no se entrega como una librería cerrada que el desarrollador no pueda modificar. La idea es que esté disponible como un proyecto editable de C\#, incluido dentro de la solución del usuario. De esta manera, el desarrollador puede modificar comportamientos internos, extender sistemas existentes o crear nuevas herramientas según las necesidades de su juego.  
  Yotsuba Engine opera en tres momentos principales: tiempo de ejecución, tiempo de compilación y tiempo de desarrollo. 

### **A. Tiempo de ejecución**

En tiempo de ejecución, Yotsuba Engine coordina el funcionamiento de entidades, componentes y sistemas del juego.

Uno de sus conceptos internos son los runtimes. Un runtime es un módulo encargado de observar, organizar y actualizar una parte específica del juego. Su función no es calcular todo de forma repetitiva en cada frame, sino mantener información útil sobre el estado del juego y reaccionar cuando ese estado cambia.

Por ejemplo, en un sistema de físicas, no tiene sentido comprobar colisiones entre un jugador y una estructura situada a un kilómetro de distancia si, por posición y tamaño, es imposible que ambos objetos interactúen. Un runtime de físicas puede detectar esto y limitar las comprobaciones a los objetos que realmente tienen posibilidad de colisionar.

Si el jugador se teletransporta, el sistema no se queda con una predicción anterior. El runtime reacciona al cambio de posición, actualiza las entidades relevantes y recalcula cuáles objetos deben considerarse para futuras colisiones.

Este enfoque busca reducir cálculos innecesarios, mejorar el rendimiento y permitir que los sistemas del juego sean más inteligentes en la forma en que administran sus recursos.

Además, el sistema de físicas está pensado para aprovechar aceleración por hardware cuando sea posible. Esto permitiría ejecutar cálculos masivos en paralelo usando la GPU, liberando carga del CPU y mejorando el rendimiento en escenas complejas.

### **B. Tiempo de compilación**

En tiempo de compilación, Yotsuba Engine convierte en código C\# las decisiones tomadas desde el editor visual.

Esto significa que las escenas, entidades y componentes creados visualmente no tienen que depender únicamente de archivos externos como JSON para ser cargados en tiempo de ejecución. En su lugar, Yotsuba puede transformar esa información en objetos C\# generados durante la compilación, como si el desarrollador los hubiera escrito manualmente.

Este enfoque tiene varias ventajas:

* Reduce la necesidad de leer archivos de texto grandes al iniciar el juego.  
* Mejora los tiempos de carga.  
* Hace que el proyecto final sea más directo y eficiente.  
* Permite que el contenido creado visualmente se integre mejor con el código.  
* Facilita optimizaciones antes de que el juego llegue al usuario final.

  Esto es especialmente útil en móviles y plataformas donde leer archivos extensos durante el inicio puede afectar el rendimiento o aumentar el tiempo de carga.

### **C. Tiempo de desarrollo**

En tiempo de desarrollo, Yotsuba Engine ofrece herramientas para construir el juego de forma más rápida y organizada.

El editor visual permite crear escenas, colocar entidades, ajustar componentes y configurar sistemas sin escribir código para cada detalle repetitivo. Sin embargo, el desarrollador conserva siempre la posibilidad de hacerlo todo desde código si así lo prefiere.

La idea no es sustituir la programación, sino evitar que el programador tenga que escribir manualmente tareas que pueden resolverse mejor con una interfaz visual.

Yotsuba busca ofrecer velocidad de prototipado sin perder control técnico. Lo creado en el editor puede se convertirá en código C\#, y lo escrito en código puede convivir con el flujo visual del engine.

3. **Una Sola Base, Múltiples Destinos:** Yotsuba Hybrid busca permitir que un mismo proyecto pueda desplegarse en múltiples plataformas desde una base de código compartida.

   Entre los destinos se encuentran:

* Windows.  
* Linux.  
* Android.  
* macOS.  
* iOS.  
* iPadOS.  
* Apple TV.  
* Apple Vision Pro.  
* SteamOS.  
* Web.  
* Xbox.  
* PlayStation.  
* Nintendo Switch.

  El proyecto se organiza alrededor de una librería compartida donde vive la lógica principal del juego. También puede incluir librerías opcionales para código específico de plataforma, por ejemplo:

* Desktop.  
* Mobile.  
* Apple.  
* Microsoft.  
* Consoles.

  Además de estas librerías compartidas, el proyecto puede tener ejecutables específicos para cada plataforma destino. Esto permite mantener una arquitectura ordenada: la lógica principal se comparte, mientras que cada plataforma conserva su punto de entrada y configuración particular.

  Yotsuba Hybrid adopta una estrategia flexible: reúne backends gratuitos y open source para ampliar compatibilidad y ofrecer distintos niveles de rendimiento.

  **Backends open source:**

  Los backends open source permiten que Yotsuba pueda apoyarse en tecnologías existentes como MonoGame, KNI y FNA, además de Yotsuba Framework y sus backends nativos propios, que también serán gratuitos y open source.

### **MonoGame**

MonoGame aporta compatibilidad con plataformas como:

* DesktopGL.  
* Windows.  
* Android.  
* iOS.  
* Plataformas de consola disponibles mediante sus respectivos programas de acceso.

  Esto lo convierte en una ruta útil para proyectos que necesitan compatibilidad amplia sin depender desde el primer día de los backends nativos de Yotsuba.


  

### **KNI**

KNI permite cubrir otros escenarios, como:

* Android.GL.Xamarin.  
* Android.GL  
* BlazorGL.  
* CardBoard.GL.  
* Oculus.GL.  
* SDL2.GL.  
* UAP.DX11.  
* WinForms.DX11.  
* iOS.GL.

  Esto amplía la presencia de Yotsuba en escritorio, móvil, web, SteamOS, realidad virtual y realidad aumentada.

  **Backends nativos de Yotsuba** 

  Los backends nativos de Yotsuba están pensados para obtener el mayor rendimiento posible en plataformas modernas.

  **Entre ellos se contemplan:**

* Desktop.Vulkan.  
* Android.Vulkan.  
* SteamOS.Vulkan.  
* iOS.Metal.  
* macOS.Metal.  
* iPadOS.Metal.  
* AppleTV.Metal.  
* AppleVisionPro.Metal.  
* Angular.WebGPU.  
* Blazor.WebGPU.  
* React.WebGPU.  
* Microsoft.DX12 Ultimate.

  La diferencia principal entre los backends open source y los backends nativos de Yotsuba es el nivel de optimización. Mientras los backends open source priorizan compatibilidad y disponibilidad, los backends nativos buscan aprovechar directamente las APIs gráficas modernas de cada plataforma.

  En el caso de **PlayStation** y **Nintendo Switch**, Yotsuba mantiene la compatibilidad de código, pero la integración nativa requiere procesos adicionales debido a las licencias y restricciones propias de esos ecosistemas. Por esa razón, el soporte nativo para esas consolas puede tomar más tiempo. Aun así, el despliegue hacia consolas podría ser posible mediante rutas ya existentes en MonoGame, según el acceso y las licencias correspondientes.


4. **Un modelo gratuito y open source para el desarrollador:**  
1. Yotsuba Hybrid propone un modelo en el que el desarrollador pueda comenzar, crear, publicar y escalar sin que el motor se convierta en una barrera económica.

   Yotsuba Engine y Yotsuba Framework serán gratuitos y open source, al igual que las demás implementaciones compatibles: MonoGame, KNI y FNA. El desarrollador podrá crear y lanzar su videojuego usando cualquiera de los cuatro backends sin pagar licencias por el framework o el engine.

   Este enfoque mantiene el proyecto accesible para estudiantes, desarrolladores independientes, equipos pequeños y estudios profesionales, sin límites asociados al tamaño o éxito del proyecto.

2. **¿Cuándo elegir Yotsuba Framework?** Un ejemplo claro sería un juego que comienza como un proyecto pequeño, pero con el tiempo crece en cantidad de jugadores, complejidad visual, número de modelos 3D o carga de renderizado.  
   El desarrollador puede elegir MonoGame, KNI, FNA o Yotsuba Framework desde el inicio y cambiar de backend según las necesidades técnicas. Si el proyecto necesita más rendimiento, menor latencia o mejor aprovechamiento de la GPU, puede migrar a Yotsuba Framework con backends nativos sin ningún cambio de licencia o costo.  
   Los backends nativos de Yotsuba ofrecerían ventajas como:  
* Renderizado paralelo.  
* Mejor aprovechamiento de Vulkan, Metal, WebGPU y DirectX 12\.  
* Sistema de visibilidad y oclusión.  
* Aceleración por hardware.  
* Mejor rendimiento en plataformas específicas.  
* Mayor capacidad para manejar escenas exigentes.  
  La intención es que la elección del backend dependa únicamente de las necesidades técnicas del proyecto, no de una barrera económica.

	**Rendimiento como propuesta de valor** 

El rendimiento de Yotsuba Framework se basa en usar APIs modernas de bajo nivel y backends diseñados específicamente para cada plataforma.

Por ejemplo:

* En plataformas Apple, Yotsuba busca usar Metal en lugar de depender de rutas gráficas menos adecuadas para ese ecosistema.  
* En Android, Yotsuba busca usar Vulkan para aprovechar mejor las capacidades modernas de la GPU.  
* En la web, Yotsuba busca usar WebGPU en lugar de depender únicamente de WebGL.  
* En Windows y Xbox, Yotsuba contempla DirectX 12 Ultimate como ruta de alto rendimiento.  
  WebGPU es especialmente importante porque permite que la web se acerque más al rendimiento de las APIs gráficas modernas. Según la plataforma donde se ejecute el navegador, WebGPU puede apoyarse internamente en tecnologías como Vulkan, DirectX 12 o Metal.  
  Esto convierte a la web en un destino más serio para videojuegos y aplicaciones interactivas avanzadas.

**Más allá de los videojuegos** 

Aunque Yotsuba Hybrid nace como una herramienta para crear videojuegos, su arquitectura también puede aplicarse a software empresarial, simuladores, herramientas visuales, aplicaciones interactivas y entornos técnicos que requieran alto rendimiento gráfico.

La integración con tecnologías como Avalonia UI permitiría llevar Yotsuba hacia aplicaciones de escritorio modernas. También se contempla investigar una posible integración con MAUI para ampliar el alcance hacia otros tipos de aplicaciones .NET.

Yotsuba también propone integración con frameworks web como Angular, Blazor y React mediante WebAssembly. La idea es que el desarrollador pueda escribir la lógica principal en C\# y exponerla hacia aplicaciones web sin depender completamente de JavaScript o TypeScript, aunque seguiría siendo posible interactuar con esas tecnologías cuando el proyecto lo requiera.

Esto convierte a Yotsuba Hybrid en una herramienta que no se limita al videojuego tradicional, sino que puede funcionar como base para experiencias interactivas multiplataforma.

# ¿Qué problema busca resolver?

Yotsuba Hybrid busca resolver tres problemas principales del desarrollo actual de videojuegos y aplicaciones interactivas.

## **Los motores comerciales limitan el uso real de .NET**

Los motores comerciales suelen obligar al desarrollador a trabajar dentro de su propio ecosistema. Aunque algunos permiten escribir scripts en C\#, el proyecto no siempre funciona como una aplicación .NET completa y libremente configurable.

Esto puede traer varias limitaciones:

* Dificultad para usar ciertas librerías NuGet.  
* Dependencia de versiones específicas o antiguas de .NET.  
* Restricciones en la configuración del proyecto.  
* Menor control sobre el archivo `.csproj`.  
* Integración limitada con herramientas modernas del ecosistema .NET.  
* Uso de C\# más como lenguaje de scripting que como plataforma completa de desarrollo.

  Yotsuba busca cambiar ese enfoque. El objetivo es que el juego siga siendo un proyecto real de C\# y .NET, donde el desarrollador pueda decidir cómo configurar, compilar, organizar y extender su aplicación.

  Además, Yotsuba no obliga al desarrollador a depender siempre de AOT. Cuando la plataforma lo permita, el proyecto puede ejecutarse con JIT, lo que ofrece ventajas importantes en escritorio y en escenarios donde la flexibilidad del runtime de .NET sea útil.

  **Los frameworks dan libertad, pero obligan a construir demasiado desde cero** 

  Los frameworks de videojuegos ofrecen mucho control, pero también exigen que el desarrollador construya manualmente muchas herramientas básicas.

  Esto incluye elementos como:

* Manejo de escenas.  
* Sistema de entidades.  
* Componentes.  
* Editor visual.  
* Inspector.  
* Serialización.  
* Herramientas de prototipado.  
* Flujo de trabajo para assets.  
* Automatización de tareas repetitivas.

  Yotsuba Hybrid busca conservar la libertad de un framework, pero añadiendo herramientas visuales propias de un engine. Así, el desarrollador puede evitar tareas repetitivas sin perder acceso al código ni quedar encerrado en una forma única de trabajar.

  Una diferencia clave es que lo creado en el editor visual puede convertirse en código C\# durante la compilación. Esto permite que el contenido visual no sea una capa externa desconectada, sino parte real del proyecto compilado.

  Además, Yotsuba no obliga a usar únicamente los sistemas predefinidos del engine. El desarrollador puede crear componentes personalizados, modificar sistemas existentes o cambiar partes internas del engine porque el código está disponible como una librería editable dentro del proyecto.

  ## **Los frameworks basados en XNA arrastran limitaciones técnicas**

  Los frameworks actuales inspirados en XNA, como MonoGame y KNI, han sido muy importantes para la comunidad, pero arrastran decisiones técnicas heredadas de una época anterior.

  Muchas de sus estructuras fueron pensadas alrededor de APIs como OpenGL, DirectX 9, DirectX 11 o flujos de renderizado menos adecuados para las GPUs modernas. Esto puede limitar la forma en que aprovechan tecnologías actuales como Vulkan, Metal, WebGPU o DirectX 12\.

  También existe una limitación en el sistema tradicional de shaders `.fx`, que resulta menos práctico para un entorno moderno, multiplataforma y modular.

  Yotsuba Framework busca mantener la familiaridad de XNA donde sea útil, pero reconstruyendo la base interna para que pueda aprovechar mejor las APIs gráficas actuales, los shaders modernos, el paralelismo y la aceleración por hardware.

	**Propuesta de valor**

Yotsuba Hybrid propone una forma de desarrollo donde el programador de C\# no tiene que abandonar .NET para crear videojuegos o aplicaciones interactivas de alto rendimiento.

Su valor principal se resume en los siguientes puntos:

* Mantiene el proyecto como una solución real de C\# y .NET.  
* Combina libertad de framework con herramientas visuales de engine.  
* Integra un editor visual embebido dentro del propio juego.  
* Permite compilar el contenido visual a código C\#.  
* Ofrece backends open source para compatibilidad amplia.  
* Propone backends nativos para alto rendimiento.  
* Usa APIs gráficas modernas según la plataforma.  
* Plantea Slang como sistema moderno de shaders.  
* Permite modificar el engine desde el propio proyecto.  
* Busca desplegar a escritorio, móvil, web, consolas y dispositivos Apple desde una base compartida.  
  * Puede extenderse hacia aplicaciones empresariales e interactivas fuera del videojuego tradicional.

  ***En esencia, Yotsuba Hybrid busca ser una herramienta para desarrolladores que quieren la productividad de un engine, la libertad de un framework y el poder completo del ecosistema .NET.***

  # **Visión del proyecto**

  Yotsuba Hybrid no se plantea como una simple alternativa educativa ni como una copia de motores existentes. Su visión es competir en el futuro del desarrollo de videojuegos y aplicaciones interactivas, especialmente para desarrolladores que valoran C\#, .NET, el control del código y el rendimiento multiplataforma.

  El objetivo es crear una herramienta capaz de acelerar el desarrollo sin encerrar al programador, permitir alto rendimiento sin abandonar la productividad, y ofrecer una arquitectura moderna que pueda crecer desde proyectos pequeños hasta juegos y aplicaciones de mayor escala.

  Yotsuba Hybrid busca convertirse en una plataforma donde el desarrollador pueda empezar simple, crecer sin cambiar de tecnología y desplegar su proyecto en múltiples destinos sin reconstruirlo desde cero para cada plataforma.

  La meta final es clara: hacer que C\# y .NET sean una base de primer nivel para construir videojuegos, experiencias interactivas y aplicaciones visuales de alto rendimiento.

