import styled from 'styled-components'
import { breakpoints, colors } from '../../styles'

export const Container = styled.div`
  padding-top: 24px;
  padding-bottom: 32px;
  height: 280px;
  color: ${colors.white};
  line-height: 38px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  position: relative;

  div {
    position: relative;
    z-index: 1;
  }

  p {
    margin-bottom: 156px;
    font-weight: 100;
    font-size: 32px;

    @media (max-width: ${breakpoints.tablet}) {
      margin-bottom: 145px;
    }
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
