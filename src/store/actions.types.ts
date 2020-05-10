import { TTheme, TState } from './state.types'
import { Actions } from './store.types'

export type ActionList = {
  setThemeMode: (payload: TTheme) => void,
  setThemeBySystem: (payload: boolean) => void,
  setAcessToken: (payload: string) => void,
  removeAcessToken: () => void,
  toggleSidebar: () => void,
  setSearching: (payload: boolean) => void,
}

export type StoreActions = Actions<TState, ActionList>
