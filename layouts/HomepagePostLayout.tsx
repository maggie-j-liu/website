import formatDate from "@/utils/formatDate";
import { postsDir, tagsDir } from "@/utils/routes";
import Link from "next/link";
import React from "react";
import { PostMeta } from "@/lib/types";
import TagsLayout from "./TagsLayout";

const HomepagePostLayout = ({ posts }: { posts: PostMeta[] }) => {
  return (
    <ul className={"space-y-5"}>
      {posts.map((post) => {
        const dedupedTags: string[] = Array.from(new Set(post.data.tags));
        return (
          <Link href={`/${postsDir}/${post.slug}`} key={post.slug}>
            <a
              className={
                "block group outline-none -mx-3 px-3 py-1.5 rounded-2xl hover:bg-white duration-200 dark:hover:bg-dark-900 dark:focus-within:bg-dark-900 focus-within:bg-white"
              }
            >
              <li>
                <div
                  className={
                    "text-xl opacity-70 group-hover:opacity-100 group-focus-visible:opacity-100"
                  }
                >
                  {post.data.title}
                </div>
                <div className={"text-sm flex items-center"}>
                  <div
                    className={
                      "opacity-50 group-hover:opacity-70 group-focus-visible:opacity-70"
                    }
                  >
                    {formatDate(post.data.date)}
                  </div>
                  <div
                    className={
                      "mx-2 opacity-50 group-hover:opacity-70 group-focus-visible:opacity-70"
                    }
                  >
                    |
                  </div>
                  <div>
                    {dedupedTags.length > 0 && (
                      <TagsLayout
                        tags={dedupedTags}
                        divClassName={
                          "text-primary-700 dark:text-primary-400 opacity-50 group-hover:opacity-70 group-focus-visible:opacity-70"
                        }
                        linkClassName={"postlist-tag-link"}
                      />
                    )}
                  </div>
                </div>
                <div
                  className={
                    "text-sm mt-2 opacity-70 group-hover:opacity-100 group-focus-visible:opacity-100"
                  }
                >
                  {post.data.preview}
                </div>
              </li>
            </a>
          </Link>
        );
        return (
          <li key={post.slug} className={"py-12 divide-dark-200"}>
            <div className={"lg:grid lg:grid-cols-4"}>
              {post.data.date && (
                <p
                  className={
                    "text-base text-dark-500 dark:text-dark-400 lg:col-start-1 pb-2"
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
                      "text-2xl tracking-tight font-semibold text-primary-600 dark:text-primary-400"
                    }
                  >
                    {post.data.title}
                  </a>
                </Link>
                {dedupedTags.length > 0 && (
                  <TagsLayout
                    tags={dedupedTags}
                    divClassName={"text-primary-700 dark:text-primary-400"}
                    linkClassName={"postlist-tag-link"}
                  />
                )}
                {post.data.preview && (
                  <p
                    className={"text-dark-600 dark:text-dark-200 pt-6"}
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

export default HomepagePostLayout;
