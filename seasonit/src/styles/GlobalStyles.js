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
        font-size: 1.6rem;
        min-height: 100svh;
        width: 100%;
        scroll-behavior: none;
    }
    body {
        background: linear-gradient(
            to bottom,
            #ffffff,
            #d9d9d9
        );
        max-width: 35rem;
        height: 100%;
        margin: 0 auto;
    }
    button {
        cursor: pointer;
    }

    /* Define Media Queries */
    @media screen and (max-width: 768px) {
        /* Styles for small devices */
        body {
            max-width: 100%;
            max-height: 75rem;
            margin: 0 auto;
        }
    }

`

export default GlobalStyles