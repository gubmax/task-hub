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
  exact?: boolean,
  component: ComponentType | string,
  breadcrumb?: string,
}

const routes: Route[] = [
  {
    path: LOCATION_ROOT,
    exact: true,
    component: ProjectsPage,
    breadcrumb: 'projects',
  },
  {
    path: LOCATION_CALENDAR,
    component: CalendarPage,
    breadcrumb: 'calendar',
  },
  {
    path: LOCATION_REVIEW,
    component: ReviewPage,
    breadcrumb: 'review',
  },
  {
    path: LOCATION_INFO,
    component: InfoPage,
    breadcrumb: 'info',
  },
  {
    path: LOCATION_SEARCH,
    component: SearchPage,
    breadcrumb: 'search',
  },
  {
    path: LOCATION_SETTINGS,
    component: 'SettingsPage',
    breadcrumb: 'settings',
  },
]

export { routes }
