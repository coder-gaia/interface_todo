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
    background-color: ${colors.background};
    color: ${colors.text};
  }

  button {
    cursor: pointer;
    font-family: ${typography.fontFamily};
  }
`;