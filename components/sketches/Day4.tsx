import React from "react";
const Knot = () => {
  let [path, setPath] = React.useState("M 100, 100");
  let [altPath, setAltPath] = React.useState("M 100, 100");
  const [showAltPath, setShowAltPath] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);
  React.useEffect(() => {
    const numPoints = 30 + Math.random() * 40;
    for (let i = 0; i < numPoints; i++) {
      const x = Math.random() * 200;
      const _x = x - 1 + Math.random() * 2;
      const y = Math.random() * 200;
      const _y = y - 1 + Math.random() * 2;
      const x2 = Math.random() * 200;
      const _x2 = x2 - 1 + Math.random() * 2;
      const y2 = Math.random() * 200;
      const _y2 = y2 - 1 + Math.random() * 2;
      path += ` S ${x2}, ${y2} ${x}, ${y}`;
      altPath += ` S ${_x2}, ${_y2} ${_x}, ${_y}`;
    }
    setPath(path);
    setAltPath(altPath);
  }, []);
  React.useEffect(() => {
    setTimeout(() => {
      setShowAltPath(!showAltPath);
    }, 400);
  }, [showAltPath]);
  if (!mounted) {
    return (
      <div className={"mx-auto w-4/5"}>
        <svg viewBox="0 0 200 200"></svg>
      </div>
    );
  }
  return (
    <div className={"mx-auto w-4/5"}>
      <svg viewBox="0 0 200 200">
        <path
          d={showAltPath ? altPath : path}
          strokeWidth="2px"
          fill="transparent"
          className="stroke-current"
        />
      </svg>
    </div>
  );
};

export default Knot;
