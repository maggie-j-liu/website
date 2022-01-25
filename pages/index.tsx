import React from "react";
import Link from "next/link";
import { GetStaticProps } from "next";
import Head from "next/head";
import NavBar from "@/components/NavBar";
import { getSortedPostsMeta } from "@/lib/getPosts";
import { PostMeta } from "@/lib/types";
import Typing from "@/components/Typing";
import HomepagePostLayout from "@/layouts/HomepagePostLayout";

export default function Home({ posts }: { posts: PostMeta[] }) {
  return (
    <div>
      <Head>
        <title>Maggie&apos;s Website</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar />
      <div className={"bg-dark-100 px-4 dark:bg-black sm:px-8"}>
        <div
          className={
            "mx-auto flex w-full max-w-prose flex-col justify-center py-16"
          }
        >
          <section
            className={
              "mt-16 w-full self-start text-dark-900 dark:text-gray-50"
            }
          >
            <h1 className={"text-4xl font-semibold"}>Maggie Liu.</h1>
            <h3 className={"text-2xl"}>
              <Typing>
                {[
                  "I'm a competitive programmer.",
                  "I do math.",
                  "I'm an artist.",
                  "I'm a problem solver.",
                ]}
              </Typing>
            </h3>
          </section>
          <section className="my-8 space-y-4 text-lg">
            <p>
              Hello world! I'm Maggie, a high school junior. I enjoy coding{" "}
              <Link href="/tags/USACO">
                <a
                  className={
                    "font-medium text-primary-700 hover:text-primary-600 dark:text-primary-600 dark:hover:text-primary-500"
                  }
                >
                  competitively
                </a>
              </Link>
              , building{" "}
              <a
                href="https://github.com/maggie-j-liu/uwudaily"
                target="_blank"
                rel="noreferrer"
                className={
                  "font-medium text-primary-700 hover:text-primary-600 dark:text-primary-600 dark:hover:text-primary-500"
                }
              >
                useless
              </a>{" "}
              <a
                href="https://github.com/maggie-j-liu/gh-star"
                target="_blank"
                rel="noreferrer"
                className={
                  "font-medium text-primary-700 hover:text-primary-600 dark:text-primary-600 dark:hover:text-primary-500"
                }
              >
                but
              </a>{" "}
              <a
                href="https://github.com/maggie-j-liu/reactive"
                target="_blank"
                rel="noreferrer"
                className={
                  "font-medium text-primary-700 hover:text-primary-600 dark:text-primary-600 dark:hover:text-primary-500"
                }
              >
                fun
              </a>{" "}
              <a
                href="https://www.raycast.com/maggie/todo-list"
                target="_blank"
                rel="noreferrer"
                className={
                  "font-medium text-primary-700 hover:text-primary-600 dark:text-primary-600 dark:hover:text-primary-500"
                }
              >
                things
              </a>{" "}
              and making{" "}
              <Link href="/posts/crystal">
                <a
                  className={
                    "font-medium text-primary-700 contrast-50 hover:text-primary-600 dark:text-primary-600 dark:hover:text-primary-500"
                  }
                >
                  (generative)
                </a>
              </Link>{" "}
              <Link href="/posts/spirit">
                <a
                  className={
                    "font-medium text-primary-700 hover:text-primary-600 dark:text-primary-600 dark:hover:text-primary-500"
                  }
                >
                  art
                </a>
              </Link>
              !
            </p>
            <p>
              I'm an executive at the{" "}
              <a
                href="https://joincpi.org"
                target="_blank"
                rel="noreferrer"
                className={
                  "font-medium text-secondary-700 hover:text-secondary-500 dark:text-secondary-500 dark:hover:text-secondary-400"
                }
              >
                Competitive Programming Initiative
              </a>
              , helping promote competitive programming through resources such
              as the{" "}
              <a
                href="https://usaco.guide"
                target="_blank"
                rel="noreferrer"
                className={
                  "font-medium text-secondary-700 hover:text-secondary-500 dark:text-secondary-500 dark:hover:text-secondary-400"
                }
              >
                USACO Guide
              </a>
              .
            </p>
            <p>
              Check out{" "}
              <Link href="/projects">
                <a className="font-medium text-contrast-700 hover:text-contrast-500 dark:text-contrast-500 dark:hover:text-contrast-400">
                  ~/projects
                </a>
              </Link>{" "}
              or my GitHub (
              <a
                href="https://github.com/maggie-j-liu"
                target="_blank"
                rel="noreferrer"
                className={
                  "rounded bg-contrast-100 px-0.5 py-0.5 font-medium text-contrast-600 hover:text-contrast-500 dark:bg-contrast-900 dark:text-contrast-200 dark:hover:bg-contrast-800 dark:hover:text-contrast-100"
                }
              >
                @maggie-j-liu
              </a>
              ) to see more cool projects!
            </p>
          </section>
          <section className={"self-stretch"}>
            <h3 className="text-center text-2xl font-light text-dark-500">
              ~ Posts ~
            </h3>
            <HomepagePostLayout posts={posts} />
          </section>
        </div>
      </div>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const posts = getSortedPostsMeta();
  return {
    props: {
      posts,
    },
  };
};
