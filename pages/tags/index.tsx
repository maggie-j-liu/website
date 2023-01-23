import { getAllTags } from "@/lib/getTags";
import { GetStaticProps } from "next";
import PageLayout from "@/layouts/PageLayout";
import React from "react";
import Link from "next/link";
import { tagsDir } from "@/utils/routes";

const TagIndex = ({ tags }: { tags: string[] }) => {
  let countedTags: { [tag: string]: number } = {};
  tags.forEach((tag) => {
    if (tag in countedTags) {
      countedTags[tag]++;
    } else {
      countedTags[tag] = 1;
    }
  });
  const sortedTags = Object.entries(countedTags)
    .sort((a, b) => b[1] - a[1])
    .map(([tag, count]) => ({ tag, count }));
  return (
    <PageLayout full={true}>
      <div className={"flex flex-col justify-center"}>
        <div
          className={
            "flex flex-col items-center justify-center md:flex-row md:space-x-8"
          }
        >
          <h1
            className={
              "pb-8 text-5xl font-bold text-dark-900 dark:text-dark-200 md:border-r-2 md:pb-0 md:pr-6 md:dark:border-dark-400"
            }
          >
            Tags
          </h1>
          <div
            className={
              "flex max-w-xl flex-wrap text-dark-700 dark:text-dark-400"
            }
          >
            {sortedTags.map(({ tag, count }) => (
              <div key={tag} className={"py-1 pr-4 text-base uppercase"}>
                <Link href={`/${tagsDir}/${tag}`} className={"postlist-tag-link mr-1"}>
                  {tag}
                </Link>
                <span className={"font-semibold"}>
                  {" ("}
                  {count}
                  {")"}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default TagIndex;

export const getStaticProps: GetStaticProps = async () => {
  const tags = getAllTags();
  return {
    props: {
      tags,
    },
  };
};
