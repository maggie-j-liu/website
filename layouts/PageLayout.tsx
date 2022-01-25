import NavBar from "@/components/NavBar";
import React from "react";
const PageLayout: React.FC<{ full?: boolean }> = ({
  full = false,
  children,
}) => {
  return (
    <div className={"w-full bg-white dark:bg-dark-900"}>
      <NavBar />
      <div
        className={`mx-auto flex max-w-3xl flex-col px-4 py-12 pt-16 lg:max-w-4xl ${
          full ? "min-h-screen justify-center" : "justify-between"
        }`}
      >
        {children}
      </div>
    </div>
  );
};

export default PageLayout;
