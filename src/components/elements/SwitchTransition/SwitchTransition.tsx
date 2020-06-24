import React, { FC, memo, useMemo } from 'react'
import { TransitionGroup, CSSTransition } from 'react-transition-group'

import { cn } from 'src/helpers'
import { SwitchTransitionProps } from './SwitchTransition.types'
import s from './SwitchTransition.module.scss'

const SwitchTransition: FC<SwitchTransitionProps> = memo(({
  component = null,
  className, children, transitionKey, transitionClassNames,
}) => {
  const switchTransitionClassNames = useMemo(
    () => {
      const {
        enter, enterActive, exit, exitActive,
      } = transitionClassNames || {}
      return {
        enter: cn(s.fadeEnter, enter),
        enterActive: cn(s.fadeEnterActive, enterActive),
        exit: cn(s.fadeExit, exit),
        exitActive: cn(s.fadeExitActive, exitActive),
        ...transitionClassNames,
      }
    },
    [transitionClassNames],
  )

  return (
    <TransitionGroup component={component} className={cn(s.wrapper, className)}>
      <CSSTransition
        key={transitionKey}
        classNames={switchTransitionClassNames}
        timeout={{ enter: 200, exit: 150 }}
      >
        {children}
      </CSSTransition>
    </TransitionGroup>
  )
})

export { SwitchTransition }
