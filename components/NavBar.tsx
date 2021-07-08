import React from "react";
import DarkModeToggle from "./DarkModeToggle";
import GitHubButton from "./GitHubButton";
import Link from "next/link";
import { postsDir, tagsDir } from "../utils/routes";
import Logo from "./Logo";

const NavBar = ({ page }: { page: "home" | "blog" }) => {
  return (
    <nav
      className={`min-w-full fixed z-10 py-4 px-10 flex items-center justify-between backdrop-filter backdrop-blur-[20px] backdrop-saturate-[1.8]`}
    >
      <div className={"w-full max-w-6xl mx-auto flex justify-between"}>
        <div className={`flex items-center gap-8 font-semibold text-lg navbar`}>
          <Link href="/">
            <a>
              <Logo />
            </a>
          </Link>
          <Link href={`/${postsDir}`}>
            <a>Posts</a>
          </Link>
          <Link href={`/${tagsDir}`}>
            <a>Tags</a>
          </Link>
        </div>
        <div className={`flex items-center gap-6 navbar`}>
          <DarkModeToggle />
          <GitHubButton />
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
