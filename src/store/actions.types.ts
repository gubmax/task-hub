import { Theme } from 'src/helpers/theme'
import { MainState } from './state.types'
import { Actions } from './store.types'

export type ActionList = {
  setThemeMode: (payload: Theme) => void,
  setThemeBySystem: (payload: boolean) => void,
  setAcessToken: (payload: string) => void,
  removeAcessToken: () => void,
  setLoadingStart: () => void,
  setLoadingEnd: () => void,
  toggleSidebar: () => void,
  setSearching: (payload: boolean) => void,
}

export type MainActions = Actions<MainState, ActionList>
