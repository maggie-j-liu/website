import React from "react";
import DarkModeToggle from "./DarkModeToggle";
import GitHubButton from "./GitHubButton";
import Link from "next/link";
import { postsDir, tagsDir } from "../utils/routes";
import Logo from "./Logo";

const NavBar = () => {
  return (
    <nav
      className={`fixed z-10 flex min-w-full items-center justify-between py-4 px-4 backdrop-blur-[20px] backdrop-saturate-[1.8] backdrop-filter sm:px-10`}
    >
      <div className={"mx-auto flex w-full max-w-6xl justify-between"}>
        <div
          className={`navbar flex items-center space-x-3 text-xs sm:space-x-8 sm:text-lg`}
        >
          <Link href="/">

            <Logo />

          </Link>
          <Link href={`/projects`}>
            ~/projects
          </Link>
          <Link href={`/${postsDir}`}>
            ~/{postsDir}
          </Link>
          <a target="_blank" rel="noreferrer" href="https://uwu.cx">
            ~/photos
          </a>
          <Link href={`/${tagsDir}`}>
            ~/{tagsDir}
          </Link>
        </div>
        <div className={`navbar flex items-center space-x-2 sm:space-x-6`}>
          <DarkModeToggle />
          <GitHubButton />
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
