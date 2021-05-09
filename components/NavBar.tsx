import React from 'react';
import DarkModeToggle from './DarkModeToggle';
import GitHubButton from './GitHubButton';
import Link from 'next/link';
import { postsDir, tagsDir } from '../utils/routes';

const NavBar = ({ page }: { page: 'home' | 'blog' }) => {
    return (
        <nav className={`min-w-full fixed z-10 py-4 px-10 flex items-center justify-between backdrop-filter backdrop-blur-[20px] backdrop-saturate-[1.8]`}>
            <div className={`flex items-center space-x-8 font-semibold text-lg ${page}-navbar`}>
                <Link href="/">
                    <a>Home</a>
                </Link>
                <Link href={`/${postsDir}`}>
                    <a>Posts</a>
                </Link>
                <Link href={`/${tagsDir}`}>
                    <a>Tags</a>
                </Link>
            </div>
            <div className={`flex items-center space-x-6 ${page}-navbar`}>
                <DarkModeToggle />
                <GitHubButton />
           </div>
        </nav>
    );
}

export default NavBar;