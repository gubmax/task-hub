import React, { FC, useMemo } from 'react'

import { useTheme } from 'src/hooks'
import { Switch, List } from 'src/components/elements'

const SettingsPage: FC = () => {
  const [{ bySystem, mode }, { toggleThemeBySystem, toggleCurrTheme }] = useTheme()

  return useMemo(() => (
    <List text="Night mode">
      <Switch id="themeBySystem" checked={bySystem} onChange={toggleThemeBySystem}>Auto</Switch>
      <Switch id="theme" checked={mode === 'dark'} onChange={toggleCurrTheme}>Turn on now</Switch>
    </List>
  ), [bySystem, mode, toggleThemeBySystem, toggleCurrTheme])
}

export { SettingsPage }
