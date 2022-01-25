import React from "react";
const Pick = () => {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted)
    return (
      <div className="mx-auto w-4/5">
        <svg viewBox="0 0 200 200"></svg>
      </div>
    );
  const picked = Math.floor(Math.random() * 16);
  return (
    <div className="mx-auto w-4/5">
      <svg viewBox="0 0 200 200">
        {[...Array(16)].map((_, idx) => {
          let j = idx % 4;
          let i = (idx - j) / 4;
          return (
            <circle
              key={idx}
              r={25}
              cx={50 * j + 25}
              cy={50 * i + 25}
              className={`fill-current ${
                picked === idx
                  ? "text-contrast-500"
                  : "text-primary-500 dark:text-primary-400"
              }`}
            />
          );
        })}
      </svg>
    </div>
  );
};

export default Pick;
