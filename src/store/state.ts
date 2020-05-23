import { getBooleanItemFromLocalStorage, darkModeMatches, getCurrThemeMode } from 'src/helpers'
import { Theme, MainState } from './state.types'

const showSidebar = getBooleanItemFromLocalStorage('showSidebar')
const bySystem = getBooleanItemFromLocalStorage('themeBySystem')
const currTheme = localStorage.getItem('theme') as Theme || null

const initialState: MainState = {
  theme: {
    bySystem: (bySystem === null && currTheme === null) || Boolean(bySystem),
    mode: currTheme || getCurrThemeMode(darkModeMatches()),
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
