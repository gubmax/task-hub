import { ReactType, Key } from 'react'

import { CSSTransitionClassNames } from 'react-transition-group/CSSTransition'

export type SwitchTransitionProps = {
  component?: ReactType,
  className?: string,
  transitionKey?: Key,
  transitionClassNames?: CSSTransitionClassNames,
}
