import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useState } from 'react'

interface AuthFormProps {
  initialValues: { username: string; password: string }
  onSubmit: (values: { username: string; password: string }) => Promise<void>
}

const validationSchema = Yup.object({
  username: Yup.string()
    .min(5, 'Este campo precisa ter 5 caracteres, no mínimo')
    .required('Este campo é obrigatório'),
  password: Yup.string()
    .min(6, 'A senha deve ter no mínimo 6 caracteres')
    .max(20, 'A senha deve ter no máximo 20 caracteres')
    .matches(/[a-z]/, 'A senha deve conter pelo menos uma letra minúscula')
    .matches(/[A-Z]/, 'A senha deve conter pelo menos uma letra maiúscula')
    .matches(/\d/, 'A senha deve conter pelo menos um número')
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      'A senha deve conter pelo menos um caractere especial'
    )
    .required('Este campo é obrigatório')
})

const useAuthForm = ({ initialValues, onSubmit }: AuthFormProps) => {
  const [isLoading, setIsLoading] = useState(false)

  const form = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      setIsLoading(true)
      try {
        await onSubmit(values)
        resetForm()
      } catch (error) {
        console.error('Erro:', error)
        alert('Ocorreu um erro. Tente novamente mais tarde.')
      } finally {
        setSubmitting(false)
        setIsLoading(false)
      }
    }
  })

  return { form, isLoading }
}

export default useAuthForm
