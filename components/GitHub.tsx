const GitHub = ({ children: username }: { children: string }) => {
  return (
    <a
      className="text-blue-600 dark:text-blue-300 hover:underline"
      href={`https://github.com/${username}`}
      target="_blank"
      rel="noreferrer"
    >
      @{username}
    </a>
  );
};
export default GitHub;
