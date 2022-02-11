import { postFiles, POSTS_PATH } from "@/utils/posts";
import matter from "gray-matter";
import fs from "fs";
import path from "path";
import { Post, PostMeta } from "./types";

export const getAllPosts = () => {
  const posts: (Post & { path: string })[] = postFiles.map((file) => {
    const source = fs.readFileSync(path.join(POSTS_PATH, file.path));
    const { content, data } = matter(source);
    return {
      content,
      data,
      slug: file.slug,
      path: file.path,
    };
  });
  return posts;
};

export const getSortedPosts = () => {
  const posts = getAllPosts();
  posts.sort((a, b) => {
    if (a.data.date && b.data.date) {
      const datea = new Date(a.data.date);
      const dateb = new Date(b.data.date);
      return datea > dateb ? -1 : 1;
    }
    return a.data.date != undefined ? -1 : b.data.date != undefined ? 1 : 0;
  });
  return posts;
};

export const getSortedPostsMeta = () => {
  const meta: PostMeta[] = getSortedPosts().map((post) => ({
    data: post.data,
    slug: post.slug,
  }));
  return meta;
};

export const getPostsMetaWithTag = (tag: string) => {
  const posts = getSortedPostsMeta().filter((post) =>
    post.data.tags?.includes(tag)
  );
  return posts;
};
