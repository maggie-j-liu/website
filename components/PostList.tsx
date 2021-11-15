import { PostMeta } from "@/lib/types";
import PageLayout from "@/layouts/PageLayout";
import PostListLayout from "@/layouts/PostListLayout";
import React from "react";

const PostList = ({ posts }: { posts: PostMeta[] }) => {
  return (
    <PageLayout>
      <h1 className={"pt-12 text-4xl font-semibold"}>Posts</h1>
      <PostListLayout posts={posts} />
    </PageLayout>
  );
};

export default PostList;
