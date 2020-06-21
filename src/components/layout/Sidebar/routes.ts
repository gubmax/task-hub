import { FC, SVGProps } from 'react'

import { ReactComponent as ProjectsIcon } from 'src/static/images/icons/projects-24px.svg'
import { ReactComponent as ReviewIcon } from 'src/static/images/icons/review-24px.svg'
import { ReactComponent as CalendarIcon } from 'src/static/images/icons/calendar-24px.svg'
import { ReactComponent as InfoIcon } from 'src/static/images/icons/info-24px.svg'
import { ReactComponent as SettingsIcon } from 'src/static/images/icons/settings-24px.svg'

interface ISidebarRoutes {
  name: string,
  iconComponent: FC<SVGProps<SVGSVGElement>>,
}

const routes: { [key: string]: ISidebarRoutes } = {
  '/': {
    name: 'Projects',
    iconComponent: ProjectsIcon,
  },
  '/calendar': {
    name: 'Calendar',
    iconComponent: CalendarIcon,
  },
  '/review': {
    name: 'Review',
    iconComponent: ReviewIcon,
  },
  '/info': {
    name: 'Info',
    iconComponent: InfoIcon,
  },
  '/settings': {
    name: 'Settings',
    iconComponent: SettingsIcon,
  },
}

export { routes }
