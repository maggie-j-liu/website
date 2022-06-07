import { Delaunay } from "d3-delaunay";
import * as d3 from "d3";
import React from "react";
const colors = [
  "text-primary-50 dark:text-primary-900",
  "text-secondary-50 dark:text-secondary-900",
  "text-contrast-50 dark:text-dark-800",
];
const Crystal = () => {
  const NUM_POINTS = 50;
  const [points, setPoints] = React.useState<Delaunay.Point[]>(() => {
    const initialPoints: Delaunay.Point[] = [];
    for (let i = 0; i < NUM_POINTS; i++) {
      initialPoints.push([Math.random() * 200, Math.random() * 200]);
    }
    return initialPoints;
  });
  const [mounted, setMounted] = React.useState(false);
  const svgRef = React.useRef<SVGSVGElement>(null);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  React.useEffect(() => {
    if (!svgRef.current) return () => {};
    const svgArea = d3.select(svgRef.current);
    svgArea.on("mousemove", (event) => {
      const mousePos = d3.pointer(event);
      if (points.length === NUM_POINTS) {
        points.push(mousePos);
        setPoints([...points]);
      } else {
        points[NUM_POINTS] = mousePos;
        setPoints([...points]);
      }
    });
    return () => svgArea.on("mousemove", null);
  }, [mounted]); // eslint-disable-line react-hooks/exhaustive-deps

  const delaunay = Delaunay.from(points);
  const trianglePolygons = delaunay.trianglePolygons();
  const allPaths = [];
  for (const t of trianglePolygons) {
    let pathData = "";
    pathData += `M ${t[0][0]}, ${t[0][1]}`;
    for (let i = 1; i <= 3; i++) {
      pathData += ` L ${t[i][0]}, ${t[i][1]}`;
    }
    const x = Math.round((t[0][0] + t[1][0] + t[2][0]) / 3);
    const y = Math.round((t[0][1] + t[1][1] + t[2][1]) / 3);
    allPaths.push({
      d: pathData,
      color: colors[Math.round((x + y) / 20) % colors.length],
    });
  }

  if (!mounted) return null;
  return (
    <div className={"mx-auto w-4/5"}>
      <svg viewBox={"0 0 200 200"} ref={svgRef}>
        {allPaths.map((p) => {
          return (
            <path
              key={p.d}
              d={p.d}
              fill="currentColor"
              strokeWidth={"0.75px"}
              className={`crystal-stroke ${p.color}`}
            />
          );
        })}
      </svg>
    </div>
  );
};

export default Crystal;
