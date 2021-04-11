import '../styles/globals.css';
import '../styles/typography.css';
import '../styles/components.css';
//import '../styles/prism.css';
//import '../styles/dracula.css';
import { ColorModeProvider } from '../hooks/useColorMode';
import { AppProps } from 'next/app';


function App({ Component, pageProps }: AppProps) {
    return (
        <ColorModeProvider>
            <Component {...pageProps} />
        </ColorModeProvider>
    ) 
}

export default App
