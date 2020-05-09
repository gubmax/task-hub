import React, { FC, memo, useMemo } from 'react'
import { TransitionGroup, CSSTransition } from 'react-transition-group'

import {SwitchTransitionProps} from './SwitchTransition.interface'
import s from './SwitchTransition.module.scss'

const SwitchTransition: FC<SwitchTransitionProps> = memo(({
  children,
  transitionKey,
  transitionClassNames,
}) => {
  const switchTransitionClassNames = useMemo(() => {
    const { enter, enterActive, exit, exitActive } = transitionClassNames || {}
    return {
      ...transitionClassNames,
      enter: `${s.fadeEnter}${enter ? ` ${enter}` : ''}`,
      enterActive: `${s.fadeEnterActive}${enterActive ? ` ${enterActive}` : ''}`,
      exit: `${s.fadeExit}${exit ? ` ${exit}` :  ''}`,
      exitActive: `${s.fadeExitActive}${exitActive ? ` ${exitActive}` : ''}`,
    }
  }, [transitionClassNames])

  return (
    <TransitionGroup component={null}>
      <CSSTransition
        key={transitionKey}
        classNames={switchTransitionClassNames}
        timeout={250}
      >
        {children}
      </CSSTransition>
    </TransitionGroup>
  )
})

export { SwitchTransition }
