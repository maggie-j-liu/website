const GitHub = ({ children: username }: { children: string }) => {
  return (
    <a
      className="text-blue-600 hover:underline dark:text-blue-300"
      href={`https://github.com/${username}`}
      target="_blank"
      rel="noreferrer"
    >
      @{username}
    </a>
  );
};
export default GitHub;
