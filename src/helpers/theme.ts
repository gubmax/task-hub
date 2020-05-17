export const getDarkModeMediaQuery = () => window.matchMedia('(prefers-color-scheme: dark)')

export const darkModeMatches = () => getDarkModeMediaQuery().matches

export const getCurrThemeMode = (isDarkMode: boolean) => (isDarkMode ? 'dark' : 'light')

export const setDataThemeAttribute = (theme: string) => {
  document.documentElement.setAttribute('data-theme', theme)

  // Chrome, Firefox OS and Opera
  const metaThemeColor = document.querySelector('meta[name=theme-color]')
  metaThemeColor!.setAttribute('content', theme === 'dark' ? '#212121' : '#fff')
}
