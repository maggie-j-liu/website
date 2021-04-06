import Document, { Html, Head, Main, NextScript } from "next/document";

// https://www.joshwcomeau.com/react/dark-mode/
// https://dev.to/sreetamdas/the-perfect-dark-mode-2d7g
function setInitialColorMode() {
    function getInitialColorMode() {
        const persistedPreference = window.localStorage.getItem("theme");
        const hasPersistedPreference = typeof persistedPreference === "string";

        /*
         * If the user has explicitly chosen light or dark,
         * use it. Otherwise, this value will be null.
         */
        if (hasPersistedPreference) {
            return persistedPreference;
        }

        // If there is no saved preference, use a media query
        const mediaQuery = "(prefers-color-scheme: dark)";
        const mql = window.matchMedia(mediaQuery);

        const hasMediaQueryPreference = typeof mql.matches === "boolean";
        if (hasMediaQueryPreference) {
            return mql.matches ? "dark" : "light";
        }

        // default to 'light'.
        return "light";
    }

    const colorMode = getInitialColorMode();

    // add HTML attribute if dark mode
    if (colorMode === "dark") {
        document.documentElement.classList.add('dark');
    }
    else {
        document.documentElement.classList.remove('dark');
    }
}

// our function needs to be a string
const blockingSetInitialColorMode = `(${setInitialColorMode.toString()}
)()
`;

export default class MyDocument extends Document {
    render() {
        return (
            <Html>
                <Head>
                    <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
                </Head>
                <body className={'bg-home-main-light dark:bg-home-main-dark font-sans'}>
                    <script
                        dangerouslySetInnerHTML={{
                            __html: blockingSetInitialColorMode,
                        }}
                    />
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}