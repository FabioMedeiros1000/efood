import styled from 'styled-components'
import { cores } from '../../styles'

export const Card = styled.div`
  padding: 8px;
  background-color: ${cores.vermelho};
  color: ${cores.brancoEscuro};
  cursor: pointer;

  p {
    line-height: 22px;
    margin: 8px 0;
  }

  img {
    display: block;
    width: 100%;
    height: 167px;
    object-fit: cover;
  }
`

export const Title = styled.h3`
  font-size: 16px;
  font-weight: 900;
  line-height: 18.75px;
  margin-top: 8px;
`

export const Botao = styled.a`
  background-color: ${cores.brancoEscuro};
  color: ${cores.vermelho};
  padding: 4px 83px;
  font-weight: bold;
  line-height: 16.41px;
  cursor: pointer;
  display: block;
`
