import { GetStaticProps, GetStaticPaths } from "next";
import { getUniqueTags } from "../../lib/getTags";
import { getPostsMetaWithTag } from "../../lib/getPosts";
import { PostMeta } from "../../lib/types";
import PageLayout from "../../layouts/PageLayout";
import PostListLayout from "../../layouts/PostListLayout";

const TagsPage = ({ tag, posts }: { tag: string; posts: PostMeta[] }) => {
  return (
    <PageLayout page={"blog"}>
      <h1
        className={
          "pt-12 text-5xl font-bold text-blog-gray-900 dark:text-blog-gray-200"
        }
      >
        {tag}
      </h1>
      <h2
        className={
          "text-xl font-semibold text-blog-gray-700 dark:text-blog-gray-300"
        }
      >
        All posts tagged with {tag}
      </h2>
      <PostListLayout posts={posts} />
    </PageLayout>
  );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const tag = params.tag as string;
  const posts = getPostsMetaWithTag(tag);
  return {
    props: {
      tag,
      posts,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getUniqueTags().map((tag) => ({ params: { tag } }));
  return {
    paths,
    fallback: false,
  };
};

export default TagsPage;
