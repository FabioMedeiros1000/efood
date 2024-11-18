import styled from 'styled-components'
import { Props } from './index' // Certifique-se de que `Props` está corretamente definido em `./index`

type ContainerProps = Omit<Props, 'color'> // Omitir `color` se necessário

export const Container = styled.div<ContainerProps>`
  height: ${(props) => props.height}px;
  display: flex;
  align-items: center;
  justify-content: center;
`
