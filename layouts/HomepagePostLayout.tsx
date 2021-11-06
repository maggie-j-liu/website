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
                    "text-lg sm:text-xl opacity-70 group-hover:opacity-100 group-focus-visible:opacity-100"
                  }
                >
                  {post.data.title}
                </div>
                <div className={"text-xs sm:text-sm flex items-center"}>
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
                          "flex flex-wrap text-primary-700 dark:text-primary-400 opacity-50 group-hover:opacity-70 group-focus-visible:opacity-70"
                        }
                        linkClassName={"text-xs sm:text-sm postlist-tag-link"}
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
      })}
    </ul>
  );
};

export default HomepagePostLayout;
