import styled from 'styled-components'
import { breakpoints, colors } from '../../styles'

export const Container = styled.div`
  text-align: center;
  color: ${colors.red};
  padding: 40px 0;
  max-width: 100%;

  p {
    font-size: 10px;
    line-height: 12px;

    @media (max-width: ${breakpoints.tablet}) {
      width: 80%;
      margin: 0 auto;
    }
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
