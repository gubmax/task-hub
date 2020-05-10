import { ReducerStateType } from 'src/hooks/useRequest/useRequest.types'

export type UseAuth = () => [
  ReducerStateType & { accessToken: string | null },
  {
    signIn: () => Promise<void>,
    signOut: () => void,
  },
]
