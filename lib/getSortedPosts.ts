import { postFilePaths, POSTS_PATH } from '../utils/posts';
import matter from 'gray-matter';
import fs from 'fs';
import path from 'path';
import { Post } from './types';

const getSortedPosts = () => {
    const posts: Post[] = postFilePaths.map((filePath) => {
        const source = fs.readFileSync(path.join(POSTS_PATH, filePath));
        const { content, data } = matter(source);
        return {
            content,
            data,
            slug: filePath.replace(/\.mdx$/, ''),
        }
    });
    
    posts.sort((a, b) => {
        if (a.data.date && b.data.date) {
            const datea = new Date(a.data.date);
            const dateb = new Date(b.data.date);
            return (datea > dateb ? -1 : 1);
        }
        return (a.data.date != undefined ? -1 : (b.data.date != undefined ? 1 : 0));
    });
    return posts;
}

export default getSortedPosts;
