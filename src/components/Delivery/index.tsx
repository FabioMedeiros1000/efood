import { useDispatch, useSelector } from 'react-redux'
import { useFormik } from 'formik'
import * as Yup from 'yup'

import InputField from '../InputField'
import Button from '../Button'

import { RootState } from '../../store'
import { closeDelivery, updateDelivery } from '../../store/reducers/delivery'
import { openPayment } from '../../store/reducers/payment'
import { openCart } from '../../store/reducers/cart'

import { Title, BtnWrapper } from './styles'

const Delivery = () => {
  const dispatch = useDispatch()
  const { delivery: deliveryState } = useSelector(
    (state: RootState) => state.delivery
  )

  const validationSchema = Yup.object({
    receiver: Yup.string()
      .min(5, 'Este campo precisa ter no mínimo 5 caracteres')
      .required('Esse campo é obrigatório'),
    description: Yup.string().required('Esse campo é obrigatório'),
    city: Yup.string().required('Esse campo é obrigatório'),
    zipCode: Yup.string()
      .matches(/^\d{5}-\d{3}$/, 'CEP inválido')
      .required('Esse campo é obrigatório'),
    number: Yup.number().required('Esse campo é obrigatório'),
    complement: Yup.string()
  })

  const form = useFormik({
    initialValues: {
      receiver: deliveryState.receiver || '',
      description: deliveryState.address.description || '',
      city: deliveryState.address.city || '',
      zipCode: deliveryState.address.zipCode || '',
      number: deliveryState.address.number || 0,
      complement: deliveryState.address.complement || ''
    },
    validationSchema,
    onSubmit: () => {
      dispatch(
        updateDelivery({
          delivery: {
            receiver: form.values.receiver,
            address: {
              city: form.values.city,
              complement: form.values.complement,
              description: form.values.description,
              number: form.values.number,
              zipCode: form.values.zipCode
            }
          }
        })
      )
      dispatch(closeDelivery())
      dispatch(openPayment())
    }
  })

  const backToCart = () => {
    dispatch(closeDelivery())
    dispatch(openCart())
  }

  return (
    <form onSubmit={form.handleSubmit}>
      <Title>Entrega</Title>
      <InputField
        id="receiver"
        name="receiver"
        label="Quem irá receber"
        value={form.values.receiver}
        onChange={form.handleChange}
        onBlur={form.handleBlur}
        error={form.errors.receiver}
        touched={form.touched.receiver}
      />
      <InputField
        id="description"
        name="description"
        label="Endereço"
        value={form.values.description}
        onChange={form.handleChange}
        onBlur={form.handleBlur}
        error={form.errors.description}
        touched={form.touched.description}
      />
      <InputField
        id="city"
        name="city"
        label="Cidade"
        value={form.values.city}
        onChange={form.handleChange}
        onBlur={form.handleBlur}
        error={form.errors.city}
        touched={form.touched.city}
      />
      <div className="form-cols">
        <InputField
          id="zipCode"
          name="zipCode"
          label="CEP"
          value={form.values.zipCode}
          onChange={form.handleChange}
          onBlur={form.handleBlur}
          error={form.errors.zipCode}
          touched={form.touched.zipCode}
          mask="99999-999"
        />
        <InputField
          id="number"
          name="number"
          label="Número"
          value={form.values.number}
          onChange={form.handleChange}
          onBlur={form.handleBlur}
          error={form.errors.number}
          touched={form.touched.number}
          type="number"
        />
      </div>
      <InputField
        id="complement"
        name="complement"
        label="Complemento"
        value={form.values.complement}
        onChange={form.handleChange}
        onBlur={form.handleBlur}
        error={form.errors.complement}
        touched={form.touched.complement}
      />
      <BtnWrapper>
        <Button
          title="Clique aqui para inserir as informações de pagamento"
          marginBottom="8px"
          type="submit"
        >
          Continuar com o pagamento
        </Button>
        <Button
          title="Clique aqui para voltar ao carrinho"
          onClick={backToCart}
          type="button"
        >
          Voltar para o carrinho
        </Button>
      </BtnWrapper>
    </form>
  )
}

export default Delivery
