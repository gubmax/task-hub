import React, {
  FC, useMemo, useCallback, ChangeEvent,
} from 'react'

import { useTheme } from 'src/hooks'
import { Theme } from 'src/helpers/theme'
import { Switch, List, Block } from 'src/components/elements'
import { DummyCard } from './DummyCard'
import s from './ThemeToggler.module.scss'

const ThemeToggler: FC = () => {
  const [{ bySystem, mode }, { toggleThemeBySystem, setDarkMode }] = useTheme()

  const changeModeHandler = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      toggleThemeBySystem(event.target.checked)
    },
    [toggleThemeBySystem],
  )

  return useMemo(() => (
    <Block title="Choose a look" text="You can decide how TaskHub look for you">
      <List>
        <div className={s.wrapper}>
          <DummyCard
            className={s.leftCard}
            text="Light"
            type={Theme.light}
            active={mode === Theme.light}
            onClick={setDarkMode}
          />
          <DummyCard
            className={s.rightCard}
            text="Dark"
            type={Theme.dark}
            active={mode === Theme.dark}
            onClick={setDarkMode}
          />
        </div>
        <Switch
          id="themeBySystem"
          checked={bySystem}
          description="Detects the settings of your device"
          onChange={changeModeHandler}
        >
          Automatically
        </Switch>
      </List>
    </Block>
  ), [bySystem, mode, setDarkMode, changeModeHandler])
}

export default ThemeToggler
