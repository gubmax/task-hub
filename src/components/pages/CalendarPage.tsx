import React, { FC } from 'react'

import { useDocumentTitle } from 'src/hooks'
import { WorkInProgressMsg } from 'src/components/elements'

const CalendarPage: FC = () => {
  useDocumentTitle('Calendar')
  return <WorkInProgressMsg />
}

export default CalendarPage
