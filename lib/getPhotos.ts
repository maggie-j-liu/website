import { Redis } from "@upstash/redis";
const parseEnv = (envVar?: string) => {
  if (!envVar) {
    throw new Error("Missing environment variable");
  }
  if (envVar.startsWith('"') && envVar.endsWith('"')) {
    return envVar.slice(1, -1);
  }
  return envVar;
};

export interface Photo {
  src: string;
  blurDataUrl: string;
  creationTime: string;
  description: string;
  width: number;
  height: number;
}

const getPhotos = async (pageToken?: string) => {
  const redis = new Redis({
    url: parseEnv(process.env.UPSTASH_REDIS_REST_URL),
    token: parseEnv(process.env.UPSTASH_REDIS_REST_TOKEN),
  });
  let accessToken = await redis.get("access_token");
  if (accessToken === null) {
    // get a new access token
    // use https://developers.google.com/oauthplayground to get a refresh token
    const params = new URLSearchParams({
      client_id: parseEnv(process.env.GOOGLE_CLIENT_ID),
      client_secret: parseEnv(process.env.GOOGLE_CLIENT_SECRET),
      refresh_token: parseEnv(process.env.GOOGLE_REFRESH_TOKEN),
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
      await fetch(parseEnv(process.env.DISCORD_WEBHOOK_URL), {
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
      return {
        error: "Error obtaining access token",
      };
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
        pageSize: 20,
        albumId:
          "AI06ig97PzLh14yH4sFIaE5yiQh7zJa5heR8BlLtMLNw-IDeAYSiHg5_znZow-CtU5KupC3JiL81",
        pageToken,
      }),
    }
  ).then((res) => res.json());

  const dataUrlPromises = [];
  for (const item of photosRes.mediaItems) {
    if (!item.mimeType.startsWith("image")) continue;
    dataUrlPromises.push(
      fetch(`${item.baseUrl}=w10`).then((res) => res.arrayBuffer())
    );
  }
  const arrayBuffers = await Promise.all(dataUrlPromises);

  const photos: Photo[] = [];
  for (let i = 0; i < photosRes.mediaItems.length; i++) {
    const item = photosRes.mediaItems[i];
    if (!item.mimeType.startsWith("image")) continue;
    const arrayBuffer = arrayBuffers[i];
    const base64 = Buffer.from(arrayBuffer).toString("base64");
    const mime = photosRes.mediaItems[i].mimeType;
    const dataUrl = `data:${mime};base64,${base64}`;
    photos.push({
      src: `${item.baseUrl}`,
      blurDataUrl: dataUrl,
      creationTime: item.mediaMetadata.creationTime,
      description: item.description ?? "",
      width: item.mediaMetadata.width,
      height: item.mediaMetadata.height,
    });
  }
  return {
    photos,
    nextPageToken: photosRes.nextPageToken ?? null,
  };
};

export default getPhotos;
