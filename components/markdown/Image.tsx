import NextImage, { ImageProps } from "next/legacy/image";
const Image = (props: ImageProps) => {
  return (
    <div className="w-full">
      <div className="mx-auto w-max max-w-full">
        <NextImage {...props} />
      </div>
    </div>
  );
};
Image.displayName = "MarkdownImage";

export default Image;
