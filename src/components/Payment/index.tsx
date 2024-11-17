import React, { useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import InputMask from 'react-input-mask'

import ButtonSidebar from '../ButtonSidebar'
import { FormContainer, InputGroup, Row, Title } from '../Payment/styles'
import { closePayment, updatePayment } from '../../store/reducers/payment'
import { openConfirmed } from '../../store/reducers/confirmed'
import { openDelivery } from '../../store/reducers/delivery'
import { convertToCurrency, TotalPrice } from '../../utils'
import { RootReducer } from '../../store'
import { usePurchaseMutation } from '../../services/api'
import Confirmed from '../Confirmed'

const Payment = () => {
  const dispatch = useDispatch()
  const { items } = useSelector((state: RootReducer) => state.cart)
  const { payment } = useSelector((state: RootReducer) => state.payment)
  const delivery = useSelector((state: RootReducer) => state.delivery.delivery)

  const [purchase, { isSuccess, data }] = usePurchaseMutation()

  const formik = useFormik({
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
        .matches(/^\d{4} \d{4} \d{4} \d{4}$/, 'Número de cartão inválido') // Aceita formato com espaços
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
      formik.handleBlur(e)

      const { name, value } = e.target
      const parsedValue =
        name === 'code' || name === 'month' || name === 'year'
          ? Number(value)
          : value

      // Atualiza apenas se o valor realmente mudou para evitar renderizações desnecessárias
      if (formik.values[name as keyof typeof formik.values] !== parsedValue) {
        dispatch(
          updatePayment({
            card: {
              name: formik.values.name,
              number: formik.values.number,
              code: formik.values.code,
              expires: {
                month: formik.values.month,
                year: formik.values.year
              },
              [name]: parsedValue
            }
          })
        )
      }
    },
    [dispatch, formik]
  )

  useEffect(() => {
    if (isSuccess) {
      dispatch(openConfirmed())
    }
  }, [isSuccess, dispatch])

  const checkInputHasError = (fieldname: string) => {
    return (
      formik.errors[fieldname as keyof typeof formik.errors] &&
      formik.touched[fieldname as keyof typeof formik.touched]
    )
  }

  return (
    <form onSubmit={formik.handleSubmit}>
      {isSuccess && data ? (
        <Confirmed orderId={data.orderId} />
      ) : (
        <>
          <FormContainer>
            <Title>
              Pagamento - Valor a pagar {convertToCurrency(TotalPrice(items))}
            </Title>
            <Row>
              <InputGroup>
                <label>Nome do cartão</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={handleBlurAndSave}
                />
                <small>
                  {checkInputHasError('name') ? formik.errors.name : ''}
                </small>
              </InputGroup>
            </Row>
            <Row>
              <InputGroup>
                <label>Número do cartão</label>
                <InputMask
                  mask="9999 9999 9999 9999"
                  type="text"
                  id="number"
                  name="number"
                  value={formik.values.number}
                  onChange={formik.handleChange}
                  onBlur={handleBlurAndSave}
                />
                <small>
                  {checkInputHasError('number') ? formik.errors.number : ''}
                </small>
              </InputGroup>
              <InputGroup>
                <label>CVV</label>
                <input
                  type="text"
                  id="code"
                  name="code"
                  value={formik.values.code}
                  onChange={formik.handleChange}
                  onBlur={handleBlurAndSave}
                />
                <small>
                  {checkInputHasError('code') ? formik.errors.code : ''}
                </small>
              </InputGroup>
            </Row>
            <Row>
              <InputGroup>
                <label>Mês de vencimento</label>
                <input
                  type="number"
                  id="month"
                  name="month"
                  min="1"
                  max="12"
                  value={formik.values.month}
                  onChange={formik.handleChange}
                  onBlur={handleBlurAndSave}
                />
                <small>
                  {checkInputHasError('month') ? formik.errors.month : ''}
                </small>
              </InputGroup>
              <InputGroup>
                <label>
                  Ano de <br /> vencimento
                </label>
                <input
                  type="number"
                  id="year"
                  name="year"
                  min="1000"
                  max="9999"
                  value={formik.values.year}
                  onChange={formik.handleChange}
                  onBlur={handleBlurAndSave}
                />
                <small>
                  {checkInputHasError('year') ? formik.errors.year : ''}
                </small>
              </InputGroup>
            </Row>
          </FormContainer>
          <ButtonSidebar type="submit">Finalizar pagamento</ButtonSidebar>
          <ButtonSidebar
            type="button"
            onClick={() => {
              dispatch(closePayment())
              dispatch(openDelivery())
            }}
          >
            Voltar para a edição de endereço
          </ButtonSidebar>
        </>
      )}
    </form>
  )
}

export default Payment
