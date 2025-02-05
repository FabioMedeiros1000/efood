import { InputGroup } from './styles'
import InputMask from 'react-input-mask'

export interface InputFieldProps {
  id: string
  name: string
  label: string
  type?: string
  error?: string
  touched?: boolean
  value: string | number
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void
  mask?: string
  color?: string
}

const InputField = ({
  id,
  name,
  label,
  type = 'text',
  error,
  touched,
  value,
  onChange,
  onBlur,
  mask,
  color
}: InputFieldProps) => (
  <InputGroup color={color}>
    <label htmlFor={id}>{label}</label>
    {mask ? (
      <InputMask
        mask={mask}
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />
    ) : (
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />
    )}
    {touched && error && <small>{error}</small>}
  </InputGroup>
)

export default InputField
