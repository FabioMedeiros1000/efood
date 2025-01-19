import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom'

import HomeHero from '../../components/HomeHero'

import {
  ButtonSubmit,
  InputGroup,
  RegisterContainer,
  Small,
  Title
} from './styles'
import { useEffect, useState } from 'react'

const Register = () => {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)

  const form = useFormik({
    initialValues: {
      username: '',
      password: ''
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .min(5, 'Esse campo deve ter pelo menos 5 caracteres')
        .required('Esse campo é obrigatório'),
      password: Yup.string()
        .min(6, 'A senha deve ter pelo menos 6 caracteres')
        .max(20, 'A senha não pode ter mais de 20 caracteres')
        .matches(/[a-z]/, 'A senha deve conter pelo menos uma letra minúscula')
        .matches(/[A-Z]/, 'A senha deve conter pelo menos uma letra maiúscula')
        .matches(/\d/, 'A senha deve conter pelo menos um número')
        .matches(
          /[!@#$%^&*(),.?":{}|<>]/,
          'A senha deve conter pelo menos um caractere especial'
        )
        .required('Senha é obrigatória')
    }),
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        setIsLoading(true)
        const response = await fetch(
          'https://efood-backend.onrender.com/signup',
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(values)
          }
        )

        const data = await response.json()

        if (response.ok) {
          alert('Usuário cadastrado com sucesso!')
          resetForm()
          navigate('/login', { replace: true })
        } else {
          alert(data.message || 'Erro ao cadastrar usuário')
        }
      } catch (error) {
        console.error('Erro ao conectar com o servidor', error)
        alert('Erro ao conectar com o servidor. Tente novamente mais tarde')
      } finally {
        setSubmitting(false)
        setIsLoading(false)
      }
    }
  })

  const checkInputHasError = (fieldname: string) => {
    return (
      form.errors[fieldname as keyof typeof form.errors] &&
      form.touched[fieldname as keyof typeof form.touched]
    )
  }

  useEffect(() => {
    const token = localStorage.getItem('authToken')
    if (token) {
      navigate('/', { replace: true })
    }
  }, [navigate])

  return (
    <>
      <HomeHero logout={false} />
      <RegisterContainer onSubmit={form.handleSubmit}>
        <Title>Cadastre-se para acessar o site!</Title>
        <InputGroup>
          <label htmlFor="username">Nome de usuário:</label>
          <input
            id="username"
            name="username"
            value={form.values.username}
            onChange={form.handleChange}
            onBlur={form.handleBlur}
            type="text"
            placeholder="Usuário"
          />
          <small>
            {checkInputHasError('username') ? form.errors.username : ''}
          </small>
        </InputGroup>
        <InputGroup>
          <label htmlFor="password">Senha:</label>
          <input
            id="password"
            name="password"
            value={form.values.password}
            onChange={form.handleChange}
            onBlur={form.handleBlur}
            type="password"
            placeholder="Senha"
          />
          <small>
            {checkInputHasError('password') ? form.errors.password : ''}
          </small>
        </InputGroup>
        <ButtonSubmit disabled={isLoading} type="submit">
          {isLoading ? 'Cadastrando...' : 'Cadastrar'}
        </ButtonSubmit>
        <Small onClick={() => navigate('/login')}>
          <div>Já tem login? Clique aqui para efetuar o login!</div>
        </Small>
      </RegisterContainer>
    </>
  )
}

export default Register
