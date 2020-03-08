import React, {
  FC, useState, useEffect, useMemo,
} from 'react'
import { Switch, Route, useHistory } from 'react-router-dom'
import { TransitionGroup, CSSTransition } from 'react-transition-group'

import { useStore } from 'src/store'
import {
  setDataThemeAttribute, addChangeThemeListener, darkModeMatches, getCurrThemeMode,
} from 'src/helpers'
import { Header } from '../Header'
import { Sidebar } from '../Sidebar'
import { Main } from '../Main'
import s from './Page.module.scss'

const Page: FC = () => {
  const [{ mode, bySystem }] = useStore((state) => state.theme)
  const { location, goBack } = useHistory<{ isModal: boolean }>()

  const [linkInHeader, setLinkInHeader] = useState(false)
  const [prevLocation, setPrevLocation] = useState(location)

  const isModal = location.state && location.state.isModal
  const currLocation = isModal ? prevLocation : location

  // Save prev location when modal window is open
  useEffect(() => {
    if (isModal !== true) {
      setPrevLocation(location)
    }
  }, [isModal, location])

  // Set theme
  useEffect(() => {
    const currTheme = bySystem === true ? getCurrThemeMode(darkModeMatches()) : mode
    setDataThemeAttribute(currTheme)
    addChangeThemeListener()
  }, [bySystem, mode])

  // Toggle sidebar on resize document body
  useEffect(() => {
    const checkBodyWidth = () => document.body.offsetWidth <= 776

    const onResize = () => {
      const bodyIsNarrow = checkBodyWidth()
  
      if (linkInHeader !== bodyIsNarrow) {
        setLinkInHeader(bodyIsNarrow)
  
        if (bodyIsNarrow === false && isModal === true) {
          goBack()
        }
      }
    }

    setLinkInHeader(checkBodyWidth())
    window.addEventListener('resize', onResize)

    return () => {
      window.removeEventListener('resize', onResize)
    }
  }, [goBack, isModal, linkInHeader])

  const sidebarClassNames = useMemo(() => ({
    enter: s.sidebarEnter,
    enterActive: s.sidebarEnterActive,
    exit: s.sidebarExit,
    exitActive: s.sidebarExitActive,
  }), [])

  return useMemo(() => (
    <div className={s.base}>
      <Header iconWithLink={linkInHeader} />
      <Main location={currLocation} />
      {
        linkInHeader
          ? (
            <TransitionGroup component={null}>
              <CSSTransition
                key={location.key}
                classNames={sidebarClassNames}
                timeout={{ enter: 250, exit: 200 }}
              >
                <Switch location={location}>
                  <Route
                    path="/sidebar"
                  >
                    <Sidebar
                      locationPathName={currLocation.pathname}
                      goBack={goBack}
                    />
                  </Route>
                </Switch>
              </CSSTransition>
            </TransitionGroup>
          )
          : (
            <Sidebar locationPathName={currLocation.pathname} />
          )
      }
    </div>
  ), [
    currLocation, goBack, linkInHeader, location,
    sidebarClassNames,
  ])
}

export { Page }
