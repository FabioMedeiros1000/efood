import { createGlobalStyle } from 'styled-components'

export const colors = {
  white: '#ffffff',
  red: '#E66767',
  darkWhite: '#FFF8F2',
  lightRed: '#FFEBD9',
  black: '#4B4B4B'
}

export const breakpoints = {
  tablet: '768px',
  pc: '1023px'
}

const GlobalStyle = createGlobalStyle`
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    text-decoration: none;
  }

  body {
    font-size: 14px;
    font-family: Roboto, sans-serif;
    background-color: ${colors.darkWhite};
  }

  .container {
    max-width: 1024px;
    width: 100%;
    margin: 0 auto;

    @media (max-width: ${breakpoints.tablet}) {
      width: 80%;
    }

    @media (max-width: ${breakpoints.pc}) {
      width: 80%;
    }

  }
`

export default GlobalStyle
