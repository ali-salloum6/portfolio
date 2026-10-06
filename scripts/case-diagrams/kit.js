// Diagram kit: blueprint-style SVG diagrams for the portfolio case studies.
// Each diagram is a spec function f(k) that calls k.box / k.arrow / k.text ... on a 1600x900 canvas.
const NS = "http://www.w3.org/2000/svg";
const TONES = {
  slate: { stroke: "#475569", fill: "#0b1225", text: "#cbd5e1", sub: "#94a3b8", accent: "#64748b" },
  dim: { stroke: "#334155", fill: "#0b1225", text: "#94a3b8", sub: "#64748b", accent: "#475569" },
  indigo: { stroke: "#6366f1", fill: "#10183a", text: "#f8fafc", sub: "#a5b4fc", accent: "#818cf8" },
  cyan: { stroke: "#22d3ee", fill: "#062635", text: "#e0f7fb", sub: "#67e8f9", accent: "#22d3ee" },
  emerald: { stroke: "#34d399", fill: "#05291f", text: "#d1fae5", sub: "#6ee7b7", accent: "#34d399" },
  amber: { stroke: "#f59e0b", fill: "#2a1a05", text: "#fde68a", sub: "#fbbf24", accent: "#f59e0b" },
  rose: { stroke: "#fb7185", fill: "#2a0d14", text: "#ffe4e6", sub: "#fda4af", accent: "#fb7185" },
};

function el(name, attrs = {}, parent) {
  const e = document.createElementNS(NS, name);
  for (const [k, v] of Object.entries(attrs)) if (v !== undefined && v !== null) e.setAttribute(k, v);
  if (parent) parent.appendChild(e);
  return e;
}

