import styled from 'styled-components'
import { cores } from '../../styles'

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
  background-color: ${cores.vermelho};
  padding: 0 8px;
  padding-top: 32px;
  width: 360px;
`

export const Item = styled.li`
  display: flex;
  background-color: ${cores.vermelhoClaro};
  color: ${cores.vermelho};
  padding: 8px;
  width: 100%;
  margin-bottom: 16px;
  position: relative;

  img:first-child {
    width: 80px;
    height: 80px;
    object-fit: cover;
    margin-right: 8px;
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

export const PriceContainer = styled.div`
  margin-top: 40px;
  color: ${cores.vermelhoClaro};
  display: flex;
  justify-content: space-between;

  font-weight: 700;
  line-height: 16.41px;
`

export const Button = styled.div`
  display: block;
  background-color: ${cores.vermelhoClaro};
  color: ${cores.vermelho};
  text-align: center;

  margin-top: 16px;
  padding-top: 4px;
  padding-bottom: 4px;

  font-weight: 700;
  line-height: 16.41px;
`
