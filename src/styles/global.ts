import {createGlobalStyle} from 'styled-components'
import {colors, typography} from './colors'

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: ${typography.fontFamily};
  }

  body {
    background: #1B2A49;
    color: ${colors.text};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  button {
    cursor: pointer;
    font-family: ${typography.fontFamily};
  }

  img { max-width: 100%; display: block; }
`;