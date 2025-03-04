import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { FormikProps } from 'formik'

import InputField from '../InputField'
import Loading from '../Loading'

import { CredentialsType } from '../../services/authApi'

import { ButtonAuth } from './styles'

import { colors } from '../../styles'

interface AuthFormProps {
  form: FormikProps<CredentialsType>
  isLoading: boolean
  buttonText: string
}

const AuthForm = ({ form, isLoading, buttonText }: AuthFormProps) => {
  const navigate = useNavigate()
  useEffect(() => {
    const token = localStorage.getItem('authToken')

    if (token) {
      navigate('/')
    }
  }, [navigate])

  return (
    <>
      <InputField
        id="username"
        name="username"
        label="Nome de usuário"
        error={form.errors.username}
        onBlur={form.handleBlur}
        onChange={form.handleChange}
        value={form.values.username}
        touched={form.touched.username}
        color={colors.red}
      />
      <InputField
        id="password"
        name="password"
        label="Senha"
        error={form.errors.password}
        onBlur={form.handleBlur}
        onChange={form.handleChange}
        value={form.values.password}
        touched={form.touched.password}
        type="password"
        color={colors.red}
      />
      <ButtonAuth
        width="adjusted"
        marginTop="24px"
        marginBottom="4px"
        backgroundColor={colors.red}
        disabled={isLoading}
        type="submit"
      >
        {isLoading ? <Loading color={colors.white} height={20} /> : buttonText}
      </ButtonAuth>
    </>
  )
}

export default AuthForm
