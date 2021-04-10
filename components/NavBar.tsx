import React from 'react';
import DarkModeToggle from './DarkModeToggle'
import Link from 'next/link';
import { postsDir, tagsDir } from '../utils/routes';

const NavBar = ({ page }: { page: 'home' | 'blog' }) => {
    return (
        <nav className={`min-w-full fixed z-10 py-4 px-10 flex items-center justify-between backdrop-filter backdrop-blur-[20px] backdrop-saturate-[1.8]`}>
            <div className={`flex items-center space-x-8 font-semibold text-lg ${page}-navbar`}>
                <Link href="/">
                    <a className={''}>Home</a>
                </Link>
                <Link href={`/${postsDir}`}>
                    <a className={''}>Posts</a>
                </Link>
                <Link href={`/${tagsDir}`}>
                    <a className={''}>Tags</a>
                </Link>
            </div>
            <div className={`${page}-navbar`}>
                <DarkModeToggle />
           </div>
        </nav>
    );
}

export default NavBar;