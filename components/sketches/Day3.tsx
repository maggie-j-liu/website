import React from "react";
const Vessel = () => {
  const [paths, setPaths] = React.useState([]);
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);
  React.useEffect(() => {
    for (let i = 0; i < 15; i++) {
      const numStrokes = Math.round(2 + Math.random() * 3);
      let lastEnd = -20;
      for (let j = 0; j < numStrokes; j++) {
        let strokeStart = lastEnd + 10 + Math.random() * 50;
        let strokeEnd = strokeStart + Math.random() * 50;
        paths.push(
          `M ${strokeStart}, ${50 + i * 10} L ${strokeEnd}, ${50 + i * 10}`
        );
        lastEnd = strokeEnd;
      }
      setPaths([...paths]);
    }
  }, []);
  if (!mounted)
    return (
      <div className={"w-4/5 mx-auto"}>
        <svg viewBox="0 0 200 200">
          <circle
            cx="100"
            cy="55"
            r="55"
            className="fill-current text-yellow-50"
          />
          <circle
            cx="100"
            cy="55"
            r="50"
            className="fill-current text-yellow-100"
          />
          <circle
            cx="100"
            cy="55"
            r="40"
            className="fill-current text-yellow-200"
          />
          <rect
            x="0"
            y="50"
            width="200"
            height="150"
            className={"fill-current text-blue-100"}
          />
        </svg>
      </div>
    );
  return (
    <div className={"w-4/5 mx-auto"}>
      <svg viewBox="0 0 200 200">
        <circle
          cx="100"
          cy="55"
          r="55"
          className="fill-current text-yellow-50"
        />
        <circle
          cx="100"
          cy="55"
          r="50"
          className="fill-current text-yellow-100"
        />
        <circle
          cx="100"
          cy="55"
          r="40"
          className="fill-current text-yellow-200"
        />
        <rect
          x="0"
          y="50"
          width="200"
          height="150"
          className={"fill-current text-blue-100"}
        />
        {paths.map((path) => (
          <path
            key={path}
            d={path}
            strokeWidth={`${3 + Math.random()}px`}
            strokeLinecap="round"
            className="stroke-current text-blue-500"
          />
        ))}
        <g className="animate-boat-rock">
          <g
            transform={`translate(${Math.random() * 150},${
              50 + Math.random() * 130
            })`}
          >
            <path
              d="M 0, 0 l 80, 0 l -40, 25 Z"
              className="fill-current text-purple-400"
            />
            <path
              d="M 0, 0 m 20, 4 l 20, -20 l 20, 20 l -20, 21 Z"
              className="fill-current text-purple-300"
            />
            <path
              d="M 0, 0 l 40, 8 l 40, -8 l -10, 25 l -60, 0 Z"
              className="fill-current text-purple-200"
            />
            <circle cx="31" cy="12" r="1" />
            <circle cx="49" cy="12" r="1" />
            <path
              d="M 38, 15 a 1 1 0 0 0 4 0"
              fill="transparent"
              className={"stroke-current text-purple-900"}
              strokeWidth="0.75px"
              strokeLinecap="round"
            />
          </g>
        </g>
      </svg>
    </div>
  );
};

export default Vessel;
