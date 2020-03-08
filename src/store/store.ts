import { createStore } from './createStore'
import { actions } from './actions'
import { initialState } from './state'

const useStore = createStore(initialState, actions)

export { useStore }
