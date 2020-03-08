import React, { FC, useCallback, MouseEvent } from 'react'
import { Link } from 'react-router-dom'

import { useStore } from 'src/store'
import { routes } from './routes'
import { SidebarProps } from './Sidebar.interface'
import s from './Sidebar.module.scss'

const Sidebar: FC<SidebarProps> = ({ locationPathName, goBack }) => {
  const [{ showSidebar }, { toggleSidebar }] = useStore()

  const getLinkClassName = useCallback((path: string) => (
    `${s.listItem} ${locationPathName === path ? s.isActive : ''}`
  ), [locationPathName])

  const onNavClick = useCallback((e: MouseEvent<HTMLElement>) => (
    e.stopPropagation()
  ), [])

  const toggleTemplate = useCallback(() => (
    goBack
      ? goBack()
      : toggleSidebar()
  ), [goBack, toggleSidebar])

  return (
    <div
      className={`${s.wrapper} ${showSidebar || goBack ? s.isShow : ''} ${goBack ? s.isFullscreen : ''}`}
      onClick={toggleTemplate}
      onKeyPress={toggleTemplate}
      role="button"
      tabIndex={0}
    >
      <div
        className={s.nav}
        onClick={onNavClick}
        onKeyPress={toggleTemplate}
        role="button"
        tabIndex={0}
      >
        <nav className={s.list}>
          {
            Object.keys(routes).map((key) => {
              const { iconComponent: Icon, name } = routes[key]
              return (
                <Link key={key} to={key} className={getLinkClassName(`/${key}`)}>
                  <Icon className={s.listIcon} />
                  <span>{name}</span>
                </Link>
              )
            })
          }
        </nav>
      </div>
    </div>
  )
}

export { Sidebar }
