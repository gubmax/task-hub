import React, {
  FC, memo, useMemo, createElement,
} from 'react'
import { Switch, Route } from 'react-router-dom'

import { useStore } from 'src/hooks'
import { Breadcrumbs, Loadable } from 'src/components/layout'
import { Loader } from 'src/components/elements'
import { routes } from './routes'
import { MainProps } from './Main.types'
import s from './Main.module.scss'

const Main: FC<MainProps> = ({ location }) => {
  const [, { setLoadingStart, setLoadingEnd }] = useStore()

  const routesTemplate = useMemo(
    () => (
      routes.map(({ path, exact = false, component }) => {
        const routeTemplate = typeof component === 'string'
          ? (
            <Loadable
              load={() => import(`src/components/pages/${component}`)}
              resolveIndex={require.resolveWeak(`src/components/pages/${component}`)}
              fallback={<Loader />}
              onLoadingStart={setLoadingStart}
              onLoadingEnd={setLoadingEnd}
            />
          )
          : createElement(component)

        return (
          <Route key={path} path={path} exact={exact}>
            {routeTemplate}
          </Route>
        )
      })
    ),
    [setLoadingStart, setLoadingEnd],
  )

  return (
    <main className={s.main}>
      <Breadcrumbs location={location} />
      <Switch location={location}>
        {routesTemplate}
      </Switch>
    </main>
  )
}

export default memo(Main)
