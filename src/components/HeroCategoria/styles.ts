import styled from 'styled-components'
import { cores } from '../../styles'

export const Container = styled.div`
  padding-top: 24px;
  padding-bottom: 32px;
  height: 280px;
  color: ${cores.branco};
  line-height: 38px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100%;

  p {
    margin-bottom: 156px;
    font-weight: 100;
    font-size: 32px;
  }

  h2 {
    font-weight: 900;
    font-size: 32px;
  }
`
