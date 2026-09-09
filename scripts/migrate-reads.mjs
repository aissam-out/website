#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const backend = path.join(root, "..", "nlp_explained_backend");
const jsonPath = path.join(backend, "helper", "blogs.json");
const blogsDir = path.join(backend, "blogs");
const outDir = path.join(root, "content", "reads");

function extractText(pySource) {
  const match =
    pySource.match(/text\s*=\s*"""([\s\S]*?)"""/) ||
    pySource.match(/text\s*=\s*'''([\s\S]*?)'''/);
  return match ? match[1] : "";
}

function toMarkdown(raw) {
  let text = raw.replace(/\r\n/g, "\n");

  text = text.replace(/<code>([\s\S]*?)<\/code>/gi, (_, code) => {
    const cleaned = String(code)
      .replace(/<\/?p>/gi, "\n")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&amp;/g, "&")
      .trim();
    return `\n\n\`\`\`python\n${cleaned}\n\`\`\`\n\n`;
  });

  const fences = [];
  text = text.replace(/```[\s\S]*?```/g, (block) => {
    fences.push(block);
    return `\n\n@@FENCE${fences.length - 1}@@\n\n`;
  });

  text = text.replace(/<\/p>\s*<p>/gi, "\n\n");
  text = text.replace(/<\/?p>/gi, "\n");
  text = text.replace(/<br\s*\/?>/gi, "\n");
  text = text.replace(/<[^>]+>/g, "");
  text = text
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"');

  const blocks = text
    .split(/\n\s*\n/)
    .map((block) => {
      const lines = block
        .split("\n")
        .map((line) => line.replace(/^[ \t]+/, "").replace(/[ \t]+$/g, ""))
        .filter((line) => line.length > 0);

      if (!lines.length) return "";
      if (lines[0].startsWith("@@FENCE")) return lines[0];
      if (lines.every((line) => /^[-*]\s+/.test(line) || /^\d+\.\s+/.test(line))) {
        return lines.join("\n");
      }
      return lines.join(" ").replace(/[ \t]{2,}/g, " ");
    })
    .filter(Boolean);

  return fences
    .reduce(
      (acc, fence, index) => acc.replace(`@@FENCE${index}@@`, fence),
      blocks.join("\n\n"),
    )
    .trim();
}

function toIsoDate(value) {
  const parsed = Date.parse(value);
  if (Number.isNaN(parsed)) return "2023-01-01";
  return new Date(parsed).toISOString().slice(0, 10);
}

function yamlString(value) {
  return JSON.stringify(String(value ?? "").trim());
}

fs.mkdirSync(outDir, { recursive: true });
const posts = JSON.parse(fs.readFileSync(jsonPath, "utf8"));

for (const post of posts) {
  const pyPath = path.join(blogsDir, `${post.content}.py`);
  if (!fs.existsSync(pyPath)) {
    console.warn("Missing python source:", pyPath);
    continue;
  }
  const markdown = toMarkdown(extractText(fs.readFileSync(pyPath, "utf8")));
  const category = String(post.category || "general").toLowerCase();
  const file = path.join(outDir, `${post.url}.mdx`);
  const body = `---
title: ${yamlString(post.title)}
slug: ${yamlString(post.url)}
date: ${toIsoDate(post.createdAt)}
description: ${yamlString(post.description.replace(/<\/?p>/g, ""))}
category: ${yamlString(category)}
readingTime: "2 min"
---

${markdown}
`;
  fs.writeFileSync(file, body);
}

console.log(`Wrote ${posts.length} reads to ${outDir}`);
