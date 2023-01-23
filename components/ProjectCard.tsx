import React, { Children, ComponentType } from "react";
import Image, { StaticImageData } from "next/legacy/image";
import { FiLink } from "react-icons/fi";
import { SiGithub, SiDevpost, SiProducthunt } from "react-icons/si";
import { IconType } from "react-icons";

interface ProjectInfo {
  url?: string | string[];
  github?: string | string[];
  devpost?: string | string[];
  producthunt?: string | string[];
}
const ProjectInfoContext = React.createContext<ProjectInfo>({});

interface LinkProps {
  url: string;
}

const LinkBase = ({ url, icon: Icon }: { url: string; icon: IconType }) => {
  return (
    <a
      className="opacity-50 hover:opacity-90"
      href={url}
      target="_blank"
      rel="noreferrer"
    >
      <Icon className={"h-5 w-5"} />
    </a>
  );
};

const Link = ({ url }: LinkProps) => (
  <LinkBase
    url={url.startsWith("http") ? url : `https://${url}`}
    icon={FiLink}
  />
);
const GitHub = ({ url }: LinkProps) => (
  <LinkBase
    url={
      url.includes("/")
        ? `https://github.com/${url}`
        : `https://github.com/maggie-j-liu/${url}`
    }
    icon={SiGithub}
  />
);

const Devpost = ({ url }: LinkProps) => (
  <LinkBase url={`https://devpost.com/software/${url}`} icon={SiDevpost} />
);

const ProductHunt = ({ url }: LinkProps) => (
  <LinkBase
    url={`https://www.producthunt.com/posts/${url}`}
    icon={SiProducthunt}
  />
);

const LinksBase = ({
  urls,
  as: Tag,
}: {
  urls: string | string[];
  as: ComponentType<LinkProps>;
}) => {
  if (typeof urls === "string") {
    return <Tag url={urls} />;
  }
  return (
    <>
      {urls.map((u) => (
        <Tag key={u} url={u} />
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
        {info.url && <LinksBase as={Link} urls={info.url} />}
        {info.github && <LinksBase as={GitHub} urls={info.github} />}
        {info.devpost && <LinksBase as={Devpost} urls={info.devpost} />}
        {info.producthunt && (
          <LinksBase as={ProductHunt} urls={info.producthunt} />
        )}
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
  return <Image placeholder="blur" src={src} alt="project image" />;
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
    <ProjectInfoContext.Provider value={props}>
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
