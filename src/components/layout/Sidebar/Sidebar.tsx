import React, {
  FC, memo, useMemo, useCallback,
  MouseEvent, KeyboardEvent,
} from 'react'
import { Link } from 'react-router-dom'

import { cn } from 'src/helpers'
import { useStore } from 'src/hooks'
import { routes } from './routes'
import { SidebarProps } from './Sidebar.types'
import s from './Sidebar.module.scss'

const Sidebar: FC<SidebarProps> = memo(({ pathname, fullscreen = false, goBack }) => {
  const [{ showSidebar }] = useStore()

  const getLinkClassName = useCallback((path: string) => (
    `${s.listItem} ${pathname === path ? s.isActive : ''}`
  ), [pathname])

  const onNavClick = useCallback((e: MouseEvent | KeyboardEvent) => (
    e.stopPropagation()
  ), [])

  const routesTemplate = useMemo(() => (
    Object.keys(routes).map((key) => {
      const { iconComponent: Icon, name } = routes[key]
      return (
        <Link key={key} to={key} className={getLinkClassName(`/${key}`)}>
          <Icon className={s.listIcon} />
          <span>{name}</span>
        </Link>
      )
    })
  ), [getLinkClassName])

  const classNames = cn(
    s.wrapper,
    fullscreen || showSidebar ? s.isShow : '',
    fullscreen ? s.isFullscreen : '',
  )

  return (
    <div className={classNames} onClick={goBack}>
      <div
        className={s.nav}
        onClick={onNavClick}
        onKeyPress={onNavClick}
        role="button"
        tabIndex={0}
      >
        <nav className={s.list}>
          {routesTemplate}
        </nav>
      </div>
    </div>
  )
})

export { Sidebar }
