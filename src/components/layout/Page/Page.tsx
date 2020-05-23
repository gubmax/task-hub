import React, {
  FC, memo, useRef, useEffect,
  useMemo,
} from 'react'
import { useHistory, Switch, Route } from 'react-router-dom'

import { LOCATION_SIGNIN, LOCATION_SIDEBAR } from 'src/helpers'
import { useBodyWidth } from  'src/hooks'
import { ModalWindow, SwitchTransition } from 'src/components/elements'
import { SignInPage } from 'src/components/pages'
import { Header } from '../Header'
import { Sidebar } from '../Sidebar'
import { Main } from '../Main'
import { LocationType } from './Page.types'
import s from './Page.module.scss'

const Page: FC = memo(() => {
  const { location, goBack } = useHistory<LocationType>()

  const prevLocation = useRef(location)

  const { state } = location
  const isSidebarLocation = state && state.isSidebar
  const isModalLocation = state && state.isModal
  const currLocation = isModalLocation ? prevLocation.current : location
  const isSwitchableLocation = currLocation.pathname === LOCATION_SIGNIN

  // Save prev location when sidebar is open
  useEffect(() => {
    if (isModalLocation !== true) {
      prevLocation.current = location
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
        <ModalWindow path={LOCATION_SIDEBAR} transitionClassNames={sidebarClassNames}>
          <Sidebar pathname={pathname} goBack={goBack} fullscreen />
        </ModalWindow>
      )
    }

    return <Sidebar pathname={pathname} />
  }, [goBack, collapseSidebar, currLocation, sidebarClassNames])

  return (
    <SwitchTransition transitionKey={Number(isSwitchableLocation)}>
      <Switch location={location}>
        <Route path={LOCATION_SIGNIN}>
          <SignInPage />
        </Route>
        <Route path="*">
          <div className={s.base}>
            <Header iconWithLink={collapseSidebar} />
            <div className={s.main}>
              {sidebarTemplate}
              <Main location={currLocation} />
            </div>
          </div>
        </Route>
      </Switch>
    </SwitchTransition>
  )
})

export { Page }
