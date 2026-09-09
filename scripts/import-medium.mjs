#!/usr/bin/env node
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

const extras = [
  {
    url: "https://aissam-outchakoucht.medium.com/emergence-as-the-starting-point-to-artificial-general-intelligence-a789ecce388b",
    kind: "thoughts",
    slug: "emergence-agi",
    series: "Essays",
    date: "2019-08-11",
  },
  {
    url: "https://medium.com/data-science/a-guide-to-building-whatsapp-chatbots-using-dialogflow-and-firebase-4ff5e904ac3",
    kind: "articles",
    slug: "whatsapp-chatbots",
    series: "Production",
    date: "2020-09-13",
  },
  {
    url: "https://towardsdatascience.com/machine-learning-in-production-keras-flask-docker-and-heroku-933b5f885459",
    kind: "articles",
    slug: "ml-in-production",
    series: "Production",
    date: "2020-12-16",
  },
  {
    url: "https://medium.com/data-science/deploy-multiple-flask-applications-using-nginx-and-gunicorn-16f8f7865497",
    kind: "articles",
    slug: "flask-nginx-gunicorn",
    series: "Production",
    date: "2021-07-03",
  },
];

const rssMap = [
  {
    match: /the climb/i,
    kind: "thoughts",
    slug: "you-know-nothing-the-climb",
    series: "You Know Nothing, Jon Snow",
    seriesOrder: 5,
  },
  {
    match: /north wall/i,
    kind: "thoughts",
    slug: "you-know-nothing-the-north-wall",
    series: "You Know Nothing, Jon Snow",
    seriesOrder: 4,
  },
  {
    match: /didn.t dream it/i,
    kind: "thoughts",
    slug: "you-know-nothing-you-didnt-dream-it",
    series: "You Know Nothing, Jon Snow",
    seriesOrder: 3,
  },
  {
    match: /the citadel/i,
    kind: "thoughts",
    slug: "you-know-nothing-the-citadel",
    series: "You Know Nothing, Jon Snow",
    seriesOrder: 2,
  },
  {
    match: /ring the bells/i,
    kind: "thoughts",
    slug: "you-know-nothing-ring-the-bells",
    series: "You Know Nothing, Jon Snow",
    seriesOrder: 1,
  },
  {
    match: /monetization/i,
    kind: "articles",
    slug: "alexa-skills-monetization",
    series: "Alexa Skills with Python",
    seriesOrder: 5,
  },
  {
    match: /multilingual/i,
    kind: "articles",
    slug: "alexa-skills-multilingual",
    series: "Alexa Skills with Python",
    seriesOrder: 4,
  },
  {
    match: /visual dimension/i,
    kind: "articles",
    slug: "alexa-skills-apl",
    series: "Alexa Skills with Python",
    seriesOrder: 3,
  },
  {
    match: /how to create alexa/i,
    kind: "articles",
    slug: "alexa-skills-python",
    series: "Alexa Skills with Python",
    seriesOrder: 2,
  },
  {
    match: /an introduction/i,
    kind: "articles",
    slug: "alexa-skills-introduction",
    series: "Alexa Skills with Python",
    seriesOrder: 1,
  },
];

