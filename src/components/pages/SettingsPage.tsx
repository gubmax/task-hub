import React, { FC, useCallback, useMemo } from 'react'

import { setDataThemeAttribute, getCurrThemeMode, setBooleanItemToLocalStorage } from 'src/helpers'
import { useStore } from 'src/store'

import { Switch, List } from 'src/components/elements'

const SettingsPage: FC = () => {
  const [{ bySystem, mode }, { setThemeMode, setThemeBySystem }] = useStore(
    (state) => state.theme,
  )

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

  return useMemo(() => (
    <List text="Night mode">
      <Switch id="themeBySystem" checked={bySystem} onChange={toggleThemeBySystem}>Auto</Switch>
      <Switch id="theme" checked={mode === 'dark'} onChange={toggleCurrTheme}>Turn on now</Switch>
    </List>
  ), [bySystem, mode, toggleThemeBySystem, toggleCurrTheme])
}

export { SettingsPage }
