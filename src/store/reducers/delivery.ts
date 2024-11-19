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
  isformCompleted: boolean
}

const initialState: DeliveryState = {
  isOpen: false,
  isformCompleted: false,
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

      const isReceiverCompleted =
        state.delivery.receiver !== initialState.delivery.receiver
      const isCityCompleted =
        state.delivery.address.city !== initialState.delivery.address.city
      const isDescriptionCompleted =
        state.delivery.address.description !==
        initialState.delivery.address.description
      const isZipCodeCompleted =
        state.delivery.address.zipCode !== initialState.delivery.address.zipCode

      state.isformCompleted =
        isReceiverCompleted &&
        isCityCompleted &&
        isDescriptionCompleted &&
        isZipCodeCompleted
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
      state.isformCompleted = false
    },
    setFormCompleted: (state, action: PayloadAction<boolean>) => {
      state.isformCompleted = action.payload
    }
  }
})

export const {
  closeDelivery,
  openDelivery,
  updateDelivery,
  clearDelivery,
  setFormCompleted
} = deliverySlice.actions
export default deliverySlice.reducer
