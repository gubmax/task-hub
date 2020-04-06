import { useMemo, useCallback } from 'react'
import { useHistory } from "react-router-dom"

import { useRequest, } from 'src/hooks'
import { useStore } from 'src/store'
import { UseAuth } from './useAuth.interface'

const ACCESS_TOKEN = 'access-token'

const useAuth: UseAuth = () => {
  const history = useHistory()
  const [{ accessToken }, { setAcessToken, removeAcessToken }] = useStore((state) => state.user)
  const [authState, fetchAuth] = useRequest<string>({ url: 'sign-in', data: 'TOKEN' })

  const token = useMemo(() => (
    accessToken || localStorage.getItem(ACCESS_TOKEN)
  ), [accessToken])

  const signIn = useCallback(async () => {
    const res = await fetchAuth()

    if (typeof res !== 'string') {
      return
    }

    localStorage.setItem(ACCESS_TOKEN, JSON.stringify(res))
    setAcessToken(res)

    if (history.action === 'PUSH') {
      history.goBack()
      return
    }
    
    history.push('/')
  }, [fetchAuth, setAcessToken, history])

  const signOut = useCallback(() => {
    localStorage.removeItem(ACCESS_TOKEN)
    removeAcessToken()
    history.push( '/sign-in')
  }, [removeAcessToken, history])

  return useMemo(() => [
    { ...authState, accessToken: token },
    { signIn, signOut },
  ], [authState, signIn, signOut, token])
}

export { useAuth }
