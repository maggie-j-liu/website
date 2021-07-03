import React from "react";
import Link from "next/link";
import { postsDir } from "@/utils/routes";
import formatDate from "@/utils/formatDate";
import { PostMeta } from "@/lib/types";

const TagSection = ({ tags }: { tags: string[] }) => {
  const totalTags = tags.length;
  return (
    <div className={"pt-4"}>
      <p className={"uppercase text-sm font-semibold text-home-gray-400"}>
        Tags
      </p>
      <div className={"text-home-primary-700 dark:text-home-primary-400"}>
        {tags.map((tag, index) => (
          <React.Fragment key={tag}>
            <span
              className={`${index !== 0 && "pl-2"} ${
                index !== totalTags - 1 && "pr-2"
              } uppercase text-sm text-home-primary-500`}
            >
              {tag}
            </span>
            {index != totalTags - 1 && "•"}
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
          "min-w-full px-32 py-12 flex flex-1 flex-col justify-center items-center bg-gradient-to-b from-home-primary-50 to-home-gray-200 dark:from-home-gray-900 dark:to-home-gray-900"
        }
      >
        <Link href={`/${postsDir}`}>
          <a
            className={
              "text-2xl font-semibold uppercase mt-2 text-home-primary-600 dark:text-home-primary-500 hover:text-home-contrast-700 dark:hover:text-home-contrast-200 focus:text-home-contrast-700 dark:focus:text-home-contrast-200"
            }
          >
            Posts
          </a>
        </Link>
        <div className={"flex flex-1 min-w-full justify-center"}>
          <div
            className={
              "grid auto-rows-[240px] postlist-grid overflow-x-auto py-4 px-2 gap-8"
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
                      "group block overflow-auto px-4 py-5 bg-home-main-light dark:bg-home-gray-800 border border-home-primary-200 dark:border-home-gray-600 rounded-md hover:shadow-lg hover:border-0 hover:rounded-none focus:shadow-lg focus:border-0 focus:rounded-none"
                    }
                  >
                    <p className={"text-sm text-home-gray-400 font-normal"}>
                      {post.data.date ? formatDate(post.data.date) : <br />}
                    </p>
                    <p
                      className={
                        "text-xl mt-2 mb-1 font-semibold text-home-primary-600 dark:text-home-primary-400 group-hover:text-home-contrast-600 group-hover:underline dark:group-hover:text-home-contrast-300 group-focus:text-home-contrast-600 dark:group-focus:text-home-contrast-300 group-focus:underline"
                      }
                    >
                      {post.data.title}
                    </p>
                    <p
                      className={
                        "text-home-gray-600 dark:text-home-gray-200 line-clamp"
                      }
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
