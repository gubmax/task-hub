import { Location } from 'history'

export type HistoryLocationState<LocationState = {}> = LocationState & { from: Location }

export type HistoryPush<LocationState> = (
  path: string, state: HistoryLocationState<LocationState>,
) => void
