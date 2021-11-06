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
      <div className={"bg-dark-100 dark:bg-black"}>
        <div
          className={
            "w-full max-w-prose mx-auto py-16 flex flex-col justify-center items-center"
          }
        >
          <section
            className={
              "mt-16 w-full self-start text-dark-900 dark:text-gray-50"
            }
          >
            <h1 className={"text-4xl font-semibold"}>Maggie Liu.</h1>
            <h3 className={"text-2xl mt-3"}>
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
          <section className={"w-full"}>
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
