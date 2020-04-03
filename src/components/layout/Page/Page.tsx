import React, {
  FC, useState, useEffect, useMemo,
} from 'react'
import { useHistory } from 'react-router-dom'

import { useTheme } from 'src/hooks'
import { Modal } from 'src/components/layout'
import { Header } from '../Header'
import { Sidebar } from '../Sidebar'
import { Main } from '../Main'
import s from './Page.module.scss'

const Page: FC = () => {
  const [, { initThemeChanger }] = useTheme()
  const { location, goBack } = useHistory<{ isSidebar: boolean }>()

  const [linkInHeader, setLinkInHeader] = useState(false)
  const [prevLocation, setPrevLocation] = useState(location)

  const isSidebarLocation = location.state && location.state.isSidebar
  const currLocation = isSidebarLocation ? prevLocation : location

  // Save prev location when modal window is open
  useEffect(() => {
    if (isSidebarLocation !== true) {
      setPrevLocation(location)
    }
  }, [isSidebarLocation, location])

  // Set theme
  useEffect(() => {
    initThemeChanger()
  }, [initThemeChanger])

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

  return useMemo(() => (
    <div className={s.base}>
      <Header iconWithLink={linkInHeader} />
      <Main location={currLocation} />
      {
        linkInHeader
          ? (
            <Modal path="/sidebar" transitionClassNames={sidebarClassNames}>
              <Sidebar locationPathName={currLocation.pathname} goBack={goBack} />
            </Modal>
          )
          : (
            <Sidebar locationPathName={currLocation.pathname} />
          )
      }
    </div>
  ), [currLocation, goBack, linkInHeader, sidebarClassNames])
}

export { Page }
