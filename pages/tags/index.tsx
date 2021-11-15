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
            "flex flex-col md:flex-row justify-center items-center md:space-x-8"
          }
        >
          <h1
            className={
              "text-5xl font-bold text-dark-900 dark:text-dark-200 pb-8 md:pb-0 md:pr-6 md:border-r-2 md:dark:border-dark-400"
            }
          >
            Tags
          </h1>
          <div
            className={
              "text-dark-700 dark:text-dark-400 flex flex-wrap max-w-xl"
            }
          >
            {sortedTags.map(({ tag, count }) => (
              <div key={tag} className={"py-1 pr-4 text-base uppercase"}>
                <Link href={`/${tagsDir}/${tag}`}>
                  <a className={"mr-1 postlist-tag-link"}>{tag}</a>
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
