import { CodeBlock } from "./CodeBlock";
const GithubCodeBlock = ({ children, language, link, ...props }) => {
  const cleanedLink = link
    .replace("https://github.com/", "")
    .replace(/\/blob\/[^\/]*/, "");
  return (
    <>
      {link && (
        <div
          className={
            "bg-contrast-50 dark:bg-dark-700 rounded-t-md overflow-x-auto"
          }
        >
          <a
            href={link}
            className={
              "!font-medium !text-contrast-700 dark:!text-contrast-200 ml-4 my-2 inline-block"
            }
            target="_blank"
            rel="noreferrer"
            style={{ whiteSpace: "nowrap" }}
          >
            {cleanedLink}
          </a>
        </div>
      )}
      <CodeBlock
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
