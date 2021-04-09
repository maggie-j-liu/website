export interface PostMeta {
    slug: string;
    data;
}

export interface Post extends PostMeta {
    content: string;
}

export type Heading = {
    text: string;
    anchor: string;
}
