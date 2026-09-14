const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const W = 2240;
const H = 1400;
const BG = "#F7F5EF";
const INK = "#182D3D";
const MUTED = "#5C6C76";
const TEAL = "#167D8D";
const TEAL_SOFT = "#E7F0F3";
const ORANGE = "#B16A30";
const ORANGE_SOFT = "#F7EFE6";
const LINE = "#C8C2B9";
const WHITE = "#FFFFFF";
const MINT = "#E8F2EC";
const STOP = "#B4483E";
const STOP_SOFT = "#F8ECEA";
const TOP = 248;
const BOTTOM = 1220;

const esc = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const header = (part, title, sub) => `
  <text x="64" y="58" fill="${TEAL}" font-family="Arial,Helvetica,sans-serif" font-size="26" letter-spacing="1.5">EPISTEMIC NOISE  /  AI SYSTEM DESIGN  /  PART ${part}</text>
  <text x="64" y="118" fill="${INK}" font-family="Arial,Helvetica,sans-serif" font-size="50" font-weight="700">${esc(title)}</text>
  <text x="64" y="168" fill="${MUTED}" font-family="Arial,Helvetica,sans-serif" font-size="26">${esc(sub)}</text>
  <line x1="64" y1="208" x2="${W - 64}" y2="208" stroke="${LINE}" stroke-width="2"/>`;

const footer = (note, fig) => `
  <text x="${W / 2}" y="${H - 100}" text-anchor="middle" fill="${MUTED}" font-family="Arial,Helvetica,sans-serif" font-size="26">${esc(note)}</text>
  <line x1="64" y1="${H - 68}" x2="${W - 64}" y2="${H - 68}" stroke="${LINE}" stroke-width="2"/>
  <text x="64" y="${H - 34}" fill="${MUTED}" font-family="Arial,Helvetica,sans-serif" font-size="24">Aissam Outchakoucht  /  Reference design</text>
  <text x="${W - 64}" y="${H - 34}" text-anchor="end" fill="${TEAL}" font-family="Arial,Helvetica,sans-serif" font-size="26" font-weight="700">${fig}</text>`;

function arrow(x1, y1, x2, y2, color = TEAL, sw = 6) {
  const ang = Math.atan2(y2 - y1, x2 - x1);
  const L = 26;
  const w = 12;
  const ax = x2 - L * Math.cos(ang);
  const ay = y2 - L * Math.sin(ang);
  const p1x = ax + w * Math.cos(ang + Math.PI / 2);
  const p1y = ay + w * Math.sin(ang + Math.PI / 2);
  const p2x = ax + w * Math.cos(ang - Math.PI / 2);
  const p2y = ay + w * Math.sin(ang - Math.PI / 2);
  return `<line x1="${x1}" y1="${y1}" x2="${ax}" y2="${ay}" stroke="${color}" stroke-width="${sw}" stroke-linecap="round"/>
  <polygon points="${x2},${y2} ${p1x},${p1y} ${p2x},${p2y}" fill="${color}"/>`;
}

async function write(name, svg) {
  const out = path.join("public/media/ai-system-design-evaluation", name);
  await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toFile(out);
  console.log("wrote", name, fs.statSync(out).size);
}

