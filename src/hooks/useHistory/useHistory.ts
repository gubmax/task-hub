import { useHistory as useRouterHistory } from 'react-router'

import { HistoryLocationState, HistoryPush } from './useHistory.types'

const useHistory = <LocationState = {}>() => {
  const history = useRouterHistory<HistoryLocationState<LocationState>>()
  const { push, location } = history

  return {
    ...history,
    push: push as HistoryPush<LocationState>,
    goBack: () => push(location.state?.from?.pathname || '/'),
  }
}

export { useHistory }
