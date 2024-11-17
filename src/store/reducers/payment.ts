import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface PaymentType {
  payment: {
    card: {
      name: string
      number: string
      code: number
      expires: {
        month: number
        year: number
      }
    }
  }
}

interface PaymentState extends PaymentType {
  isOpen: boolean
  formCompleted: boolean
}

const initialState: PaymentState = {
  isOpen: false,
  formCompleted: false,
  payment: {
    card: {
      name: '',
      number: '',
      code: 0,
      expires: {
        month: 0,
        year: 0
      }
    }
  }
}

const paymentSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {
    openPayment: (state) => {
      state.isOpen = true
    },
    closePayment: (state) => {
      state.isOpen = false
    },
    updatePayment: (state, action: PayloadAction<PaymentType>) => {
      state.payment = action.payload.payment
    },
    setFormCompletedToTrue: (state) => {
      state.formCompleted = true
    },
    setFormCompletedToFalse: (state) => {
      state.formCompleted = false
    },
    clearPayment: (state) => {
      state.payment.card = {
        name: '',
        number: '',
        code: 0,
        expires: {
          month: 0,
          year: 0
        }
      }
    }
  }
})

export const {
  closePayment,
  openPayment,
  updatePayment,
  setFormCompletedToTrue,
  setFormCompletedToFalse,
  clearPayment
} = paymentSlice.actions
export default paymentSlice.reducer
