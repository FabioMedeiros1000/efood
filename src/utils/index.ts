import { PratoProps } from '../components/ListaDePratos'
import { FormikProps } from 'formik'
import { PaymentType } from '../store/reducers/payment'

export const TotalPrice = (items: PratoProps[]) => {
  return items.reduce((acumulador, valorAtual) => {
    return (acumulador += valorAtual.preco)
  }, 0)
}

export const convertToCurrency = (preco: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(preco)
}
