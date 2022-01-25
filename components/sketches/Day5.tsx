import React from "react";
const Raven = () => {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);
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
        <g
          transform={`rotate(${Math.random() * 45})`}
          style={{ transformBox: "fill-box" }}
          className={"origin-center"}
        >
          <path
            d="M 100 190 l 0 -150"
            strokeWidth="2px"
            fill="transparent"
            className="stroke-current"
          />
          {[...Array(60)].map((_, i) => {
            const numLines = 60;
            const startY = 180 - (150 / numLines) * i;
            let x1 = 5 + Math.random() * 5;
            x1 -= (x1 / numLines) * i;
            const y1 = 5 + Math.random() * 10;
            let x2 = 20 + Math.random() * 10;
            x2 -= (x2 / numLines) * i;
            const y2 = 5 + Math.random() * 5;
            const x = 30 - (20 / numLines) * i + Math.random() * 5;
            const y = 40 - (20 / numLines) * i;
            return (
              <React.Fragment key={i}>
                <path
                  d={`M 100 ${startY} c ${x1} -${y1} ${x2} -${y2} ${x} -${y}`}
                  strokeWidth="1px"
                  fill="transparent"
                  className="stroke-current"
                  strokeLinecap="round"
                />
                <path
                  d={`M 100 ${startY} c -${x1} -${y1} -${x2} -${y2} -${x} -${y}`}
                  strokeWidth="1px"
                  fill="transparent"
                  className="stroke-current"
                />
              </React.Fragment>
            );
          })}
        </g>
      </svg>
    </div>
  );
};

export default Raven;
