import React, { FC, useMemo, useCallback } from 'react'
import { Link } from 'react-router-dom'

import { setBooleanItemToLocalStorage } from 'src/helpers'
import { useAuth, useBodyWidth } from 'src/hooks'
import { useStore } from 'src/store'
import { SearchField } from 'src/components/elements'
import { ReactComponent as MenuIcon } from 'src/static/images/icons/menu-24px.svg'
import { ReactComponent as SignOutIcon } from 'src/static/images/icons/sign-out-24px.svg'
import { HeaderProps } from './Header.types'
import s from './Header.module.scss'

const Header: FC<HeaderProps> = ({ iconWithLink }) => {
  const [{ showSidebar }, { toggleSidebar }] = useStore()
  const [, { signOut }] = useAuth()

  // Toggle field visability on resize document body
  const [collapseSearch] = useBodyWidth(
    (width) => width <= 776
  )

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

  return useMemo(() => (
    <header className={s.header}>
      {menuIconTemplate}
      <span className={s.title}>
        <span>Task</span>
        <span className={s.titleHighlight}>H</span>
        <span>ub</span>
      </span>
      <div className={s.iconsBox}>
        <SearchField className={s.search} collapse={collapseSearch} />
        <SignOutIcon className={s.icon} onClick={signOut} />
      </div>
    </header>
  ), [menuIconTemplate, signOut, collapseSearch])
}

export { Header }
