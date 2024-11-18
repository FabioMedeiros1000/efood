import { ClipLoader } from 'react-spinners'
import { Container } from './styles'

export type Props = {
  color: string
  height?: number
}

const Loading = ({ color, height = 600 }: Props) => (
  <Container height={height}>
    <ClipLoader color={color} size={height / 4} />
  </Container>
)

export default Loading
