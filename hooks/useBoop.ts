// https://www.joshwcomeau.com/react/boop/
import React from "react";
const useBoop = ({
  rotation = 0,
  time = 1000,
}: {
  rotation?: number;
  time?: number;
}) => {
  const [isBooped, setIsBooped] = React.useState(false);
  const variants = {
    boop: {
      rotate: rotation,
    },
    noBoop: {
      rotate: 0,
    },
  };
  React.useEffect(() => {
    if (!isBooped) return;
    const timeout = setTimeout(() => {
      setIsBooped(false);
    }, time);
    return () => clearTimeout(timeout);
  }, [isBooped, time]);

  const trigger = React.useCallback(() => {
    setIsBooped(true);
  }, []);
  return { isBooped, variants, trigger };
};

export default useBoop;
