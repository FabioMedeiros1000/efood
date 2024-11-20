import { Link } from 'react-router-dom'
import { BtnContainer, BtnLink } from './styles'

type Props = {
  children: string
  onClick?: () => void
  type: 'button' | 'submit' | 'link'
  disabled?: boolean
  title?: string
  link?: string
}

const Button = ({ children, onClick, type, disabled, title, link }: Props) => {
  if (type === 'button' || type === 'submit') {
    return (
      <BtnContainer
        title={title}
        disabled={disabled}
        type={type}
        onClick={onClick}
      >
        {children}
      </BtnContainer>
    )
  }
  return (
    <Link to={link as string}>
      <BtnLink title={title}>{children}</BtnLink>
    </Link>
  )
}

export default Button
