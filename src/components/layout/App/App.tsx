import React, { FC, useEffect, useMemo } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'

import { useTheme } from 'src/hooks'
import { Page } from 'src/components/layout'

const App: FC = () => {
  const [, { initThemeChanger }] = useTheme()

  // Set theme
  useEffect(
    () => { initThemeChanger() },
    [initThemeChanger],
  )

  return useMemo(() => (
    <Router>
      <Page />
    </Router>
  ), [])
}

export default App
