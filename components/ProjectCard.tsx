import React from "react";
import Image from "next/image";
import { FiLink } from "react-icons/fi";
import { SiGithub, SiDevpost } from "react-icons/si";

interface ProjectInfo {
  url?: string;
  github?: string;
  devpost?: string;
}
const ProjectInfoContext = React.createContext<ProjectInfo>({});

const Title = ({ children }: { children: React.ReactNode }) => {
  const info = React.useContext(ProjectInfoContext);
  return (
    <div className="flex items-center gap-4">
      <h2 className="text-2xl font-medium text-dark-800">{children}</h2>
      <div className="flex gap-2 text-dark-500">
        {info.url && (
          <a
            className="opacity-50 hover:opacity-90"
            href={
              info.url.startsWith("http") ? info.url : `https://${info.url}`
            }
            target="_blank"
            rel="noreferrer"
          >
            <FiLink className={"w-5 h-5"} />
          </a>
        )}
        {info.github && (
          <a
            className="opacity-50 hover:opacity-90"
            href={
              info.github.includes("/")
                ? `https://github.com/${info.github}`
                : `https://github.com/maggie-j-liu/${info.github}`
            }
            target="_blank"
            rel="noreferrer"
          >
            <SiGithub className={"w-5 h-5"} />
          </a>
        )}
        {info.devpost && (
          <a
            className="opacity-50 hover:opacity-90"
            href={`https://devpost.com/software/${info.devpost}`}
            target="_blank"
            rel="noreferrer"
          >
            <SiDevpost className={"w-5 h-5"} />
          </a>
        )}
      </div>
    </div>
  );
};
const Description = ({ children }: { children: React.ReactNode }) => {
  return <p>{children}</p>;
};
const ProjectImage = ({ src }: { src: StaticImageData }) => {
  return <Image src={src} placeholder="blur" />;
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
      <div className={`text-dark-900 px-4 py-4 rounded-xl ${className}`}>
        {children}
      </div>
    </ProjectInfoContext.Provider>
  );
};
ProjectCard.Title = Title;
ProjectCard.Description = Description;
ProjectCard.Image = ProjectImage;
export default ProjectCard;
