import styled from 'styled-components'
import { cores } from '../../styles'

export const Container = styled.div`
  text-align: center;
  color: ${cores.vermelho};
  padding: 40px 0;

  p {
    font-size: 10px;
    line-height: 12px;
  }
`

export const BoxSocialMedia = styled.div`
  display: flex;
  align-itens: center;
  justify-content: center;
  margin-top: 32px;
  margin-bottom: 80px;

  img {
    margin-right: 8px;
  }
`
