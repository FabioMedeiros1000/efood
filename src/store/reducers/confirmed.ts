import { createSlice } from '@reduxjs/toolkit'

type ConfirmedState = {
  isOpen: boolean
}

const initialState: ConfirmedState = {
  isOpen: false
}

const confirmedSlice = createSlice({
  initialState,
  name: 'confirmed',
  reducers: {
    openConfirmed: (state) => {
      state.isOpen = true
    },
    closeConfirmed: (state) => {
      state.isOpen = false
    }
  }
})

export const { closeConfirmed, openConfirmed } = confirmedSlice.actions
export default confirmedSlice.reducer
