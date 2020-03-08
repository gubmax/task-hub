import React, { FC } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'

import { Page } from '../Page'

const App: FC = () => (
  <Router>
    <Page />
  </Router>
)

export { App }
