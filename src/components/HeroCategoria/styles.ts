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
  position: relative;

  div {
    position: relative;
    z-index: 1;
  }

  p {
    margin-bottom: 156px;
    font-weight: 100;
    font-size: 32px;
  }

  h2 {
    font-weight: 900;
    font-size: 32px;
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
  }
`
