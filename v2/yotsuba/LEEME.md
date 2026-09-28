# Yotsuba — sitio único de la familia

Una sola página para las tres herramientas. Sustituye a `../framework/`, `../hybrid/`
y `../engine/`, que quedan intactas como respaldo.

```
yotsuba/
  index.html    estructura y copy en español
  yotsuba.css   el sistema visual completo
  copy.js       ← LO QUE VAS A EDITAR: precios, inglés, tablas y FAQ
  yotsuba.js    comportamiento (lente, demos, tablas, formulario)
```

Para verla:

```bash
cd Landing && python3 -m http.server 8000
```

y abre `http://localhost:8000/v2/yotsuba/index.html`.

---

## La idea visual: el taller de imprenta

Papel cálido con grano, tinta casi negra, un rojo de la casa tomado de las capas de
los viajeros del cuadro, bordes rasgados entre secciones y pliegos numerados. Encima,
**cada producto trae su propio pigmento**, que se activa con el atributo `data-p`:

| | pigmento | dónde manda |
|---|---|---|
| `data-p="fw"` | cobalto → cian | acto I, tarjeta de precio, columna del comparador |
| `data-p="hy"` | rosa → violeta | acto II |
| `data-p="en"` | violeta → cian | acto III |

Todo lo que reacciona al pigmento usa `var(--p)` y `var(--p2)`, así que cambiar un
color de producto es tocar una línea en `:root` de `yotsuba.css`.

### Los cuatro recursos que sostienen la identidad

**1. Una lámina, tres tintas.** Los tres cuadros que tienes son la misma escena en tres
tratamientos. La web lo aprovecha literalmente: las tres aperturas de acto usan
`enuma.webp`, cada una pasada a gris y vuelta a teñir con la tinta de su producto
(`.act-tint`, `mix-blend-mode: color`) y recortada por una zona distinta del cuadro. Es
la tesis de la web dicha con imagen: **un motor, tres puertas**.

**2. La lente.** Pasar el cursor sobre la pintura revela la capa técnica debajo. En el
hero tiene tres pieles —COMPUTE, DEBUG, EDIT MODE— y las pestañas que las cambian son a
la vez el selector de producto. En móvil, donde no hay cursor, la lente pasea sola.

**3. La sobreimpresión desregistrada.** El titular del hero no lleva degradado: lleva la
misma palabra impresa tres veces con las planchas mal alineadas (negro encima, cobalto
abajo-derecha, cian arriba-izquierda). Se hace con `::before`/`::after` y el atributo
`data-word`, que el JS refresca al cambiar de idioma.

**4. La factura tachada.** La sección de precio termina con un ticket troquelado donde
las cuatro líneas que cobran otros motores se tachan con tinta roja a medida que entran
en pantalla. Es el único sitio donde la animación argumenta en vez de decorar.

### Reglas que conviene no romper al editar

- **Nada de rejillas de fichas iguales.** El texto va en filetes, índices, prosa a dos
  columnas o especímenes tipográficos. La caja con borde y sombra dura se reserva para
  lo que se puede pulsar: botones, tarjetas de precio, puertas y las demos.
- **Nada de degradados decorativos.** En toda la hoja solo quedan dos, y los dos hacen
  un trabajo: la máscara circular de la lente y el oscurecido de las láminas para que
  el titular se lea.
- **Jerarquía de cabeceras a propósito.** Solo el núcleo, el precio y la comunidad
  llevan titular grande. Comparar, plataformas, FAQ y el selector usan `.sec-head.sm`:
  una línea, un filete y el subtítulo al margen.
- **Movimiento con un trabajo.** Solo se animan las aperturas de acto, las dos
  capacidades destacadas, las tarjetas de precio en cascada y el tachón de la factura.
  Todo lo demás está quieto. El movimiento lo enciende el JS añadiendo `.motion` al
  `<html>`: sin JavaScript, la página se ve entera.

## Lo que tienes que decidir antes de publicar

### 1. Los precios (obligatorio)

Están en `copy.js`, arriba del todo, marcados como borrador:

```js
var PRECIOS = {
  moneda: 'USD', simbolo: '$',
  framework: 39,
  engine:    69,
  hybrid:    99,
  pack:     149          // los tres juntos
};
```

Cambia esos cuatro números y se recalculan solos: las tres tarjetas, la fila de precio
del comparador, los botones de cada acto, la tarjeta del selector, el "antes" tachado
del pack y el ahorro.

La escalera está pensada así: **Framework** es la entrada barata para quien solo quiere
la biblioteca, **Engine** es el volumen (los que vienen de Unity y Godot), **Hybrid** es
el tope porque contiene a los otros dos, y el pack rompe la duda de "¿cuál compro?".

