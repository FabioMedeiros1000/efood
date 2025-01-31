import { closeConfirmed } from '../store/reducers/confirmed'
import {
  clearDelivery,
  closeDelivery,
  setFormCompleted as setFormCompletedDelivery
} from '../store/reducers/delivery'
import {
  clearPayment,
  closePayment,
  setFormCompleted as setFormCompletedPayment
} from '../store/reducers/payment'
import { clearCart } from '../store/reducers/cart'
import { AppDispatch } from '../store'

export const getTags = (item: RestaurantProps) => {
  const tags = []

  if (item.destacado) {
    tags.push('Destaque da semana')
  }
  tags.push(item.tipo)

  return tags
}

export const TotalPrice = (items: DishProps[]) => {
  return items.reduce((accumulator, currentValue) => {
    return (accumulator += currentValue.preco)
  }, 0)
}

export const convertToCurrency = (price: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(price)
}

export const closeAndCleanAll = (dispatch: AppDispatch) => {
  dispatch(closeConfirmed())
  dispatch(closeDelivery())
  dispatch(closePayment())
  dispatch(clearCart())
  dispatch(clearDelivery())
  dispatch(clearPayment())
  dispatch(setFormCompletedPayment(false))
  dispatch(setFormCompletedDelivery(false))
}
