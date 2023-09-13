import { bundleMDX } from "mdx-bundler";
import fs from "fs";
import path from "path";
import readingTime from "reading-time";
import getAllFilesRecursively from "./utils/files";
// Remark packages
import remarkGfm from "remark-gfm";
import remarkFootnotes from "remark-footnotes";
import remarkMath from "remark-math";
import remarkExtractFrontmatter from "./remark-extract-frontmatter";
import remarkCodeTitles from "./remark-code-title";
import remarkTocHeadings from "./remark-toc-headings";
import remarkImgToJsx from "./remark-img-to-jsx";
// Rehype packages
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeKatex from "rehype-katex";
import rehypeCitation from "rehype-citation";
import rehypePrismPlus from "rehype-prism-plus";
import rehypePresetMinify from "rehype-preset-minify";
import { re } from "prettier";

const root = process.cwd();

export function getFiles(type) {
  const prefixPaths = path.join(root, "data", type);
  const files = getAllFilesRecursively(prefixPaths);
  // Only want to return blog/path and ignore root, replace is needed to work on Windows
  return files.map((file) =>
    file.slice(prefixPaths.length + 1).replace(/\\/g, "/")
  );
}

export function formatSlug(slug) {
  return slug.replace(/\.(mdx|md)/, "");
}

export function dateSortDesc(a, b) {
  if (a > b) return -1;
  if (a < b) return 1;
  return 0;
}

export async function getFileBySlug(type, slug) {
  const response = await fetch(process.env.NEXT_PUBLIC_CONTENT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ slug:slug }),
  });

  const responseData = JSON.parse(await response.json());
  const source = responseData["source"];
  const resTitle = responseData["title"];
  const resDescription = responseData["description"];
  const resDate = responseData["date"];
  const tags = responseData["tags"];

  return {
    mdxSource: source,
    frontMatter: {
      slug: slug || null,
      title: resTitle || null,
      description: resDescription || null,
      date: resDate || null,
      tags: tags || null
    },
  };
}
