import React, { FC, useMemo } from 'react'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import { Switch, Route, useLocation } from 'react-router-dom'

import { Modal } from 'src/components/layout'
import { ModalProps } from './ModalWindow.interface'
import s from './ModalWindow.module.scss'

const ModalWindow: FC<ModalProps> = ({ children, path, transitionClassNames }) => {
  const location = useLocation()

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
        key={location.key}
        classNames={switchTransitionClassNames}
        timeout={{ enter: 250, exit: 200 }}
      >
        <Switch location={location}>
          <Route path={path}>
            <Modal>
              <div className={s.overlay}>
                {children}
              </div>
            </Modal>
          </Route>
        </Switch>
      </CSSTransition>
    </TransitionGroup>
  ), [children, location, path, switchTransitionClassNames])
}

export { ModalWindow }
