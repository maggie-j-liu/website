import React from "react";
import Link from "next/link";
import { postsDir } from "@/utils/routes";
import formatDate from "@/utils/formatDate";
import { PostMeta } from "@/lib/types";
import { motion } from "framer-motion";
import useBoop from "@/hooks/useBoop";

const TagSection = ({ tags }: { tags: string[] }) => {
  const totalTags = tags.length;
  return (
    <div className={"pt-4"}>
      <p className={"uppercase text-sm font-semibold text-dark-400"}>Tags</p>
      <div
        className={
          "text-primary-700 dark:text-primary-400 flex flex-wrap items-center"
        }
      >
        {tags.map((tag, index) => (
          <React.Fragment key={tag}>
            <span className={`uppercase text-sm text-primary-500`}>{tag}</span>
            {index != totalTags - 1 && <span className={"px-2"}>•</span>}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

const PostGridList = React.forwardRef<HTMLDivElement, { posts: PostMeta[] }>(
  (props, ref) => {
    return (
      <div
        id={"posts"}
        ref={ref}
        className={
          "min-w-full px-32 py-12 flex flex-1 flex-col justify-center items-center bg-gradient-to-b from-dark-100 to-primary-50 dark:from-dark-900 dark:to-dark-900"
        }
      >
        <Link href={`/${postsDir}`}>
          <a
            className={
              "text-2xl font-semibold uppercase mt-2 text-primary-600 dark:text-primary-500 hover:text-secondary-700 dark:hover:text-secondary-200 focus:text-secondary-700 dark:focus:text-secondary-200"
            }
          >
            Posts
          </a>
        </Link>
        <div className={"flex flex-1 justify-center max-w-4xl"}>
          <div
            className={
              "grid auto-rows-[240px] grid-cols-3 overflow-visible py-4 px-2 gap-8"
            }
          >
            {props.posts.map((post) => {
              const dedupedTags: string[] = Array.from(new Set(post.data.tags));
              return (
                <Link
                  as={`/${postsDir}/${post.slug}`}
                  href={`/${postsDir}/[slug]`}
                  key={post.slug}
                >
                  <a
                    className={
                      "group block overflow-y-hidden px-4 py-5 bg-white dark:bg-dark-800 rounded-lg hover:shadow-xl hover:rounded-none focus:shadow-lg focus:rounded-none duration-300"
                    }
                  >
                    <p className={"text-sm text-dark-400 font-normal"}>
                      {post.data.date ? formatDate(post.data.date) : <br />}
                    </p>
                    <p
                      className={
                        "text-xl mt-2 mb-1 font-semibold text-primary-600 dark:text-primary-400 group-hover:text-secondary-600 group-hover:underline dark:group-hover:text-secondary-300 group-focus:text-secondary-600 dark:group-focus:text-secondary-300 group-focus:underline"
                      }
                    >
                      {post.data.title}
                    </p>
                    <p
                      className={"text-dark-600 dark:text-dark-200 line-clamp"}
                    >
                      {post.data.preview}
                    </p>
                    {dedupedTags.length > 0 && (
                      <TagSection tags={dedupedTags} />
                    )}
                  </a>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
);

export default PostGridList;
