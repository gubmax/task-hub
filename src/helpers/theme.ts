import { COLOR_LIGHT_PRIMARY, COLOR_DARK_PRIMARY } from 'src/helpers'

export type Theme = 'dark' | 'light'

export const getDarkModeMediaQuery = () => window.matchMedia('(prefers-color-scheme: dark)')

export const darkModeMatches = () => getDarkModeMediaQuery().matches

export const getThemeMode = (isDarkMode: boolean): Theme => (isDarkMode ? 'dark' : 'light')

export const getCurrThemeMode = () => getThemeMode(darkModeMatches())

export const setMetaThemeColor = (color: string) => {
  const metaThemeColor = document.querySelector('meta[name=theme-color]')
  metaThemeColor!.setAttribute('content', color)
}

export const setTheme = (theme: Theme) => {
  document.documentElement.setAttribute('data-theme', theme)
  setMetaThemeColor(theme === 'dark' ? COLOR_DARK_PRIMARY : COLOR_LIGHT_PRIMARY)
}
