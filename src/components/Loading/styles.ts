import styled from 'styled-components'
import { Props } from './index'

type ContainerProps = Omit<Props, 'color'>

export const Container = styled.div<ContainerProps>`
  height: ${(props) => props.height + 'px' || '100vh'};
  display: flex;
  align-items: center;
  justify-content: center;
`
