import { useCallback } from 'react'

import {
  setBooleanItemToLocalStorage, getDarkModeMediaQuery, getThemeMode,
  getCurrThemeMode, setTheme,
} from 'src/helpers'
import { useStore } from 'src/hooks'
import { Theme } from 'src/helpers/theme'

const useTheme = (): [
  {
    bySystem: boolean;
    mode: Theme;
  },
  {
    initThemeChanger: () => void,
    toggleThemeBySystem: (value: boolean) => void,
    setDarkMode: (value: boolean) => void,
  },
] => {
  const [themeState, { setThemeMode, setThemeBySystem }] = useStore((state) => state.theme)
  const { bySystem, mode } = themeState

  const initThemeChanger = useCallback(() => {
    const currTheme = bySystem ? getCurrThemeMode() : mode
    setTheme(currTheme)

    const darkModeMediaQuery = getDarkModeMediaQuery()
    darkModeMediaQuery.addListener((e) => {
      const isDarkMode = e.matches
      const theme = getThemeMode(isDarkMode)
      setTheme(theme)
    })
  }, [bySystem, mode])

  const toggleThemeBySystem = useCallback((value: boolean) => {
    const currTheme = getCurrThemeMode()

    setThemeMode(currTheme)
    setThemeBySystem(value)

    localStorage.setItem('theme', currTheme)
    setBooleanItemToLocalStorage('themeBySystem', value)
  }, [setThemeBySystem, setThemeMode])

  const setDarkMode = useCallback((value: boolean) => {
    const currThemeMode = getThemeMode(value)

    setThemeBySystem(false)
    setThemeMode(currThemeMode)
    setTheme(currThemeMode)

    localStorage.setItem('theme', currThemeMode)
    setBooleanItemToLocalStorage('themeBySystem', false)
  }, [setThemeBySystem, setThemeMode])

  return [
    themeState,
    {
      initThemeChanger,
      toggleThemeBySystem,
      setDarkMode,
    },
  ]
}

export { useTheme }
