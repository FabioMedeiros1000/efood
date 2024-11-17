import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface CardDetails {
  name: string
  number: string
  code: number
  expires: {
    month: number
    year: number
  }
}

export interface PaymentType {
  card: CardDetails
}

export interface PaymentState {
  isOpen: boolean
  formCompleted: boolean
  payment: PaymentType
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
    openPayment(state) {
      state.isOpen = true
    },
    closePayment(state) {
      state.isOpen = false
    },
    updatePayment(state, action: PayloadAction<PaymentType>) {
      state.payment = action.payload
    },
    setFormCompleted(state, action: PayloadAction<boolean>) {
      state.formCompleted = action.payload
    },
    clearPayment(state) {
      state.payment = initialState.payment
    }
  }
})

export const {
  openPayment,
  closePayment,
  updatePayment,
  setFormCompleted,
  clearPayment
} = paymentSlice.actions
export default paymentSlice.reducer
