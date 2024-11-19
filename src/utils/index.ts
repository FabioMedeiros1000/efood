import { DishProps } from '../components/DishesList'

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
