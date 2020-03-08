import { darkModeMatches, getCurrThemeMode, getBooleanItemFromLocalStorage } from 'src/helpers'

import { TTheme, TState } from './state.interface'

const showSidebar = getBooleanItemFromLocalStorage('showSidebar')
const bySystem = getBooleanItemFromLocalStorage('themeBySystem')
const currTheme = localStorage.getItem('theme') as TTheme || null
const mode = currTheme || getCurrThemeMode(!bySystem && darkModeMatches())

const initialState: TState = {
  showSidebar: showSidebar === null || showSidebar,
  theme: {
    bySystem: (bySystem === null && currTheme === null) || Boolean(bySystem),
    mode,
  },
}

export { initialState }
