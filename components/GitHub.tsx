const GitHub = ({ children: username }: { children: string }) => {
  username = username.trim();
  return (
    <a
      className="rounded-sm bg-primary-300/40 px-1 text-base text-primary-800 hover:bg-primary-400/40 hover:text-primary-800 hover:!no-underline dark:text-primary-50 dark:hover:bg-primary-300/60 hover:dark:text-primary-50"
      href={`https://github.com/${username}`}
      target="_blank"
      rel="noreferrer"
    >
      @{username}
    </a>
  );
};
export default GitHub;
