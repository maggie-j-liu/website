import fs from 'fs'
import path from 'path'

export const POSTS_PATH = path.join(process.cwd(), 'posts');

export const getAnchor = (text) => {
    return text.toLowerCase().replace(/[^a-z0-9]/g, ' ').replace(/[ ]+/g, '-');
}

export const postFilePaths = fs
    .readdirSync(POSTS_PATH)
    // Only include md(x) files
    .filter((path) => /\.mdx?$/.test(path));



    