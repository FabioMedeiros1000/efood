import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import Button from '../Button'

import { closeDelivery } from '../../store/reducers/delivery'
import {
  closePayment,
  setFormCompleted as setFormCompletedPayment
} from '../../store/reducers/payment'
import { clearCart } from '../../store/reducers/cart'
import {
  clearDelivery,
  setFormCompleted as setFormCompletedDelivery
} from '../../store/reducers/delivery'
import { clearPayment } from '../../store/reducers/payment'
import { closeConfirmed } from '../../store/reducers/confirmed'

import * as S from './styles'

const Confirmed = (data: PurchaseResponse) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  if (data.orderId) {
    return (
      <>
        <S.Title>Pedido realizado - {data.orderId}</S.Title>
        <S.Text>
          Estamos felizes em informar que seu pedido já está em processo de
          preparação e, em breve, será entregue no endereço fornecido. <br />
          Gostaríamos de ressaltar que nossos entregadores não estão autorizados
          a realizar cobranças extras. <br /> <br />
          Lembre-se da importância de higienizar as mãos após o recebimento do
          pedido, garantindo assim sua segurança e bem-estar durante a refeição.{' '}
          <br />
          <br />
          Esperamos que desfrute de uma deliciosa e agradável experiência
          gastronômica. Bom apetite!
        </S.Text>
        <Button
          title="Clique aqui para voltar à Home"
          type="button"
          onClick={() => {
            navigate('/')
            dispatch(closeConfirmed())
            dispatch(closeDelivery())
            dispatch(closePayment())
            dispatch(clearCart())
            dispatch(clearDelivery())
            dispatch(clearPayment())
            dispatch(setFormCompletedPayment(false))
            dispatch(setFormCompletedDelivery(false))
          }}
        >
          Concluir
        </Button>
      </>
    )
  }

  return <h2>Carregando...</h2>
}

export default Confirmed
