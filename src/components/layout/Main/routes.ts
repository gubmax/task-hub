import { ComponentType } from 'react'
import { RouteProps } from 'react-router'

import {
  LOCATION_ROOT, LOCATION_CALENDAR, LOCATION_REVIEW, LOCATION_INFO,
  LOCATION_SEARCH, LOCATION_SETTINGS,
} from 'src/helpers'
import {
  ProjectsPage, CalendarPage, ReviewPage, InfoPage, SearchPage, SettingsPage,
} from 'src/components/pages'

interface Route extends RouteProps {
  component: ComponentType,
}

const routes: Route[] = [
  {
    path: LOCATION_ROOT,
    exact: true,
    component: ProjectsPage,
  },
  {
    path: LOCATION_CALENDAR,
    exact: true,
    component: CalendarPage,
  },
  {
    path: LOCATION_REVIEW,
    exact: true,
    component: ReviewPage,
  },
  {
    path: LOCATION_INFO,
    exact: true,
    component: InfoPage,
  },
  {
    path: LOCATION_SEARCH,
    exact: true,
    component: SearchPage,
  },
  {
    path: LOCATION_SETTINGS,
    exact: true,
    component: SettingsPage,
  },
]

export { routes }
