export interface PostMeta {
    slug: string;
    data;
}

export interface Post extends PostMeta {
    content: string;
}

export interface Heading {
    text: string;
    anchor: string;
}
