import React, { FC, memo } from 'react'
import { Switch, Route, useLocation } from 'react-router-dom'

import { SwitchTransition } from 'src/components/elements'
import { Modal } from 'src/components/layout'
import { ModalProps } from './ModalWindow.interface'
import s from './ModalWindow.module.scss'

const ModalWindow: FC<ModalProps> = memo(({ children, path, transitionClassNames }) => {
  const location = useLocation()

  return (
    <SwitchTransition
      transitionKey={location.key}
      transitionClassNames={transitionClassNames}
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
    </SwitchTransition>
  )
})

export { ModalWindow }
