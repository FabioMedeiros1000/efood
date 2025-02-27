import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const useAuth = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('authToken')

    if (!token) {
      navigate('/login', { replace: true })
      return
    }

    fetch('https://efood-backend.onrender.com/api/me', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
      .then((response) => response.json())
      .then((data) => {
        if (!data?.user) {
          localStorage.removeItem('authToken')
          navigate('/login', { replace: true })
        }
      })
  }, [navigate])
}

export default useAuth
