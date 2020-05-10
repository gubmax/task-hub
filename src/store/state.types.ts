import { Store } from './store.types'

export type Theme = 'dark' | 'light'

export type MainState = {
  theme: {
    bySystem: boolean,
    mode: Theme,
  },
  user: {
    accessToken: string | null,
  },
  showSidebar: boolean,
  search: {
    isSearching: boolean,
  }
}
