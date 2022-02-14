const Video = (props) => {
  return <video className="mx-auto" controls autoPlay muted loop {...props} />;
};

export default Video;
