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
  const activeStyle = "text-dark-900 dark:text-dark-100";
  const normalStyle = "hover:text-dark-900 dark:hover:text-dark-100";
  const link = useLink();
  if (!headings.length) return null;
  return <>
    <ul className={"sticky top-12 py-8 text-sm text-dark-400"}>
      <h2
        className={
          "mb-2 text-sm font-bold uppercase tracking-wider text-primary-500 dark:text-primary-300"
        }
      >
        Table of Contents
      </h2>
      {headings.map(({ text, anchor }) => {
        return (
          <li key={anchor}>
            {link.query.slug ? (
              (<Link
                href={{
                  ...link,
                  hash: anchor,
                }}
                className={`${
                  activeAnchor === anchor ? activeStyle : normalStyle
                } block py-1`}>

                {text}

              </Link>)
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
  </>;
};

export default TableOfContents;
