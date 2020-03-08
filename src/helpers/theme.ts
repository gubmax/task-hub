const getDarkModeMediaQuery = () => window.matchMedia('(prefers-color-scheme: dark)')

const darkModeMatches = () => getDarkModeMediaQuery().matches

const getCurrThemeMode = (isDarkMode: boolean) => (isDarkMode ? 'dark' : 'light')

const setDataThemeAttribute = (theme: string) => document.documentElement.setAttribute('data-theme', theme)

const addChangeThemeListener = () => {
  const darkModeMediaQuery = getDarkModeMediaQuery()

  darkModeMediaQuery.addListener((e) => {
    const isDarkMode = e.matches
    const currTheme = getCurrThemeMode(isDarkMode)
    setDataThemeAttribute(currTheme)
  })
}

export {
  getDarkModeMediaQuery,
  darkModeMatches,
  getCurrThemeMode,
  setDataThemeAttribute,
  addChangeThemeListener,
}
