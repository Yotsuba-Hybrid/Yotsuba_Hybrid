# Yotsuba — el sitio definitivo

Seis páginas: una portada que presenta los tres productos unificados y una página propia
por producto, más precios y comunidad. **El navbar solo lleva a páginas distintas**, nunca
a un ancla de la página en curso.

```
sitio/
  index.html       portada: héroe, los tres productos, papeleta, precios, comunidad
  framework.html   héroe propio + las nueve capacidades con pestañas
  hybrid.html      héroe propio + las cuatro hojas
  engine.html      héroe propio + el recorrido sobre la lámina
  precios.html     tarjetas, pack, comparativa y dudas
  comunidad.html   bloque índigo y formulario

  estilo.css       el sistema visual entero
  ingles.js        ← la traducción al inglés
  contenido.js     ← precios, productos, capacidades, plataformas y dudas
  sitio.js         comportamiento
  _generadores/    los scripts con los que se armaron las páginas (ver abajo)
```

Para verlo:

```bash
cd Landing && python3 -m http.server 8000
```

y abre `http://localhost:8000/v2/sitio/index.html`.

---

## Lo que tienes que rellenar

### 1. La URL de la demo — `contenido.js`

```js
var DEMO_WEBGPU = '';
```

Mientras esté vacía, el botón **«Pruébalo en el navegador»** sale desactivado con un aviso.
En cuanto pegues la URL, los botones de la portada y de Framework apuntan ahí y abren en
una pestaña nueva.

### 2. Los precios — `contenido.js`

```js
var PRECIOS = { moneda:'USD', simbolo:'$', framework:39, engine:69, hybrid:99, pack:149 };
```

Son **borrador**. Cambias los cuatro números y se recalcula todo solo: las tres tarjetas,
la barra de la portada, la banda dorada del pack con su «antes» tachado y el ahorro, los
botones de cada página y la papeleta.

### 3. El identificador de empresa para el formulario — `contenido.js`

```js
var CONTACTOS = {
  base:      'https://app-flexocable-prod-…azurewebsites.net',
  companyId: ''   // ⚠ PENDIENTE
};
```

El formulario de «avísame del lanzamiento» escribe en la API de contactos de
`Sender_Emails`, en su endpoint público `/api/v1/public/companies/{companyId}/contacts`.
**No lleva clave**: ese endpoint autoriza por el dominio desde el que se llama. Mientras
`companyId` esté vacío, el formulario avisa y no envía nada.

Para que funcione hacen falta **tres cosas que no se pueden hacer desde el sitio**:

1. **Autorizar los orígenes.** Un SuperAdmin añade `http://localhost:8000` y el dominio de
   producción en Empresas → Claves de API → Formulario público. Con la lista vacía todo
   responde `403`. El dominio de producción va como `https://…`; en `http` solo se acepta
   `localhost`. El puerto cuenta: `:8000` y `:3000` son entradas distintas.
2. **Desplegar el endpoint**, incluida la migración `PublicFormOrigins`, que añade la
   columna que necesita.
3. **Pegar el `companyId`**, que se ve en ese mismo diálogo.

Qué se envía, en una sola petición:

| Campo | Valor |
|---|---|
| `email`, `name` | lo que escribe la persona; el nombre ya no lleva el sufijo `[Framework/Hybrid]` |
| `phone` | texto, no número (la API lo exige así) |
| `source` | los productos marcados separados por comas: `YotsubaFramework,YotsubaEngine` |
| `tags` | el mismo valor, para poder segmentar los envíos |
| `website` | campo trampa contra robots: si viene relleno, la API finge éxito y no crea nada |

Dos cosas del comportamiento que conviene conocer:

* La API es **idempotente por correo** y **no modifica un contacto que ya existe**. Por eso
  se manda una sola petición con los productos juntos: repetir la llamada con otro `source`
  no grabaría nada nuevo. Y por eso un correo repetido devuelve `200` y ve el mismo mensaje
  de éxito — distinguirlo delataría quién está en la lista.
* El `403` (dominio no autorizado) y el `429` (más de 10 envíos por minuto) **salen sin
  cabeceras CORS**, así que el navegador no puede leerlos: llegan como un error de red
  indistinguible. El sitio los trata juntos y explica las tres causas por consola. Se
  arreglaría en la API moviendo `AddCors` antes del `return` del 403 y añadiendo un
  `OnRejected` al limitador.

