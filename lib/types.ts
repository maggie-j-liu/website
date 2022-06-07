export interface PostMeta {
  slug: string;
  data: any;
}

export interface Post extends PostMeta {
  content: string;
}

export interface Heading {
  text: string;
  anchor: string;
}
