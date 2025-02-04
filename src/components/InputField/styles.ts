import styled from 'styled-components'
import { colors } from '../../styles'

export const InputGroup = styled.div`
  margin-bottom: 8px;
  width: 100%;

  label {
    font-weight: 700;
    line-height: 16.41px;
    color: ${colors.darkWhite};
    margin-bottom: 8px;
    white-space: nowrap;
  }

  input {
    background-color: ${colors.darkWhite};
    border: none;
    padding: 8px;
    color: ${colors.black};
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
