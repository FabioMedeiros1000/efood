import styled from 'styled-components'
import { cores } from '../../styles'

export const Container = styled.div`
  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.8);
    z-index: 1;
    display: none;
  }

  .overlay.isVisible {
    display: block;
  }
`

export const Section = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 32px;
  padding-top: 56px;
  padding-bottom: 120px;
`

export const Modal = styled.div`
  background-color: ${cores.vermelho};
  color: ${cores.branco};
  padding: 32px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  z-index: 2;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  display: none;

  &.isVisible {
    display: block;
  }
`

export const ModalContent = styled.div`
  display: flex;
  justify-content: space-between;

  img:first-child {
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

  img:last-child {
    position: absolute;
    top: 8px;
    right: 8px;
    cursor: pointer;
  }
`

export const Botao = styled.div`
  background-color: ${cores.brancoEscuro};
  color: ${cores.vermelho};
  padding: 4px 7px;
  display: inline-block;
  font-weight: 700;
  line-height: 16.41px;
  cursor: pointer;
`
