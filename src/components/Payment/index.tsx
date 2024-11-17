import ButtonSidebar from '../ButtonSidebar'
import { FormContainer, InputGroup, Row, Title } from '../Payment/styles'

import { useDispatch, useSelector } from 'react-redux'

import { closePayment, updatePayment } from '../../store/reducers/payment'
import { openConfirmed } from '../../store/reducers/confirmed'
import { openDelivery } from '../../store/reducers/delivery'
import { convertToCurrency, TotalPrice } from '../../utils'
import { RootReducer } from '../../store'
import { useFormik } from 'formik'

import * as Yup from 'yup'
import { usePurchaseMutation } from '../../services/api'
import Confirmed from '../Confirmed'
import { useEffect } from 'react'
import InputMask from 'react-input-mask'

const Payment = () => {
  const dispatch = useDispatch()
  const { items } = useSelector((state: RootReducer) => state.cart)
  const { payment } = useSelector((state: RootReducer) => state.payment)
  const { delivery } = useSelector((state: RootReducer) => state.delivery)

  const [purchase, { isSuccess, data }] = usePurchaseMutation()

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
        .min(19, 'Esse cartão não existe')
        .max(19, 'Esse cartão não existe')
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
            code: Number(payment.card.code),
            name: payment.card.name,
            number: payment.card.number,
            expires: {
              month: payment.card.expires.month,
              year: payment.card.expires.year
            }
          }
        }
      })
    }
  })

  console.log(form)

  const checkInputHasError = (fieldname: string) => {
    const isInvalid = fieldname in form.errors
    const isTouched = fieldname in form.touched

    return isInvalid && isTouched
  }

  const handleBlurAndSave = (e: React.FocusEvent<HTMLInputElement>) => {
    form.handleBlur(e)

    const { name, value, type } = e.target
    const parsedValue = type === 'number' ? Number(value) : value

    dispatch(
      updatePayment({
        payment: {
          card: {
            code: form.values.code,
            name: form.values.name,
            number: form.values.number,
            expires: {
              month: form.values.month,
              year: form.values.year
            },
            [name]: parsedValue
          }
        }
      })
    )
  }

  useEffect(() => {
    if (isSuccess) {
      dispatch(openConfirmed())
    }
  }, [isSuccess, dispatch])

  return (
    <form onSubmit={form.handleSubmit}>
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
                  value={form.values.name}
                  onChange={form.handleChange}
                  onBlur={handleBlurAndSave}
                />
                <small>
                  {checkInputHasError('name') ? form.errors.name : ''}
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
                  value={form.values.number}
                  onChange={form.handleChange}
                  onBlur={handleBlurAndSave}
                />
                <small>
                  {checkInputHasError('number') ? form.errors.number : ''}
                </small>
              </InputGroup>
              <InputGroup>
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
                  value={form.values.month}
                  onChange={form.handleChange}
                  onBlur={handleBlurAndSave}
                />
                <small>
                  {checkInputHasError('month') ? form.errors.month : ''}
                </small>
              </InputGroup>
              <InputGroup>
                <label>
                  Ano de <br /> vencimento
                </label>
                <InputMask
                  mask="9999"
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
              </InputGroup>
            </Row>
          </FormContainer>
          <ButtonSidebar type="submit" onClick={form.handleSubmit}>
            Finalizar pagamento
          </ButtonSidebar>
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
