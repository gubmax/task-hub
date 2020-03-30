import { useCallback } from 'react'

import { setBooleanItemToLocalStorage } from 'src/helpers'
import { useStore } from 'src/store'

const getDarkModeMediaQuery = () => window.matchMedia('(prefers-color-scheme: dark)')

const darkModeMatches = () => getDarkModeMediaQuery().matches

const getCurrThemeMode = (isDarkMode: boolean) => (isDarkMode ? 'dark' : 'light')

const setDataThemeAttribute = (theme: string) => {
  document.documentElement.setAttribute('data-theme', theme)

  // Chrome, Firefox OS and Opera
  const metaThemeColor = document.querySelector('meta[name=theme-color]')
  metaThemeColor!.setAttribute('content', theme === 'dark' ? '#212121' : '#fff')
}

const useTheme = (): [
  typeof themeState,
  {
    initThemeChanger: () => void,
    toggleThemeBySystem: () => void,
    toggleCurrTheme: () => void,
  },
] => {
  const [themeState, themeActions] = useStore((state) => state.theme)
  const { bySystem, mode } = themeState
  const { setThemeMode, setThemeBySystem } = themeActions

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

  const toggleThemeBySystem = useCallback(() => {
    setBooleanItemToLocalStorage('themeBySystem', !bySystem)
    setThemeBySystem(!bySystem)
  }, [bySystem, setThemeBySystem])

  const toggleCurrTheme = useCallback(() => {
    const currThemeMode = getCurrThemeMode(mode !== 'dark')

    setThemeBySystem(false)
    setThemeMode(currThemeMode)
    setDataThemeAttribute(currThemeMode)

    localStorage.setItem('theme', currThemeMode)
  }, [mode, setThemeBySystem, setThemeMode])

  return [
    themeState,
    {
      initThemeChanger,
      toggleThemeBySystem,
      toggleCurrTheme,
    }
  ]
}

export { useTheme }
