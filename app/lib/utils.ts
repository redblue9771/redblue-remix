import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { Root, Heading } from "mdast";
import { visit } from "unist-util-visit";

// 生成基础 id（空格转 -，去特殊符号）
function generateBaseId(text: string): string {
  return text
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]/g, "")
    .replace(/^-+|-+$/g, "")
    .toLowerCase();
}

// 递归提取 heading 内文本
function extractTextFromHeading(node: Heading): string {
  let result = "";

  function walk(n: any) {
    if (n.type === "text") {
      result += n.value;
    } else if (Array.isArray(n.children)) {
      n.children.forEach(walk);
    }
  }

  node.children.forEach(walk);
  return result.trim();
}

// 生成唯一 ID（避免重复）
function generateUniqueId(text: string, existingIds: Set<string>): string {
  let baseId = generateBaseId(text);
  if (!baseId) baseId = "section";

  let id = baseId;
  let counter = 1;

  while (existingIds.has(id)) {
    id = `${baseId}-${counter}`;
    counter++;
  }

  existingIds.add(id);
  return id;
}

// 生成嵌套 HTML 字符串（只输出 ul/li 结构）
function generateTocHtml(
  headings: Array<{ depth: number; text: string; id: string }>
): string {
  if (headings.length === 0) {
    return "<ul><li>无标题</li></ul>";
  }

  let html = "<ul>\n";
  let currentDepth = 1;

  for (let i = 0; i < headings.length; i++) {
    const item = headings[i];
    const { depth, text, id } = item;

    // 关闭多余的 </ul></li>
    while (depth < currentDepth) {
      html += "  ".repeat(currentDepth) + "</ul></li>\n";
      currentDepth--;
    }

    // 打开新的 <ul>（如果是更深的层级）
    if (depth > currentDepth) {
      html += "  ".repeat(currentDepth + 1) + "<ul>\n";
      currentDepth = depth;
    }

    // 如果不是第一个，且同级，关闭前一个 <li>
    if (i > 0 && depth === currentDepth) {
      html += "  ".repeat(depth) + "</li>\n";
    }

    // 输出当前项（带缩进）
    const indent = "  ".repeat(depth);
    html += `${indent}<li><a href="#${id}">${escapeHtml(text)}</a>`;
  }

  // 关闭所有未闭合的标签
  while (currentDepth > 1) {
    html += "  ".repeat(currentDepth) + "</li></ul>\n";
    currentDepth--;
  }
  if (headings.length > 0) {
    html += "  </li>\n";
  }

  html += "</ul>";

  return html;
}

// 防止 XSS，转义 HTML 特殊字符
function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "<")
    .replace(/>/g, ">")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// 主函数：输入 markdown → 输出纯净嵌套 ul/li HTML 字符串
export function generateTocHtmlFromMarkdownAST(ast: Root): string {
  const existingIds = new Set<string>();
  const headings: Array<{ depth: number; text: string; id: string }> = [];

  visit(ast, "heading", (node: Heading) => {
    const text = extractTextFromHeading(node);
    if (!text) return;

    const id = generateUniqueId(text, existingIds);
    headings.push({ depth: node.depth, text, id });
  });

  return generateTocHtml(headings);
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function genSiteTitle(title: string) {
  return `${title} - ${import.meta.env.VITE_SITE_TITLE}`;
}
