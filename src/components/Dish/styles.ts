import styled from 'styled-components'
import { colors } from '../../styles'

export const Card = styled.div`
  padding: 8px;
  background-color: ${colors.red};
  color: ${colors.darkWhite};
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
  background-color: ${colors.darkWhite};
  color: ${colors.red};
  padding: 4px 0;
  font-weight: bold;
  line-height: 16.41px;
  cursor: pointer;
  display: block;
  white-space: nowrap;
  text-align: center;
`
