import { createContext, MutableRefObject, useContext } from "react";

export const HoverRefContext =
  createContext<MutableRefObject<HTMLDivElement>>(null);

const useHoverRef = () => useContext(HoverRefContext);
export default useHoverRef;
