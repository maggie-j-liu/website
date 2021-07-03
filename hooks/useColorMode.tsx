import React from "react";
import colorModes from "@/utils/colorModes";
const ColorModeContext = React.createContext(undefined);
export const ColorModeProvider: React.FC = ({ children }) => {
  const [colorMode, rawSetColorMode] = React.useState(undefined);

  // returns dark or light
  const getMediaQueryPreference = () => {
    const mediaQuery = "(prefers-color-scheme: dark)";
    const mql = window.matchMedia(mediaQuery);
    const hasMediaQueryPreference = typeof mql.matches === "boolean";

    if (hasMediaQueryPreference) {
      return mql.matches ? colorModes.dark : colorModes.light;
    }
  };

  // stores preference from localstorage
  const storeUserSetPreference = (pref) => {
    localStorage.setItem("theme", pref);
  };

  // gets preference from localstorage
  const getUserSetPreference = () => {
    return localStorage.getItem("theme");
  };

  // initialize color mode
  React.useEffect(() => {
    const userSetPreference = getUserSetPreference();
    if (
      userSetPreference !== null &&
      Object.values(colorModes).includes(userSetPreference)
    ) {
      rawSetColorMode(userSetPreference);
    } else {
      const mediaQueryPreference = getMediaQueryPreference();
      rawSetColorMode(mediaQueryPreference);
    }
  }, []);

  const setColorMode = (pref) => {
    rawSetColorMode(pref);
    storeUserSetPreference(pref);
    if (pref === colorModes.dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <ColorModeContext.Provider value={{ colorMode, setColorMode }}>
      {children}
    </ColorModeContext.Provider>
  );
};

const useColorMode = () => React.useContext(ColorModeContext);

export default useColorMode;
