import { ClipLoader } from 'react-spinners'

import { Container } from './styles'

export type Props = {
  color: string
  height?: number
}

const Loading = ({ color, height = 200 }: Props) => (
  <Container height={height}>
    <ClipLoader color={color} size={height} />
  </Container>
)

export default Loading
