import { useNavigate } from 'react-router-dom'
import HomeHero from '../../components/HomeHero'
import useAuthForm from '../../hooks/useAuthForm'
import AuthForm from '../../components/AuthForm'
import { LoginContainer, Small, Title } from './styles'

const linkReal = 'https://efood-backend.onrender.com'
const linkLocal = 'http://localhost:5000'

const Login = () => {
  const navigate = useNavigate()

  const { form, isLoading } = useAuthForm({
    initialValues: { username: '', password: '' },
    onSubmit: async (values) => {
      const response = await fetch(`${linkLocal}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values)
      })
      const data = await response.json()
      if (response.ok) {
        localStorage.setItem('authToken', data.token)
        navigate('/', { replace: true })
      } else {
        alert(data.message || 'Erro ao logar')
      }
    }
  })

  return (
    <>
      <HomeHero logout={false} />
      <LoginContainer onSubmit={form.handleSubmit}>
        <Title>Login:</Title>
        <AuthForm form={form} isLoading={isLoading} buttonText="Fazer login" />
        <Small>
          <small onClick={() => navigate('/cadastro')}>
            Ainda não tem login? Clique aqui para se cadastrar!
          </small>
        </Small>
      </LoginContainer>
    </>
  )
}

export default Login
