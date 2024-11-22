import styled from 'styled-components'
import { colors } from '../../styles'
import { Props } from '.'

export const BtnContainer = styled.button<
  Pick<Props, 'marginBottom' | 'width'>
>`
  display: block;
  width: ${(props) => (props.width === 'full' ? '100%' : 'auto')};
  padding: 4px 8px;
  text-align: center;
  background-color: ${colors.darkWhite};
  color: ${colors.red};
  border: none;
  font-weight: 700;
  line-height: 16.41px;
  cursor: pointer;
  margin-bottom: ${(props) => props.marginBottom};
`

export const BtnLink = styled.div`
  color: ${colors.white};
  background-color: ${colors.red};
  padding: 4px 6px;
  cursor: pointer;
  display: inline-block;
`
