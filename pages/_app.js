import '../styles/globals.css';
import '../styles/typography.css';
//import '../styles/prism.css';
//import '../styles/dracula.css';
import { ColorModeProvider } from '../hooks/useColorMode';
//import '../styles/linenums.css'

function MyApp({ Component, pageProps }) {
    return (
        <ColorModeProvider>
            <Component {...pageProps} />
        </ColorModeProvider>
    ) 
}

export default MyApp
