import { useState } from "react";
import case0 from "./case-0.png";
import case1 from "./case-1.png";
import case2 from "./case-2.png";
import case3 from "./case-3.png";

const cases = [case0, case1, case2, case3];
const Confidence = () => {
  const [repetitions, setRepetitions] = useState(0);
  const [caseIdx, setCaseIdx] = useState(-1);
  return (
    <div>
      {caseIdx >= 0 ? (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={cases[caseIdx] as unknown as string}
            alt="The results of this procedure"
          />
        </>
      ) : null}
      <div>
        <span>Repetitions: {repetitions}</span>{" "}
        <button
          className="rounded bg-primary-200 px-2 hover:bg-primary-300"
          type="button"
          onClick={(e) => {
            e.preventDefault();
            setRepetitions((r) => r + 1);
            setCaseIdx(Math.floor(Math.random() * cases.length));
          }}
        >
          +
        </button>
      </div>
      Confidence: ~{((1 - 0.5 ** repetitions) * 100).toFixed(5)}%
    </div>
  );
};
export default Confidence;
