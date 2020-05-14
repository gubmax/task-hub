import React, { FC, useMemo } from 'react'

import { useDocumentTitle, useTheme } from 'src/hooks'
import { Switch, List, Block } from 'src/components/elements'

const SettingsPage: FC = () => {
  useDocumentTitle('Settings')
  const [{ bySystem, mode }, { toggleThemeBySystem, toggleCurrTheme }] = useTheme()

  return useMemo(() => (
    <Block title="Night mode" text="You can decide how TaskHub look for you">
      <List>
        <Switch id="themeBySystem" checked={bySystem} onChange={toggleThemeBySystem}>Auto</Switch>
        <Switch id="theme" checked={mode === 'dark'} onChange={toggleCurrTheme}>Turn on now</Switch>
      </List>
    </Block>
  ), [bySystem, mode, toggleThemeBySystem, toggleCurrTheme])
}

export { SettingsPage }
