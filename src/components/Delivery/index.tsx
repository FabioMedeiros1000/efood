import Button from '../Button'
import { FormContainer, InputGroup, Row, Title } from './styles'

import { openCart } from '../../store/reducers/cart'
import { closeDelivery, updateDelivery } from '../../store/reducers/delivery'
import { openPayment } from '../../store/reducers/payment'

import { useDispatch, useSelector } from 'react-redux'
import { useFormik } from 'formik'

import * as Yup from 'yup'
import { RootReducer } from '../../store'
import InputMask from 'react-input-mask'
import { useCallback } from 'react'

const Delivery = () => {
  const dispatch = useDispatch()

  const { delivery: deliveryState, isformCompleted } = useSelector(
    (state: RootReducer) => state.delivery
  )

  const form = useFormik({
    initialValues: {
      receiver: deliveryState.receiver || '',
      description: deliveryState.address.description || '',
      city: deliveryState.address.city || '',
      zipCode: deliveryState.address.zipCode || '',
      number: deliveryState.address.number || 0,
      complement: deliveryState.address.complement || ''
    },
    validationSchema: Yup.object({
      receiver: Yup.string()
        .min(5, 'Este campo precisa ter no mínimo 5 caracteres')
        .required('Esse campo é obrigatório'),
      description: Yup.string().required('Esse campo é obrigatório'),
      city: Yup.string().required('Esse campo é obrigatório'),
      zipCode: Yup.string()
        .matches(/^\d{5}-\d{3}$/, 'CEP inválido')
        .required('Esse campo é obrigatório'),
      number: Yup.number().required('Esse campo é obrigatório')
    }),
    onSubmit: (values, { setSubmitting }) => {
      setSubmitting(false)
    }
  })

  console.log(form)

  const checkInputHasError = (fieldname: string) => {
    const isInvalid = fieldname in form.errors
    const isTouched = fieldname in form.touched

    return isInvalid && isTouched
  }

  const handleBlurAndSave = useCallback(
    (e: React.FocusEvent<HTMLInputElement>) => {
      form.handleBlur(e)

      const { name, value } = e.target
      const unmaskedValue = name === 'zipCode' ? value.replace('-', '') : value

      dispatch(
        updateDelivery({
          delivery: {
            receiver: form.values.receiver,
            address: {
              city: form.values.city,
              complement: form.values.complement,
              description: form.values.description,
              number: form.values.number,
              zipCode: name === 'zipCode' ? unmaskedValue : form.values.zipCode
            },
            [name]: unmaskedValue
          }
        })
      )
    },
    [dispatch, form]
  )

  const touchInputsFormAndValidate = () => {
    form.setTouched({
      city: true,
      complement: true,
      description: true,
      number: true,
      receiver: true,
      zipCode: true
    })

    form.validateForm()
  }

  return (
    <form>
      <FormContainer>
        <Title>Entrega</Title>
        <Row>
          <InputGroup>
            <label htmlFor="receiver">Quem irá receber</label>
            <input
              type="text"
              id="receiver"
              name="receiver"
              value={form.values.receiver}
              onChange={form.handleChange}
              onBlur={handleBlurAndSave}
            />
            <small>
              {checkInputHasError('receiver') ? form.errors.receiver : ''}
            </small>
          </InputGroup>
        </Row>
        <Row>
          <InputGroup>
            <label htmlFor="description">Endereço</label>
            <input
              type="text"
              id="description"
              name="description"
              value={form.values.description}
              onChange={form.handleChange}
              onBlur={handleBlurAndSave}
            />
            <small>
              {checkInputHasError('description') ? form.errors.description : ''}
            </small>
          </InputGroup>
        </Row>
        <Row>
          <InputGroup>
            <label htmlFor="city">Cidade</label>
            <input
              type="text"
              id="city"
              name="city"
              value={form.values.city}
              onChange={form.handleChange}
              onBlur={handleBlurAndSave}
            />
            <small>{checkInputHasError('city') ? form.errors.city : ''}</small>
          </InputGroup>
        </Row>
        <Row>
          <InputGroup>
            <label htmlFor="zipCode">CEP</label>
            <InputMask
              mask="99999-999"
              type="text"
              id="zipCode"
              name="zipCode"
              value={form.values.zipCode}
              onChange={form.handleChange}
              onBlur={handleBlurAndSave}
            />
            <small>
              {checkInputHasError('zipCode') ? form.errors.zipCode : ''}
            </small>
          </InputGroup>
          <InputGroup>
            <label htmlFor="number">Número</label>
            <input
              type="number"
              id="number"
              name="number"
              min="0"
              value={form.values.number}
              onChange={form.handleChange}
              onBlur={handleBlurAndSave}
            />
            <small>
              {checkInputHasError('number') ? form.errors.number : ''}
            </small>
          </InputGroup>
        </Row>
        <Row>
          <InputGroup>
            <label htmlFor="complement">Complemento (opcional)</label>
            <input
              type="text"
              id="complement"
              name="complement"
              value={form.values.complement}
              onChange={form.handleChange}
              onBlur={handleBlurAndSave}
            />
            <small>
              {checkInputHasError('complement') ? form.errors.complement : ''}
            </small>
          </InputGroup>
        </Row>
      </FormContainer>
      <Button
        marginBottom="8px"
        title="Clique aqui para fornecer informações de pagamento"
        type="button"
        onClick={() => {
          if (isformCompleted && form.isValid) {
            dispatch(closeDelivery())
            dispatch(openPayment())
          } else {
            touchInputsFormAndValidate()
          }
        }}
      >
        Continuar com o pagamento
      </Button>
      <Button
        title="Clique aqui para voltar ao carrinho e editar itens"
        type="button"
        onClick={() => {
          dispatch(closeDelivery())
          dispatch(openCart())
        }}
      >
        Voltar para o carrinho
      </Button>
    </form>
  )
}

export default Delivery
