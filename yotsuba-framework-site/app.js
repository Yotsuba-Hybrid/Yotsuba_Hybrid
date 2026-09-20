const parseCsv = (source) => {
  const rows = [];
  let row = [];
  let cell = "";
  let quoted = false;

  for (let index = 0; index < source.length; index += 1) {
    const character = source[index];
    const next = source[index + 1];

    if (character === '"' && quoted && next === '"') {
      cell += '"';
      index += 1;
    } else if (character === '"') {
      quoted = !quoted;
    } else if (character === "," && !quoted) {
      row.push(cell);
      cell = "";
    } else if ((character === "\n" || character === "\r") && !quoted) {
      if (character === "\r" && next === "\n") index += 1;
      row.push(cell);
      if (row.some((value) => value.length)) rows.push(row);
      row = [];
      cell = "";
    } else {
      cell += character;
    }
  }

  row.push(cell);
  if (row.some((value) => value.length)) rows.push(row);

  const [header, ...data] = rows;
  if (!header) return [];
  return data.map((values) => Object.fromEntries(header.map((name, index) => [name, values[index] || ""])));
};

const getCsvRows = async (source) => {
  const response = await fetch(`${source}?v=${Date.now()}`, { cache: "no-store" });
  if (!response.ok) throw new Error(`Could not load ${source}`);
  return parseCsv(await response.text());
};

const applyCsvRows = (rows) => {
  rows.forEach(({ selector, mode, value }) => {
    if (!selector || !mode) return;
    const formattedValue = value.replace(/\\n/g, "\n");
    document.querySelectorAll(selector).forEach((element) => {
      if (mode === "text") element.textContent = formattedValue;
      if (mode === "html") element.innerHTML = formattedValue;
      if (mode.startsWith("attr:")) element.setAttribute(mode.slice(5), formattedValue);
      if (mode === "append-html") element.insertAdjacentHTML("beforeend", formattedValue);
    });
  });
};

const applyCsvContent = async () => {
  const sources = [document.body.dataset.contentSource];
  const articleDirectory = document.body.dataset.contentDirectory;
  const articleKey = decodeURIComponent(location.hash.slice(1)) || "compute";

  if (articleDirectory && /^[a-z0-9-]+$/i.test(articleKey)) {
    sources.push(`${articleDirectory}/${articleKey}.csv`);
  }

  for (const source of sources.filter(Boolean)) {
    try {
      applyCsvRows(await getCsvRows(source));
    } catch (error) {
      console.info(`CSV content was not loaded from ${source}; using the HTML fallback.`, error);
    }
  }
};

const escapeHtml = (value) => value.replace(/[&<>"]/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[character]);

const applyDropdownContent = async () => {
  const source = document.body.dataset.dropdownSource;
  if (!source) return;

  try {
    (await getCsvRows(source)).forEach((row) => {
      const item = [...document.querySelectorAll("[data-dropdown-key]")].find((element) => element.dataset.dropdownKey === row.key);
      if (!item) return;

      const summary = item.querySelector("summary");
      const panel = item.querySelector(".shader-item__panel, .capability-accordion__panel");
      if (row.type === "shader") {
        summary.innerHTML = `<span>${escapeHtml(row.code)}</span><strong>${escapeHtml(row.title)}</strong><small>${escapeHtml(row.subtitle)}</small>`;
      } else {
        summary.textContent = row.title;
      }

      const description = panel?.querySelector("p");
      if (description) description.textContent = row.description;

      const platforms = panel?.querySelector(".shader-item__platforms");
      if (platforms && row.platforms) {
        platforms.innerHTML = row.platforms.split("|").filter(Boolean).map((platform) => `<span>${escapeHtml(platform)}</span>`).join("");
      }

      const action = panel?.querySelector("a");
      if (action && row.action) action.innerHTML = `${escapeHtml(row.action)} <span>→</span>`;
      if (action && row.href) action.setAttribute("href", row.href);
      if (row.image) item.dataset.image = row.image;
      if (row.image_alt) item.dataset.imageAlt = row.image_alt;
      if (row.fit) item.dataset.fit = row.fit;
      if (row.open) item.open = row.open === "true";
      if (item.open) item.dispatchEvent(new Event("toggle"));
    });
  } catch (error) {
    console.info(`Dropdown CSV was not loaded from ${source}; using the HTML fallback.`, error);
  }
};

void applyCsvContent();
void applyDropdownContent();

const reveal = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        reveal.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll("[data-reveal]").forEach((el) => reveal.observe(el));

const navToggle = document.querySelector(".nav-menu-toggle");
const primaryNav = document.querySelector(".nav");
if (navToggle && primaryNav) {
  const navLabel = (state) => navToggle.dataset[`${state}Label`] || (state === "open" ? "Open navigation menu" : "Close navigation menu");
  navToggle.addEventListener("click", () => {
    const isOpen = primaryNav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
    navToggle.setAttribute("aria-label", navLabel(isOpen ? "close" : "open"));
  });

    primaryNav.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
    primaryNav.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", navLabel("open"));
  }));
}

