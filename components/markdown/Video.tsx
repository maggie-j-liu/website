const Video = (props: any) => {
  return (
    <video
      style={{ width: props.width + "px", height: props.height + "px" }}
      className="mx-auto"
      controls
      autoPlay
      muted
      loop
      {...props}
    />
  );
};

export default Video;
