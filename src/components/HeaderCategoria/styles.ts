import styled from 'styled-components'
import { cores } from '../../styles'

export const Container = styled.div`
  display: flex;
  align-items: center;
  color: ${cores.vermelho};
  justify-content: center;
  padding: 64px 0;
  font-weight: bold;
  font-size: 18px;
  line-height: 21px;

  div {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`
