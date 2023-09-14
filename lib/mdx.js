import path from "path";
import getAllFilesRecursively from "./utils/files";
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
    body: JSON.stringify({ slug: slug }),
  });

  const responseData = JSON.parse(await response.json());
  const source = responseData["source"];
  const resTitle = responseData["title"];
  const resDescription = responseData["description"];
  const resDate = responseData["date"];
  const tags = responseData["tags"];
  const sideUrl = process.env.NEXT_PUBLIC_BACKEND_SIDE;
  const responseSide = await fetch(sideUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ page: 0 }),
  });
  const sideData = JSON.parse(await responseSide.json())["initialDisplayPosts"];

  return {
    mdxSource: source,
    frontMatter: {
      slug: slug || null,
      title: resTitle || null,
      description: resDescription || null,
      date: resDate || null,
      tags: tags || null,
      sideData: sideData || null,
    },
  };
}
