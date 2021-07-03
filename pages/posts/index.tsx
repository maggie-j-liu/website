import PostList from "@/components/PostList";
import { GetStaticProps } from "next";
import { getSortedPostsMeta } from "@/lib/getPosts";
import { PostMeta } from "@/lib/types";
const PostIndex = ({ posts }: { posts: PostMeta[] }) => {
  return <PostList posts={posts} />;
};

export default PostIndex;

export const getStaticProps: GetStaticProps = async () => {
  const posts = getSortedPostsMeta();
  return {
    props: {
      posts,
    },
  };
};
