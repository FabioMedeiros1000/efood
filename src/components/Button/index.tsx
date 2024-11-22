import { Link } from 'react-router-dom'
import { BtnContainer, BtnLink } from './styles'

export type Props = {
  children: string | string[]
  onClick?: (e?: any) => void
  type: 'button' | 'submit' | 'link'
  disabled?: boolean
  title?: string
  link?: string
  marginBottom?: string
  width?: 'full' | 'adjusted'
}

const Button = ({
  children,
  onClick,
  type,
  disabled,
  title,
  link,
  marginBottom = '0px',
  width = 'full'
}: Props) => {
  if (type === 'button' || type === 'submit') {
    return (
      <BtnContainer
        width={width}
        title={title}
        disabled={disabled}
        type={type}
        onClick={onClick}
        marginBottom={marginBottom}
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
