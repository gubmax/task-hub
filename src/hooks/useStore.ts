import { createStore, initialState, actions } from 'src/store'

const useStore = createStore(initialState, actions)

export { useStore }
