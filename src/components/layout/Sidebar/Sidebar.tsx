import React, {
  FC, memo, useMemo, useCallback,
  MouseEvent, KeyboardEvent,
} from 'react'

import { cn } from 'src/helpers'
import { useStore } from 'src/hooks'
import { Link } from 'src/components/layout'
import { routes } from './routes'
import { SidebarProps } from './Sidebar.types'
import s from './Sidebar.module.scss'

const Sidebar: FC<SidebarProps> = memo(({ pathname, fullscreen = false, goBack }) => {
  const [{ showSidebar }] = useStore()

  const onNavClick = useCallback((e: MouseEvent | KeyboardEvent) => (
    e.stopPropagation()
  ), [])

  const routesTemplate = useMemo(() => (
    Object.keys(routes).map((key) => {
      const { iconComponent: Icon, name } = routes[key]
      return (
        <Link key={key} to={key} className={cn(
          s.listItem,
          pathname === key && s.isActive,
        )}>
          <Icon className={s.listIcon} />
          <span>{name}</span>
        </Link>
      )
    })
  ), [pathname])

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
