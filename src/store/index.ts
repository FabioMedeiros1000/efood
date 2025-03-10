import { combineReducers, configureStore } from '@reduxjs/toolkit'
import cartReducer from './reducers/cart'
import deliveryReducer from './reducers/delivery'
import paymentReducer from './reducers/payment'
import confirmedReducer from './reducers/confirmed'
import authReducer from './reducers/auth'

import restaurantApi from '../services/restaurantApi'
import authApi from '../services/authApi'
import isAuthenticateApi from '../services/isAuthenticateApi'
import cartApi from '../services/cartApi'

const rootReducer = combineReducers({
  cart: cartReducer,
  delivery: deliveryReducer,
  payment: paymentReducer,
  confirmed: confirmedReducer,
  auth: authReducer,
  [restaurantApi.reducerPath]: restaurantApi.reducer,
  [authApi.reducerPath]: authApi.reducer,
  [isAuthenticateApi.reducerPath]: isAuthenticateApi.reducer,
  [cartApi.reducerPath]: cartApi.reducer
})

export type RootState = ReturnType<typeof rootReducer>

export function configuraStore(preloadedState: Partial<RootState> = {}) {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(
        restaurantApi.middleware,
        authApi.middleware,
        isAuthenticateApi.middleware,
        cartApi.middleware
      ),
    preloadedState
  })
}

export type AppStore = ReturnType<typeof configuraStore>
export const store = configuraStore()
export type AppDispatch = typeof store.dispatch
