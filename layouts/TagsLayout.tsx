import Link from "next/link";
import { tagsDir } from "@/utils/routes";

const TagsLayout = ({
  tags,
  divClassName,
  linkClassName,
}: {
  tags: string[];
  divClassName?: string;
  linkClassName?: string;
}) => {
  const totalTags = tags.length;
  return (
    <div className={divClassName}>
      {tags.map((tag, index) => (
        <span key={tag}>
          <Link href={`/${tagsDir}/${tag}`} className={`uppercase ${linkClassName}`}>
            {tag}
          </Link>
          {index != totalTags - 1 && <span className={"mx-2"}>•</span>}
        </span>
      ))}
    </div>
  );
};

export default TagsLayout;
