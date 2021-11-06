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
  const postsRef = React.useRef<HTMLDivElement>();
  return (
    <div>
      <Head>
        <title>Maggie's Website</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar page="home" />
      <div className={"bg-dark-100 dark:bg-black px-4 sm:px-8"}>
        <div
          className={
            "w-full max-w-prose mx-auto py-16 flex flex-col justify-center"
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
                    "text-primary-700 dark:text-primary-600 hover:text-primary-600 dark:hover:text-primary-500 font-medium"
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
                  "text-primary-700 dark:text-primary-600 hover:text-primary-600 dark:hover:text-primary-500 font-medium"
                }
              >
                useless
              </a>{" "}
              <a
                href="https://github.com/maggie-j-liu/gh-star"
                target="_blank"
                rel="noreferrer"
                className={
                  "text-primary-700 dark:text-primary-600 hover:text-primary-600 dark:hover:text-primary-500 font-medium"
                }
              >
                but
              </a>{" "}
              <a
                href="https://github.com/maggie-j-liu/reactive"
                target="_blank"
                rel="noreferrer"
                className={
                  "text-primary-700 dark:text-primary-600 hover:text-primary-600 dark:hover:text-primary-500 font-medium"
                }
              >
                fun
              </a>{" "}
              <a
                href="https://www.raycast.com/maggie/xkcd"
                target="_blank"
                rel="noreferrer"
                className={
                  "text-primary-700 dark:text-primary-600 hover:text-primary-600 dark:hover:text-primary-500 font-medium"
                }
              >
                things
              </a>{" "}
              and making{" "}
              <Link href="/posts/crystal">
                <a
                  className={
                    "text-primary-700 dark:text-primary-600 hover:text-primary-600 dark:hover:text-primary-500 contrast-50 font-medium"
                  }
                >
                  (generative)
                </a>
              </Link>{" "}
              <Link href="/posts/spirit">
                <a
                  className={
                    "text-primary-700 dark:text-primary-600 hover:text-primary-600 dark:hover:text-primary-500 font-medium"
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
                  "text-secondary-700 dark:text-secondary-500 hover:text-secondary-500 dark:hover:text-secondary-400 font-medium"
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
                  "text-secondary-700 dark:text-secondary-500 hover:text-secondary-500 dark:hover:text-secondary-400 font-medium"
                }
              >
                USACO Guide
              </a>
              .
            </p>
            <p>
              Check out my GitHub (
              <a
                href="https://github.com/maggie-j-liu"
                target="_blank"
                rel="noreferrer"
                className={
                  "text-contrast-600 hover:text-contrast-500 dark:text-contrast-200 dark:hover:text-contrast-100 font-medium bg-contrast-100 dark:bg-contrast-900 dark:hover:bg-contrast-800 rounded px-0.5 py-0.5"
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
