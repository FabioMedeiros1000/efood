import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RootState } from '../store'

interface Response {
  message: string
  user: {
    id: string
    username: string
  }
}

const isAuthenticateApi = createApi({
  reducerPath: 'isAuthenticateApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://efood-backend.onrender.com/api/user',
    prepareHeaders: (headers, { getState }) => {
      const state = getState() as RootState
      const token = state.auth.token

      if (token) {
        headers.set('Authorization', `Bearer ${token}`)
      }

      headers.set('Content-Type', 'application/json')

      return headers
    }
  }),
  endpoints: (builder) => ({
    me: builder.query<Response, void>({
      query: () => 'me'
    })
  })
})

export default isAuthenticateApi
export const { useMeQuery } = isAuthenticateApi