const shaderData = {
  mgfx: { type: "01 / EFFECT WORKFLOW", title: "MGFX, the familiar path.", description: "Keep the MonoGame effect workflow you already know and reuse existing shader assets inside the Yotsuba framework model.", platforms: ["Windows / DX12", "Linux / Vulkan", "Android / Vulkan", "Apple / Metal"], route: "Existing effects / modern backends" },
  fnafx: { type: "02 / EFFECT WORKFLOW", title: "FNAFX, ready to carry forward.", description: "Use FNA effect workflows when compatibility matters, without giving up the wider set of native graphics backends.", platforms: ["Windows / DX12", "Linux / Vulkan", "Android / Vulkan", "Apple / Metal"], route: "FNA workflow / modern backends" },
  slang: { type: "03 / MODERN SHADER LANGUAGE", title: "Slang, without the compromise.", description: "Use Slang with its complete language feature set, including interfaces and advanced features, while Yotsuba handles the platform-specific path underneath.", platforms: ["Windows / DX12", "Linux / Vulkan", "Android / Vulkan", "Apple / Metal"], route: "One source / multiple GPU APIs" },
  hlsl: { type: "04 / NATIVE INPUT", title: "Native HLSL when control matters.", description: "Write or bring native HLSL directly into the pipeline for projects that need close control over the DirectX shader path.", platforms: ["Windows / DX12", "Linux / Vulkan", "Android / Vulkan", "Apple / Metal"], route: "Native source / translated output" },
  glsl: { type: "05 / NATIVE INPUT", title: "GLSL for the Vulkan path.", description: "Use GLSL directly when your team, tools or existing assets are already built around the Vulkan and OpenGL shader ecosystem.", platforms: ["Windows / DX12", "Linux / Vulkan", "Android / Vulkan", "Apple / Metal"], route: "Native source / translated output" },
  msl: { type: "06 / APPLE PATH", title: "MSL, where Apple is the target.", description: "Choose Metal Shading Language for a platform-specific Apple implementation when that extra level of control is worth it.", platforms: ["Apple / Metal"], route: "Apple-specific source / Metal" },
  spirv: { type: "07 / COMPILED INPUT", title: "Direct SPIR-V, no detour.", description: "Feed compiled SPIR-V binaries straight into the pipeline when another toolchain already owns shader compilation.", platforms: ["Windows / DX12", "Linux / Vulkan", "Android / Vulkan", "Apple / Metal"], route: "Compiled binary / direct input" }
};

