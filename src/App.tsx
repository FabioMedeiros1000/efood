import Footer from './components/Footer'
import Categoria from './pages/Categoria'
import Home from './pages/Home'
import EstiloGlobal from './styles'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const rotas = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/categoria',
    element: <Categoria />
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
