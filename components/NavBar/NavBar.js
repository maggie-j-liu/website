import React from 'react';
import DarkModeToggle from '../DarkModeToggle/DarkModeToggle'
import Link from 'next/link';

const NavBar = () => {
    return (
        <nav className={'min-w-full fixed bg-white z-10 py-4 px-8 flex items-center space-x-4'}>
            <Link href="/">
                <a className={'text-home-primary-500 font-bold text-xl'}>Home</a>
            </Link>
           <DarkModeToggle />
        </nav>
    );
}

export default NavBar;