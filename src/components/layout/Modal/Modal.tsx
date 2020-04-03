import React, { FC, useMemo, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import { Switch, Route, useLocation } from 'react-router-dom'

import { ModalProps } from './Modal.interface'
import s from './Modal.module.scss'

const Modal: FC<ModalProps> = ({ children, path, transitionClassNames }) => {
  const location = useLocation()

  const el = useMemo(() => (
    document.createElement('div')
  ), [])

  useEffect(() => {
    const modalRoot = document.getElementById('modal-root')
    modalRoot!.appendChild(el)
    return () => {
      modalRoot!.removeChild(el)
    }
  }, [el])

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

  const template = useMemo(() => (
    <TransitionGroup component={null}>
      <CSSTransition
        key={location.key}
        classNames={switchTransitionClassNames}
        timeout={{ enter: 250, exit: 200 }}
      >
        <Switch location={location}>
          <Route path={path}>
            <div className={s.overlay}>
              {children}
            </div>
          </Route>
        </Switch>
      </CSSTransition>
    </TransitionGroup>
  ), [children, location, path, switchTransitionClassNames])

  return createPortal(template, el)
}

export { Modal }
