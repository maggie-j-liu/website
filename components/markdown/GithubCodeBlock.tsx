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
            "overflow-x-auto rounded-t-md bg-contrast-50 dark:bg-dark-700"
          }
        >
          <a
            href={link}
            className={
              "my-2 ml-4 inline-block !font-medium !text-contrast-900 dark:!text-contrast-200"
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