function makeKit(svg, { width = 1600, height = 900, glow = [] } = {}) {
  const defs = el("defs", {}, svg);
  defs.innerHTML = `
    <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#050a1c"/><stop offset="1" stop-color="#0b1533"/></linearGradient>
    <pattern id="minor" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M40 0H0V40" fill="none" stroke="#1e293b" stroke-width="1" opacity="0.55"/></pattern>
    <pattern id="major" width="200" height="200" patternUnits="userSpaceOnUse"><path d="M200 0H0V200" fill="none" stroke="#26344f" stroke-width="1.3"/></pattern>
    <filter id="blur" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="12"/></filter>`;
  for (const [name, t] of Object.entries(TONES)) {
    defs.insertAdjacentHTML("beforeend",
      `<marker id="head-${name}" viewBox="0 0 12 12" refX="10" refY="6" markerWidth="13" markerHeight="13" markerUnits="userSpaceOnUse" orient="auto"><path d="M0 0L12 6L0 12z" fill="${t.accent}"/></marker>`);
  }
  el("rect", { width, height, fill: "url(#bg)" }, svg);
  el("rect", { width, height, fill: "url(#minor)" }, svg);
  el("rect", { width, height, fill: "url(#major)" }, svg);
  glow.forEach((g, i) => {
    const id = `glow${i}`;
    defs.insertAdjacentHTML("beforeend",
      `<radialGradient id="${id}" cx="${g.x}" cy="${g.y}" r="${g.r}" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="${g.color || "#6366f1"}" stop-opacity="${g.o ?? 0.22}"/><stop offset="1" stop-color="${g.color || "#6366f1"}" stop-opacity="0"/></radialGradient>`);
    el("rect", { width, height, fill: `url(#${id})` }, svg);
  });
  const layer = el("g", {}, svg);
  let gradN = 0;

  const k = {
    svg, layer, TONES,
    group(transform) { return el("g", { transform }, layer); },
    text({ x, y, s, size = 22, weight = 600, fill = "#cbd5e1", anchor = "start", mono = false, spacing, italic, opacity, parent }) {
      const t = el("text", {
        x, y, "text-anchor": anchor, fill,
        "font-family": mono ? "JetBrains Mono, monospace" : "Plus Jakarta Sans, sans-serif",
        "font-size": size, "font-weight": weight, "letter-spacing": spacing, "font-style": italic ? "italic" : undefined, opacity,
      }, parent || layer);
      t.textContent = s;
      return t;
    },
    kicker({ x, y, s, tone = "slate", anchor = "start" }) {
      return k.text({ x, y, s, size: 20, weight: 800, fill: TONES[tone].accent, anchor, spacing: 6 });
    },
    title({ x, y, s, anchor = "start", size = 34, fill = "#f1f5f9" }) {
      return k.text({ x, y, s, size, weight: 700, fill, anchor });
    },
    box({ x, y, w, h, label, sub, tone = "slate", glow = false, mono = true, size = 24, rx = 12, dashed = false, labelFill, parent }) {
      const t = TONES[tone];
      const p = parent || layer;
      if (glow) el("rect", { x, y, width: w, height: h, rx, fill: "none", stroke: t.stroke, "stroke-width": 8, filter: "url(#blur)", opacity: 0.7 }, p);
      el("rect", { x, y, width: w, height: h, rx, fill: t.fill, stroke: t.stroke, "stroke-width": glow ? 2.5 : 1.6, "stroke-dasharray": dashed ? "8 6" : undefined }, p);
      const cy = sub ? y + h / 2 - 4 : y + h / 2 + size * 0.35;
      if (label) k.text({ x: x + w / 2, y: cy, s: label, size, weight: mono ? 600 : 700, fill: labelFill || t.text, anchor: "middle", mono, parent: p });
      if (sub) k.text({ x: x + w / 2, y: cy + size * 0.95, s: sub, size: Math.round(size * 0.75), weight: 600, fill: t.sub, anchor: "middle", parent: p });
      return { x, y, w, h, cx: x + w / 2, cy: y + h / 2, top: y, bottom: y + h, left: x, right: x + w };
    },
    pill({ x, y, s, tone = "indigo", size = 18, anchor = "middle", pad = 14 }) {
      const t = TONES[tone];
      const w = s.length * size * 0.62 + pad * 2, h = size + 16;
      const x0 = anchor === "middle" ? x - w / 2 : anchor === "end" ? x - w : x;
      el("rect", { x: x0, y: y - h / 2, width: w, height: h, rx: h / 2, fill: t.fill, stroke: t.stroke, "stroke-width": 1.4 }, layer);
      k.text({ x: x0 + w / 2, y: y + size * 0.35, s, size, weight: 700, fill: t.sub, anchor: "middle", mono: true });
    },
    arrow({ x1, y1, x2, y2, tone = "slate", dashed = false, width = 2, head = true, label, lx, ly, lanchor = "middle", lsize = 18, opacity, gradient }) {
      let stroke = TONES[tone].accent;
      if (gradient) {
        const id = `ag${gradN++}`;
        k.svg.querySelector("defs").insertAdjacentHTML("beforeend",
          `<linearGradient id="${id}" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="${TONES[gradient[0]].accent}"/><stop offset="1" stop-color="${TONES[gradient[1]].accent}"/></linearGradient>`);
        stroke = `url(#${id})`;
      }
      el("line", { x1, y1, x2, y2, stroke, "stroke-width": width, "stroke-dasharray": dashed ? "8 6" : undefined, "stroke-linecap": "round", "marker-end": head ? `url(#head-${gradient ? gradient[1] : tone})` : undefined, opacity }, layer);
      if (label) k.text({ x: lx ?? (x1 + x2) / 2, y: ly ?? (y1 + y2) / 2 - 10, s: label, size: lsize, weight: 700, fill: TONES[tone].sub, anchor: lanchor, mono: true });
    },
    path({ d, tone = "slate", width = 2, dashed = false, head = true, opacity }) {
      el("path", { d, fill: "none", stroke: TONES[tone].accent, "stroke-width": width, "stroke-dasharray": dashed ? "8 6" : undefined, "stroke-linecap": "round", "stroke-linejoin": "round", "marker-end": head ? `url(#head-${tone})` : undefined, opacity }, layer);
    },
    units({ x, y, cols, rows, w = 52, h = 34, gx = 14, gy = 14, tone = "slate", dot = true }) {
      const t = TONES[tone];
      const out = [];
      for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
        const ux = x + c * (w + gx), uy = y + r * (h + gy);
        el("rect", { x: ux, y: uy, width: w, height: h, rx: 6, fill: t.fill, stroke: t.stroke, "stroke-width": 1.3 }, layer);
        if (dot) {
          el("circle", { cx: ux + w * 0.25, cy: uy + h / 2, r: Math.min(4, h / 8), fill: t.accent }, layer);
          el("line", { x1: ux + w * 0.42, y1: uy + h / 2, x2: ux + w * 0.8, y2: uy + h / 2, stroke: t.stroke, "stroke-width": 2, "stroke-linecap": "round" }, layer);
        }
        out.push({ x: ux, y: uy, cx: ux + w / 2, cy: uy + h / 2, top: uy, bottom: uy + h });
      }
      return out;
    },
    node({ x, y, s = 40, tone = "cyan" }) {
      const t = TONES[tone];
      el("rect", { x, y, width: s, height: s, rx: s * 0.22, fill: t.fill, stroke: t.stroke, "stroke-width": 1.6 }, layer);
      el("circle", { cx: x + s / 2, cy: y + s / 2, r: s * 0.11, fill: t.accent }, layer);
      return { cx: x + s / 2, top: y, bottom: y + s, left: x, right: x + s, cy: y + s / 2 };
    },
    rect({ x, y, w, h, fill = "none", stroke, sw = 1.6, rx = 8, opacity, dashed = false, filter }) {
      return el("rect", { x, y, width: w, height: h, rx, fill, stroke, "stroke-width": stroke ? sw : undefined, opacity, "stroke-dasharray": dashed ? "8 6" : undefined, filter }, layer);
    },
    // Width of a pill as drawn by pill(), for laying out rows of pills.
    pillWidth(s, size = 18, pad = 14) { return s.length * size * 0.62 + pad * 2; },
    check({ x, y, ok = true, size = 30 }) {
      const t = TONES[ok ? "emerald" : "rose"];
      el("circle", { cx: x, cy: y, r: size / 2, fill: t.fill, stroke: t.stroke, "stroke-width": 1.6 }, layer);
      el("path", { d: ok ? `M${x - size * 0.22} ${y}l${size * 0.15} ${size * 0.15} ${size * 0.28}-${size * 0.3}` : `M${x - size * 0.18} ${y - size * 0.18}l${size * 0.36} ${size * 0.36}M${x + size * 0.18} ${y - size * 0.18}l-${size * 0.36} ${size * 0.36}`, fill: "none", stroke: t.accent, "stroke-width": 2.6, "stroke-linecap": "round", "stroke-linejoin": "round" }, layer);
    },
  };
  return k;
}

window.renderDiagram = function (spec, opts) {
  const svg = document.getElementById("art");
  svg.innerHTML = "";
  svg.setAttribute("width", opts.width || 1600);
  svg.setAttribute("height", opts.height || 900);
  svg.setAttribute("viewBox", `0 0 ${opts.width || 1600} ${opts.height || 900}`);
  const k = makeKit(svg, opts);
  spec(k);
};
