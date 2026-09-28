# Yotsuba Engine — apuesta comercial y cambios de UI

## Por qué este posicionamiento
Tres productos, tres públicos, un mismo motor por dentro:

| Producto | Público | Promesa |
|---|---|---|
| Framework | Programadores que quieren solo código (XNA/MonoGame/FNA) | La biblioteca XNA moderna: shaders, backends nativos |
| Hybrid | Quien quiere código + editor dentro del juego | El editor vive en la ventana del juego (DEBUG) y desaparece en RELEASE |
| **Engine** | Creadores que esperan "abrir el editor, dar Play, exportar" | Un motor C# gratis, con app de editor |

**Apuesta del Engine:** "el motor C# que realmente es tuyo". Es el hueco comercial más grande porque
combina tres cosas que hoy rara vez se ven juntas: C# real (IDE, debugger, NuGet), editor de escritorio
y licencia libre sin regalías. Es el público con más volumen (indies, estudiantes, gente que migra de otros
motores) y el que menos conoce el proyecto, así que es el mejor embudo hacia Hybrid y Framework.

**Escalera, no tres islas:** la web enseña "Tres puertas, una familia": se empieza por Engine y se
baja a Hybrid o Framework sin reescribir. Es la ventaja competitiva más difícil de copiar.

## Reglas de honestidad que sigue la web
- Estado "Early access · in development"; el editor interactivo se declara boceto, no build real.
- Compute en Framework no se presenta como disponible en Engine (solo documentado/referencia en Metal).
- WebGPU: preview, sin editor ni audio en wasm. iOS/Metal: experimental.
- API "puede cambiar" (README raíz).

## Cambios de UI en Hybrid para que se sienta Engine
Hoy (captura real): Scene Manager, Texture Regions, Entity Manager, Console, menú Files/History/Rebuild/Play.
Propuesta, por impacto:
1. **Project hub** al abrir la app: crear/abrir proyecto, plantillas 2D y 3D. Es lo primero que define "esto es un motor".
2. **Paneles acoplables** con layouts guardados (ImGui docking).
3. **Play in editor** con Pause/Step y restauración del estado de edición (la web lo simula).
4. **Gizmos** mover/rotar/escalar en el viewport y selección con clic.
5. **Content browser** con miniaturas (sustituye Texture Regions).
6. **Build & Export** con lista de destinos y estado por plataforma.
7. Jerarquía con padres y arrastrar/soltar; búsqueda/paleta de comandos; autosave.
Técnicamente: mismo `YotsubaEngine/` compartido; el Engine es un host de escritorio que abre el editor a
pantalla completa (sin juego debajo) y ejecuta el juego como proceso/host aparte.

## Pendientes / decisiones tuyas
- Logo: `assets/engine-logo-neon.webp` (desde `engine/engine logo definitivo.png`). Paleta neón de acuarela tomada del logo: cian #39CAEC, azul #2683DE, violeta #9447E5, magenta #D458EF, rosa #F350A5, durazno #FBC28B, sobre índigo profundo #0B0B2E. Definida en `engine/engine-neon.css`.
- Formulario: usa la tabla `Personas` de Hybrid con `" [Engine]"` añadido al nombre para distinguirlos.
- Web solo en inglés (Hybrid tiene ES/EN); traducir antes del lanzamiento si el público es hispano.
- Confirma si "Supported target" es la etiqueta correcta para cada plataforma (viene de proyectos presentes en el repo, no de certificación).
