import React, { Children } from "react";
import Image from "next/image";
import { FiLink } from "react-icons/fi";
import { SiGithub, SiDevpost } from "react-icons/si";

interface ProjectInfo {
  url?: string | string[];
  github?: string | string[];
  devpost?: string | string[];
}
const ProjectInfoContext = React.createContext<ProjectInfo>({});

const Link = ({ url }: { url: string }) => {
  return (
    <a
      className="opacity-50 hover:opacity-90"
      href={url.startsWith("http") ? url : `https://${url}`}
      target="_blank"
      rel="noreferrer"
    >
      <FiLink className={"h-5 w-5"} />
    </a>
  );
};
const GitHub = ({ url }: { url: string }) => {
  return (
    <a
      className="opacity-50 hover:opacity-90"
      href={
        url.includes("/")
          ? `https://github.com/${url}`
          : `https://github.com/maggie-j-liu/${url}`
      }
      target="_blank"
      rel="noreferrer"
    >
      <SiGithub className={"h-5 w-5"} />
    </a>
  );
};

const Devpost = ({ url }: { url: string }) => {
  return (
    <a
      className="opacity-50 hover:opacity-90"
      href={`https://devpost.com/software/${url}`}
      target="_blank"
      rel="noreferrer"
    >
      <SiDevpost className={"h-5 w-5"} />
    </a>
  );
};

const Links = ({ urls }: { urls: string | string[] }) => {
  if (typeof urls === "string") {
    return <Link url={urls} />;
  }
  return (
    <>
      {urls.map((u) => (
        <Link key={u} url={u} />
      ))}
    </>
  );
};

const GitHubs = ({ urls }: { urls: string | string[] }) => {
  if (typeof urls === "string") {
    return <GitHub url={urls} />;
  }
  return (
    <>
      {urls.map((u) => (
        <GitHub key={u} url={u} />
      ))}
    </>
  );
};

const Devposts = ({ urls }: { urls: string | string[] }) => {
  if (typeof urls === "string") {
    return <Devpost url={urls} />;
  }
  return (
    <>
      {urls.map((u) => (
        <Devpost key={u} url={u} />
      ))}
    </>
  );
};

const Title = ({ children }: { children: React.ReactNode }) => {
  const info = React.useContext(ProjectInfoContext);
  return (
    <div className="flex items-center gap-4">
      <h2 className="text-2xl font-medium text-dark-800 dark:text-dark-100">
        {children}
      </h2>
      <div className="flex gap-2 text-dark-500 dark:text-dark-200">
        {info.url && <Links urls={info.url} />}
        {info.github && <GitHubs urls={info.github} />}
        {info.devpost && <Devposts urls={info.devpost} />}
      </div>
    </div>
  );
};
const Description = ({ children }: { children: React.ReactNode }) => {
  if (Children.count(children) === 1) {
    return <p>{children}</p>;
  }
  return <div className="space-y-2">{children}</div>;
};
const ProjectImage = ({ src }: { src: StaticImageData }) => {
  return <Image placeholder="blur" src={src} />;
};
const ProjectCard = ({
  children,
  className = "",
  ...props
}: {
  children: React.ReactNode;
  className?: string;
} & ProjectInfo) => {
  return (
    <ProjectInfoContext.Provider value={props as ProjectInfo}>
      <div className={`rounded-xl px-4 py-4 dark:text-dark-200 ${className}`}>
        {children}
      </div>
    </ProjectInfoContext.Provider>
  );
};
ProjectCard.Title = Title;
ProjectCard.Description = Description;
ProjectCard.Image = ProjectImage;
export default ProjectCard;
