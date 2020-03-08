import { IStore } from './createStore.interface'

export type TTheme = 'dark' | 'light'

export type TState = {
  showSidebar: boolean,
  theme: {
    bySystem: boolean,
    mode: TTheme,
  },
}

export type TStore = IStore<TState>
