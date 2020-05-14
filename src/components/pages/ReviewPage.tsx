import React, { FC } from 'react'

import { useDocumentTitle } from 'src/hooks'
import { WorkInProgressMsg } from 'src/components/elements'

const ReviewPage: FC = () => {
  useDocumentTitle('Review')
  return <WorkInProgressMsg />
}

export { ReviewPage }
