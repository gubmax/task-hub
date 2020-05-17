import React, { FC } from 'react'

import { useDocumentTitle } from 'src/hooks'
import { ThemeToggler } from 'src/components/composite'

const SettingsPage: FC = () => {
  useDocumentTitle('Settings')
  return <ThemeToggler />
}

export { SettingsPage }
