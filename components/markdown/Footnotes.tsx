import { getDisplayName } from "next/dist/shared/lib/utils";
import { HoverRefContext } from "pages/posts/[slug]";
import {
  Children,
  cloneElement,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import ReactDOM from "react-dom";

const Portal = ({ HoverComponent }) => {
  const hoverRef = useContext(HoverRefContext);
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null;
  return ReactDOM.createPortal(HoverComponent, hoverRef.current);
};
export const FootNote = (props) => {
  const [hovered, setHovered] = useState(false);
  const children = Children.toArray(props.children);
  let HoverChild = null;
  const newChildren = children.filter((child) => {
    // @ts-ignore
    if (child?.type?.displayName === "FDSfds") {
      HoverChild = child;
      return false;
    }
    return true;
  });

  const HoverComponent = useMemo(() => {
    return cloneElement(HoverChild, {
      hovered,
    });
  }, [hovered, HoverChild]);

  return (
    <>
      <Portal HoverComponent={HoverComponent} />
      <span
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="group bg-primary-200 hover:cursor-help hover:bg-primary-300 dark:bg-primary-700 dark:text-white dark:hover:bg-primary-500"
      >
        {newChildren}
      </span>
    </>
  );
};

export const FootnoteHover = ({ children, hovered }) => {
  return (
    <div
      onMouseOutCapture={() => console.log("mouse out")}
      onMouseOverCapture={() => console.log("mouse over")}
      className={`not-prose fixed right-16 bottom-8 z-10 ${
        hovered ? "visible" : "invisible"
      }`}
    >
      <div
        className={`w-72 border-2 border-primary-400 bg-white px-5 py-3 shadow-lg duration-300 dark:bg-dark-700 dark:text-white ${
          hovered ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
        }`}
      >
        {children}
      </div>
    </div>
  );
};

FootnoteHover.displayName = "FDSfds";
