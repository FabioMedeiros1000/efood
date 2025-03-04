import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { useMeQuery } from '../services/isAuthenticateApi'
import { RootState } from '../store'
import { removeToken, removeUserId } from '../store/reducers/auth'

const useAuth = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { data, isLoading, error } = useMeQuery()
  const { token } = useSelector((state: RootState) => state.auth)

  useEffect(() => {
    if (!token) {
      navigate('/login', { replace: true })
      return
    }

    if (!isLoading && (error || !data?.user.id)) {
      dispatch(removeToken())
      dispatch(removeUserId())
      navigate('/login', { replace: true })
    }
  }, [navigate, data?.user, isLoading, error, token, dispatch])
}

export default useAuth
