import formatDate from "@/utils/formatDate";
import { postsDir, tagsDir } from "@/utils/routes";
import Link from "next/link";
import React from "react";
import { PostMeta } from "@/lib/types";
import TagsLayout from "./TagsLayout";

const PostListLayout = ({ posts }: { posts: PostMeta[] }) => {
  return (
    <ul className={"divide-y dark:divide-blog-gray-600"}>
      {posts.map((post) => {
        const dedupedTags: string[] = Array.from(new Set(post.data.tags));
        return (
          <li key={post.slug} className={"py-12 divide-blog-gray-200"}>
            <div className={"lg:grid lg:grid-cols-4"}>
              {post.data.date && (
                <p
                  className={
                    "text-base text-blog-gray-500 dark:text-blog-gray-400 lg:col-start-1 pb-2"
                  }
                >
                  {formatDate(post.data.date)}
                </p>
              )}
              <div className={"lg:col-start-2 lg:col-end-5"}>
                <Link
                  as={`/${postsDir}/${post.slug}`}
                  href={`/${postsDir}/[slug]`}
                  key={post.slug}
                >
                  <a
                    className={
                      "text-2xl tracking-tight font-semibold text-blog-primary-600 dark:text-blog-primary-400"
                    }
                  >
                    {post.data.title}
                  </a>
                </Link>
                {dedupedTags.length > 0 && (
                  <TagsLayout
                    tags={dedupedTags}
                    divClassName={
                      "text-blog-primary-700 dark:text-blog-primary-400"
                    }
                    linkClassName={"postlist-tag-link"}
                  />
                )}
                {post.data.preview && (
                  <p
                    className={
                      "text-blog-gray-600 dark:text-blog-gray-200 pt-6"
                    }
                    style={{
                      overflow: "hidden",
                      display: "-webkit-box",
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical",
                    }}
                  >
                    {post.data.preview}
                  </p>
                )}
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default PostListLayout;
