import React from "react";
import useColorMode from "@/hooks/useColorMode";
import colorModes from "@/utils/colorModes";
import { motion } from "framer-motion";
import useBoop from "@/hooks/useBoop";

const DarkModeToggle = () => {
  const { colorMode, setColorMode } = useColorMode();
  const { isBooped, trigger, variants } = useBoop({ rotation: -30, time: 50 });
  const handleClick = () => {
    // https://paco.sh/blog/disable-theme-transitions
    const css = document.createElement("style");
    css.type = "text/css";
    css.appendChild(
      document.createTextNode(
        `* {
            -webkit-transition: none !important;
            -moz-transition: none !important;
            -o-transition: none !important;
            -ms-transition: none !important;
            transition: none !important;
          }`
      )
    );
    document.head.appendChild(css);
    setColorMode(
      colorMode === colorModes.dark ? colorModes.light : colorModes.dark
    );
    const _ = window.getComputedStyle(css).opacity;
    document.head.removeChild(css);
    trigger();
  };
  return (
    <>
      <motion.button
        onHoverStart={() => trigger()}
        animate={isBooped ? "boop" : "noBoop"}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 8,
        }}
        variants={variants}
        onClick={handleClick}
        className={"focus-invisible"}
      >
        <svg
          className={`hidden h-5 w-5 dark:block sm:h-6 sm:w-6`}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
        <svg
          className={`block h-6 w-6 dark:hidden`}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
          />
        </svg>
      </motion.button>
    </>
  );
};

export default DarkModeToggle;
