import styled from 'styled-components'
import { colors } from '../../styles'

export const CartContainer = styled.div`
  position: fixed;
  display: none;
  justify-content: flex-end;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;

  &.is-open {
    display: flex;
  }
`

export const Overlay = styled.div`
  background-color: #000;
  opacity: 0.8;
  position: absolute:
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`

export const Aside = styled.aside`
  background-color: ${colors.red};
  padding: 0 8px;
  padding-top: 32px;
  width: 360px;
`
