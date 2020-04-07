import React, { FC, useState, useEffect, useMemo } from 'react'
import { useHistory, Switch, Route } from 'react-router-dom'

import { ModalWindow, SwitchTransition } from 'src/components/elements'
import { SignInPage } from 'src/components/pages'
import { Header } from '../Header'
import { Sidebar } from '../Sidebar'
import { Main } from '../Main'
import { LocationType } from './Page.interface'
import s from './Page.module.scss'

const Page: FC = () => {
  const { location, goBack } = useHistory<LocationType>()

  const [linkInHeader, setLinkInHeader] = useState(false)
  const [prevLocation, setPrevLocation] = useState(location)

  const { state } = location
  const isSidebarLocation = state && state.isSidebar
  const isModalLocation = state && state.isModal
  const currLocation = isModalLocation ? prevLocation : location

  // Save prev location when sidebar is open
  useEffect(() => {
    if (isModalLocation !== true) {
      setPrevLocation(location)
    }
  }, [isModalLocation, location])

  // Toggle sidebar on resize document body
  useEffect(() => {
    const checkBodyWidth = () => document.body.offsetWidth <= 776

    const onResize = () => {
      const bodyIsNarrow = checkBodyWidth()
  
      if (linkInHeader !== bodyIsNarrow) {
        setLinkInHeader(bodyIsNarrow)
  
        if (bodyIsNarrow === false && isSidebarLocation === true) {
          goBack()
        }
      }
    }

    setLinkInHeader(checkBodyWidth())
    window.addEventListener('resize', onResize)

    return () => {
      window.removeEventListener('resize', onResize)
    }
  }, [goBack, isSidebarLocation, linkInHeader])

  const sidebarClassNames = useMemo(() => ({
    enter: s.sidebarEnter,
    enterActive: s.sidebarEnterActive,
    exit: s.sidebarExit,
    exitActive: s.sidebarExitActive,
  }), [])

  const sidebarTemplate = useMemo(() => {
    if (linkInHeader) {
      return (
        <ModalWindow path="/sidebar" transitionClassNames={sidebarClassNames}>
          <Sidebar locationPathName={currLocation.pathname} goBack={goBack} />
        </ModalWindow>
      )
    }

    return <Sidebar locationPathName={currLocation.pathname} />
  }, [goBack, linkInHeader, currLocation.pathname, sidebarClassNames])

  return useMemo(() => (
    <SwitchTransition transitionKey={currLocation.key}>
      <Switch location={location}>
        <Route path="/sign-in">
          <SignInPage />
        </Route>
        <Route path="*">
          <div className={s.base}>
            <Header iconWithLink={linkInHeader} />
            <Main location={currLocation} />
            {sidebarTemplate}
          </div>
        </Route>
      </Switch>
    </SwitchTransition>
  ), [location, currLocation, linkInHeader, sidebarTemplate])
}

export { Page }
