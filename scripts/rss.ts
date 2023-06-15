// based on https://github.com/kentcdodds/kentcdodds.com/blob/main/app/routes/blog.rss%5B.%5Dxml.tsx
import { writeFileSync } from "fs";
import { getSortedPosts } from "@/lib/getPosts";
import path from "path";

const BASE_URL = "https://maggieliu.dev";
const posts = getSortedPosts();
const cdata = (s: string) => `<![CDATA[${s}]]>`;

const rssFeed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1">
  <channel>
    <title>Maggie's Website</title>
    <link>${BASE_URL}</link>
    <description>Maggie Liu's website</description>
    <language>en-us</language>
    <atom:link href="${BASE_URL}/rss.xml" rel="self" type="application/rss+xml"/>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    ${posts
      .map((post) =>
        `
    <item>
      <title>${cdata(post.data.title)}</title>
      <description>${
        post.data.preview ? cdata(post.data.preview) : ""
      }</description>
      <dc:creator>${cdata("Maggie Liu")}</dc:creator>
      <pubDate>${new Date(post.data.date).toUTCString()}</pubDate>
      <link>${BASE_URL}/posts/${post.slug}</link>
      <guid>${BASE_URL}/posts/${post.slug}</guid>
      ${(post.data.tags ?? [])
        .map((tag: string) => `<category>${cdata(tag)}</category>`)
        .join("\n      ")}
    </item>
    `.trim()
      )
      .join("\n    ")}
  </channel>
</rss>`;

writeFileSync(path.join(process.cwd(), "public", "rss.xml"), rssFeed);
