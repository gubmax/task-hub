import { ComponentType } from 'react'

import {
  LOCATION_ROOT, LOCATION_CALENDAR, LOCATION_REVIEW, LOCATION_INFO,
  LOCATION_SEARCH, LOCATION_SETTINGS,
} from 'src/helpers'
import {
  ProjectsPage, CalendarPage, ReviewPage, InfoPage, SearchPage,
} from 'src/components/pages'

export interface Route {
  path: string,
  exact: boolean,
  component: ComponentType | string,
  breadcrumb?: string,
}

const routes: Route[] = [
  {
    path: LOCATION_ROOT,
    exact: true,
    component: ProjectsPage,
    breadcrumb: 'projects'
  },
  {
    path: LOCATION_CALENDAR,
    exact: true,
    component: CalendarPage,
    breadcrumb: 'calendar'
  },
  {
    path: LOCATION_REVIEW,
    exact: true,
    component: ReviewPage,
    breadcrumb: 'review',
  },
  {
    path: LOCATION_INFO,
    exact: true,
    component: InfoPage,
    breadcrumb: 'info',
  },
  {
    path: LOCATION_SEARCH,
    exact: true,
    component: SearchPage,
    breadcrumb: 'search',
  },
  {
    path: LOCATION_SETTINGS,
    exact: true,
    component: 'SettingsPage',
    breadcrumb: 'settings',
  },
]

export { routes }
