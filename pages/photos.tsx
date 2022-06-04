import NavBar from "@/components/NavBar";
import Image from "next/image";
import { useCallback, useRef } from "react";
import useSWRInfinite from "swr/infinite";
import { GetServerSideProps } from "next";
import getPhotos from "@/lib/getPhotos";

const fetcher = async (input: RequestInfo, init?: RequestInit) => {
  const res = await fetch(input, init);
  if (!res.ok) {
    const error = {
      info: await res.json(),
      status: res.status,
    };
    throw error;
  }
  return res.json();
};

const Photos = ({ fallback }) => {
  const observer = useRef<IntersectionObserver>(null);
  const { data, error, setSize, isValidating } = useSWRInfinite(
    (pageIndex, previousPageData) => {
      if (pageIndex === 0) {
        return [
          `/api/photos`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          },
        ];
      }
      if (!previousPageData.nextPageToken) return null;
      return [
        `/api/photos`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nextPageToken: previousPageData.nextPageToken,
          }),
        },
      ];
    },
    fetcher,
    {
      fallbackData: [fallback],
      revalidateOnFocus: false,
      revalidateIfStale: false,
      revalidateOnReconnect: false,
    }
  );
  const intersectionObserverRef = useCallback(
    (element) => {
      if (observer.current) {
        observer.current.disconnect();
      }
      observer.current = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setSize((s) => s + 1);
            observer.current.unobserve(entry.target);
          }
        },
        {
          rootMargin: "0px",
        }
      );
      if (element) {
        observer.current.observe(element);
      }
    },
    [setSize]
  );
  const lastToken = data[data.length - 1]?.nextPageToken;
  const allPhotos = (data ?? []).flatMap((page) => page.photos);
  return (
    <div>
      <NavBar />
      <div className="relative mx-auto max-w-7xl px-8 pt-14 pb-14 sm:pt-20">
        <h1 className="mx-auto mt-4 text-center text-4xl font-bold text-primary-900 dark:text-primary-200 sm:text-5xl">
          Photos
        </h1>
        <div className="mt-4 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {allPhotos.map((photo, idx) => (
            <div
              className="relative aspect-square w-full overflow-hidden rounded-lg xl:aspect-[7/8]"
              key={photo.src}
              ref={
                idx === allPhotos.length - 1 ? intersectionObserverRef : null
              }
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
        {isValidating && lastToken ? (
          <div className="absolute bottom-6 left-0 right-0 flex animate-pulse items-center justify-center gap-1.5 text-center">
            {[...Array(3)].map((_, idx) => (
              <div key={idx} className="h-3 w-3 rounded-full bg-current" />
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Photos;

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  res.setHeader(
    "Cache-Control",
    `public, s-maxage=60, stale-while-revalidate=${60 * 30}`
  );
  const result = await getPhotos();
  if (result.error) {
    throw new Error(result.error);
  }
  return {
    props: {
      fallback: { ...result },
    },
  };
};
