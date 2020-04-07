import React, { FC, useMemo } from 'react'
import { TransitionGroup, CSSTransition } from 'react-transition-group'

import { CSSTransitionClassNames } from 'react-transition-group/CSSTransition'
import s from './SwitchTransition.module.scss'

const SwitchTransition: FC<{
  transitionKey?: string | number,
  transitionClassNames?: CSSTransitionClassNames,
}> = ({ children, transitionKey, transitionClassNames }) => {
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

  return useMemo(() => (
    <TransitionGroup component={null}>
      <CSSTransition
        key={transitionKey}
        classNames={switchTransitionClassNames}
        timeout={250}
      >
        {children}
      </CSSTransition>
    </TransitionGroup>
  ), [transitionKey, switchTransitionClassNames, children])
}

export { SwitchTransition }
