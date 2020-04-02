import React from 'react'
import { render } from 'react-dom'

import { App } from 'src/components/layout/App'
import * as serviceWorker from './serviceWorker'
import './index.css'

render(<App />, document.getElementById('app-root'))

serviceWorker.unregister()