### 4. La postura sobre open source

La primera duda de `precios.html` —«las webs anteriores decían gratis y open source, ¿qué
cambió?»— está escrita como marcador de posición en `contenido.js` (`DATA.dudas[0]`).
**Reescríbela según lo que decidas sobre la licencia**: esa frase decide si la comunidad
que ya tienes se queda o se va.

---

## El sistema visual

Es el original de las tres webs de `v2/`, no uno nuevo. Cuatro gestos que se repiten y que
conviene no romper:

1. **El radio pétalo.** `border-radius: var(--wobble)` en botones, chips, badges y
   pestañas. No es un radio normal: son cuatro radios horizontales y cuatro verticales
   cruzados, y es la firma de forma del proyecto.
2. **Sombra dura sin desenfoque.** `4px 4px 0` en reposo, `7px 7px 0` al pasar por encima
   con un giro de −0,6°, `1px 1px 0` al pulsar.
3. **`font-stretch`**, no `font-variation-settings`: 75 % en titulares, 78 % en los de
   capacidad, 82 % en subtítulos, 85 % en destacados. Necesita Bricolage Grotesque variable.
4. **Bordes rasgados por `clip-path`**, generados en `sitio.js` con un ruido sembrado por
   índice: el desgarro no baila al recargar. Se piden con `data-torn="top bottom"`.

**No hay lente.** Los héroes muestran la ilustración entera, con un crédito discreto abajo
a la derecha (`.plate-tag`). Se quitó el círculo que revelaba la capa técnica, junto con su
anillo, su etiqueta, el panel de código y la pista «¡Mueve el cursor!».

**El pigmento** se declara con `data-p` en el `<body>` o en cualquier sección:
`fw` cobalto y cian, `hy` rosa y violeta, `en` violeta y cian. Todo lo que reacciona usa
`var(--p)` y `var(--p2)`. La portada usa el rojo de las capas (`--cape`).

### El titular relleno

La segunda línea del héroe se pinta con la ilustración y contorno de tinta. Son dos capas
sobre el mismo `<span>`: el span lleva `-webkit-text-stroke` gordo, y un `::after` repite
el texto con `content: attr(data-w)` y el fondo recortado a la letra.

Ojo al editar: **`data-t` es la clave de traducción y `data-w` es el texto que se pinta**.
Son atributos distintos a propósito; `sitio.js` reescribe `data-w` solo cada vez que
cambias de idioma. Si los confundes, la línea desaparece.

---

## Cómo se publica

El repositorio usa **GitHub Pages**, sirviendo la raíz de la rama `main`:

```
https://yotsuba-hybrid.github.io/Yotsuba_Hybrid/
```

El `index.html` de la raíz es un **redirector** que lleva a `v2/sitio/`, conservando la
cadena de consulta y el ancla. La web anterior sigue accesible en `/web-anterior.html`.

Tres cosas que conviene tener presentes:

* **El origen para la lista blanca de la API es `https://yotsuba-hybrid.github.io`** — sin
  la ruta. Es lo que hay que autorizar en Empresas → Claves de API → Formulario público
  para que funcione el formulario en producción. En local, `http://localhost:8000`.
* **Jekyll está activo** (Pages de tipo *legacy*). Ignora todo lo que empiece por `_`, así
  que `_generadores/` no se publica, que es justo lo que queremos. Ninguna página usa
  sintaxis Liquid (`{{` o `{%`), así que no hay nada que se pueda romper. Si algún día
  añades un archivo con llaves dobles, crea un `.nojekyll` en la raíz.
* **Los vídeos `.mov` no están en el repositorio.** Pesan 336 y 276 MB y GitHub rechaza
  cualquier archivo de más de 100 MB. El sitio usa los `.mp4` comprimidos que están al
  lado; los `.mov` son el original de edición y hay que guardarlos aparte.

---

## Autoría y contacto

Aparecen en **las seis páginas**, en el pie:

* **Yotsuba Studios** como autor, con la etiqueta «Desarrollado por» (`foot.by`).
* **Memphis Yomael Núñez Cruz**, CEO (`foot.ceo` traduce solo el cargo; el nombre no se
  traduce, va literal en el HTML).
