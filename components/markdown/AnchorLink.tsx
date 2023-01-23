import Link from "next/link";
import React, { ReactNode } from "react";
import useLink from "@/hooks/useLink";

type CustomLinkProps = {
  anchor: string;
  size: number;
};

const LinkBase = React.forwardRef<any, any>(({ size, href, onClick }, ref) => {
  return (
    <a
      ref={ref}
      href={href}
      onClick={onClick}
      className={
        "absolute top-0 left-0 -translate-x-full transform p-1 !text-dark-400 !no-underline opacity-0 duration-75 focus:opacity-100 group-hover:opacity-100"
      }
    >
      <svg
        width={`${2.5 - 0.25 * size}rem`}
        height={`${2.5 - 0.25 * size}rem`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"
        />
      </svg>
    </a>
  );
});

const CustomLink = ({ anchor, size }: CustomLinkProps) => {
  const link = useLink();
  return <>
    {link.pathname ? (
      <Link href={{ ...link, hash: anchor }} passHref legacyBehavior>
        <LinkBase size={size} />
      </Link>
    ) : (
      <LinkBase size={size} />
    )}
  </>;
};

type HeadingProps = {
  size: number;
  children: string;
  id: string;
};

const Heading = ({ size, children, id }: HeadingProps) => {
  const Tag = `h${size}`;
  const DynamicHeading = ({
    children,
    id,
    className,
  }: {
    children: ReactNode;
    id: string;
    className: string;
  }) => React.createElement(Tag, { id, className }, children);
  return (
    <>
      <DynamicHeading id={id} className={"group relative"}>
        <CustomLink anchor={id} size={size} />
        {children}
      </DynamicHeading>
    </>
  );
};

const AnchorLink = {
  h1: (props: any) => <Heading {...props} size={1} />,
  h2: (props: any) => <Heading {...props} size={2} />,
  h3: (props: any) => <Heading {...props} size={3} />,
  h4: (props: any) => <Heading {...props} size={4} />,
  h5: (props: any) => <Heading {...props} size={5} />,
  h6: (props: any) => <Heading {...props} size={6} />,
};

export default AnchorLink;
