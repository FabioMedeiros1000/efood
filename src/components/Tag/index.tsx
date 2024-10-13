import { Box } from './styles'

type Props = {
  children: string
}

const Tag = ({ children }: Props) => <Box>{children}</Box>

export default Tag
