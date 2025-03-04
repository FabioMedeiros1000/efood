import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import logo from '../../assets/images/logo-efood.svg'
import backgroundPng from '../../assets/images/fundo-hero.png'

import * as S from './styles'
import { removeToken, removeUserId } from '../../store/reducers/auth'

type Props = {
  logout: boolean
}

const HomeHero = ({ logout }: Props) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const clearStorageAndRedirect = () => {
    dispatch(removeToken())
    dispatch(removeUserId())
    navigate('/login', { replace: true })
  }

  return (
    <S.Container style={{ backgroundImage: `url(${backgroundPng})` }}>
      <img src={logo} alt="logo da efood" title="logo da efood" />
      <S.Title>Viva experiências gastronômicas no conforto da sua casa</S.Title>
      {logout ? <p onClick={clearStorageAndRedirect}>Sair</p> : ''}
    </S.Container>
  )
}

export default HomeHero