async function main() {
  // FIG 1
  {
    const dims = [
      ["Application", "Build / deployment revision"],
      ["Assistant", "Published assistant version"],
      ["Workflow", "Workflow definition version"],
      ["Prompts", "Prompt bundle version"],
      ["Model", "Route + provider revision"],
      ["Retrieval", "Index, embed, and reranker versions"],
      ["Tools", "Contract versions exposed to the run"],
      ["Policy", "Authorization and execution policy"],
    ];
    const x1 = 64;
    const w1 = 1020;
    const gap = 36;
    const w2 = 560;
    const w3 = 440;
    const x2 = x1 + w1 + gap;
    const x3 = x2 + w2 + gap;
    const y = TOP;
    const h = BOTTOM - TOP;
    let body = `
  <rect x="${x1}" y="${y}" width="${w1}" height="${h}" rx="24" fill="${WHITE}" stroke="${LINE}" stroke-width="2.5"/>
  <text x="${x1 + 40}" y="${y + 58}" fill="${TEAL}" font-family="Arial,Helvetica,sans-serif" font-size="26" font-weight="700" letter-spacing="1.5">VERSIONED DIMENSIONS</text>`;
    const listTop = y + 90;
    const listH = h - 130;
    const rowGap = 14;
    const rowH = (listH - 7 * rowGap) / 8;
    dims.forEach(([t, b], i) => {
      const ry = listTop + i * (rowH + rowGap);
      body += `
    <rect x="${x1 + 36}" y="${ry}" width="${w1 - 72}" height="${rowH}" rx="16" fill="${TEAL_SOFT}" stroke="${LINE}" stroke-width="2"/>
    <text x="${x1 + 64}" y="${ry + rowH * 0.42}" fill="${INK}" font-family="Arial,Helvetica,sans-serif" font-size="30" font-weight="700">${esc(t)}</text>
    <text x="${x1 + 64}" y="${ry + rowH * 0.78}" fill="${MUTED}" font-family="Arial,Helvetica,sans-serif" font-size="24">${esc(b)}</text>`;
    });
    body += `
  <rect x="${x2}" y="${y}" width="${w2}" height="${h}" rx="24" fill="${TEAL_SOFT}" stroke="${LINE}" stroke-width="2.5"/>
  <text x="${x2 + 40}" y="${y + h * 0.12}" fill="${INK}" font-family="Arial,Helvetica,sans-serif" font-size="42" font-weight="700">Release manifest</text>
  <text x="${x2 + 40}" y="${y + h * 0.3}" fill="${MUTED}" font-family="Arial,Helvetica,sans-serif" font-size="30">Immutable combination identity</text>
  <text x="${x2 + 40}" y="${y + h * 0.42}" fill="${MUTED}" font-family="Arial,Helvetica,sans-serif" font-size="30">Stable references, not copies</text>
  <text x="${x2 + 40}" y="${y + h * 0.54}" fill="${MUTED}" font-family="Arial,Helvetica,sans-serif" font-size="30">Recorded at run acceptance</text>
  <text x="${x2 + 40}" y="${y + h * 0.66}" fill="${MUTED}" font-family="Arial,Helvetica,sans-serif" font-size="30">Shared by eval and production</text>
  <text x="${x2 + 40}" y="${y + h * 0.86}" fill="${TEAL}" font-family="Arial,Helvetica,sans-serif" font-size="28" font-weight="700">One identity for the whole stack</text>
  <rect x="${x3}" y="${y}" width="${w3}" height="${h}" rx="24" fill="${ORANGE_SOFT}" stroke="${LINE}" stroke-width="2.5"/>
  <text x="${x3 + 36}" y="${y + h * 0.12}" fill="${INK}" font-family="Arial,Helvetica,sans-serif" font-size="42" font-weight="700">Run</text>
  <text x="${x3 + 36}" y="${y + h * 0.34}" fill="${MUTED}" font-family="Arial,Helvetica,sans-serif" font-size="30">Pins the manifest</text>
  <text x="${x3 + 36}" y="${y + h * 0.48}" fill="${MUTED}" font-family="Arial,Helvetica,sans-serif" font-size="30">Attribution for</text>
  <text x="${x3 + 36}" y="${y + h * 0.6}" fill="${MUTED}" font-family="Arial,Helvetica,sans-serif" font-size="30">outcomes and failures</text>
  <text x="${x3 + 36}" y="${y + h * 0.86}" fill="${ORANGE}" font-family="Arial,Helvetica,sans-serif" font-size="28" font-weight="700">Pinned at acceptance</text>`;
    const mid = y + h / 2;
    body += arrow(x1 + w1 + 6, mid, x2 - 8, mid, TEAL, 6);
    body += `<text x="${x1 + w1 + gap / 2}" y="${mid - 18}" text-anchor="middle" fill="${TEAL}" font-family="Arial,Helvetica,sans-serif" font-size="22" font-weight="700">compose</text>`;
    body += arrow(x2 + w2 + 6, mid, x3 - 8, mid, ORANGE, 6);
    body += `<text x="${x2 + w2 + gap / 2}" y="${mid - 18}" text-anchor="middle" fill="${ORANGE}" font-family="Arial,Helvetica,sans-serif" font-size="22" font-weight="700">pins</text>`;

    await write(
      "01.png",
      `<?xml version="1.0"?><svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <rect width="${W}" height="${H}" fill="${BG}"/>${header(5, "A release is a composition of versions", "The model route is only one of several identities pinned to a run.")}${body}
  ${footer("Evaluation and production outcomes are attributed to the combination that produced them.", "5.1")}</svg>`,
    );
  }

  // FIG 2
  {
    const m = 64;
    const usable = W - 2 * m;
    const gap = 24;
    const sw = (usable - 4 * gap) / 5;
    const sh = 340;
    const sy = TOP;
    const stages = [
      ["Candidate", ["Proposed", "change"], WHITE],
      ["Offline evaluation", ["Fixed cases", "Load · recovery"], TEAL_SOFT],
      ["Replay / shadow", ["No prod writes", "Compare safely"], TEAL_SOFT],
      ["Limited canary", ["Stable assign", "Live slice"], ORANGE_SOFT],
      ["Broader rollout", ["Full promote", "Keep watching"], MINT],
    ];
    let body = "";
    const centers = [];
    stages.forEach(([t, lines, fill], i) => {
      const x = m + i * (sw + gap);
      centers.push({ x: x + sw / 2, b: sy + sh });
      const parts = t.includes(" ")
        ? [t.split(" ")[0], t.split(" ").slice(1).join(" ")]
        : [t];
      body += `<rect x="${x}" y="${sy}" width="${sw}" height="${sh}" rx="22" fill="${fill}" stroke="${LINE}" stroke-width="2.5"/>`;
      parts.forEach((p, pi) => {
        if (!p) return;
        body += `<text x="${x + 24}" y="${sy + 58 + pi * 42}" fill="${INK}" font-family="Arial,Helvetica,sans-serif" font-size="32" font-weight="700">${esc(p)}</text>`;
      });
      lines.forEach((l, li) => {
        body += `<text x="${x + 24}" y="${sy + 180 + li * 42}" fill="${MUTED}" font-family="Arial,Helvetica,sans-serif" font-size="26">${esc(l)}</text>`;
      });
      if (i < 4) body += arrow(x + sw + 5, sy + sh / 2, x + sw + gap - 5, sy + sh / 2, TEAL, 6);
    });
    for (const i of [1, 2, 3]) {
      const c = centers[i];
      body += arrow(c.x, c.b + 6, c.x, c.b + 48, STOP, 5);
      body += `<rect x="${c.x - 92}" y="${c.b + 54}" width="184" height="62" rx="14" fill="${STOP_SOFT}" stroke="${STOP}" stroke-width="2.5"/>
    <text x="${c.x}" y="${c.b + 94}" text-anchor="middle" fill="${STOP}" font-family="Arial,Helvetica,sans-serif" font-size="26" font-weight="700">Stop</text>`;
    }
    const py = sy + sh + 140;
    const ph = BOTTOM - py;
    body += `<text x="${m}" y="${py - 20}" fill="${TEAL}" font-family="Arial,Helvetica,sans-serif" font-size="26" font-weight="700" letter-spacing="1.5">SHADOW PATH FOR INVESTIGATIONS</text>
  <rect x="${m}" y="${py}" width="${usable}" height="${ph}" rx="24" fill="${WHITE}" stroke="${LINE}" stroke-width="2.5"/>`;
    const iy = py + 40;
    const ih = ph - 80;
    const lw = usable * 0.43;
    const rw = usable * 0.45;
    const lx = m + 36;
    const rx = m + usable - 36 - rw;
    body += `<rect x="${lx}" y="${iy}" width="${lw}" height="${ih}" rx="20" fill="${TEAL_SOFT}" stroke="${LINE}" stroke-width="2"/>
  <text x="${lx + 40}" y="${iy + ih * 0.22}" fill="${INK}" font-family="Arial,Helvetica,sans-serif" font-size="40" font-weight="700">Proposal</text>
  <text x="${lx + 40}" y="${iy + ih * 0.48}" fill="${MUTED}" font-family="Arial,Helvetica,sans-serif" font-size="30">Generate and validate the remedy</text>
  <text x="${lx + 40}" y="${iy + ih * 0.66}" fill="${MUTED}" font-family="Arial,Helvetica,sans-serif" font-size="30">Compare against the current release</text>
  <text x="${lx + 40}" y="${iy + ih * 0.84}" fill="${MUTED}" font-family="Arial,Helvetica,sans-serif" font-size="30">No live customer effect yet</text>`;
    body += arrow(lx + lw + 10, iy + ih / 2, rx - 10, iy + ih / 2, TEAL, 6);
    body += `<rect x="${rx}" y="${iy}" width="${rw}" height="${ih}" rx="20" fill="${ORANGE_SOFT}" stroke="${LINE}" stroke-width="2"/>
  <text x="${rx + 40}" y="${iy + ih * 0.22}" fill="${INK}" font-family="Arial,Helvetica,sans-serif" font-size="40" font-weight="700">Action boundary</text>
  <text x="${rx + 40}" y="${iy + ih * 0.48}" fill="${MUTED}" font-family="Arial,Helvetica,sans-serif" font-size="30">Sandbox the write, or halt before dispatch</text>
  <text x="${rx + 40}" y="${iy + ih * 0.66}" fill="${MUTED}" font-family="Arial,Helvetica,sans-serif" font-size="30">Never issue a second refund for comparison</text>
  <text x="${rx + 40}" y="${iy + ih * 0.84}" fill="${MUTED}" font-family="Arial,Helvetica,sans-serif" font-size="30">Production order system is not called</text>`;

    await write(
      "02.png",
      `<?xml version="1.0"?><svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <rect width="${W}" height="${H}" fill="${BG}"/>${header(5, "Evidence grows before exposure", "Each stage can stop promotion. Shadowing must not duplicate business writes.")}${body}
  ${footer("Promotion criteria are defined before the canary starts.", "5.2")}</svg>`,
    );
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
