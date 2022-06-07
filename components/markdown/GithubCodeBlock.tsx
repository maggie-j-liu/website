import { CodeBlock, CodeBlockHeader } from "./CodeBlock";
const GithubCodeBlock = ({
  children,
  language,
  link,
  ...props
}: {
  children: string;
  language: string;
  link: string;
}) => {
  const cleanedLink = link
    .replace("https://github.com/", "")
    .replace(/\/blob\/[^\/]*/, "");
  return (
    <>
      {link && (
        <CodeBlockHeader>
          <a
            href={link}
            className={
              "inline-block !font-medium !text-contrast-900 dark:!text-contrast-200"
            }
            target="_blank"
            rel="noreferrer"
            style={{ whiteSpace: "nowrap" }}
          >
            {cleanedLink}
          </a>
        </CodeBlockHeader>
      )}
      <CodeBlock
        header={false}
        className={language}
        style={{
          marginTop: 0,
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
        }}
        {...props}
      >
        {children}
      </CodeBlock>
    </>
  );
};

export default GithubCodeBlock;
