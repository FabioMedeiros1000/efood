import Footer from './components/Footer'
import Restaurante from './pages/Restaurante'
import Home from './pages/Home'
import EstiloGlobal from './styles'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'

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
    <>
      <EstiloGlobal />
      <RouterProvider router={rotas} />
      <Footer />
    </>
  )
}

export default App
