import NavBar from "@/components/NavBar";
import Image from "next/image";
import { useCallback, useRef, useState } from "react";
import useSWRInfinite from "swr/infinite";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import getPhotos, { Photo } from "@/lib/getPhotos";
import Modal from "@/components/Modal";

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

const loader = ({ src, width }: { src: string; width: number }) => {
  return `${src}=w${width}`;
};

const Photos = ({
  fallback,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [modalImage, setModalImage] = useState<Photo | null>(null);
  const observer = useRef<IntersectionObserver | null>(null);
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
            if (observer.current) {
              observer.current.unobserve(entry.target);
            }
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
  const lastToken = data?.[data.length - 1]?.nextPageToken;
  const allPhotos = (data ?? []).flatMap((page) => page.photos);
  return (
    <div>
      <NavBar />
      <div className="relative mx-auto max-w-7xl px-8 pt-14 pb-14 sm:pt-20">
        <h1 className="mx-auto mt-4 text-center text-4xl font-bold text-primary-900 dark:text-primary-200 sm:text-5xl">
          Photos
        </h1>
        <Modal open={modalImage !== null} onClose={() => setModalImage(null)}>
          {modalImage ? (
            <div className="flex h-full flex-col">
              <button
                className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 rounded-full bg-white p-1.5"
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  setModalImage(null);
                }}
              >
                <svg className="h-5 w-5 text-gray-900" viewBox="0 0 24 24">
                  <path
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              </button>
              <div className="absolute bottom-4 left-4 right-4">
                <div className="w-fit rounded-md bg-gray-900/70 px-4 py-1 text-gray-100">
                  {new Date(modalImage.creationTime).toLocaleDateString(
                    "en-US",
                    {
                      dateStyle: "long",
                    }
                  )}
                  {modalImage.description
                    ? " -- " + modalImage.description
                    : ""}
                </div>
              </div>
              <Image
                className="max-h-full w-auto"
                src={modalImage.src}
                alt=""
                blurDataURL={modalImage.blurDataUrl}
                placeholder="blur"
                width={modalImage.width}
                height={modalImage.height}
                loader={loader}
              />
              {/* <div>
                <span className="font-semibold uppercase text-primary-700">
                  {new Date(modalImage.creationTime).toLocaleDateString(
                    "en-US",
                    {
                      dateStyle: "long",
                    }
                  )}
                </span>
                {modalImage.description ? (
                  <p className="text-lg">{modalImage.description}</p>
                ) : null}
              </div> */}
            </div>
          ) : null}
        </Modal>
        <div className="mt-4 grid grid-cols-1 gap-y-4 gap-x-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {allPhotos.map((photo, idx) => {
            const date = new Date(photo.creationTime).toLocaleDateString(
              "en-US",
              {
                timeZone: "America/Los_Angeles",
                dateStyle: "short",
              }
            );
            return (
              <div key={photo.src} className="group">
                <span className="text-sm font-semibold text-dark-400 group-hover:text-dark-500 dark:text-dark-500 dark:group-hover:text-dark-400">
                  {date}
                </span>

                <button
                  className="aspect-square w-full overflow-hidden rounded-lg outline outline-1 outline-gray-500/40 hover:cursor-zoom-in xl:aspect-[7/8]"
                  ref={
                    idx === allPhotos.length - 1
                      ? intersectionObserverRef
                      : null
                  }
                  onClick={(e) => {
                    e.preventDefault();
                    setModalImage(photo);
                  }}
                  type="button"
                >
                  <Image
                    src={photo.src}
                    width={photo.width}
                    height={photo.height}
                    className="h-full w-full object-cover duration-300 group-hover:scale-110 group-hover:duration-150"
                    alt=""
                    placeholder="blur"
                    blurDataURL={photo.blurDataUrl}
                    loader={loader}
                  />
                </button>
              </div>
            );
          })}
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
