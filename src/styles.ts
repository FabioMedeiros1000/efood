import styled from 'styled-components'
import { createGlobalStyle } from 'styled-components'

export const cores = {
  branco: '#ffffff',
  vermelho: '#E66767',
  brancoEscuro: '#FFF8F2'
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
  }
`

// export const ContainerGlobal = styled.div`
//   max-width: 1024px;
//   width: 100%;
//   margin: 0 auto;
// `

export default EstiloGlobal
