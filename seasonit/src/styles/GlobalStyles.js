import { createGlobalStyle } from 'styled-components'
import '../assets/fonts/fonts.css'

const GlobalStyles = createGlobalStyle`

    :root {
        font-size: 62.5%;
    }
    *, *::before, *::after {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
        min-width: 0;
        font-family: 'Poppins', sans-serif;
    }
    html {
        height: 100svh;
        width: 100vw;
    }
    body {
        font-size: 1.6rem;
        background: linear-gradient(
            to bottom,
            #ffffff,
            #d9d9d9
        );
    }
    button {
        cursor: pointer;
    }
`

export default GlobalStyles