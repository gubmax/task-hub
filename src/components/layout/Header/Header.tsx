import React, { FC, useMemo, useCallback } from 'react'
import { Link } from 'react-router-dom'

import { setBooleanItemToLocalStorage } from 'src/helpers'
import { useRequest } from 'src/hooks'
import { useStore } from 'src/store'
import { SearchField, Loader } from 'src/components/elements'
import { ReactComponent as MenuIcon } from 'src/static/images/icons/menu-24px.svg'
import { ReactComponent as RefreshIcon } from 'src/static/images/icons/refresh-24px.svg'
import { ReactComponent as ProfileIcon } from 'src/static/images/icons/profile-24px.svg'
import { HeaderProps } from './Header.interface'
import s from './Header.module.scss'

const Header: FC<HeaderProps> = ({ iconWithLink }) => {
  const [{ showSidebar }, { toggleSidebar }] = useStore()
  const [{ isLoading }, fetchSync] = useRequest<true>({
    url: '/sync',
    preload: true,
  })

  const toggleSidebarMode = useCallback(() => {
    setBooleanItemToLocalStorage('showSidebar', !showSidebar)
    toggleSidebar()
  }, [showSidebar, toggleSidebar])

  const menuIcon = useMemo(() => (
    <MenuIcon
      className={s.sidebarIcon}
      onClick={iconWithLink ? undefined : toggleSidebarMode}
      onKeyPress={toggleSidebarMode}
      role="button"
      tabIndex={0}
    />
  ), [iconWithLink, toggleSidebarMode])

  const menuIconTemplate = useMemo(() => (
    iconWithLink
      ? (
        <Link
          to={{
            pathname: '/sidebar',
            state: { isSidebar: true },
          }}
        >
          { menuIcon }
        </Link>
      )
      : menuIcon
  ), [iconWithLink, menuIcon])

  const syncTemplate = useMemo(() => (
    isLoading
      ? (
        <span className={s.syncLoader}>
          <Loader />
        </span>
      )
      : <RefreshIcon className={s.icon} onClick={fetchSync} />
  ), [fetchSync, isLoading])

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
        {syncTemplate}
        <ProfileIcon className={s.icon} />
      </div>
    </header>
  ), [menuIconTemplate, syncTemplate])
}

export { Header }
