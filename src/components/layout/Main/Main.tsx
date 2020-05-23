import React, { FC, memo, useMemo } from 'react'
import { Switch, Route } from 'react-router-dom'

import { Breadcrumbs } from 'src/components/layout'
import { SwitchTransition } from 'src/components/elements'
import { routes } from './routes'
import { MainProps } from './Main.types'
import s from './Main.module.scss'

const Main: FC<MainProps> = memo(({ location }) => {
  const routesTemplate = useMemo(
    () => (
      routes.map(({ path, exact, component: RouteComponent }) => (
        <Route
          key={path as string}
          path={path}
          exact={exact}
        >
          <RouteComponent />
        </Route>       
      ))
    ),
    []
  )

  return (
    <main className={s.main}>
      <Breadcrumbs location={location} />
      <SwitchTransition component="div" transitionKey={location.key}>
        <Switch location={location}>
          {routesTemplate}
        </Switch>
      </SwitchTransition>
    </main>
  )
})

export { Main }
