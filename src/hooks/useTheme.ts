import { useCallback } from 'react'

import {
  setBooleanItemToLocalStorage, getDarkModeMediaQuery, darkModeMatches, getCurrThemeMode,
  setDataThemeAttribute,
} from 'src/helpers'
import { useStore } from 'src/hooks'

const useTheme = (): [
  typeof themeState,
  {
    initThemeChanger: () => void,
    toggleThemeBySystem: (value: boolean) => void,
    setDarkMode: (value: boolean) => void,
  },
] => {
  const [themeState, { setThemeMode, setThemeBySystem }] = useStore((state) => state.theme)
  const { bySystem, mode } = themeState

  const initThemeChanger = useCallback(() => {
    const currTheme = bySystem ? getCurrThemeMode(darkModeMatches()) : mode
    setDataThemeAttribute(currTheme)

    const darkModeMediaQuery = getDarkModeMediaQuery()
    darkModeMediaQuery.addListener((e) => {
      const isDarkMode = e.matches
      const currTheme = getCurrThemeMode(isDarkMode)
      setDataThemeAttribute(currTheme)
    })
  }, [bySystem, mode])

  const toggleThemeBySystem = useCallback((value: boolean) => {
    const currTheme = getCurrThemeMode(darkModeMatches())

    setThemeMode(currTheme)
    setThemeBySystem(value)

    localStorage.setItem('theme', currTheme)
    setBooleanItemToLocalStorage('themeBySystem', value)
  }, [setThemeBySystem, setThemeMode])

  const setDarkMode = useCallback((value: boolean) => {
    const currThemeMode = getCurrThemeMode(value)

    setThemeBySystem(false)
    setThemeMode(currThemeMode)
    setDataThemeAttribute(currThemeMode)

    localStorage.setItem('theme', currThemeMode)
    setBooleanItemToLocalStorage('themeBySystem', false)
  }, [setThemeBySystem, setThemeMode])

  return [
    themeState,
    {
      initThemeChanger,
      toggleThemeBySystem,
      setDarkMode,
    }
  ]
}

export { useTheme }
