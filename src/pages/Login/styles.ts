import styled from 'styled-components'
import { breakpoints, colors } from '../../styles'

export const LoginContainer = styled.form`
  max-width: 508px;
  margin: 137px auto 95px auto;
  color: ${colors.red};
  background-color: ${colors.darkWhite};

  @media (max-width: ${breakpoints.tablet}) {
    width: 80%;
  }
`

export const Title = styled.h2`
  font-weight: bold;
  font-size: 32px;
  line-height: 30px;
  margin-bottom: 16px;
`

export const Small = styled.div`
  display: flex;
  justify-content: center;

  small {
    border-bottom: 2px solid transparent;

    &:hover {
      cursor: pointer;
      border-bottom: 2px solid ${colors.red};
    }
  }
`
