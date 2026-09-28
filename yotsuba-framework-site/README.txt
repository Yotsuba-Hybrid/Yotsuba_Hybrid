Yotsuba Framework website concept

Files:
- index.html
- styles.css
- app.js
- assets/yotsuba-framework-logo.png

Open index.html directly in a browser, or serve the folder with any static web server.

Editable copy:
- content/index.csv — copy shown on the home page.
- content/capabilities.csv — copy shown on the capabilities page.
- content/documentation.csv — copy shown on the documentation page.
- content/dropdowns.csv — one row per home-page shader or capability dropdown.
- content/capability-detail.csv — shared copy for the capability detail page.
- content/capability-articles/*.csv — one CSV per capability article: compute, directx12, mgfx, shader-languages, metal, android-vulkan and animated-models.

Open any of these CSV files in Excel and edit only the `value` column. Keep `id`,
`selector` and `mode` intact. `mode` can be `text`, `html`, `attr:name`, or
`append-html` for an advanced insertion. Dropdown rows use their own columns so
you can edit the title, description, image reference and action as one record.
The site keeps the HTML text as a
fallback, but loads the CSV on every refresh when it is served from a web server.

For local editing, run this from this folder and open http://localhost:8000:
  python3 -m http.server 8000

Browsers block CSV loading when the pages are opened with file://, so use the
local server above or any normal hosting service to see CSV edits take effect.

Design direction:
- Electric cobalt + cyan derived from the Yotsuba mark
- Editorial / technical layout, sharp edges, thin measurement-style rules
- No glassmorphism, floating gradient blobs, generic feature-card grids, or AI-style stock imagery
- Emphasis on MonoGame compatibility, MGCB/MGFX workflow and Metal on Apple
