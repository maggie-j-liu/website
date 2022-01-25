import React from "react";
const gen = () => 35 + Math.random() * 20;
const Suit = () => {
  const [posRotate, setPosRotate] = React.useState(gen());
  const [negRotate, setNegRotate] = React.useState(gen());
  React.useEffect(() => {
    setTimeout(() => {
      setPosRotate(gen());
      setNegRotate(gen());
    }, 2000);
  }, [posRotate]); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <div className={"mx-auto w-4/5"}>
      <svg viewBox="0 0 200 200">
        <defs>
          <pattern
            id="stripes-pos"
            width="8"
            height="8"
            patternUnits="userSpaceOnUse"
            patternTransform={`rotate(${posRotate})`}
          >
            <rect
              width="6"
              height="8"
              className={"fill-current text-dark-800 dark:text-gray-600"}
            />
          </pattern>
          <pattern
            id="stripes-neg"
            width="8"
            height="8"
            patternUnits="userSpaceOnUse"
            patternTransform={`rotate(-${negRotate})`}
          >
            <rect
              width="2"
              height="8"
              className={"fill-current text-dark-900 dark:text-gray-500"}
            />
          </pattern>
        </defs>
        {[...Array(10)].map((_, idx) => (
          <rect
            key={idx}
            x={idx * 20}
            width="20"
            height="200"
            fill={`url(#stripes-${idx % 2 ? "pos" : "neg"})`}
            className={"bg-blue-500"}
          />
        ))}
      </svg>
    </div>
  );
};

export default Suit;
