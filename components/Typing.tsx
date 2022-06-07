import * as React from "react";

const Typing = ({ children }: { children: string[] }) => {
  const [typed, setTyped] = React.useState("");
  const [backwards, setBackwards] = React.useState(false);
  const [wordIdx, setWordIdx] = React.useState(0);
  const prefixes: string[] = [];
  for (let i = 1; i < children.length; i++) {
    for (let j = 0; j < children[i].length && j < children[i - 1].length; j++) {
      if (children[i][j] !== children[i - 1][j]) {
        prefixes.push(children[i].substring(0, j));
        break;
      }
    }
  }
  prefixes.push(children[children.length - 1]);
  React.useEffect(() => {
    if (typed.length !== children[wordIdx].length) {
      if (backwards) {
        setTimeout(() => {
          const cut = typed.slice(0, -1);
          if (cut === prefixes[wordIdx]) {
            setWordIdx(wordIdx + 1);
            setBackwards(false);
            setTyped(cut);
          } else {
            setTyped(cut);
          }
        }, 100);
      } else {
        setTimeout(() => {
          setTyped(typed + children[wordIdx][typed.length]);
        }, 175);
      }
    } else {
      setTimeout(() => {
        setBackwards(true);
        if (wordIdx !== children.length - 1) {
          setTyped(typed.slice(0, -1));
        }
      }, 2000);
    }
  }, [typed]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {typed}
      <span
        className={
          "cursor-blink inline-block -translate-y-0.5 text-[0.75em] font-semibold"
        }
      >
        |
      </span>
    </>
  );
};

export default Typing;
