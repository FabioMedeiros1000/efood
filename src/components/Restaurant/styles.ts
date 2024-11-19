import styled from 'styled-components'
import { colors } from '../../styles'
import { Box } from '../Tag/styles'
import { Link } from 'react-router-dom'

export const Card = styled.div`
  color: ${colors.red};
  position: relative;

  > img {
    display: block;
    width: 100%;
    height: 217px;
    object-fit: cover;
  }
`

export const Container = styled.div`
  padding: 8px;
  border-left: 1px solid ${colors.red};
  border-bottom: 1px solid ${colors.red};
  border-right: 1px solid ${colors.red};
  background-color: ${colors.white};

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
  color: ${colors.white};
  background-color: ${colors.red};
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
