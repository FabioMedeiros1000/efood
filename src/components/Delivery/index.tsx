import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useFormik } from 'formik'
import InputMask from 'react-input-mask'
import * as Yup from 'yup'

import Button from '../Button'
import { FormContainer, InputGroup, Row, Title } from './styles'

import { openCart } from '../../store/reducers/cart'
import { closeDelivery, updateDelivery } from '../../store/reducers/delivery'
import { openPayment } from '../../store/reducers/payment'
import { RootReducer } from '../../store'

const Delivery = () => {
  const dispatch = useDispatch()

  const { delivery: deliveryState } = useSelector(
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
    validateOnBlur: true,
    validateOnChange: true,
    onSubmit: () => {
      // Intencionalmente vazio, pois a ação de submit é gerenciada manualmente
    }
  })

  const handleBlurAndSave = useCallback(
    (e: React.FocusEvent<HTMLInputElement>) => {
      form.handleBlur(e)

      const { name, value } = e.target

      dispatch(
        updateDelivery({
          delivery: {
            ...form.values,
            address: {
              city: form.values.city,
              complement: form.values.complement,
              description: form.values.description,
              number: form.values.number,
              zipCode: form.values.zipCode,
              [name]: value
            }
          }
        })
      )
    },
    [dispatch, form]
  )

  const handleValidateAndProceed = () => {
    form.setTouched({
      receiver: true,
      description: true,
      city: true,
      zipCode: true,
      number: true,
      complement: true
    })

    form.validateForm().then((errors) => {
      if (Object.keys(errors).length === 0) {
        dispatch(closeDelivery())
        dispatch(openPayment())
      }
    })
  }

  console.log(form)

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
              {form.touched.receiver && form.errors.receiver
                ? form.errors.receiver
                : ''}
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
              {form.touched.description && form.errors.description
                ? form.errors.description
                : ''}
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
            <small>
              {form.touched.city && form.errors.city ? form.errors.city : ''}
            </small>
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
              {form.touched.zipCode && form.errors.zipCode
                ? form.errors.zipCode
                : ''}
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
              {form.touched.number && form.errors.number
                ? form.errors.number
                : ''}
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
              {form.touched.complement && form.errors.complement
                ? form.errors.complement
                : ''}
            </small>
          </InputGroup>
        </Row>
      </FormContainer>
      <Button
        marginBottom="8px"
        title="Clique aqui para fornecer informações de pagamento"
        type="button"
        onClick={handleValidateAndProceed}
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
