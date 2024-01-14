import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`

    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');

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
        height: 100svh;
        width: 100%;
        scroll-behavior: none;
    }
    body {
        background: linear-gradient(
            to bottom,
            #ffffff,
            #d9d9d9
        );
    }
    header {}
    main {}
    h1, h2, h3, h4, h5, h6 {}
    p {
        font-size: 1.6rem;
    }
    button {}
`

export default GlobalStyles