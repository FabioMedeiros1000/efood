import { useNavigate } from 'react-router-dom'
import HomeHero from '../../components/HomeHero'
import useAuthForm from '../../hooks/useAuthForm'
import AuthForm from '../../components/AuthForm'
import { RegisterContainer, Small, Title } from './styles'

const Register = () => {
  const navigate = useNavigate()

  const { form, isLoading } = useAuthForm({
    initialValues: { username: '', password: '' },
    onSubmit: async (values) => {
      const response = await fetch(
        `https://efood-backend.onrender.com/api/auth/signup`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(values)
        }
      )
      const data = await response.json()
      if (response.ok) {
        alert('Usuário cadastrado com sucesso!')
        navigate('/login', { replace: true })
      } else {
        alert(data.message || 'Erro ao cadastrar')
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
