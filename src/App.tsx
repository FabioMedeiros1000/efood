import Footer from './components/Footer'
import Restaurant from './pages/Restaurant'
import Home from './pages/Home'
import GlobalStyle from './styles'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'

import { store } from './store'

const rotas = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/restaurante/:id',
    element: <Restaurant />
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
