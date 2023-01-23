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
        <h2 className={"text-xs font-bold uppercase tracking-wider"}>Tags</h2>
        {dedupedTags && (
          <TagsLayout
            tags={dedupedTags}
            divClassName={
              "text-primary-700 dark:text-primary-200 flex flex-wrap items-center"
            }
            linkClassName={"text-sm sidebar-link"}
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
      <h2 className={"text-xs font-bold uppercase tracking-wider"}>
        {displayName} post{" "}
      </h2>
      <Link
        href={`/${postsDir}/[slug]`}
        as={`/${postsDir}/${post.slug}`}
        className={"sidebar-link"}>
        {post.data.title}
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
  return <>
    <div
      className={
        "flex flex-col py-8 text-dark-600 dark:text-dark-300 2xl:sticky 2xl:top-12"
      }
    >
      {curr.data.tags && <TagSection tags={curr.data.tags} />}
      {(prev || next) && (
        <>
          <hr />
          <div
            className={
              "flex justify-between py-4 2xl:block 2xl:space-y-6 2xl:py-6"
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
        <Link href={`/${postsDir}`} className={"sidebar-link"}>
          ← Back to the blog
        </Link>
      </div>
    </div>
  </>;
};

export default SideBar;
