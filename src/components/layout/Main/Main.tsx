import React, { FC, useMemo } from 'react'
import { Switch, Route } from 'react-router-dom'
import { TransitionGroup, CSSTransition } from 'react-transition-group'

import { routes } from './routes'
import { MainProps } from './Main.interface'
import s from './Main.module.scss'

const Main: FC<MainProps> = ({ location }) => {
  const routeTransitionClassNames = useMemo(() => ({
    enter: s.routeEnter,
    enterActive: s.routeEnterActive,
    exit: s.routeExit,
    exitActive: s.routeExitActive,
  }), [])

  const routesTemplate = useMemo(() => (
    routes.map(({ path, exact, component: RouteComponent }) => (
      <Route
        key={path as string}
        path={path}
        exact={exact}
      >
        <div className={s.wrapper}>
          <RouteComponent />
        </div>
      </Route>
    ))
  ), [])

  return useMemo(() => (
    <main className={s.main}>
      <TransitionGroup component={null}>
        <CSSTransition
          key={location.key}
          classNames={routeTransitionClassNames}
          timeout={250}
        >
          <Switch location={location}>
            {routesTemplate}
          </Switch>
        </CSSTransition>
      </TransitionGroup>
    </main>
  ), [location, routeTransitionClassNames, routesTemplate])
}

export { Main }
