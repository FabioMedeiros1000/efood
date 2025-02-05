import styled from 'styled-components'
import { breakpoints, colors } from '../../styles'

export const RegisterContainer = styled.form`
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

export const InputGroup = styled.div`
  margin-bottom: 8px;

  label {
    line-height: 22px;
  }

  input {
    display: block;
    width: 100%;
    padding: 8px;
    border: 1px solid ${colors.red};
    color: ${colors.red};

    &::placeholder {
      color: #bc8989;
    }

    &:focus {
      outline: 1px solid ${colors.red};
    }
  }
`

export const ButtonSubmit = styled.button`
  background-color: ${colors.red};
  color: ${colors.darkWhite};
  text-align: center;
  padding: 4px;
  width: 248px;
  border: none;
  display: block;
  margin: 0 auto;
  cursor: pointer;
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