### 2. El discurso de open source

Las tres webs anteriores clavaban **$0 / para siempre** como pilar. Este sitio lo
reemplaza por **pago único, sin regalías, sin cuota por puesto**, que es el argumento
que de verdad vende contra Unity, y añade una sección "Lo que **no** vas a pagar".

La primera pregunta del FAQ es exactamente la que te van a hacer —«decían gratis y open
source, ¿qué cambió?»— y su respuesta está escrita como marcador de posición. **Reescríbela
según lo que decidas sobre la licencia del código** (`DATA.faq[0]` en `copy.js`). Si el
código sigue siendo público pero la licencia comercial se paga, dilo ahí con todas las
letras: esa frase decide si la comunidad que ya tienes se queda o se va.

### 3. El botón de compra

Hoy todos los "Comprar" apuntan a `#precio` o a `#comunidad`. Cuando tengas pasarela
(Gumroad, Lemon Squeezy, Stripe, itch.io), cambia los `href` en:

* `copy.js` → nada, se generan en `yotsuba.js`
* `yotsuba.js` → busca `p.ancla` en el bloque **PRECIO** y en **ELIGE TU PUERTA**

---

## Cómo editar el contenido

**Español:** directamente en `index.html`. Cada texto traducible lleva `data-t`
(texto plano), `data-th` (permite negritas y `<br>`) o `data-ta` (atributos como
`alt` o `aria-label`). El español se lee del propio HTML, así que no hay que
mantener dos listas.

**Inglés:** el objeto `EN` en `copy.js`, con la misma clave. Si añades un texto nuevo
en español y olvidas el inglés, la web muestra el español en vez de romperse.

**Tablas y listas:** todo lo que se repite vive en `DATA` dentro de `copy.js`, con
los dos idiomas juntos en cada entrada:

| clave | qué alimenta |
|---|---|
| `productos` | tarjetas de precio, selector de puerta, cabecera del comparador |
| `apis` | enrutador de gráficos del acto I |
| `shaders` | las siete pestañas de lenguajes, con su código |
| `backends` / `destinos` | matriz de alcance del acto II |
| `comparar` | la tabla de las tres |
| `plataformas` | tabla de destinos y estado |
| `faq` | las ocho preguntas |
| `ticker` | la tira negra de credenciales |

---

## Reglas de honestidad que la página respeta

Vienen de las webs anteriores y conviene no perderlas al editar:

* Las demos interactivas se declaran maqueta o boceto, con nota visible.
* El vídeo del editor de Hybrid es grabación real y así se dice.
* WebGPU lleva etiqueta **EN RUTA**; iOS y Web van marcados como experimentales.
* La matriz de plataformas aclara que son objetivos anunciados, no versiones estables.
* Las consolas se marcan como dependientes de licencia del fabricante.

---

## Detalles técnicos

* Sin dependencias ni build. Tres archivos y las fuentes de Google.
* Funciona con doble clic (`file://`), aunque conviene servirla por HTTP.
* El formulario escribe en la misma tabla `Personas` de Supabase que las webs
  anteriores; ahora añade entre corchetes qué productos marcó la persona, para que
  puedas segmentar el aviso de lanzamiento.
* Accesibilidad: saltar al contenido, `aria-*` en todos los controles, foco visible,
  y respeto de `prefers-reduced-motion`.
* Responsive de 360 px en adelante. En móvil, donde no hay cursor, la lente pasea sola
  para que el gesto se entienda igual.

---

## Cosas que encontré y no puedo arreglar yo

- **`assets/cap-shaders.webp` tiene una errata**: dice «Shader Languajes Supported» en
  vez de «Languages». La imagen ya no aparece en la web (la sustituí por un espécimen
  tipográfico hecho con la letra de la casa), pero conviene corregirla si se usa en
  redes o en la tienda.
- **`assets/cap-compute.webp` y el resto de `cap-*.webp` son banners promocionales**,
  con su propia tipografía y su propio encuadre. Chocan con la identidad de la web, así
  que solo sobrevive el que aporta información (`cap-shaders` ya no, `cap-compute`
  sustituido por la captura real de WebGPU). Si quieres recuperarlos, pídeme versiones
  sin texto embebido.
- **`assets/variante.png` (2,7 MB) no se usa.** Es el tercer tratamiento del cuadro. Si
  lo quieres en la web, conviértelo a WebP primero.

## Lo que aún no se ha rehecho

Los enlaces de **documentación** siguen apuntando a `../../yotsuba-framework-site/docs.html`.
Esas páginas interiores (docs, capabilities, apple) no se tocaron.
