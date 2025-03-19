import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export interface CredentialsType {
  username: string
  password: string
}

interface SignupResponse {
  message: string
}

export interface LoginResponse {
  message: string
  token: string
  user: {
    id: string
    username: string
  }
}

const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://efood-backend.onrender.com/api/auth'
  }),
  endpoints: (builder) => ({
    signup: builder.mutation<SignupResponse, CredentialsType>({
      query: (body) => ({
        url: 'signup',
        method: 'POST',
        body
      })
    }),
    login: builder.mutation<LoginResponse, CredentialsType>({
      query: (body) => ({
        url: 'login',
        method: 'POST',
        body
      })
    })
  })
})

export default authApi
export const { useSignupMutation, useLoginMutation } = authApi
