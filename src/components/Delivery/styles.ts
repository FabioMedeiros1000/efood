import styled from 'styled-components'
import { breakpoints, colors } from '../../styles'

export const FormContainer = styled.div`
  margin-bottom: 24px;
`

export const Title = styled.h2`
  font-size: 16px;
  font-weight: 700;
  line-height: 18.75px;
  color: ${colors.darkWhite};
  margin-bottom: 16px;
`

export const Row = styled.div`
  display: flex;
  column-gap: 34px;

  @media (max-width: ${breakpoints.pc}) {
    display: block;
  }
`

export const InputGroup = styled.div`
  margin-bottom: 8px;
  width: 100%;

  label {
    font-weight: 700;
    line-height: 16.41px;
    color: ${colors.darkWhite};
    margin-bottom: 8px;
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
