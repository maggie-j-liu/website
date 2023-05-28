import formatDate from "@/utils/formatDate";
import { postsDir } from "@/utils/routes";
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
          <li
            key={post.slug}
            className={
              "group relative -mx-3 block rounded-2xl px-3 py-1.5 outline-none duration-200 focus-within:bg-white hover:bg-white dark:focus-within:bg-dark-900 dark:hover:bg-dark-900"
            }
          >
            <div
              className={
                "text-lg opacity-70 group-hover:opacity-100 group-focus-visible:opacity-100 sm:text-xl"
              }
            >
              <Link
                href={`/${postsDir}/${post.slug}`}
                className="static before:absolute before:inset-0 before:rounded-2xl"
              >
                {post.data.title}
              </Link>
            </div>
            <div className={"flex items-center text-xs sm:text-sm"}>
              {post.data.date && (
                <Link href={`${postsDir}/${post.slug}`} tabIndex={-1}>
                  <div
                    className={
                      "opacity-50 group-hover:opacity-70 group-focus-visible:opacity-70"
                    }
                  >
                    {formatDate(post.data.date)}
                  </div>
                </Link>
              )}
              {dedupedTags.length > 0 && (
                <>
                  <Link href={`${postsDir}/${post.slug}`} tabIndex={-1}>
                    <div
                      className={
                        "mx-2 opacity-50 group-hover:opacity-70 group-focus-visible:opacity-70"
                      }
                    >
                      |
                    </div>
                  </Link>
                  <div>
                    <TagsLayout
                      tags={dedupedTags}
                      divClassName={
                        "flex flex-wrap text-primary-700 dark:text-primary-400 opacity-50 group-hover:opacity-70 group-focus-visible:opacity-70"
                      }
                      linkClassName={"text-xs sm:text-sm postlist-tag-link"}
                    />
                  </div>
                </>
              )}
            </div>
            {post.data.preview?.length > 0 ? (
              <div
                className={
                  "mt-2 text-sm opacity-70 group-hover:opacity-100 group-focus-visible:opacity-100"
                }
              >
                {post.data.preview}
              </div>
            ) : null}
          </li>
        );
      })}
    </ul>
  );
};

export default HomepagePostLayout;
