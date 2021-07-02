import { getSortedPostsMeta } from "./getPosts";

export const getAllTags = () => {
  const meta = getSortedPostsMeta();
  let tags: string[] = [];
  meta.forEach((m) => {
    if (m?.data?.tags) {
      tags = [...tags, ...m.data.tags];
    }
  });
  return tags;
};

export const getUniqueTags = () => {
  const allTags = getAllTags();
  return Array.from(new Set(allTags));
};
