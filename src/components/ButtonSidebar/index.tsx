import { Button } from './styles'

type Props = {
  children: string
  onClick?: () => void
  type: 'button' | 'submit'
}

const ButtonSidebar = ({ children, onClick, type }: Props) => (
  <Button type={type} onClick={onClick}>
    {children}
  </Button>
)

export default ButtonSidebar
