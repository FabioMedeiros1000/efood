import styled from 'styled-components'
import { colors } from '../../styles'

export const P = styled.p`
  color: ${colors.darkWhite};
  text-align: center;
  font-size: 16px;
  line-height: 22px;
`

export const PriceContainer = styled.div`
  margin-top: 40px;
  color: ${colors.lightRed};
  display: flex;
  justify-content: space-between;

  font-weight: 700;
  line-height: 16.41px;

  margin-bottom: 16px;
`
