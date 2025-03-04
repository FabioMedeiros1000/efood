import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface AuthState {
  token: string | null
  userId: string | null
}

const initialState: AuthState = {
  token: localStorage.getItem('authToken') || null,
  userId: localStorage.getItem('userId') || null
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload
      localStorage.setItem('authToken', action.payload)
    },
    removeToken: (state) => {
      state.token = null
      localStorage.removeItem('authToken')
    },
    setUserId: (state, action: PayloadAction<string>) => {
      state.userId = action.payload
      localStorage.setItem('userId', action.payload)
    },
    removeUserId: (state) => {
      state.userId = null
      localStorage.removeItem('userId')
    }
  }
})

export const { setToken, removeToken, setUserId, removeUserId } =
  authSlice.actions
export default authSlice.reducer
