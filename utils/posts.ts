import fs from "fs";
import path from "path";
import { postsDir } from "./routes";

export const POSTS_PATH = path.join(process.cwd(), postsDir);
export const IMAGES_PATH = path.join(
  process.cwd(),
  "public",
  "images",
  "posts"
);

export const postFiles = fs
  .readdirSync(POSTS_PATH)
  .reduce((acc: { path: string; slug: string; file: boolean }[], p) => {
    if (/\.mdx$/.test(p)) {
      acc.push({
        path: p,
        slug: p.replace(/\.mdx$/, ""),
        file: true,
      });
    } else if (
      fs.statSync(path.join(POSTS_PATH, p)).isDirectory() &&
      fs.existsSync(path.join(POSTS_PATH, p, "index.mdx"))
    ) {
      acc.push({
        path: path.join(p, "index.mdx"),
        slug: p.replace(/\.mdx$/, ""),
        file: false,
      });
    }
    return acc;
  }, []);
