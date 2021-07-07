import React from "react";
import Link from "next/link";
import useActiveAnchor from "@/hooks/useActiveAnchor";
import useLink from "@/hooks/useLink";
import { Heading } from "@/lib/types";

const TableOfContents = ({ headings }: { headings: Heading[] }) => {
  const anchors = React.useMemo(
    () => headings.map((heading) => heading.anchor),
    [headings]
  );
  const activeAnchor = useActiveAnchor(anchors);
  const activeStyle = "text-blog-gray-900 dark:text-blog-gray-100";
  const normalStyle = "hover:text-blog-gray-900 dark:hover:text-blog-gray-100";
  const link = useLink();
  if (!headings.length) return null;
  return (
    <>
      <ul className={"sticky top-12 text-blog-gray-400 text-sm py-8"}>
        <h2
          className={
            "uppercase tracking-wider text-sm font-bold mb-2 text-blog-primary-500 dark:text-blog-primary-300"
          }
        >
          Table of Contents
        </h2>
        {headings.map(({ text, anchor }) => {
          return (
            <li key={anchor}>
              {link.query.slug ? (
                <Link
                  href={{
                    ...link,
                    hash: anchor,
                  }}
                >
                  <a
                    className={`${
                      activeAnchor === anchor ? activeStyle : normalStyle
                    } block py-1`}
                  >
                    {text}
                  </a>
                </Link>
              ) : (
                <a
                  className={`${
                    activeAnchor === anchor ? activeStyle : normalStyle
                  } block py-1`}
                >
                  {text}
                </a>
              )}
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default TableOfContents;
