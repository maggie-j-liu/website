import Link from "next/link";
import React from "react";
import { postsDir } from "@/utils/routes";
import { PostMeta } from "@/lib/types";
import TagsLayout from "@/layouts/TagsLayout";

const TagSection = ({ tags }: { tags: string[] }) => {
  const dedupedTags = Array.from(new Set(tags));
  return (
    <>
      <hr />
      <div className={"py-4 lg:py-6"}>
        <h2 className={"uppercase font-bold text-xs tracking-wider"}>Tags</h2>
        {dedupedTags && (
          <TagsLayout
            tags={dedupedTags}
            divClassName={
              "text-blog-primary-700 dark:text-blog-primary-200 flex flex-wrap items-center"
            }
            linkClassName={"sidebar-link"}
          />
        )}
      </div>
    </>
  );
};

const OtherPostSection = ({
  post,
  displayName,
}: {
  post: PostMeta;
  displayName: string;
}) => {
  return (
    <div>
      <h2 className={"uppercase font-bold text-xs tracking-wider"}>
        {displayName} post{" "}
      </h2>
      <Link href={`/${postsDir}/[slug]`} as={`/${postsDir}/${post.slug}`}>
        <a className={"sidebar-link"}>{post.data.title}</a>
      </Link>
    </div>
  );
};

const SideBar = ({
  prev,
  curr,
  next,
}: {
  prev: PostMeta;
  curr: PostMeta;
  next: PostMeta;
}) => {
  return (
    <>
      <div
        className={
          "2xl:sticky 2xl:top-12 py-8 flex flex-col text-blog-gray-600 dark:text-blog-gray-300"
        }
      >
        {curr.data.tags && <TagSection tags={curr.data.tags} />}
        {(prev || next) && (
          <>
            <hr />
            <div
              className={
                "justify-between py-4 2xl:py-6 2xl:space-y-6 flex 2xl:block"
              }
            >
              {prev && (
                <OtherPostSection post={prev} displayName={"Previous"} />
              )}
              {next && <OtherPostSection post={next} displayName={"Next"} />}
            </div>
          </>
        )}
        <hr />
        <div className={"py-6"}>
          <Link href={`/${postsDir}`}>
            <a className={"sidebar-link"}>← Back to the blog</a>
          </Link>
        </div>
      </div>
    </>
  );
};

export default SideBar;
