import { Theme } from 'src/helpers/theme'

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
