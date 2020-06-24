import React, {
  FC, memo, useMemo, useCallback,
} from 'react'

import { setBooleanItemToLocalStorage, LOCATION_SIDEBAR } from 'src/helpers'
import { useStore, useAuth, useWindowSize } from 'src/hooks'
import { Link } from 'src/components/layout'
import { Logo, SearchField } from 'src/components/elements'
import { ReactComponent as MenuIcon } from 'src/static/images/icons/menu-24px.svg'
import { ReactComponent as SignOutIcon } from 'src/static/images/icons/sign-out-24px.svg'
import { HeaderProps } from './Header.types'
import s from './Header.module.scss'

const Header: FC<HeaderProps> = memo(({ iconWithLink }) => {
  const [{ showSidebar }, { toggleSidebar }] = useStore()
  const [, { signOut }] = useAuth()

  // Toggle field visability on resize viewport
  const [collapseSearch] = useWindowSize('(max-width: 776px)')

  const toggleSidebarMode = useCallback(
    () => {
      setBooleanItemToLocalStorage('showSidebar', !showSidebar)
      toggleSidebar()
    },
    [showSidebar, toggleSidebar],
  )

  const menuIcon = useMemo(
    () => (
      <MenuIcon
        className={s.sidebarIcon}
        {...(!iconWithLink && { onClick: toggleSidebarMode })}
        onKeyPress={toggleSidebarMode}
        role="button"
        tabIndex={0}
      />
    ),
    [iconWithLink, toggleSidebarMode],
  )

  const menuIconTemplate = useMemo(() => {
    if (iconWithLink) {
      const to = {
        pathname: LOCATION_SIDEBAR,
        state: {
          isSidebar: true,
          isModal: true,
        },
      }
      return <Link to={to}>{menuIcon}</Link>
    }

    return menuIcon
  }, [iconWithLink, menuIcon])

  return (
    <header className={s.header}>
      {menuIconTemplate}
      <Logo className={s.logo} />
      <div className={s.iconsBox}>
        <SearchField className={s.search} collapse={collapseSearch} />
        <SignOutIcon className={s.icon} onClick={signOut} />
      </div>
    </header>
  )
})

export { Header }
