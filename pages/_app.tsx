import "styles/globals.css";
import "styles/animation.css";
import "styles/typography.css";
import "styles/components.css";
import { ColorModeProvider } from "@/hooks/useColorMode";
import { AppProps } from "next/app";
import { useRemoteRefresh } from "next-remote-refresh/hook";

function App({ Component, pageProps }: AppProps) {
  useRemoteRefresh();
  return (
    <ColorModeProvider>
      <Component {...pageProps} />
    </ColorModeProvider>
  );
}

export default App;
