import { useNavigate } from 'react-router-dom'
import HomeHero from '../../components/HomeHero'
import useAuthForm from '../../hooks/useAuthForm'
import AuthForm from '../../components/AuthForm'
import { LoginContainer, Small, Title } from './styles'
import { useLoginMutation } from '../../services/authApi'

const Login = () => {
  const navigate = useNavigate()
  const [login, { isLoading }] = useLoginMutation()

  const { form } = useAuthForm({
    initialValues: { username: '', password: '' },
    onSubmit: async (values) => {
      try {
        const result = await login(values)

        if (result.data) {
          localStorage.setItem('userId', result.data.user.id)
          localStorage.setItem('authToken', result.data.token)
          navigate('/', { replace: true })
        } else if (result.error) {
          alert('Credenciais inválidas!')
        }
      } catch (error) {
        alert('Erro interno no servidor. Por favor, tente novamente mais tarde')
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
