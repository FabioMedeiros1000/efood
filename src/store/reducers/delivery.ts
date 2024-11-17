import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface DeliveryType {
  delivery: {
    receiver: string
    address: {
      city: string
      complement: string
      description: string
      number: number
      zipCode: string
    }
  }
}

interface DeliveryState extends DeliveryType {
  isOpen: boolean
  formCompleted: boolean
}

const initialState: DeliveryState = {
  isOpen: false,
  formCompleted: false,
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
    setFormCompletedToTrue: (state) => {
      state.formCompleted = true
    },
    setFormCompletedToFalse: (state) => {
      state.formCompleted = false
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

export const {
  closeDelivery,
  openDelivery,
  updateDelivery,
  setFormCompletedToTrue,
  setFormCompletedToFalse,
  clearDelivery
} = deliverySlice.actions
export default deliverySlice.reducer
