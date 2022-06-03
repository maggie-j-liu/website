import { NextApiRequest, NextApiResponse } from "next";
import { Redis } from "@upstash/redis";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.status(405).send("Method not allowed");
    return;
  }
  const pageToken = req.body.nextPageToken;
  const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
  });
  let accessToken = await redis.get("access_token");
  if (accessToken === null) {
    // get a new access token
    // use https://developers.google.com/oauthplayground to get a refresh token
    const params = new URLSearchParams({
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
      grant_type: "refresh_token",
    });
    const res = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      body: params,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }).then((res) => res.json());
    const expiresAt = Math.floor(Date.now() / 1000) + res.expires_in;

    if (res.error) {
      await fetch(process.env.DISCORD_WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: `<@725399987869057137> There was an error obtaining a Google API access token.
\`\`\`json
${JSON.stringify(res, null, 2)}
\`\`\``,
        }),
      });
      res.status(500).json({
        error: "Error obtaining access token",
      });
      return;
    }

    accessToken = res.access_token;
    await redis.set("access_token", accessToken);
    await redis.expireat("access_token", expiresAt);
  }
  const photosRes = await fetch(
    `https://photoslibrary.googleapis.com/v1/mediaItems:search`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        pageSize: 3,
        albumId:
          "AI06ig97PzLh14yH4sFIaE5yiQh7zJa5heR8BlLtMLNw-IDeAYSiHg5_znZow-CtU5KupC3JiL81",
        pageToken,
      }),
    }
  ).then((res) => res.json());

  const photos = [];
  for (const item of photosRes.mediaItems) {
    if (!item.mimeType.startsWith("image")) continue;
    photos.push({
      src: `${item.baseUrl}=w600`,
    });
  }
  res.status(200).json({
    photos,
    nextPageToken: photosRes.nextPageToken,
  });
}
