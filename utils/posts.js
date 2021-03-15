import fs from 'fs'
import path from 'path'
import { postsDir } from './postsDir';

export const POSTS_PATH = path.join(process.cwd(), postsDir);

export const postFilePaths = fs
    .readdirSync(POSTS_PATH)
    // Only include md(x) files
    .filter((path) => /\.mdx?$/.test(path));



    