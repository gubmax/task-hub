import React, {
  FC, memo, useRef, useEffect,
  useMemo,
} from 'react'
import { Switch, Route } from 'react-router-dom'

import { LOCATION_SIGNIN, LOCATION_SIDEBAR, MEDIA_BREAKPOINT } from 'src/helpers'
import { useStore, useHistory, useWindowSize } from 'src/hooks'
import {
  Header, Sidebar, Main, LinearLoader,
} from 'src/components/layout'
import { ModalWindow, SwitchTransition } from 'src/components/elements'
import { SignInPage } from 'src/components/pages'
import { LocationType } from './Page.types'
import s from './Page.module.scss'

const Page: FC = memo(() => {
  const [{ loading }] = useStore()
  const { location, goBack } = useHistory<LocationType>()

  const savedLocationRef = useRef(location)

  const { state } = location
  const isSidebarLocation = state && state.isSidebar
  const isModalLocation = state && state.isModal
  const currLocation = isModalLocation ? savedLocationRef.current : location
  const isSwitchableLocation = currLocation.pathname === LOCATION_SIGNIN

  // Save prev location when modal is open
  useEffect(() => {
    if (isModalLocation !== true) {
      savedLocationRef.current = location
    }
  }, [isModalLocation, location])

  // Toggle sidebar on resize viewport
  const [collapseSidebar] = useWindowSize(MEDIA_BREAKPOINT)

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
            <LinearLoader active={loading} />
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
