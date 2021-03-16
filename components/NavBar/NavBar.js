import React from 'react';
import DarkModeToggle from '../DarkModeToggle/DarkModeToggle'
import Link from 'next/link';

const NavBar = ({ page }) => {
    let bgcolors, textcolors, linkhover;
    if (page == 'blog') {
        bgcolors = `bg-blog-gray-50 dark:bg-blog-gray-800`;
        textcolors = `text-blog-primary-500 dark:blog-primary-500`;
        linkhover = `hover:text-blog-contrast-500 dark:hover:text-blog-contrast-300`;
    }
    else {
        bgcolors = `bg-home-gray-50 dark:bg-home-gray-800`;
        textcolors = `text-home-primary-500 dark:home-primary-500`;
        linkhover = `hover:text-home-contrast-500 dark:hover:text-home-contrast-300`;
    }
    
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