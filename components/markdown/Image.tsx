import NextImage from "next/image";
const Image = (props) => {
  return (
    <div className="w-full">
      <NextImage {...props} />
    </div>
  );
};

export default Image;
