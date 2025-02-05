import styled from 'styled-components'
import { colors } from '../../styles'
import { InputFieldProps } from '.'

export const InputGroup = styled.div<Pick<InputFieldProps, 'color'>>`
  margin-bottom: 8px;
  width: 100%;

  label {
    font-weight: 700;
    line-height: 16.41px;
    color: ${(props) => props.color || colors.darkWhite};
    margin-bottom: 8px;
    white-space: nowrap;
  }

  input {
    background-color: ${(props) =>
      props.color ? 'transparent' : colors.darkWhite};
    border: ${(props) => (props.color ? `2px solid ${props.color}` : 'none')};
    padding: 8px;
    color: ${(props) => props.color || colors.black};
    outline: none;
    font-weight: 700;
    line-height: 16.41px;
  }

  label,
  input {
    width: 100%;
    display: block;
  }

  small {
    color: ${colors.black};
    font-weight: bold;
  }
`
