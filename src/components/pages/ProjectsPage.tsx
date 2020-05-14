import React, { FC } from 'react'

import { useDocumentTitle } from 'src/hooks'
import { WorkInProgressMsg } from 'src/components/elements'

const ProjectsPage: FC = () => {
  useDocumentTitle('Projects')
  return <WorkInProgressMsg />
}

export { ProjectsPage }
