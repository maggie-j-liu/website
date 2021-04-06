import React from 'react';
import DarkModeToggle from './DarkModeToggle'
import Link from 'next/link';

const NavBar = ({ page }) => {
    return (
        <nav className={`min-w-full fixed z-10 py-4 px-8 flex items-center space-x-4 ${page}-navbar backdrop-filter backdrop-blur-[20px] backdrop-saturate-[1.8]`}>
            <Link href="/">
                <a className={'font-bold text-xl'}>Home</a>
            </Link>
           <DarkModeToggle />
        </nav>
    );
}

export default NavBar;