import Footer from './components/Footer'
import Restaurante from './pages/Restaurante'
import Home from './pages/Home'
import EstiloGlobal from './styles'

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
    element: <Restaurante />
  }
])

function App() {
  return (
    <Provider store={store}>
      <EstiloGlobal />
      <RouterProvider router={rotas} />
      <Footer />
    </Provider>
  )
}

export default App
