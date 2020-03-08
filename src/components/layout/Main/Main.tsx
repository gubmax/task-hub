import React, { FC } from 'react'
import { Switch, Route } from 'react-router-dom'
import { TransitionGroup, CSSTransition } from 'react-transition-group'

import { routes } from './routes'
import { MainProps } from './Main.interface'
import s from './Main.module.scss'

const Main: FC<MainProps> = ({ location }) => {
  const routeTransitionClassNames = {
    enter: s.routeEnter,
    enterActive: s.routeEnterActive,
    exit: s.routeExit,
    exitActive: s.routeExitActive,
  }

  return (
    <main className={s.main}>
      <TransitionGroup component={null}>
        <CSSTransition
          key={location.key}
          classNames={routeTransitionClassNames}
          timeout={250}
        >
          <Switch location={location}>
            {
              routes.map(({ path, exact, component }) => {
                const RouteComponent = component! as any
                return (
                  <Route
                    key={path as string}
                    path={path}
                    exact={exact}
                  >
                    <div className={s.wrapper}>
                      <RouteComponent />
                    </div>
                  </Route>
                )
              })
            }
          </Switch>
        </CSSTransition>
      </TransitionGroup>
    </main>
  )
}

export { Main }
