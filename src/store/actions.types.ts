import { Theme, MainState } from './state.types'
import { Actions } from './store.types'

export type ActionList = {
  setThemeMode: (payload: Theme) => void,
  setThemeBySystem: (payload: boolean) => void,
  setAcessToken: (payload: string) => void,
  removeAcessToken: () => void,
  toggleSidebar: () => void,
  setSearching: (payload: boolean) => void,
}

export type MainActions = Actions<MainState, ActionList>
