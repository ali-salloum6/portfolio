// Case-study diagrams for the portfolio page. Each entry: { file, opts, outW?, draw(k) }.
// Rendered by render-all.cjs (2x screenshot -> sharp -> WebP). Keep every number here in sync with messages/*.json.

function chain(k, boxes, tone = "indigo", gap = 8) {
  for (let i = 0; i < boxes.length - 1; i++) {
    const a = boxes[i], b = boxes[i + 1];
    k.arrow({ x1: a.right + gap, y1: a.cy, x2: b.left - gap - 2, y2: b.cy, tone });
  }
}

function pillRow(k, x, y, items, size = 18, gap = 14) {
  let cx = x;
  for (const [s, tone] of items) {
    k.pill({ x: cx, y, s, tone, size, anchor: "start" });
    cx += k.pillWidth(s, size) + gap;
  }
}

window.SPECS = {
  "evals": { file: "case-llm-evals.webp", opts: { width: 1600, height: 900, glow: [{ x: 780, y: 230, r: 720, color: "#6366f1", o: 0.17 }, { x: 760, y: 770, r: 640, color: "#22d3ee", o: 0.09 }] }, draw(k) {
    // Band A: the answer-quality suite
    k.kicker({ x: 80, y: 82, s: "MEASURE", tone: "indigo" });
    k.title({ x: 80, y: 126, s: "310 real-model tests on a frozen production snapshot", size: 32 });
    const y = 168, h = 100;
    const b1 = k.box({ x: 80, y, w: 230, h, label: "prod database", sub: "read-only export", tone: "slate", size: 22 });
    const b2 = k.box({ x: 356, y, w: 250, h, label: "frozen snapshot", sub: "sha256 · provenance", tone: "indigo", size: 22 });
    const b3 = k.box({ x: 652, y, w: 270, h, label: "real agent turn", sub: "real model · tenant settings", tone: "indigo", glow: true, size: 22 });
    const b4 = k.box({ x: 968, y, w: 236, h, label: "code checks", sub: "ids · tools · numbers", tone: "emerald", size: 22 });
    const b5 = k.box({ x: 1250, y, w: 270, h, label: "LLM grader", sub: "meaning only", tone: "amber", size: 22 });
    chain(k, [b1, b2, b3, b4, b5], "indigo");

    // 3 of 3 runs under the agent turn
    [-56, 0, 56].forEach((dx) => k.check({ x: b3.cx + dx, y: 318, ok: true, size: 34 }));
    k.text({ x: b3.cx, y: 366, s: "passes only if 3 of 3 runs pass", size: 19, weight: 600, fill: "#a5b4fc", anchor: "middle" });

    // grader probability scale under the grader
    const sx = b5.left, sw = b5.w, sy = 306;
    const seg = (from, to, tone) => k.rect({ x: sx + sw * from, y: sy, w: sw * (to - from), h: 14, rx: 3, fill: k.TONES[tone].accent, opacity: 0.85 });
    seg(0, 0.3, "rose"); seg(0.3, 0.7, "amber"); seg(0.7, 1, "emerald");
    k.text({ x: sx + sw * 0.3, y: sy - 10, s: "0.3", size: 16, weight: 600, fill: "#94a3b8", anchor: "middle", mono: true });
    k.text({ x: sx + sw * 0.7, y: sy - 10, s: "0.7", size: 16, weight: 600, fill: "#94a3b8", anchor: "middle", mono: true });
    k.text({ x: sx + sw * 0.15, y: sy + 44, s: "miss", size: 18, weight: 700, fill: k.TONES.rose.sub, anchor: "middle" });
    k.text({ x: sx + sw * 0.5, y: sy + 44, s: "uncertain", size: 18, weight: 700, fill: k.TONES.amber.sub, anchor: "middle" });
    k.text({ x: sx + sw * 0.85, y: sy + 44, s: "pass", size: 18, weight: 700, fill: k.TONES.emerald.sub, anchor: "middle" });

    // provenance note under the snapshot
    k.text({ x: b2.cx, y: 318, s: "re-exported, ids remapped", size: 18, weight: 600, fill: "#94a3b8", anchor: "middle" });
    k.text({ x: b4.cx, y: 318, s: "wording never matched", size: 18, weight: 600, fill: "#6ee7b7", anchor: "middle" });

    pillRow(k, 80, 422, [["56 client scenarios", "indigo"], ["~900 conversations per run", "indigo"], ["8 shards · ~20 min", "cyan"], ["network errors: retried, never failed", "slate"]]);

    // Band B: the turn rewrite
    k.kicker({ x: 80, y: 516, s: "THEN CUT", tone: "cyan" });
    k.title({ x: 80, y: 560, s: "One tool loop and one write, with guards in code", size: 32 });

    k.text({ x: 80, y: 642, s: "before", size: 20, weight: 700, fill: "#64748b", mono: true });
    const by = 602, bh = 66;
    const q1 = k.box({ x: 200, y: by, w: 150, h: bh, label: "question", tone: "dim", size: 20 });
    const l1 = k.box({ x: 394, y: by, w: 170, h: bh, label: "answer", sub: "LLM call", tone: "rose", size: 20 });
    const l2 = k.box({ x: 608, y: by, w: 190, h: bh, label: "reflection", sub: "LLM call", tone: "rose", size: 20 });
    const l3 = k.box({ x: 842, y: by, w: 180, h: bh, label: "reconcile", sub: "LLM call", tone: "rose", size: 20 });
    const l4 = k.box({ x: 1066, y: by, w: 180, h: bh, label: "translate", sub: "LLM call", tone: "rose", size: 20 });
    chain(k, [q1, l1, l2, l3, l4], "slate");
    k.arrow({ x1: l4.right + 8, y1: l4.cy, x2: 1330, y2: l4.cy, tone: "slate" });
    k.text({ x: 1342, y: l4.cy + 7, s: "user", size: 20, weight: 600, fill: "#94a3b8", mono: true });
    k.text({ x: 394, y: 704, s: "up to 4 model passes per turn; each rewrite could change facts", size: 18, weight: 600, fill: k.TONES.rose.sub });

    k.text({ x: 80, y: 798, s: "after", size: 20, weight: 700, fill: "#818cf8", mono: true });
    const ay = 754, ah = 78;
    const q2 = k.box({ x: 200, y: ay, w: 150, h: ah, label: "question", tone: "slate", size: 20 });
    const m = k.box({ x: 394, y: ay, w: 270, h: ah, label: "model ↔ tools", sub: "≤ 3 rounds · repeats skipped", tone: "cyan", glow: true, size: 21 });
    const w = k.box({ x: 708, y: ay, w: 200, h: ah, label: "one write", sub: "tenant's language", tone: "indigo", size: 21 });
    const g = k.box({ x: 952, y: ay, w: 250, h: ah, label: "guards in code", sub: "only ids tools returned", tone: "emerald", size: 21 });
    const st = k.box({ x: 1246, y: ay, w: 200, h: ah, label: "stream", sub: "draft → final blocks", tone: "cyan", size: 21 });
    chain(k, [q2, m, w, g, st], "indigo");
    k.arrow({ x1: st.right + 8, y1: st.cy, x2: 1488, y2: st.cy, tone: "indigo" });
    k.text({ x: 1498, y: st.cy + 7, s: "user", size: 20, weight: 600, fill: "#cbd5e1", mono: true });
    k.path({ d: `M${m.left + 78} ${ay - 2} C ${m.left + 78} ${ay - 34}, ${m.right - 78} ${ay - 34}, ${m.right - 78} ${ay - 4}`, tone: "cyan", width: 2 });
    k.text({ x: 394, y: 872, s: "empty answers 9–13% → 0.2–0.5% · A/B vs production: −34% model calls, p90 12.9 → 7.0 s", size: 18, weight: 700, fill: k.TONES.emerald.sub });
  } },

  "gpu": { file: "case-gpu-scaleout.webp", opts: { width: 1600, height: 900, glow: [{ x: 900, y: 420, r: 700, color: "#22d3ee", o: 0.12 }, { x: 420, y: 420, r: 420, color: "#6366f1", o: 0.14 }] }, draw(k) {
    k.kicker({ x: 60, y: 78, s: "SCALE-OUT", tone: "cyan" });
    k.title({ x: 60, y: 122, s: "One GPU server → four, 31 analysis processes", size: 32 });

    const cl = k.box({ x: 50, y: 372, w: 200, h: 112, label: "clients", sub: "100–400 concurrent", tone: "slate", size: 24 });
    const cd = k.box({ x: 300, y: 352, w: 300, h: 152, label: "caddy", sub: "least busy · health checks", tone: "indigo", glow: true, size: 28 });
    k.arrow({ x1: cl.right + 8, y1: cl.cy, x2: cd.left - 10, y2: cd.cy, tone: "indigo", width: 2.4 });
    k.pill({ x: cd.cx, y: 548, s: "keepalive 4 s < uvicorn 5 s", tone: "indigo", size: 16 });

    const servers = [
      { name: "GPU server 1", gpu: 6, cpu: 0 },
      { name: "GPU server 2", gpu: 3, cpu: 0 },
      { name: "GPU server 3", gpu: 3, cpu: 6 },
      { name: "GPU server 4", gpu: 10, cpu: 3 },
    ];
    const sx = 680, sw = 460, sh = 118, gap = 22, sy0 = 160;
    let zoomFrom = null;
    servers.forEach((s, i) => {
      const y = sy0 + i * (sh + gap);
      k.rect({ x: sx, y, w: sw, h: sh, rx: 12, fill: "#0b1225", stroke: "#475569", sw: 1.6 });
      k.text({ x: sx + 20, y: y + 36, s: s.name, size: 20, weight: 600, fill: "#cbd5e1", mono: true });
      k.text({ x: sx + sw - 20, y: y + 36, s: s.cpu ? `${s.gpu} GPU + ${s.cpu} CPU` : `${s.gpu} processes`, size: 17, weight: 600, fill: "#94a3b8", anchor: "end" });
      for (let j = 0; j < s.gpu + s.cpu; j++) {
        const n = k.node({ x: sx + 20 + j * 33, y: y + 56, s: 27, tone: j < s.gpu ? "cyan" : "amber" });
        if (i === 0 && j === s.gpu - 1) zoomFrom = n;
      }
      const ty = y + sh / 2;
      k.path({ d: `M${cd.right + 6} ${cd.cy} C ${cd.right + 50} ${cd.cy}, ${sx - 50} ${ty}, ${sx - 10} ${ty}`, tone: "indigo", width: 2 });
    });
    k.text({ x: sx + 4, y: sy0 + 4 * (sh + gap) + 10, s: "cyan = GPU process · amber = CPU-only process", size: 16, weight: 600, fill: "#64748b" });

    const s3 = k.box({ x: sx, y: 760, w: sw, h: 92, label: "shared S3 mount", sub: "per-server logs · self-healing watchdog", tone: "dim", size: 22, dashed: true });
    k.arrow({ x1: sx + sw - 60, y1: 716, x2: sx + sw - 60, y2: s3.top - 8, tone: "slate", dashed: true });

    // Inside one process
    const px = 1200, pw = 340;
    k.kicker({ x: px, y: 176, s: "INSIDE ONE PROCESS", tone: "cyan" });
    const p1 = k.box({ x: px, y: 198, w: pw, h: 84, label: "admission", sub: "queue full → 503 + Retry-After", tone: "amber", size: 22 });
    const p2 = k.box({ x: px, y: 314, w: pw, h: 84, label: "lock + thread pool", sub: "event loop stays free", tone: "indigo", size: 22 });
    const p3 = k.box({ x: px, y: 430, w: pw, h: 84, label: "ONNX Runtime", sub: "GPU memory 11 → 3.6 GB", tone: "cyan", glow: true, size: 22 });
    k.arrow({ x1: p1.cx, y1: p1.bottom + 6, x2: p1.cx, y2: p2.top - 8, tone: "slate" });
    k.arrow({ x1: p2.cx, y1: p2.bottom + 6, x2: p2.cx, y2: p3.top - 8, tone: "slate" });
    if (zoomFrom) k.path({ d: `M${zoomFrom.right + 6} ${zoomFrom.cy} C ${px - 40} ${zoomFrom.cy}, ${px - 50} ${p1.cy}, ${px - 8} ${p1.cy}`, tone: "cyan", dashed: true, width: 1.6, head: false });

    // Throughput bars
    k.kicker({ x: px, y: 590, s: "ANALYSES / MIN", tone: "slate" });
    const maxW = 300;
    k.text({ x: px, y: 636, s: "1 server", size: 18, weight: 600, fill: "#94a3b8" });
    k.rect({ x: px, y: 648, w: maxW * (68 / 393), h: 30, rx: 5, fill: "#334155" });
    k.text({ x: px + maxW * (68 / 393) + 12, y: 671, s: "55–68", size: 22, weight: 700, fill: "#cbd5e1", mono: true });
    k.text({ x: px, y: 724, s: "4 servers", size: 18, weight: 600, fill: "#67e8f9" });
    k.rect({ x: px, y: 736, w: maxW, h: 30, rx: 5, fill: "#22d3ee", opacity: 0.35, filter: "url(#blur)" });
    k.rect({ x: px, y: 736, w: maxW, h: 30, rx: 5, fill: "#0e7490", stroke: "#22d3ee", sw: 1.6 });
    k.text({ x: px + maxW - 12, y: 759, s: "393", size: 22, weight: 700, fill: "#ecfeff", anchor: "end", mono: true });
    k.text({ x: px, y: 812, s: "1,999 of 2,000 OK at 100 concurrent", size: 17, weight: 600, fill: "#6ee7b7" });
  } },

  "crm": { file: "case-crm-sync.webp", opts: { width: 1600, height: 900, glow: [{ x: 820, y: 460, r: 760, color: "#6366f1", o: 0.15 }, { x: 420, y: 200, r: 420, color: "#34d399", o: 0.07 }] }, draw(k) {
    k.kicker({ x: 60, y: 78, s: "ONE LOCKED WRITE PATH", tone: "indigo" });
    k.title({ x: 60, y: 122, s: "A broker form, a webhook and a poll all update the same cards", size: 32 });

    // Lane 1: submit
    k.text({ x: 60, y: 186, s: "SUBMIT", size: 16, weight: 800, fill: "#64748b", spacing: 4 });
    const ly = 202, lh = 92;
    const f = k.box({ x: 60, y: ly, w: 220, h: lh, label: "broker form", sub: "client's phone", tone: "indigo", size: 22 });
    const pl = k.box({ x: 340, y: ly, w: 230, h: lh, label: "pair lock", sub: "broker + phone, re-check", tone: "emerald", glow: true, size: 22 });
    const cr = k.box({ x: 630, y: ly, w: 260, h: lh, label: "CRM: create lead", sub: "irreversible write", tone: "amber", size: 22 });
    const lc = k.box({ x: 950, y: ly, w: 220, h: lh, label: "local card", sub: "read-model of the CRM", tone: "slate", size: 22 });
    chain(k, [f, pl, cr, lc], "indigo");
    k.pill({ x: pl.cx, y: 334, s: "4 concurrent submits → 1 lead", tone: "emerald", size: 16 });

    // Lane 2: sync
    k.text({ x: 60, y: 410, s: "SYNC", size: 16, weight: 800, fill: "#64748b", spacing: 4 });
    const wh = k.box({ x: 60, y: 426, w: 220, h: 78, label: "CRM webhook", sub: "deal changes only", tone: "slate", size: 21 });
    const po = k.box({ x: 60, y: 528, w: 220, h: 78, label: "poll · 60 s", sub: "leads · expiry · batched", tone: "slate", size: 21 });
    const sy = 456, sh = 112;
    const kl = k.box({ x: 340, y: sy, w: 210, h: sh, label: "card lock", sub: "before any CRM read", tone: "emerald", glow: true, size: 22 });
    const rd = k.box({ x: 590, y: sy, w: 200, h: sh, label: "fresh read", sub: "under the lock", tone: "cyan", size: 22 });
    const ce = k.box({ x: 830, y: sy, w: 220, h: sh, label: "classify errors", sub: "transient → no write", tone: "amber", size: 22 });
    const sv = k.box({ x: 1090, y: sy, w: 230, h: sh, label: "save changes", sub: "changed columns only", tone: "emerald", size: 22 });
    const lt = k.box({ x: 1360, y: sy, w: 180, h: sh, label: "letter", sub: "after save · dedup", tone: "indigo", size: 22 });
    k.path({ d: `M${wh.right + 6} ${wh.cy} C ${wh.right + 34} ${wh.cy}, ${kl.left - 34} ${kl.cy - 18}, ${kl.left - 10} ${kl.cy - 18}`, tone: "slate", width: 2 });
    k.path({ d: `M${po.right + 6} ${po.cy} C ${po.right + 34} ${po.cy}, ${kl.left - 34} ${kl.cy + 18}, ${kl.left - 10} ${kl.cy + 18}`, tone: "slate", width: 2 });
    chain(k, [kl, rd, ce, sv, lt], "indigo");
    k.path({ d: `M${sv.cx} ${sv.top - 6} C ${sv.cx} ${sv.top - 70}, ${lc.cx + 40} ${lc.bottom + 70}, ${lc.cx + 40} ${lc.bottom + 10}`, tone: "emerald", dashed: true, width: 1.8 });
    k.text({ x: 1240, y: 372, s: "updates the card", size: 17, weight: 600, fill: "#6ee7b7" });
    k.text({ x: sv.cx, y: sv.bottom + 34, s: "+ PATCH guard; a control", size: 16, weight: 600, fill: "#94a3b8", anchor: "middle" });
    k.text({ x: sv.cx, y: sv.bottom + 56, s: "test reproduces the race", size: 16, weight: 600, fill: "#94a3b8", anchor: "middle" });

    // Lane 3: statuses
    k.text({ x: 60, y: 690, s: "STATUS, MIRRORED FROM THE CRM", size: 16, weight: 800, fill: "#64748b", spacing: 4 });
    const ty = 712, th = 64;
    const names = ["pending", "unique", "meeting set", "meeting held", "sold"];
    const widths = [160, 150, 200, 210, 130];
    let x = 60;
    const st = names.map((n, i) => { const b = k.box({ x, y: ty, w: widths[i], h: th, label: n, tone: i === 4 ? "emerald" : "slate", size: 20 }); x += widths[i] + 44; return b; });
    chain(k, st, "slate");
    const ar = k.box({ x: st[1].left - 20, y: 820, w: 190, h: 56, label: "archive", tone: "dim", size: 19 });
    k.arrow({ x1: st[1].cx - 30, y1: st[1].bottom + 6, x2: st[1].cx - 30, y2: ar.top - 8, tone: "slate" });
    k.arrow({ x1: st[1].cx + 30, y1: ar.top - 4, x2: st[1].cx + 30, y2: st[1].bottom + 10, tone: "slate", dashed: true });
    k.text({ x: ar.right + 14, y: 856, s: "expiry, and back again", size: 16, weight: 600, fill: "#64748b" });

    // numbers
    const nx = 1180;
    k.kicker({ x: nx, y: 690, s: "MEASURED", tone: "emerald" });
    k.text({ x: nx, y: 736, s: "276 tests, race detector on", size: 19, weight: 700, fill: "#d1fae5" });
    k.text({ x: nx, y: 772, s: "0 duplicate letters after replays", size: 19, weight: 700, fill: "#d1fae5" });
    k.text({ x: nx, y: 808, s: "500 cards: 1,001+ → 21 CRM calls", size: 19, weight: 700, fill: "#d1fae5" });
    k.text({ x: nx, y: 844, s: "pre-launch · dev, staging and a fake CRM", size: 16, weight: 600, fill: "#64748b" });
  } },

  "memory": { file: "case-llm-memory.webp", opts: { width: 1600, height: 900, glow: [{ x: 860, y: 450, r: 640, color: "#34d399", o: 0.09 }, { x: 1300, y: 300, r: 480, color: "#6366f1", o: 0.15 }] }, draw(k) {
    k.kicker({ x: 60, y: 78, s: "THE MODEL PROPOSES, CODE DECIDES", tone: "indigo" });
    k.title({ x: 60, y: 122, s: "Long-term memory written by an LLM, checked by code", size: 32 });

    const ex = k.box({ x: 60, y: 300, w: 240, h: 112, label: "exchange", sub: "user message + reply", tone: "slate", size: 24 });
    const wl = k.box({ x: 350, y: 300, w: 230, h: 112, label: "writer LLM", sub: "proposes 8 kinds of op", tone: "cyan", glow: true, size: 24 });
    k.arrow({ x1: ex.right + 8, y1: ex.cy, x2: wl.left - 10, y2: wl.cy, tone: "indigo" });

    // validator panel
    const vx = 640, vy = 176, vw = 420, vh = 560;
    k.rect({ x: vx, y: vy, w: vw, h: vh, rx: 16, fill: "#05291f", stroke: "#34d399", sw: 2, opacity: 0.9 });
    k.text({ x: vx + 28, y: vy + 46, s: "validator (code)", size: 24, weight: 700, fill: "#d1fae5", mono: true });
    const gates = [
      "schema and allowed values",
      "evidence quote is in its source",
      "facts only from the user",
      "expiry: 1, 2, 7, 14 or 30 days",
      "at most 5 ops per exchange",
      "same-day plans stay short-term",
    ];
    gates.forEach((s, i) => {
      const gy = vy + 104 + i * 74;
      k.check({ x: vx + 44, y: gy, ok: true, size: 30 });
      k.text({ x: vx + 76, y: gy + 7, s, size: 19, weight: 600, fill: i === 1 ? "#ffffff" : "#d1fae5" });
    });
    k.arrow({ x1: wl.right + 8, y1: wl.cy, x2: vx - 10, y2: wl.cy, tone: "cyan" });

    // memory file
    const mx = 1180, mw = 360;
    k.rect({ x: mx, y: 176, w: mw, h: 250, rx: 14, fill: "#10183a", stroke: "#6366f1", sw: 2.2 });
    k.text({ x: mx + 24, y: 220, s: "memory (Markdown)", size: 22, weight: 700, fill: "#f8fafc", mono: true });
    k.box({ x: mx + 24, y: 244, w: mw - 48, h: 64, label: "canonical facts", tone: "indigo", size: 20 });
    k.box({ x: mx + 24, y: 330, w: mw - 48, h: 64, label: "recent notes · expire", tone: "indigo", size: 20, dashed: true });
    k.arrow({ x1: vx + vw + 8, y1: 300, x2: mx - 10, y2: 300, tone: "emerald", label: "accepted", ly: 288, lsize: 16 });

    const au = k.box({ x: mx, y: 600, w: mw, h: 100, label: "audit log", sub: "every op, accepted or rejected", tone: "amber", size: 22 });
    k.arrow({ x1: vx + vw + 8, y1: 650, x2: mx - 10, y2: 650, tone: "amber", label: "all ops", ly: 638, lsize: 16 });
    const pr = k.box({ x: mx, y: 466, w: mw, h: 84, label: "pruned → archive", sub: "on every reply, /new and start", tone: "dim", size: 20 });
    k.arrow({ x1: mx + mw / 2, y1: 426 + 6, x2: mx + mw / 2, y2: pr.top - 8, tone: "slate", dashed: true });

    // loaded into the next chat
    k.path({ d: `M${mx + mw - 40} 170 C ${mx + mw - 40} 150, ${mx + mw - 60} 146, ${mx + mw - 90} 146 L 220 146 C 190 146, 180 150, 180 170 L 180 ${ex.top - 10}`, tone: "indigo", dashed: true, width: 1.8 });
    k.text({ x: 640, y: 168, s: "loaded into every chat", size: 16, weight: 600, fill: "#a5b4fc" });

    // before
    k.rect({ x: 60, y: 600, w: 520, h: 236, rx: 14, fill: "#2a0d14", stroke: "#fb7185", sw: 1.6, dashed: true, opacity: 0.85 });
    k.text({ x: 88, y: 646, s: "BEFORE", size: 18, weight: 800, fill: "#fb7185", spacing: 5 });
    k.text({ x: 88, y: 690, s: "free-text append after every reply", size: 20, weight: 600, fill: "#ffe4e6" });
    k.text({ x: 88, y: 768, s: "~180k", size: 64, weight: 800, fill: "#fda4af" });
    k.text({ x: 300, y: 768, s: "tokens of stale,", size: 20, weight: 600, fill: "#fecdd3" });
    k.text({ x: 300, y: 796, s: "duplicated facts", size: 20, weight: 600, fill: "#fecdd3" });
    k.text({ x: vx, y: 790, s: "supersede never deletes: old lines move to history", size: 18, weight: 600, fill: "#6ee7b7" });
    k.text({ x: vx, y: 826, s: "56 tests · LLM stubbed, clock pinned", size: 18, weight: 600, fill: "#94a3b8" });
  } },

  "evals-teaser": { file: "case-llm-evals-teaser.webp", outW: 1232, opts: { width: 1600, height: 1300, glow: [{ x: 1110, y: 290, r: 470, color: "#6366f1", o: 0.26 }] }, draw(k) {
    const g = 44;
    k.text({ x: 440, y: 112 + g, s: "BEFORE", size: 22, weight: 800, fill: "#64748b", anchor: "middle", spacing: 6 });
    k.text({ x: 440, y: 158 + g, s: "Up to 4 model passes", size: 36, weight: 700, fill: "#cbd5e1", anchor: "middle" });
    const labels = ["answer", "reflect", "reconcile", "translate"];
    labels.forEach((s, i) => {
      const bx = 270 + (i % 2) * 180, by = 196 + Math.floor(i / 2) * 84 + g;
      k.box({ x: bx, y: by, w: 160, h: 64, label: s, sub: "LLM", tone: "rose", size: 20 });
    });
    k.text({ x: 735, y: 262 + g, s: "REWRITE", size: 18, weight: 800, fill: "#818cf8", anchor: "middle", spacing: 6 });
    k.arrow({ x1: 660, y1: 288 + g, x2: 808, y2: 288 + g, gradient: ["slate", "indigo"], width: 4 });
    k.text({ x: 1110, y: 112 + g, s: "AFTER", size: 22, weight: 800, fill: "#818cf8", anchor: "middle", spacing: 6 });
    k.text({ x: 1110, y: 158 + g, s: "1 write, tested 3 of 3", size: 36, weight: 700, fill: "#f8fafc", anchor: "middle" });
    k.box({ x: 920, y: 196 + g, w: 380, h: 96, label: "one write", sub: "guards in code", tone: "indigo", glow: true, size: 34 });
    [-60, 0, 60].forEach((dx) => k.check({ x: 1110 + dx, y: 340 + g, ok: true, size: 40 }));
  } },

  "gpu-teaser": { file: "case-gpu-scaleout-teaser.webp", outW: 1232, opts: { width: 1600, height: 1300, glow: [{ x: 1000, y: 300, r: 520, color: "#22d3ee", o: 0.2 }] }, draw(k) {
    const g = 44, x0 = 520, maxW = 860;
    k.text({ x: 300, y: 112 + g, s: "ANALYSES PER MINUTE", size: 22, weight: 800, fill: "#22d3ee", spacing: 6 });
    k.text({ x: 300, y: 214 + g, s: "1 GPU server", size: 30, weight: 700, fill: "#94a3b8" });
    k.rect({ x: x0, y: 180 + g, w: maxW * (68 / 393), h: 50, rx: 8, fill: "#334155" });
    k.text({ x: x0 + maxW * (68 / 393) + 18, y: 218 + g, s: "55–68", size: 34, weight: 700, fill: "#cbd5e1", mono: true });
    k.text({ x: 300, y: 314 + g, s: "4 GPU servers", size: 30, weight: 700, fill: "#67e8f9" });
    k.rect({ x: x0, y: 280 + g, w: maxW, h: 50, rx: 8, fill: "#22d3ee", opacity: 0.4, filter: "url(#blur)" });
    k.rect({ x: x0, y: 280 + g, w: maxW, h: 50, rx: 8, fill: "#0e7490", stroke: "#22d3ee", sw: 2 });
    k.text({ x: x0 + maxW - 18, y: 318 + g, s: "393", size: 34, weight: 700, fill: "#ecfeff", anchor: "end", mono: true });
    k.text({ x: x0, y: 384 + g, s: "1,999 of 2,000 OK at 100 concurrent clients", size: 24, weight: 600, fill: "#6ee7b7" });
  } },
};
