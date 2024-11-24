import { configureStore } from '@reduxjs/toolkit'

import cartReducer from './reducers/cart'
import deliveryReducer from './reducers/delivery'
import paymentReducer from './reducers/payment'
import confirmedReducer from './reducers/confirmed'

import api from '../services/api'

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    delivery: deliveryReducer,
    payment: paymentReducer,
    confirmed: confirmedReducer,
    [api.reducerPath]: api.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware)
})

export type RootReducer = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
