import { useNavigate } from 'react-router-dom'
import ButtonSidebar from '../ButtonSidebar'
import { Title, Text } from './styles'
import { useDispatch } from 'react-redux'

import { closeDelivery } from '../../store/reducers/delivery'
import { closePayment } from '../../store/reducers/payment'
import { clearCart } from '../../store/reducers/cart'
import { clearDelivery } from '../../store/reducers/delivery'
import { clearPayment } from '../../store/reducers/payment'

import { PurchaseResponse } from '../../services/api'
import { closeConfirmed } from '../../store/reducers/confirmed'

const Confirmed = (data: PurchaseResponse) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  if (data.orderId) {
    return (
      <>
        <Title>Pedido realizado - {data.orderId}</Title>
        <Text>
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
        </Text>
        <ButtonSidebar
          type="button"
          onClick={() => {
            navigate('/')
            dispatch(closeConfirmed())
            dispatch(closeDelivery())
            dispatch(closePayment())
            dispatch(clearCart())
            dispatch(clearDelivery())
            dispatch(clearPayment())
          }}
        >
          Concluir
        </ButtonSidebar>
      </>
    )
  }

  return <h2>Carregando...</h2>
}

export default Confirmed
