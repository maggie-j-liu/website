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
    document.documentElement.classList.add("dark");
    document.documentElement.classList.add("r-dark");
  } else {
    document.documentElement.classList.remove("dark");
    document.documentElement.classList.remove("r-dark");
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
          <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/npm/katex@0.13.2/dist/katex.css"
            integrity="sha384-2vkq42dvFAQl88n6UuPWLKSKnFnHyyoSgy788ohlfWZ4xEmF8g0kCMZe1CkaXHDd"
            crossOrigin="anonymous"
          />
          <link
            rel="alternate"
            type="application/rss+xml"
            title="RSS Feed for maggieliu.dev"
            href="https://maggieliu.dev/rss.xml"
          />
        </Head>
        <body
          className={
            "bg-white font-sans text-dark-900 dark:bg-dark-900 dark:text-dark-100"
          }
        >
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
