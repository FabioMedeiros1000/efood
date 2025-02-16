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
    return (accumulator += currentValue.preco)
  }, 0)
}

export const convertToCurrency = (price: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(price)
}

const linkReal = 'https://efood-backend.onrender.com'
const linkLocal = 'http://localhost:5000'

export const closeAndCleanAll = async (dispatch: AppDispatch) => {
  try {
    const response = await fetch(`${linkLocal}/api/cart`, {
      method: 'DELETE'
    })

    if (!response.ok) {
      throw new Error('Erro ao limpar o carrinho')
    }

    dispatch(closeConfirmed())
    dispatch(closeDelivery())
    dispatch(closePayment())
    dispatch(clearDelivery())
    dispatch(clearPayment())
  } catch (error: any) {
    console.error('Erro ao limpar o carrinho:', error.message)
  }
}
