import React, { FC, useMemo, useCallback, MouseEvent, KeyboardEvent } from 'react'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router-dom'

import { useStore } from 'src/store'
import { routes } from './routes'
import { SidebarProps } from './Sidebar.interface'
import s from './Sidebar.module.scss'

const Sidebar: FC<SidebarProps> = ({ locationPathName, goBack }) => {
  const [{ showSidebar }] = useStore()
  const history = useHistory()

  const getLinkClassName = useCallback((path: string) => (
    `${s.listItem} ${locationPathName === path ? s.isActive : ''}`
  ), [locationPathName])

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

  return useMemo(() => (
    <div
      className={`${s.wrapper} ${showSidebar || goBack ? s.isShow : ''} ${goBack ? s.isFullscreen : ''}`}
      onClick={history.goBack}
    >
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
  ), [
    goBack, onNavClick, routesTemplate, showSidebar,
    history.goBack,
  ])
}

export { Sidebar }
