import React, {
  FC, memo, useState, useEffect,
  useMemo,
} from 'react'
import { useHistory, Switch, Route } from 'react-router-dom'

import { useBodyWidth } from  'src/hooks'
import { ModalWindow, SwitchTransition } from 'src/components/elements'
import { SignInPage } from 'src/components/pages'
import { Header } from '../Header'
import { Sidebar } from '../Sidebar'
import { Main } from '../Main'
import { LocationType } from './Page.types'
import s from './Page.module.scss'

const SIGN_IN_LOCATION_PATHNAME = '/sign-in'

const Page: FC = memo(() => {
  const { location, goBack } = useHistory<LocationType>()

  const [prevLocation, setPrevLocation] = useState(location)

  const { state } = location
  const isSidebarLocation = state && state.isSidebar
  const isModalLocation = state && state.isModal
  const currLocation = isModalLocation ? prevLocation : location
  const isSwitchableLocation = currLocation.pathname === SIGN_IN_LOCATION_PATHNAME

  // Save prev location when sidebar is open
  useEffect(() => {
    if (isModalLocation !== true) {
      setPrevLocation(location)
    }
  }, [isModalLocation, location])

  // Toggle sidebar on resize document body
  const [collapseSidebar] = useBodyWidth((width) => width <= 776)

  useEffect(() => {
    if (!collapseSidebar && isSidebarLocation) {
      goBack()
    }
  }, [collapseSidebar, goBack, isSidebarLocation])

  const sidebarClassNames = useMemo(() => ({
    enter: s.sidebarEnter,
    enterActive: s.sidebarEnterActive,
    exit: s.sidebarExit,
    exitActive: s.sidebarExitActive,
  }), [])

  const sidebarTemplate = useMemo(() => {
    const { pathname } = currLocation

    if (collapseSidebar) {
      return (
        <ModalWindow path="/sidebar" transitionClassNames={sidebarClassNames}>
          <Sidebar pathname={pathname} goBack={goBack} fullscreen />
        </ModalWindow>
      )
    }

    return <Sidebar pathname={pathname} />
  }, [goBack, collapseSidebar, currLocation, sidebarClassNames])

  return (
    <SwitchTransition transitionKey={Number(isSwitchableLocation)}>
      <Switch location={location}>
        <Route path={SIGN_IN_LOCATION_PATHNAME}>
          <SignInPage />
        </Route>
        <Route path="*">
          <div className={s.base}>
            <Header iconWithLink={collapseSidebar} />
            <Main location={currLocation} />
            {sidebarTemplate}
          </div>
        </Route>
      </Switch>
    </SwitchTransition>
  )
})

export { Page }
