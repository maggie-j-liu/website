import React from 'react';
import DarkModeToggle from '../DarkModeToggle/DarkModeToggle'
import Link from 'next/link';

const NavBar = ({ page }) => {
    const bgcolors = `bg-${page}-gray-50 dark:bg-${page}-gray-800`;
    const textcolors = `text-${page}-primary-500 dark:${page}-primary-500`;
    const linkhover = `hover:text-${page}-contrast-500 dark:hover:text-${page}-contrast-300`;
    return (
        <nav className={`min-w-full fixed z-10 py-4 px-8 flex items-center space-x-4 ${bgcolors} ${textcolors}`}>
            <div className={linkhover}>
                <Link href="/">
                    <a className={'font-bold text-xl'}>Home</a>
                </Link>
            </div>
           <DarkModeToggle color={`${textcolors} ${linkhover}`}/>
        </nav>
    );
}

export default NavBar;