import { getBooleanItemFromLocalStorage } from 'src/helpers'
import { TTheme, TState } from './state.interface'

const showSidebar = getBooleanItemFromLocalStorage('showSidebar')
const bySystem = getBooleanItemFromLocalStorage('themeBySystem')
const currTheme = localStorage.getItem('theme') as TTheme || null

const initialState: TState = {
  theme: {
    bySystem: (bySystem === null && currTheme === null) || Boolean(bySystem),
    mode: 'light',
  },
  user: {
    accessToken: 'TOKEN',
  },
  showSidebar: showSidebar === null || showSidebar,
}

export { initialState }
