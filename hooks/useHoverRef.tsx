import { createContext, MutableRefObject, useContext } from "react";

export const HoverRefContext = createContext<
  MutableRefObject<HTMLDivElement | null> | undefined
>(undefined);

const useHoverRef = () => {
  const context = useContext(HoverRefContext);
  if (!context) {
    throw new Error("useHoverRef must be used within a HoverRefProvider");
  }
  return context;
};
export default useHoverRef;
