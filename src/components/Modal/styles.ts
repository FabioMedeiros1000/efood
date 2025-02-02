import styled from 'styled-components'
import { breakpoints, colors } from '../../styles'

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 1;
`

export const ModalWrapper = styled.div`
  background-color: ${colors.red};
  color: ${colors.white};
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 32px;
  z-index: 2;
  max-width: 1024px;
  width: 100%;

  @media (max-width: ${breakpoints.tablet}) {
    width: 80%;
    padding: 16px;
  }
`

export const ModalContent = styled.div`
  padding: 16px;

  display: flex;
  justify-content: space-between;

  > img {
    width: 280px;
    height: 280px;
    object-fit: cover;
    display: block;
    margin-right: 24px;
  }

  h1 {
    font-size: 18px;
    font-weight: 900;
    line-height: 21.09px;
    margin-bottom: 16px;
  }

  p {
    margin-bottom: 16px;
    line-height: 22px;
  }

  @media (max-width: ${breakpoints.tablet}) {
    display: block;

    > img {
      width: 100%;
      margin-right: 0;
      height: 200px;
      margin-bottom: 8px;
    }
  }
`

export const CloseIcon = styled.span`
  position: absolute;
  top: 8px;
  right: 8px;
  cursor: pointer;

  > img {
    width: 16px;
    height: 16px;
  }
`
