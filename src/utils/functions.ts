import { closeConfirmed } from '../store/reducers/confirmed'
import { clearDelivery, closeDelivery } from '../store/reducers/delivery'
import { clearPayment, closePayment } from '../store/reducers/payment'
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
    return (accumulator += Number(currentValue.preco))
  }, 0)
}

export const convertToCurrency = (price: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(price)
}

export const closeAndCleanAll = async (dispatch: AppDispatch) => {
  dispatch(closeConfirmed())
  dispatch(closeDelivery())
  dispatch(closePayment())
  dispatch(clearDelivery())
  dispatch(clearPayment())
}
