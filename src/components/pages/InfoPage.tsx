import React, { FC } from 'react'

import { useDocumentTitle } from 'src/hooks'
import { WorkInProgressMsg } from 'src/components/elements'

const InfoPage: FC = () => {
  useDocumentTitle('Info')
  return <WorkInProgressMsg />
}

export { InfoPage }
