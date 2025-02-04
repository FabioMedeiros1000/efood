import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState: PaymentState = {
  isOpen: false,
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
    clearPayment(state) {
      state.payment = initialState.payment
    }
  }
})

export const { openPayment, closePayment, updatePayment, clearPayment } =
  paymentSlice.actions
export default paymentSlice.reducer