const shaderButtons = document.querySelectorAll("[data-shader]");
const shaderTitle = document.querySelector("[data-shader-title]");
if (shaderButtons.length && shaderTitle) {
  const shaderType = document.querySelector("[data-shader-type]");
  const shaderDescription = document.querySelector("[data-shader-description]");
  const shaderPlatforms = document.querySelector("[data-shader-platforms]");
  const shaderRoute = document.querySelector("[data-shader-route]");
  const allPlatforms = ["Windows / DX12", "Linux / Vulkan", "Android / Vulkan", "Apple / Metal"];
  const platformsLabel = (platform) => platform.replace(" / ", " · ");

  const selectShader = (key) => {
    const shader = shaderData[key];
    shaderButtons.forEach((button) => button.setAttribute("aria-selected", String(button.dataset.shader === key)));
    shaderType.textContent = shader.type;
    shaderTitle.textContent = shader.title;
    shaderDescription.textContent = shader.description;
    shaderRoute.textContent = shader.route;
    shaderPlatforms.innerHTML = allPlatforms.map((platform) => `<span class="shader-platform${shader.platforms.includes(platform) ? "" : " is-muted"}">${platformsLabel(platform)}</span>`).join("");
  };

  shaderButtons.forEach((button) => button.addEventListener("click", () => selectShader(button.dataset.shader)));
  selectShader("slang");
}

const shaderItems = document.querySelectorAll("[data-shader-item]");
const shaderImage = document.querySelector("[data-shader-image]");
if (shaderItems.length && shaderImage) {
  const shaderImagePanel = shaderImage.closest(".shader-image-panel");
  const initialShaderItem = [...shaderItems].find((item) => item.open) || shaderItems[0];
  shaderImage.alt = initialShaderItem.dataset.imageAlt || "Shader language support";
  shaderImage.src = new URL(initialShaderItem.dataset.image, document.baseURI).href;
  shaderImagePanel.style.setProperty("--shader-edge-image", `url("${initialShaderItem.dataset.image}")`);
  const updateShaderImageFit = (source) => {
    if (!source.naturalWidth || !source.naturalHeight) return;
    const isWide = source.naturalWidth > source.naturalHeight;
    shaderImagePanel.classList.toggle("is-wide", isWide);
    shaderImagePanel.classList.toggle("is-tall", !isWide);
  };
  const sampleShaderEdges = (source) => {
    if (!source.naturalWidth || !source.naturalHeight) return;

    try {
      const canvas = document.createElement("canvas");
      canvas.width = source.naturalWidth;
      canvas.height = source.naturalHeight;
      const context = canvas.getContext("2d");
      context.drawImage(source, 0, 0);

      const top = context.getImageData(0, 0, 1, 1).data;
      const bottom = context.getImageData(0, source.naturalHeight - 1, 1, 1).data;
      const toCssColor = (pixel) => `rgb(${pixel[0]} ${pixel[1]} ${pixel[2]} / ${pixel[3] / 255})`;

      shaderImagePanel.style.setProperty("--shader-edge-top", toCssColor(top));
      shaderImagePanel.style.setProperty("--shader-edge-bottom", toCssColor(bottom));
    } catch (error) {
      shaderImagePanel.style.removeProperty("--shader-edge-top");
      shaderImagePanel.style.removeProperty("--shader-edge-bottom");
    }
  };

  shaderImage.addEventListener("load", () => {
    updateShaderImageFit(shaderImage);
    sampleShaderEdges(shaderImage);
  });
  if (shaderImage.complete) {
    updateShaderImageFit(shaderImage);
    sampleShaderEdges(shaderImage);
  }

  shaderItems.forEach((item) => {
    item.addEventListener("toggle", () => {
      if (!item.open) return;

      shaderItems.forEach((other) => {
        if (other !== item) other.open = false;
      });

      shaderImagePanel.style.setProperty("--shader-edge-image", `url("${item.dataset.image}")`);

      const nextImage = new URL(item.dataset.image, document.baseURI).href;
      if (shaderImage.src === nextImage) return;

          const incoming = new Image();
          incoming.onload = () => {
            shaderImage.classList.add("is-changing");
            window.setTimeout(() => {
              shaderImage.alt = item.dataset.imageAlt;
              shaderImage.onload = () => {
                updateShaderImageFit(shaderImage);
                sampleShaderEdges(shaderImage);
              };
              shaderImage.src = nextImage;
              requestAnimationFrame(() => shaderImage.classList.remove("is-changing"));
            }, 250);
      };
      incoming.src = nextImage;
    });
  });
}
