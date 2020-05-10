import { getBooleanItemFromLocalStorage } from 'src/helpers'
import { TTheme, TState } from './state.types'

const showSidebar = getBooleanItemFromLocalStorage('showSidebar')
const bySystem = getBooleanItemFromLocalStorage('themeBySystem')
const currTheme = localStorage.getItem('theme') as TTheme || null

const initialState: TState = {
  theme: {
    bySystem: (bySystem === null && currTheme === null) || Boolean(bySystem),
    mode: currTheme || 'light',
  },
  user: {
    accessToken: 'TOKEN',
  },
  showSidebar: showSidebar === null || showSidebar,
  search: {
    isSearching: false,
  }
}

export { initialState }
