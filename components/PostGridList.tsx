import React from "react";
import Link from "next/link";
import { postsDir } from "@/utils/routes";
import formatDate from "@/utils/formatDate";
import { PostMeta } from "@/lib/types";

const TagSection = ({ tags }: { tags: string[] }) => {
  const totalTags = tags.length;
  return (
    <div className={"pt-4"}>
      <p className={"text-sm font-semibold uppercase text-dark-400"}>Tags</p>
      <div
        className={
          "flex flex-wrap items-center text-primary-700 dark:text-primary-400"
        }
      >
        {tags.map((tag, index) => (
          <React.Fragment key={tag}>
            <span className={`text-sm uppercase text-primary-500`}>{tag}</span>
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
          "flex min-w-full flex-1 flex-col items-center justify-center bg-gradient-to-b from-dark-100 to-primary-50 px-32 py-12 dark:from-dark-900 dark:to-dark-900"
        }
      >
        <Link
          href={`/${postsDir}`}
          className={
            "mt-2 text-2xl font-semibold uppercase text-primary-600 hover:text-secondary-700 focus:text-secondary-700 dark:text-primary-500 dark:hover:text-secondary-200 dark:focus:text-secondary-200"
          }>
          
            Posts
          
        </Link>
        <div className={"flex max-w-4xl flex-1 justify-center"}>
          <div
            className={
              "grid auto-rows-[240px] grid-cols-3 gap-8 overflow-visible py-4 px-2"
            }
          >
            {props.posts.map((post) => {
              const dedupedTags: string[] = Array.from(new Set(post.data.tags));
              return (
                (<Link
                  as={`/${postsDir}/${post.slug}`}
                  href={`/${postsDir}/[slug]`}
                  key={post.slug}
                  className={
                    "group block overflow-y-hidden rounded-lg bg-white px-4 py-5 duration-300 hover:rounded-none hover:shadow-xl focus:rounded-none focus:shadow-lg dark:bg-dark-800"
                  }>

                  <p className={"text-sm font-normal text-dark-400"}>
                    {post.data.date ? formatDate(post.data.date) : <br />}
                  </p>
                  <p
                    className={
                      "mt-2 mb-1 text-xl font-semibold text-primary-600 group-hover:text-secondary-600 group-hover:underline group-focus:text-secondary-600 group-focus:underline dark:text-primary-400 dark:group-hover:text-secondary-300 dark:group-focus:text-secondary-300"
                    }
                  >
                    {post.data.title}
                  </p>
                  <p
                    className={"line-clamp text-dark-600 dark:text-dark-200"}
                  >
                    {post.data.preview}
                  </p>
                  {dedupedTags.length > 0 && (
                    <TagSection tags={dedupedTags} />
                  )}

                </Link>)
              );
            })}
          </div>
        </div>
      </div>
    );
  }
);

export default PostGridList;
