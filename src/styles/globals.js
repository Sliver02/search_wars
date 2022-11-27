import styled, { createGlobalStyle } from 'styled-components';
import media from './mediaQueries';
import { color } from './variables';

export const GlobalStyles = createGlobalStyle`
    // global reset
    *,
    *:after,
    *:before {
        margin: 0;
        padding: 0;
        border: 0;
        font-size: 100%;
        vertical-align: baseline;
        box-sizing: border-box;
    }

    main {
        -webkit-overflow-scrolling: touch;
        overflow-scrolling: touch;
        
        ${media.min.md`
            overflow: hidden;
        `}
    }

    // base global style
    html, 
    body {
        font-family: Helvetica, sans-serif;
        font-display: swap;
        line-height: 1;

        scroll-behavior: smooth;
        height: -webkit-fill-available;

        -ms-text-size-adjust: 100%;
        -webkit-text-size-adjust: 100%;
        -moz-osx-font-smoothing: grayscale;
        -webkit-font-smoothing: antialiased;

        background-color: ${color.black};
        color: ${color.white};

        font-size: 16px;

        ${media.min.xxl`
            font-size: 0.8328995314940135vw;
        `}
    }

    a, a:hover {
        color: ${color.yellow};
        text-decoration: none;
    }

    main {
        min-height: 100vh;
        height: -webkit-fill-available;
        z-index: 1;
        position: relative
    }
`;

export const PageWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 2rem;
    align-items: ${(props) => props.align};
`;
