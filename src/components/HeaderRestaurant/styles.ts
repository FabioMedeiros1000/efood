import styled from 'styled-components'
import { breakpoints, colors } from '../../styles'

export const Container = styled.div`
  display: flex;
  align-items: center;
  color: ${colors.red};
  justify-content: center;
  padding: 64px 0;
  font-weight: bold;
  font-size: 18px;
  line-height: 21px;
  max-width: 100%;

  div {
    display: flex;
    align-items: center;
    justify-content: space-between;

    @media (max-width: ${breakpoints.tablet}) {
      p {
        display: none;
      }
    }
  }
`

export const ButtonCart = styled.button`
  cursor: pointer;
  display: block;

  background-color: transparent;
  border: none;
  color: ${colors.red};
  font-weight: bold;
  font-size: 18px;
  line-height: 21.09px;
  text-align: right;

  width: 256px;

  span {
    margin: 0 auto;
  }
`
