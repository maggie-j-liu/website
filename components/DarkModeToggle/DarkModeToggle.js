import React from 'react';

const DarkModeToggle = () => {
    const [isDarkTheme, setDarkTheme] = React.useState(false);
    const handleClick = () => {
        setTheme(isDarkTheme ? 'light' : 'dark');
    }
    const getMediaQueryPreference = () => {
        const mediaQuery = "(prefers-color-scheme: dark)";
        const mql = window.matchMedia(mediaQuery);
        const hasMediaQueryPreference = typeof mql.matches === "boolean";

        if (hasMediaQueryPreference) {
            return mql.matches ? "dark" : "light";
        }
    }
    const storeUserSetPreference = (pref) => {
        localStorage.setItem("theme", pref);
    }
    const getUserSetPreference = () => {
        return localStorage.getItem("theme");
    }

    React.useEffect(() => {
        const userSetPreference = getUserSetPreference();
        if (userSetPreference !== null) {
            setDarkTheme(userSetPreference === 'dark');
        }
        else {
            const mediaQueryPreference = getMediaQueryPreference();
            setDarkTheme(mediaQueryPreference === 'dark');
        }
    }, []);

    const setTheme = (pref) => {
        console.log('setting theme');
        console.log(pref);
        setDarkTheme(pref === 'dark' ? true : false);
        storeUserSetPreference(pref);
        if (pref === 'dark') {
            document.documentElement.classList.add('dark');
        }
        else {
            document.documentElement.classList.remove('dark');
        }
    }

    return (
        <>
            <button onClick={handleClick} className={'self-center focus:outline-none'}>
                {isDarkTheme 
                    ? 
                        <svg className={'w-6 h-6 text-home-primary-500'} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg> 
                    :
                        <svg className={'w-6 h-6 text-home-primary-500'} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                        </svg>
                }
            </button>
        </>
    );
}

export default DarkModeToggle;