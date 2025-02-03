import styled from 'styled-components'
import { breakpoints, colors } from '../../styles'

export const Item = styled.li`
  display: flex;
  background-color: ${colors.lightRed};
  color: ${colors.red};
  padding: 8px;
  width: 100%;
  margin-bottom: 16px;
  position: relative;

  @media (max-width: ${breakpoints.tablet}) {
    display: block;
  }

  img:first-child {
    width: 80px;
    height: 80px;
    object-fit: cover;
    margin-right: 8px;

    @media (max-width: ${breakpoints.tablet}) {
      width: 100%;
      margin-right: 0;
    }
  }

  h3 {
    margin-bottom: 16px;
    font-size: 18px;
    font-weight: 900;
    line-height: 21.09px;
  }

  p {
    line-height: 22px;
  }

  img:last-child {
    position: absolute;
    bottom: 8px;
    right: 8px;
    cursor: pointer;
  }
`
