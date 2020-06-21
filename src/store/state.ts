import { getBooleanItemFromLocalStorage, getCurrThemeMode } from 'src/helpers'
import { Theme } from 'src/helpers/theme'  
import { MainState } from './state.types'

const showSidebar = getBooleanItemFromLocalStorage('showSidebar')
const bySystem = getBooleanItemFromLocalStorage('themeBySystem')
const currTheme = localStorage.getItem('theme') as Theme || null

const initialState: MainState = {
  theme: {
    bySystem: (bySystem === null && currTheme === null) || Boolean(bySystem),
    mode: currTheme || getCurrThemeMode(),
  },
  user: {
    accessToken: 'TOKEN',
  },
  loading: false,
  showSidebar: showSidebar === null || showSidebar,
  search: {
    isSearching: false,
  }
}

export { initialState }
