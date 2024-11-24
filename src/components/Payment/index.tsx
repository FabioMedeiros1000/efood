import React, { useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import InputMask from 'react-input-mask'

import Button from '../Button'
import Confirmed from '../Confirmed'

import { closePayment, updatePayment } from '../../store/reducers/payment'
import { openConfirmed } from '../../store/reducers/confirmed'
import { openDelivery } from '../../store/reducers/delivery'
import { convertToCurrency, TotalPrice } from '../../utils'
import { RootReducer } from '../../store'
import { usePurchaseMutation } from '../../services/api'

import * as S from '../Payment/styles'

const Payment = () => {
  const dispatch = useDispatch()
  const { items } = useSelector((state: RootReducer) => state.cart)
  const { payment } = useSelector((state: RootReducer) => state.payment)
  const delivery = useSelector((state: RootReducer) => state.delivery.delivery)

  const [purchase, { isSuccess, data, isLoading }] = usePurchaseMutation()

  const form = useFormik({
    initialValues: {
      name: payment.card.name,
      number: payment.card.number,
      code: payment.card.code,
      month: payment.card.expires.month,
      year: payment.card.expires.year
    },
    validationSchema: Yup.object({
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
    }),
    onSubmit: (values) => {
      purchase({
        products: items.map((item) => ({
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

  const handleBlurAndSave = useCallback(
    (e: React.FocusEvent<HTMLInputElement>) => {
      form.handleBlur(e)

      const { name, value } = e.target
      const parsedValue =
        name === 'code' || name === 'month' || name === 'year'
          ? Number(value)
          : value

      dispatch(
        updatePayment({
          card: {
            name: form.values.name,
            number: form.values.number,
            code: form.values.code,
            expires: {
              month: form.values.month,
              year: form.values.year
            },
            [name]: parsedValue
          }
        })
      )
    },
    [dispatch, form]
  )

  useEffect(() => {
    if (isSuccess) {
      dispatch(openConfirmed())
    }
  }, [isSuccess, dispatch])

  const checkInputHasError = (fieldname: string) => {
    return (
      form.errors[fieldname as keyof typeof form.errors] &&
      form.touched[fieldname as keyof typeof form.touched]
    )
  }

  return (
    <form onSubmit={form.handleSubmit}>
      {isSuccess && data ? (
        <Confirmed orderId={data.orderId} />
      ) : (
        <>
          <S.FormContainer>
            <S.Title>
              Pagamento - Valor a pagar {convertToCurrency(TotalPrice(items))}
            </S.Title>
            <S.Row>
              <S.InputGroup>
                <label>Nome do cartão</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={form.values.name}
                  onChange={form.handleChange}
                  onBlur={handleBlurAndSave}
                />
                <small>
                  {checkInputHasError('name') ? form.errors.name : ''}
                </small>
              </S.InputGroup>
            </S.Row>
            <S.Row>
              <S.InputGroup>
                <label>Número do cartão</label>
                <InputMask
                  mask="9999 9999 9999 9999"
                  type="text"
                  id="number"
                  name="number"
                  value={form.values.number}
                  onChange={form.handleChange}
                  onBlur={handleBlurAndSave}
                />
                <small>
                  {checkInputHasError('number') ? form.errors.number : ''}
                </small>
              </S.InputGroup>
              <S.InputGroup>
                <label>CVV</label>
                <input
                  type="text"
                  id="code"
                  name="code"
                  value={form.values.code}
                  onChange={form.handleChange}
                  onBlur={handleBlurAndSave}
                />
                <small>
                  {checkInputHasError('code') ? form.errors.code : ''}
                </small>
              </S.InputGroup>
            </S.Row>
            <S.Row>
              <S.InputGroup>
                <label>Mês de vencimento</label>
                <input
                  type="number"
                  id="month"
                  name="month"
                  min="1"
                  max="12"
                  value={form.values.month}
                  onChange={form.handleChange}
                  onBlur={handleBlurAndSave}
                />
                <small>
                  {checkInputHasError('month') ? form.errors.month : ''}
                </small>
              </S.InputGroup>
              <S.InputGroup>
                <label>
                  Ano de <br /> vencimento
                </label>
                <input
                  type="number"
                  id="year"
                  name="year"
                  min="1000"
                  max="9999"
                  value={form.values.year}
                  onChange={form.handleChange}
                  onBlur={handleBlurAndSave}
                />
                <small>
                  {checkInputHasError('year') ? form.errors.year : ''}
                </small>
              </S.InputGroup>
            </S.Row>
          </S.FormContainer>
          <Button
            marginBottom="8px"
            title="Clique aqui para finalizar o pagamento e fazer o seu pedido"
            disabled={isLoading}
            type="submit"
            onClick={() => {
              if (!form.isValid || !form.dirty) {
                form.setTouched({
                  name: true,
                  number: true,
                  code: true,
                  month: true,
                  year: true
                })
                form.validateForm()
              }
            }}
          >
            {isLoading ? 'Finalizando...' : 'Finalizar pagamento'}
          </Button>
          <Button
            title="Clique aqui para editar o endereço"
            type="button"
            onClick={() => {
              dispatch(closePayment())
              dispatch(openDelivery())
            }}
          >
            Voltar para a edição de endereço
          </Button>
        </>
      )}
    </form>
  )
}

export default Payment
