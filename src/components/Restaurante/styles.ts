import styled from 'styled-components'
import { cores } from '../../styles'
import { Box } from '../Tag/styles'
import { Link } from 'react-router-dom'

export const Card = styled.div`
  color: ${cores.vermelho};
  position: relative;

  img {
    display: block;
  }
`

export const Container = styled.div`
  padding: 8px;
  border-left: 1px solid ${cores.vermelho};
  border-bottom: 1px solid ${cores.vermelho};
  border-right: 1px solid ${cores.vermelho};
  background-color: ${cores.branco};

  p {
    margin-bottom: 16px;
  }
`

export const BoxAvaliation = styled.div`
  display: flex;
  align-items: center;

  img {
    margin-left: 8px;
  }
`

export const BoxTitle = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
`

export const Botao = styled(Link)`
  color: ${cores.branco};
  background-color: ${cores.vermelho};
  padding: 4px 6px;
  cursor: pointer;
  display: inline-block;
`

export const TagContainer = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  top: 16px;
  right: 16px;

  ${Box} {
    margin-left: 8px;
  }
`
