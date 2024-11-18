import { Button } from './styles'

type Props = {
  children: string
  onClick?: () => void
  type: 'button' | 'submit'
  disabled?: boolean
  title?: string
}

const ButtonSidebar = ({ children, onClick, type, disabled, title }: Props) => (
  <Button title={title} disabled={disabled} type={type} onClick={onClick}>
    {children}
  </Button>
)

export default ButtonSidebar
