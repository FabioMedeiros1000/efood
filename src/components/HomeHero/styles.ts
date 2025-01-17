import styled from 'styled-components'
import { breakpoints, colors } from '../../styles'

export const Container = styled.div`
  text-align: center;
  padding-top: 64px;
  padding-bottom: 40px;
  color: ${colors.red};
  position: relative;

  p {
    position: absolute;
    top: 48px;
    right: 48px;
    font-size: 16px;

    &:hover {
      cursor: pointer;
      border-bottom: 2px solid ${colors.red};
    }
  }

  @media (max-width: ${breakpoints.tablet}) {
    max-width: 100%;
  }
`

export const Title = styled.h1`
  font-weight: bold;
  font-size: 36px;
  line-height: 42px;
  width: 539px;
  margin: 0 auto;
  margin-top: 138px;

  @media (max-width: ${breakpoints.tablet}) {
    font-size: 24px;
    max-width: 80%;
  }
`
