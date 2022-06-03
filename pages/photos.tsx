import { GetStaticProps } from "next";
import { Redis } from "@upstash/redis";
import NavBar from "@/components/NavBar";
import Image from "next/image";

const Photos = ({ photos }) => {
  return (
    <div>
      <NavBar />
      <div className="mx-auto max-w-7xl px-8 pt-14 sm:pt-20">
        <h1 className="mx-auto mt-4 text-center text-4xl font-bold text-primary-900 dark:text-primary-200 sm:text-5xl">
          Photos
        </h1>
        <div className="mt-4 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {photos.map((photo) => (
            <div
              className="relative aspect-square w-full overflow-hidden rounded-lg xl:aspect-[7/8]"
              key={photo.id}
            >
              <Image
                src={photo.src}
                layout="fill"
                objectFit="cover"
                className="duration-300 hover:scale-110 hover:duration-150"
                alt=""
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Photos;

export const getStaticProps: GetStaticProps = async () => {
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
      throw new Error(
        `Generating an access token failed: ${JSON.stringify(res, null, 2)}`
      );
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
      }),
    }
  ).then((res) => res.json());

  const photos = [];
  for (const item of photosRes.mediaItems) {
    if (!item.mimeType.startsWith("image")) continue;
    photos.push({
      src: `${item.baseUrl}=w600`,
      id: item.id,
    });
  }
  return {
    props: {
      photos,
    },
    revalidate: 60 * 10,
  };
};
