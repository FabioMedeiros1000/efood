import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState: DeliveryState = {
  isOpen: false,
  delivery: {
    receiver: '',
    address: {
      city: '',
      complement: '',
      description: '',
      number: 0,
      zipCode: ''
    }
  }
}

const deliverySlice = createSlice({
  name: 'delivery',
  initialState,
  reducers: {
    openDelivery: (state) => {
      state.isOpen = true
    },
    closeDelivery: (state) => {
      state.isOpen = false
    },
    updateDelivery: (state, action: PayloadAction<DeliveryType>) => {
      state.delivery = action.payload.delivery
    },
    clearDelivery: (state) => {
      state.delivery.receiver = ''
      state.delivery.address = {
        city: '',
        complement: '',
        description: '',
        number: 0,
        zipCode: ''
      }
    }
  }
})

export const { closeDelivery, openDelivery, updateDelivery, clearDelivery } =
  deliverySlice.actions
export default deliverySlice.reducer
