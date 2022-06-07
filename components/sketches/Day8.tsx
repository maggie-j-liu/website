import React from "react";
const Watch = () => {
  const eyesRef = React.useRef<SVGSVGElement>(null);
  const [bounds, setBounds] = React.useState<{ x: number; y: number } | null>(
    null
  );
  const [rotate, setRotate] = React.useState(0);
  React.useEffect(() => {
    if (!eyesRef.current) return;
    const boundingRect = eyesRef.current.getBoundingClientRect();
    setBounds({
      x: boundingRect.x + boundingRect.width / 2,
      y: boundingRect.y + boundingRect.height / 2,
    });
  }, [eyesRef]);

  React.useEffect(() => {
    if (!bounds) return;
    return window.addEventListener("mousemove", (e) => {
      const { clientX, clientY } = e;
      const dx = clientX - bounds.x;
      const dy = -(clientY - bounds.y);
      let theta = Math.atan(dy / dx);
      if (dx < 0) {
        theta += Math.PI;
      }
      setRotate(theta);
    });
  }, [bounds]);
  return (
    <div className="mx-auto w-4/5">
      <svg
        ref={eyesRef}
        viewBox="0 0 200 200"
        style={{ transformBox: "fill-box" }}
      >
        <circle
          cx={60}
          cy={100}
          r={40}
          fill="transparent"
          className={"stroke-current stroke-2"}
        />
        <circle
          cx={140}
          cy={100}
          r={40}
          fill="transparent"
          className={"stroke-current stroke-2"}
        />
        <circle
          cx={60}
          cy={80}
          r={20}
          className={"origin-bottom fill-current stroke-current stroke-2"}
          style={{
            transformBox: "fill-box",
            transform: `rotate(calc(90deg + ${-rotate}rad))`,
          }}
        />
        <circle
          cx={140}
          cy={80}
          r={20}
          className={"origin-bottom fill-current stroke-current stroke-2"}
          style={{
            transformBox: "fill-box",
            transform: `rotate(calc(90deg + ${-rotate}rad))`,
          }}
        />
      </svg>
    </div>
  );
};

export default Watch;
