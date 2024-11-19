import styled from 'styled-components'
import { colors } from '../../styles'

export const Button = styled.button`
  display: block;
  width: 100%;
  padding: 4px 0;
  text-align: center;
  background-color: ${colors.darkWhite};
  color: ${colors.red};
  border: none;
  margin-bottom: 8px;
  font-weight: 700;
  line-height: 16.41px;
  cursor: pointer;
`
