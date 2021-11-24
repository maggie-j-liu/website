import React from "react";
import DarkModeToggle from "./DarkModeToggle";
import GitHubButton from "./GitHubButton";
import Link from "next/link";
import { postsDir, tagsDir } from "../utils/routes";
import Logo from "./Logo";

const NavBar = () => {
  return (
    <nav
      className={`min-w-full fixed z-10 py-4 px-4 sm:px-10 flex items-center justify-between backdrop-filter backdrop-blur-[20px] backdrop-saturate-[1.8]`}
    >
      <div className={"w-full max-w-6xl mx-auto flex justify-between"}>
        <div
          className={`flex items-center space-x-3 sm:space-x-8 text-xs sm:text-lg navbar`}
        >
          <Link href="/">
            <a>
              <Logo />
            </a>
          </Link>
          <Link href={`/projects`}>
            <a>~/projects</a>
          </Link>
          <Link href={`/${postsDir}`}>
            <a>~/{postsDir}</a>
          </Link>
          <Link href={`/${tagsDir}`}>
            <a>~/{tagsDir}</a>
          </Link>
        </div>
        <div className={`flex items-center space-x-2 sm:space-x-6 navbar`}>
          <DarkModeToggle />
          <GitHubButton />
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
