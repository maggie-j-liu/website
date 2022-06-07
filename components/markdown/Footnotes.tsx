import useHoverRef from "@/hooks/useHoverRef";
import {
  Children,
  cloneElement,
  ReactElement,
  ReactNode,
  useEffect,
  useMemo,
  useState,
} from "react";
import ReactDOM from "react-dom";

const footnoteHoverDisplayName = "FootnoteHoverComponent";

const Portal = ({ HoverComponent }: { HoverComponent: ReactNode }) => {
  const hoverRef = useHoverRef();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null;
  if (!hoverRef.current) return null;
  return ReactDOM.createPortal(HoverComponent, hoverRef.current);
};

export const FootNote = (props: any) => {
  const [hovered, setHovered] = useState(false);
  const children = Children.toArray(props.children);
  let HoverChild: any = null;
  const newChildren = children.filter((child) => {
    // @ts-ignore
    if (child?.type?.displayName === footnoteHoverDisplayName) {
      HoverChild = child;
      return false;
    }
    return true;
  });

  const HoverComponent = useMemo(() => {
    if (HoverChild === null) {
      return null;
    }
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
        className="group -mx-0.5 bg-primary-100 py-0.5 px-0.5 hover:cursor-help hover:bg-primary-200 dark:bg-primary-700 dark:text-white dark:hover:bg-primary-500"
      >
        {newChildren}
      </span>
    </>
  );
};

export const FootnoteHover = ({
  children,
  hovered,
  identifier,
}: {
  children: ReactElement;
  hovered: boolean;
  identifier: string;
}) => {
  return (
    <div
      className={`not-prose pointer-events-none fixed right-16 bottom-8 z-10 ${
        hovered ? "visible" : "invisible"
      }`}
    >
      <div
        className={`w-72 space-y-1 border-2 border-primary-500 bg-white px-5 py-4 shadow-lg duration-200 hover:duration-150 dark:bg-dark-700 dark:text-white ${
          hovered ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
        }`}
      >
        <div className="text-xs font-bold leading-none text-primary-500">
          {identifier}
        </div>
        <div className="text-sm">{children}</div>
      </div>
    </div>
  );
};

FootnoteHover.displayName = footnoteHoverDisplayName;