function decode(value) {
  return value
    .replace(/<!\[CDATA\[/g, "")
    .replace(/\]\]>/g, "")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

function strip(value) {
  return decode(String(value).replace(/<[^>]+>/g, "")).replace(/\s+/g, " ").trim();
}

function isAiCaption(text) {
  return /(?:gemini|chatgpt|dall-?e|midjourney|stable\s*diffusion)\s+generated/i.test(
    String(text || ""),
  );
}

function cleanAlt(alt) {
  return String(alt || "")
    .replace(
      /^(?:gemini|chatgpt|dall-?e|midjourney|stable\s*diffusion)\s+generated\s*[:\-—–]\s*/i,
      "",
    )
    .trim();
}

function yamlString(value) {
  return JSON.stringify(String(value ?? "").trim());
}

function firstParagraph(markdown) {
  return (
    markdown
      .split("\n\n")
      .map((block) => block.replace(/^#+\s+/, "").trim())
      .find((block) => {
        if (!block) return false;
        if (block.startsWith("!") || block.startsWith("[")) return false;
        if (isAiCaption(block)) return false;
        if (/^\*[^*]+\*$/.test(block) && isAiCaption(block.replace(/^\*|\*$/g, ""))) {
          return false;
        }
        return true;
      }) || ""
  ).slice(0, 280);
}

function extensionFromUrl(url, contentType = "") {
  const clean = url.split("?")[0].toLowerCase();
  const fromPath = path.extname(clean).replace(".", "");
  if (fromPath && fromPath.length <= 5) return fromPath;
  if (contentType.includes("gif")) return "gif";
  if (contentType.includes("png")) return "png";
  if (contentType.includes("webp")) return "webp";
  if (contentType.includes("svg")) return "svg";
  if (contentType.includes("mp4")) return "mp4";
  return "jpg";
}

function preferAnimatedUrl(url) {
  if (/tenor\.com/i.test(url)) {
    return url.replace(/AAAAN/g, "AAAAC").replace(/\.png(?=$|\?)/i, ".gif");
  }
  return url;
}

async function downloadImage(src, slug, index) {
  const mediaDir = path.join(root, "public", "media", slug);
  fs.mkdirSync(mediaDir, { recursive: true });

  const candidates = [preferAnimatedUrl(src)];
  if (candidates[0] !== src) candidates.push(src);

  let lastError;
  for (const candidate of candidates) {
    try {
      const hash = crypto.createHash("sha1").update(candidate).digest("hex").slice(0, 10);
      const res = await fetch(candidate, {
        headers: { "User-Agent": "epistemicnoise-importer/1.0" },
        redirect: "follow",
      });
      if (!res.ok) throw new Error(`image ${candidate} -> ${res.status}`);

      const contentType = res.headers.get("content-type") || "";
      const ext = extensionFromUrl(candidate, contentType);
      const filename = `${String(index).padStart(2, "0")}-${hash}.${ext}`;
      const filePath = path.join(mediaDir, filename);
      const buffer = Buffer.from(await res.arrayBuffer());
      fs.writeFileSync(filePath, buffer);
      return `/media/${slug}/${filename}`;
    } catch (error) {
      lastError = error;
    }
  }
  throw lastError || new Error(`failed to download ${src}`);
}

function extractAttr(tag, name) {
  const match = tag.match(new RegExp(`${name}=["']([^"']+)["']`, "i"));
  return match ? match[1] : "";
}

function embedImageFromIframeSrc(src) {
  try {
    const url = new URL(decode(src.replace(/&amp;/g, "&")));
    return url.searchParams.get("image") || "";
  } catch {
    return "";
  }
}

async function iframeToMarkdown(iframeHtml, slug, counter) {
  const openTag = (iframeHtml.match(/<iframe\b[^>]*>/i) || [])[0] || "";
  const src = extractAttr(openTag, "src");
  const image = embedImageFromIframeSrc(src);
  if (!image) return "\n\n";
  try {
    const local = await downloadImage(image, slug, counter.value++);
    return `\n\n![](${local})\n\n`;
  } catch (error) {
    console.warn("  skip embed", image, error.message);
    return "\n\n";
  }
}

async function figureToMarkdown(figureHtml, slug, counter) {
  const iframeMatch = figureHtml.match(/<iframe[\s\S]*?<\/iframe>/i);
  if (iframeMatch) {
    return iframeToMarkdown(iframeMatch[0], slug, counter);
  }

  const imgMatch = figureHtml.match(/<img\b[^>]*>/i);
  if (!imgMatch) return "\n\n";

  const imgTag = imgMatch[0];
  let src =
    extractAttr(imgTag, "src") ||
    extractAttr(imgTag, "data-src") ||
    (extractAttr(imgTag, "srcset") || "").split(",")[0]?.trim().split(/\s+/)[0] ||
    "";
  if (!src || src.startsWith("data:")) return "\n\n";
  if (/medium\.com\/_\/stat/i.test(src)) return "\n\n";

  // Prefer larger CDN variants when Medium uses miro.medium.com
  src = src.replace(/\/max\/\d+\//, "/max/2000/");

  const rawAlt =
    extractAttr(imgTag, "alt") ||
    strip((figureHtml.match(/<figcaption[^>]*>([\s\S]*?)<\/figcaption>/i) || [])[1] || "") ||
    "";
  const caption = strip(
    (figureHtml.match(/<figcaption[^>]*>([\s\S]*?)<\/figcaption>/i) || [])[1] || "",
  );
  const alt = cleanAlt(isAiCaption(rawAlt) ? cleanAlt(rawAlt) : rawAlt);

  try {
    const local = await downloadImage(src, slug, counter.value++);
    let md = `\n\n![${alt.replace(/[[\]]/g, "")}](${local})\n\n`;
    if (caption && caption !== rawAlt && !isAiCaption(caption)) {
      md += `*${caption}*\n\n`;
    }
    return md;
  } catch (error) {
    console.warn("  skip image", src, error.message);
    return "\n\n";
  }
}

async function htmlToMarkdown(html, slug) {
  let text = html;
  const counter = { value: 1 };

  text = text.replace(/<script[\s\S]*?<\/script>/gi, "");
  text = text.replace(/<style[\s\S]*?<\/style>/gi, "");

  // Medium GIF / video embeds (Tenor via Embedly)
  const iframeRegex = /<iframe[\s\S]*?<\/iframe>/gi;
  const iframes = [...text.matchAll(iframeRegex)];
  for (const match of iframes.reverse()) {
    const replacement = await iframeToMarkdown(match[0], slug, counter);
    text =
      text.slice(0, match.index) + replacement + text.slice(match.index + match[0].length);
  }

  // Process figures (async replace via sequential scan)
  const figureRegex = /<figure[\s\S]*?<\/figure>/gi;
  const figures = [...text.matchAll(figureRegex)];
  for (const match of figures.reverse()) {
    const replacement = await figureToMarkdown(match[0], slug, counter);
    text =
      text.slice(0, match.index) + replacement + text.slice(match.index + match[0].length);
  }

  // Standalone images not wrapped in figure
  const imgRegex = /<img\b[^>]*>/gi;
  const images = [...text.matchAll(imgRegex)];
  for (const match of images.reverse()) {
    const imgTag = match[0];
    let src =
      extractAttr(imgTag, "src") ||
      extractAttr(imgTag, "data-src") ||
      (extractAttr(imgTag, "srcset") || "").split(",")[0]?.trim().split(/\s+/)[0] ||
      "";
    if (!src || src.startsWith("data:") || /medium\.com\/_\/stat/i.test(src)) {
      text = text.slice(0, match.index) + "\n\n" + text.slice(match.index + match[0].length);
      continue;
    }
    src = src.replace(/\/max\/\d+\//, "/max/2000/");
    const alt = cleanAlt(extractAttr(imgTag, "alt") || "");
    try {
      const local = await downloadImage(src, slug, counter.value++);
      const replacement = `\n\n![${alt.replace(/[[\]]/g, "")}](${local})\n\n`;
      text =
        text.slice(0, match.index) +
        replacement +
        text.slice(match.index + match[0].length);
    } catch (error) {
      console.warn("  skip image", src, error.message);
      text = text.slice(0, match.index) + "\n\n" + text.slice(match.index + match[0].length);
    }
  }

  text = text.replace(/<h1[^>]*>([\s\S]*?)<\/h1>/gi, (_, t) => `\n\n# ${strip(t)}\n\n`);
  text = text.replace(/<h2[^>]*>([\s\S]*?)<\/h2>/gi, (_, t) => `\n\n## ${strip(t)}\n\n`);
  text = text.replace(/<h3[^>]*>([\s\S]*?)<\/h3>/gi, (_, t) => `\n\n## ${strip(t)}\n\n`);
  text = text.replace(/<h4[^>]*>([\s\S]*?)<\/h4>/gi, (_, t) => `\n\n### ${strip(t)}\n\n`);
  text = text.replace(/<blockquote[^>]*>([\s\S]*?)<\/blockquote>/gi, (_, t) => `\n\n> ${strip(t)}\n\n`);
  text = text.replace(/<pre[^>]*>([\s\S]*?)<\/pre>/gi, (_, code) => {
    const cleaned = strip(code.replace(/<br\s*\/?>/gi, "\n"));
    return `\n\n\`\`\`\n${cleaned}\n\`\`\`\n\n`;
  });
  text = text.replace(/<li[^>]*>([\s\S]*?)<\/li>/gi, (_, t) => `- ${strip(t)}\n`);
  text = text.replace(/<\/?ul[^>]*>/gi, "\n");
  text = text.replace(/<\/?ol[^>]*>/gi, "\n");
  text = text.replace(/<br\s*\/?>/gi, "\n");
  text = text.replace(/<p[^>]*>([\s\S]*?)<\/p>/gi, (_, t) => `\n\n${strip(t)}\n\n`);
  text = text.replace(/<a[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/gi, (_, href, label) => {
    const cleanHref = href.split("?")[0];
    // Drop Medium media fallback links; embeds should already be images
    if (/medium\.com\/media\//i.test(cleanHref)) return "";
    return `[${strip(label)}](${cleanHref})`;
  });
  text = text.replace(/<(strong|b)[^>]*>([\s\S]*?)<\/\1>/gi, (_, __, t) => `**${strip(t)}**`);
  text = text.replace(/<(em|i)[^>]*>([\s\S]*?)<\/\1>/gi, (_, __, t) => {
    const inner = strip(t);
    if (isAiCaption(inner)) return "";
    return `*${inner}*`;
  });
  text = text.replace(/<[^>]+>/g, "");
  text = text.replace(/\[Editor[^\]]*Note[\s\S]*?\]/gi, "");
  text = text.replace(/\*?Originally published at[^\n*]*\*?\s*/gi, "");
  text = text.replace(/was originally published[\s\S]*$/i, "");
  text = text.replace(/^\*?(?:gemini|chatgpt|dall-?e|midjourney)\s+generated[^*\n]*\*?$/gim, "");
  text = text.replace(/\[[^\]]*\]\(https?:\/\/medium\.com\/media\/[^)]+\)/gi, "");
  return text.replace(/\n{3,}/g, "\n\n").trim();
}

function writePost({ kind, slug, title, date, description, sourceUrl, series, seriesOrder, body }) {
  const dir = path.join(root, "content", kind);
  fs.mkdirSync(dir, { recursive: true });
  const front = `---
title: ${yamlString(title)}
slug: ${yamlString(slug)}
date: ${date}
description: ${yamlString(description)}
source: "Medium"
sourceUrl: ${yamlString(sourceUrl)}
${series ? `series: ${yamlString(series)}\n` : ""}${seriesOrder != null ? `seriesOrder: ${seriesOrder}\n` : ""}---

${body}
`;
  fs.writeFileSync(path.join(dir, `${slug}.mdx`), front);
  console.log("Wrote", kind, slug);
}

function parseRss(xml) {
  const items = xml.split(/<item>/).slice(1);
  return items.map((chunk) => {
    const title = decode((chunk.match(/<title>([\s\S]*?)<\/title>/) || [])[1] || "");
    const link = decode((chunk.match(/<link>([\s\S]*?)<\/link>/) || [])[1] || "").split("?")[0];
    const dateRaw = (chunk.match(/<pubDate>([\s\S]*?)<\/pubDate>/) || [])[1] || "";
    const encoded =
      (chunk.match(/<content:encoded>([\s\S]*?)<\/content:encoded>/) || [])[1] || "";
    const date = new Date(dateRaw);
    return {
      title: title.replace(/\s+/g, " ").trim(),
      link,
      date: Number.isNaN(date.getTime()) ? "2022-01-01" : date.toISOString().slice(0, 10),
      html: decode(encoded),
    };
  });
}

async function fetchText(url) {
  const res = await fetch(url, {
    headers: { "User-Agent": "epistemicnoise-importer/1.0" },
  });
  if (!res.ok) throw new Error(`${url} -> ${res.status}`);
  return res.text();
}

async function fromRss() {
  const xml = await fetchText("https://aissam-outchakoucht.medium.com/feed");
  const items = parseRss(xml);
  for (const item of items) {
    const mapped = rssMap.find((entry) => entry.match.test(item.title));
    if (!mapped) {
      console.log("Skip RSS item:", item.title);
      continue;
    }
    const body = await htmlToMarkdown(item.html, mapped.slug);
    writePost({
      ...mapped,
      title: item.title.replace(/\s+/g, " ").trim(),
      date: item.date,
      description: firstParagraph(body),
      sourceUrl: item.link,
      body,
    });
  }
}

async function fromExtra(entry) {
  try {
    const html = await fetchText(entry.url);
    const title =
      strip((html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/) || [])[1] || entry.slug);
    const dateMatch = html.match(/datetime="([^"]+)"/);
    const date =
      entry.date ||
      (dateMatch ? dateMatch[1].slice(0, 10) : "2020-01-01");
    const article =
      (html.match(/<article[\s\S]*?<\/article>/i) ||
        html.match(/<section[\s\S]*?<\/section>/i) || [html])[0];
    const body = await htmlToMarkdown(article, entry.slug);
    if (body.length < 400) {
      console.warn("Thin fetch, skip for manual file:", entry.slug, body.length);
      return false;
    }
    writePost({
      ...entry,
      title,
      date,
      description: firstParagraph(body),
      sourceUrl: entry.url,
      body,
    });
    return true;
  } catch (error) {
    console.warn("Failed extra", entry.slug, error.message);
    return false;
  }
}

await fromRss();
for (const extra of extras) {
  await fromExtra(extra);
}
