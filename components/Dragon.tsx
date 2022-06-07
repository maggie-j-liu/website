import * as React from "react";
const r = "r",
  l = "l";
const genString = (iterations: number) => {
  let curr = [r],
    next;
  for (let i = 0; i < iterations; i++) {
    next = [...curr];
    next.push(r);
    curr = curr.reverse();
    for (let j = 0; j < curr.length; j++) {
      curr[j] = curr[j] === r ? l : r;
    }
    curr = [...next, ...curr];
  }
  return curr;
};

const dx = [0, 1, 0, -1],
  dy = [-1, 0, 1, 0];
const segment = 20;
let dir = 0;
let currX = 0,
  currY = 0;

const Dragon = ({ iterations }: { iterations: number }) => {
  const [drawnPoints, setDrawnPoints] = React.useState(1);
  const [points, setPoints] = React.useState("0, 0");
  const [allPoints, setAllPoints] = React.useState(["0, 0"]);
  const [bounds, setBounds] = React.useState({
    minX: 0,
    maxX: 0,
    minY: 0,
    maxY: 0,
  });

  const genAllLines = () => {
    const fractal = genString(iterations);
    let idx = 0;
    for (const letter of fractal) {
      if (letter === r) {
        dir = (dir + 1) % 4;
      } else {
        dir = (dir - 1 + 4) % 4;
      }
      let nextX = currX + dx[dir] * segment;
      let nextY = currY + dy[dir] * segment;
      setBounds((b) => ({
        minX: Math.min(b.minX, nextX),
        maxX: Math.max(b.maxX, nextX),
        minY: Math.min(b.minY, nextY),
        maxY: Math.max(b.maxY, nextY),
      }));
      allPoints.push(`${nextX}, ${nextY}`);
      setAllPoints([...allPoints]);
      currX = nextX;
      currY = nextY;
      idx++;
    }
  };
  React.useEffect(() => {
    genAllLines();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  React.useEffect(() => {
    if (drawnPoints != allPoints.length) {
      setTimeout(() => {
        setPoints((p) => p + " " + allPoints[drawnPoints]);
        setDrawnPoints((p) => p + 1);
      }, 25);
    }
  }, [drawnPoints]); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <svg
      viewBox={`${bounds.minX - 2} ${bounds.minY - 2} ${
        bounds.maxX - bounds.minX + 4
      } ${bounds.maxY - bounds.minY + 4}`}
      className={"stroke-current dark:text-white"}
      fill={"transparent"}
      strokeWidth={1.5}
    >
      <polyline points={points} />
    </svg>
  );
};
export default Dragon;
