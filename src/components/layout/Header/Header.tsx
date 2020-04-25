import React, { FC , useMemo, useCallback } from 'react'
import { Link } from 'react-router-dom'

import { setBooleanItemToLocalStorage } from 'src/helpers'
import { useAuth, useRequest } from 'src/hooks'
import { useStore } from 'src/store'
import { SearchField, Loader } from 'src/components/elements'
import { ReactComponent as MenuIcon } from 'src/static/images/icons/menu-24px.svg'
import { ReactComponent as RefreshIcon } from 'src/static/images/icons/refresh-24px.svg'
import { ReactComponent as SignOutIcon } from 'src/static/images/icons/sign-out-24px.svg'
import { HeaderProps } from './Header.types'
import s from './Header.module.scss'

const Header: FC<HeaderProps> = ({ iconWithLink }) => {
  const [{ showSidebar }, { toggleSidebar }] = useStore()
  const [, { signOut }] = useAuth()
  const [{ isLoading }, fetchSync] = useRequest<true>({
    url: '/sync',
    preload: true,
  })

  const toggleSidebarMode = useCallback(
    () => {
      setBooleanItemToLocalStorage('showSidebar', !showSidebar)
      toggleSidebar()
    }, 
    [showSidebar, toggleSidebar]
  )

  const menuIcon = useMemo(
    () => (
      <MenuIcon
        className={s.sidebarIcon}
        onClick={iconWithLink ? undefined : toggleSidebarMode}
        onKeyPress={toggleSidebarMode}
        role="button"
        tabIndex={0}
      />
    ),
    [iconWithLink, toggleSidebarMode]
  )

  const menuIconTemplate = useMemo(() => {
    if (iconWithLink) {
      const to = {
        pathname: '/sidebar',
        state: { 
          isSidebar: true,
          isModal: true,
        },
      }
      return <Link to={to}>{menuIcon}</Link>
    }

    return menuIcon
  }, [iconWithLink, menuIcon])

  const syncIcon = useMemo(
    () => {
      if (isLoading) {
        return <Loader className={s.syncLoader} small />
      }

      return <RefreshIcon className={s.icon} onClick={fetchSync} />
    },
    [isLoading, fetchSync]
  )

  return useMemo(() => (
    <header className={s.header}>
      {menuIconTemplate}
      <span className={s.title}>
        <span>Task</span>
        <span className={s.titleHighlight}>H</span>
        <span>ub</span>
      </span>
      <SearchField className={s.search} />
      <div className={s.iconsBox}>
        {syncIcon}
        <SignOutIcon className={s.icon} onClick={signOut} />
      </div>
    </header>
  ), [menuIconTemplate, signOut, syncIcon])
}

export { Header }
