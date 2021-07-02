import fs from "fs";
import path from "path";
import { postsDir } from "./routes";

export const POSTS_PATH = path.join(process.cwd(), postsDir);

export const postFilePaths = fs
  .readdirSync(POSTS_PATH)
  // Only include mdx files
  .filter((path) => /\.mdx$/.test(path));
