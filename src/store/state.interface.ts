import { IStore } from './createStore.interface'

export type TTheme = 'dark' | 'light'

export type TState = {
  theme: {
    bySystem: boolean,
    mode: TTheme,
  },
  user: {
    accessToken: string | null,
  },
  showSidebar: boolean,
  search: {
    isSearching: boolean,
  }
}

export type TStore = IStore<TState>
