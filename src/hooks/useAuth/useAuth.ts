import { useMemo, useCallback } from 'react'

import { ENDPOINT_SIGNIN, LOCATION_ROOT } from 'src/helpers'
import { useHistory, useStore, useRequest } from 'src/hooks'
import { UseAuth } from './useAuth.types'

const ACCESS_TOKEN = 'access-token'

const useAuth: UseAuth = () => {
  const history = useHistory()
  const [{ accessToken }, { setAcessToken, removeAcessToken }] = useStore((state) => state.user)
  const [authState, fetchAuth] = useRequest<string>({ url: ENDPOINT_SIGNIN, data: 'TOKEN' })

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

    history.push(LOCATION_ROOT, { from: history.location })
  }, [fetchAuth, setAcessToken, history])

  const signOut = useCallback(() => {
    localStorage.removeItem(ACCESS_TOKEN)
    removeAcessToken()
    history.push(ENDPOINT_SIGNIN, { from: history.location })
  }, [removeAcessToken, history])

  return useMemo(() => [
    { ...authState, accessToken: token },
    { signIn, signOut },
  ], [authState, signIn, signOut, token])
}

export { useAuth }
