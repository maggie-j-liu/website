import PostList from '../../components/PostList';
import { GetStaticProps } from 'next';
import getSortedPosts from '../../lib/getSortedPosts';
import { PostMeta } from '../../lib/types';
const PostIndex = ({ posts }: { posts: PostMeta[] }) => {
    return (
        <PostList posts={posts} />
    )
}

export default PostIndex;

export const getStaticProps: GetStaticProps = async () => {
    const posts = getSortedPosts().map(post => ({data: post.data, slug: post.slug}));
    return {
        props: {
            posts
        }
    }
}