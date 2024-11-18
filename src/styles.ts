import { createGlobalStyle } from 'styled-components'

export const cores = {
  branco: '#ffffff',
  vermelho: '#E66767',
  brancoEscuro: '#FFF8F2',
  vermelhoClaro: '#FFEBD9',
  preto: '#4B4B4B'
}

export const breakpoints = {
  tablet: '768px',
  pc: '1023px'
}

const EstiloGlobal = createGlobalStyle`
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    text-decoration: none;
  }

  body {
    font-size: 14px;
    font-family: Roboto, sans-serif;
    background-color: ${cores.brancoEscuro};
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

export default EstiloGlobal
