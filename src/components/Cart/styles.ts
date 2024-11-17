import styled from 'styled-components'
import { cores } from '../../styles'

export const P = styled.p`
  color: ${cores.brancoEscuro};
  text-align: center;
  font-size: 16px;
  line-height: 22px;
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

  margin-bottom: 16px;
`
