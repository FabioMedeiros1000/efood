import styled from 'styled-components'
import { breakpoints } from '../../styles'

export const Section = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 32px;
  padding-top: 56px;
  padding-bottom: 120px;

  @media (max-width: ${breakpoints.pc}) {
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: ${breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`
