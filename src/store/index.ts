import { combineReducers, configureStore } from '@reduxjs/toolkit'

import cartReducer from './reducers/cart'
import deliveryReducer from './reducers/delivery'
import paymentReducer from './reducers/payment'
import confirmedReducer from './reducers/confirmed'

import restaurantApi from '../services/restaurantApi'

const rootReducer = combineReducers({
  cart: cartReducer,
  delivery: deliveryReducer,
  payment: paymentReducer,
  confirmed: confirmedReducer,
  [restaurantApi.reducerPath]: restaurantApi.reducer
})

export function configuraStore(preloadedState: Partial<RootState> = {}) {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(restaurantApi.middleware),
    preloadedState
  })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof configuraStore>

export const store = configuraStore()
export type AppDispatch = typeof store.dispatch
