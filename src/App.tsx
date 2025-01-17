import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import { Provider } from 'react-redux'

import Restaurant from './pages/Restaurant'
import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'

import Footer from './components/Footer'

import { store } from './store'

import GlobalStyle from './styles'
import { useEffect } from 'react'

const rotas = createBrowserRouter([
  {
    path: '/',
    element: localStorage.getItem('authToken') ? (
      <Home />
    ) : (
      <Navigate to="/login" />
    )
  },
  {
    path: '/restaurante/:id',
    element: <Restaurant />
  },
  {
    path: '/cadastro',
    element: <Register />
  },
  {
    path: '/login',
    element: <Login />
  }
])

function App() {
  return (
    <Provider store={store}>
      <GlobalStyle />
      <RouterProvider router={rotas} />
      <Footer />
    </Provider>
  )
}

export default App
