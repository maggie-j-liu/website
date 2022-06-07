import React from "react";
import { useRouter } from "next/router";

const useLink = () => {
  const router = useRouter();
  const [slug, setSlug] = React.useState<string | string[] | undefined>(
    undefined
  );
  const [currentpath, setCurrentPath] = React.useState<string | undefined>(
    undefined
  );
  React.useEffect(() => {
    setSlug(router.query.slug);
    setCurrentPath(router.pathname);
  }, []);
  return {
    query: {
      slug: slug,
    },
    pathname: currentpath,
  };
};

export default useLink;
