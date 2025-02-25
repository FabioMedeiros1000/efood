import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useFormik } from 'formik'
import * as Yup from 'yup'

import Button from '../Button'
import Confirmed from '../Confirmed'
import InputField from '../InputField'

import { closePayment } from '../../store/reducers/payment'
import { openConfirmed } from '../../store/reducers/confirmed'
import { openDelivery } from '../../store/reducers/delivery'
import { convertToCurrency, TotalPrice } from '../../utils/functions'
import { usePurchaseMutation } from '../../services/restaurantApi'
import { useCart } from '../../hooks/useCart'
import { RootState } from '../../store'

import * as S from '../Payment/styles'

const Payment = () => {
  const dispatch = useDispatch()
  const { cartItems } = useCart()

  const { delivery } = useSelector((state: RootState) => state.delivery)
  const { payment } = useSelector((state: RootState) => state.payment)

  const [purchase, { isSuccess, data, isLoading }] = usePurchaseMutation()

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(5, 'Esse campo deve ter pelo menos 5 caracteres')
      .required('Esse campo é obrigatório'),
    number: Yup.string()
      .matches(/^\d{4} \d{4} \d{4} \d{4}$/, 'Número de cartão inválido')
      .required('Esse campo é obrigatório'),
    code: Yup.string()
      .matches(/^\d{3,4}$/, 'CVV inválido')
      .required('Esse campo é obrigatório'),
    month: Yup.number()
      .min(1, 'Digite um mês válido')
      .max(12, 'Digite um mês válido')
      .required('Esse campo é obrigatório'),
    year: Yup.number()
      .min(1000, 'Esse campo precisa ter 4 dígitos')
      .max(9999, 'Esse campo precisa ter 4 dígitos')
      .required('Esse campo é obrigatório')
  })

  const form = useFormik({
    initialValues: {
      name: payment.card.name,
      number: payment.card.number,
      code: payment.card.code,
      month: payment.card.expires.month,
      year: payment.card.expires.year
    },
    validationSchema,
    onSubmit: (values) => {
      purchase({
        products: cartItems.map((item) => ({
          id: item.id,
          price: item.preco
        })),
        delivery: {
          receiver: delivery.receiver,
          address: {
            city: delivery.address.city,
            complement: delivery.address.complement,
            description: delivery.address.description,
            number: delivery.address.number,
            zipCode: delivery.address.zipCode
          }
        },
        payment: {
          card: {
            code: Number(values.code),
            name: values.name,
            number: values.number,
            expires: {
              month: values.month,
              year: values.year
            }
          }
        }
      })
    }
  })

  useEffect(() => {
    if (isSuccess) {
      dispatch(openConfirmed())
    }
  }, [isSuccess, dispatch])

  const backToDelivery = () => {
    dispatch(closePayment())
    dispatch(openDelivery())
  }

  return (
    <form onSubmit={form.handleSubmit}>
      {isSuccess && data ? (
        <Confirmed orderId={data.orderId} />
      ) : (
        <>
          <S.FormContainer>
            <S.Title>
              Pagamento - Valor a pagar{' '}
              {convertToCurrency(TotalPrice(cartItems))}
            </S.Title>
            <InputField
              id="name"
              name="name"
              label="Nome do cartão"
              value={form.values.name}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              error={form.errors.name}
              touched={form.touched.name}
            />
            <div className="form-cols">
              <InputField
                id="number"
                name="number"
                label="Número do cartão"
                mask="9999 9999 9999 9999"
                value={form.values.number}
                onChange={form.handleChange}
                onBlur={form.handleBlur}
                error={form.errors.number}
                touched={form.touched.number}
              />
              <InputField
                id="code"
                name="code"
                label="CVV"
                value={form.values.code}
                onChange={form.handleChange}
                onBlur={form.handleBlur}
                error={form.errors.code}
                touched={form.touched.code}
              />
            </div>
            <div className="form-cols">
              <InputField
                id="month"
                name="month"
                label="Mês de vencimento"
                type="number"
                value={form.values.month}
                onChange={form.handleChange}
                onBlur={form.handleBlur}
                error={form.errors.month}
                touched={form.touched.month}
              />
              <InputField
                id="year"
                name="year"
                label="Ano de vencimento"
                type="number"
                value={form.values.year}
                onChange={form.handleChange}
                onBlur={form.handleBlur}
                error={form.errors.year}
                touched={form.touched.year}
              />
            </div>
          </S.FormContainer>
          <Button
            marginBottom="8px"
            title="Clique aqui para finalizar o pagamento e fazer o seu pedido"
            disabled={isLoading}
            type="submit"
          >
            {isLoading ? 'Finalizando...' : 'Finalizar pagamento'}
          </Button>
          <Button
            title="Clique aqui para editar o endereço"
            type="button"
            onClick={backToDelivery}
          >
            Voltar para a edição de endereço
          </Button>
        </>
      )}
    </form>
  )
}

export default Payment