* El correo **yotsubahybrid.official@outlook.com** como enlace `mailto:`.
* El aviso de derechos, en `foot.copy`.

En **Comunidad** el correo sale además en un recuadro destacado junto a las redes, con el
nombre del estudio y del CEO debajo (`co.ctk` y `co.ceo`).

---

## La marca

El logotipo es **YOTSUBA** en negrita más **Game Studio** en tipografía de pincel. Vive en
la clave `nav.tag` y aparece en la cabecera y en el pie de las seis páginas; cambiándola
ahí se cambia en todas.

El pack de los tres productos se llama **Yotsuba completo** (`pr.bdH`), no «el taller»:
ese nombre anterior colgaba del eslogan viejo y se quedaba huérfano.

---

## Cómo editar los textos

**Español:** directamente en el HTML. Cada texto lleva `data-t` (texto plano), `data-th`
(admite negritas y `<br>`) o `data-ta` (atributos como `alt` o `aria-label`).

**Inglés:** el objeto de `ingles.js`, con la misma clave. Si añades un texto en español y
olvidas el inglés, la web muestra el español en vez de romperse.

**Listas y tablas:** todo lo que se repite vive en `DATA` dentro de `contenido.js`, con los
dos idiomas juntos en cada entrada: `productos`, `capacidades`, `plataformas`, `comparar`
y `dudas`.

Los archivos llevan `?v=16` en los enlaces a CSS y JS. Sube ese número cuando edites, para
que a nadie le quede una versión vieja en caché.

---

## Los generadores

Las seis páginas se armaron con los scripts de `_generadores/` para que el navbar y el pie
salieran idénticos. **El HTML ya es estático y se edita a mano.** Solo vuelve a ejecutarlos
si cambias el navbar o el pie:

```bash
cd v2/sitio/_generadores && python3 _portada.py && python3 _framework.py && python3 _hybrid.py && python3 _engine.py && python3 _precios.py && python3 _comunidad.py
```

Ojo: eso **sobrescribe** los seis HTML, así que perderías lo que hayas editado a mano.

---

## Detalles

* Sin dependencias ni compilación. Cinco archivos y las fuentes de Google.
* El formulario escribe en la misma tabla `Personas` de Supabase de siempre, añadiendo
  entre corchetes qué productos marcó la persona.
* Accesibilidad: saltar al contenido, `aria-*` en los controles, foco visible y respeto de
  `prefers-reduced-motion` (detiene la lluvia y el parpadeo del badge).
* Responsive desde 360 px. En móvil el titular va primero y la lámina baja debajo.
* **El menú nunca desaparece.** Por encima de 1150 px es la píldora centrada con los
  nombres completos; por debajo baja a una segunda fila como tira de pastillas
  desplazable en horizontal, con la página activa marcada.

## Las ilustraciones

| Archivo | Origen | Dónde sale |
|---|---|---|
| `enuma.webp` (2000×3001) | — | héroe de portada y Framework, y las portadillas duotono de las cinco páginas |
| `engine-enuma.webp` (1024×1536, 409 KB) | convertido de `engine enuma original.png` con `cwebp -q 82 -m 6 -sharp_yuv` | héroe y recorrido de Engine |
| `hybrid-hero.webp` (2200×1200) | — | héroe de Hybrid |

La versión anterior de la de Engine quedó guardada como `engine-enuma-anterior.webp` por si
quieres volver atrás. **Al desplegar**, ten en cuenta que el archivo nuevo conserva el mismo
nombre: quien ya tuviera el viejo en caché seguirá viéndolo hasta que caduque. Si te urge,
renómbralo (por ejemplo `engine-enuma-2.webp`) y actualiza las tres referencias de
`engine.html`.

Para reconvertir desde el PNG original:

```bash
cd v2/assets && cwebp -q 82 -m 6 -mt -sharp_yuv "engine enuma original.png" -o engine-enuma.webp
```

## Cosas que encontré y no puedo arreglar yo

* `assets/cap-shaders.webp` tiene una errata en la propia imagen: «Shader **Languajes**
  Supported». Ya no aparece en la web, pero conviene corregirla si la usas en redes.
* `assets/variante.png` (2,7 MB) no se usa. Si lo quieres, conviértelo a WebP antes.
