import { ComponentType } from 'react'
import { RouteProps } from 'react-router'

import {
  ProjectsPage, CalendarPage, ReviewPage, InfoPage, SearchPage, SettingsPage,
} from 'src/components/pages'

interface Route extends RouteProps {
  component: ComponentType,
}

const routes: Route[] = [
  {
    path: '/',
    exact: true,
    component: ProjectsPage,
  },
  {
    path: '/calendar',
    exact: true,
    component: CalendarPage,
  },
  {
    path: '/review',
    exact: true,
    component: ReviewPage,
  },
  {
    path: '/info',
    exact: true,
    component: InfoPage,
  },
  {
    path: '/search',
    exact: true,
    component: SearchPage,
  },
  {
    path: '/settings',
    exact: true,
    component: SettingsPage,
  },
]

export { routes }
