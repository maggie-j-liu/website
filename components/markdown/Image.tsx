import NextImage from "next/image";
const Image = (props) => {
  return (
    <div className="w-full">
      <div className="mx-auto w-max max-w-full">
        <NextImage {...props} />
      </div>
    </div>
  );
};

export default Image;
