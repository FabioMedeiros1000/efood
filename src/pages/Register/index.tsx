import { useNavigate } from 'react-router-dom'

import HomeHero from '../../components/HomeHero'
import AuthForm from '../../components/AuthForm'

import useAuthForm from '../../hooks/useAuthForm'
import { useSignupMutation } from '../../services/authApi'

import { RegisterContainer, Small, Title } from './styles'

const Register = () => {
  const navigate = useNavigate()
  const [signup, { isLoading }] = useSignupMutation()

  const { form } = useAuthForm({
    initialValues: { username: '', password: '' },
    onSubmit: async (values) => {
      try {
        const result = await signup(values)

        if (result.error) {
          if ('data' in result.error) {
            const errorData = result.error.data as { message: string }
            alert(errorData.message)
          }
        } else if (result.data) {
          alert('Usuário cadastrado com sucesso')
          navigate('/login', { replace: true })
        }
      } catch (error) {
        console.error('Erro no cadastro', error)

        alert('Erro interno no servidor. Por favor, tente mais tarde!')
      }
    }
  })

  return (
    <>
      <HomeHero logout={false} />
      <RegisterContainer onSubmit={form.handleSubmit}>
        <Title>Cadastre-se para acessar o site!</Title>
        <AuthForm form={form} isLoading={isLoading} buttonText="Cadastrar" />
        <Small>
          <small onClick={() => navigate('/login')}>
            Já tem login? Clique aqui para efetuar o login!
          </small>
        </Small>
      </RegisterContainer>
    </>
  )
}

export default Register
