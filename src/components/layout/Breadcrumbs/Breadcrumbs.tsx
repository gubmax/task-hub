import React, {
  FC, memo, useCallback, useState,
  useEffect, Fragment,
} from 'react'
import { Location } from 'history'

import { cn } from 'src/helpers'
import { usePrevious } from 'src/hooks'
import { Link } from 'src/components/layout'
import { routes } from 'src/components/layout/Main/routes'
import { ReactComponent as BookmarkIcon } from 'src/static/images/icons/bookmark-24px.svg'
import { Breadcrumb } from './Breadcrumbs.types'

import s from './Breadcrumbs.module.scss'

const Breadcrumbs: FC<{ location: Location }> = ({ location }) => {
  const [breadcrumbs, setBreadcrumbs] = useState<Breadcrumb[]>([])
  const prevLocation = usePrevious(location)

  const setRouteBreadcrumbs = useCallback(
    () => {
      const currRoute = routes.find(({ path }) => path === location.pathname)
      if (currRoute?.breadcrumb) {
        const { breadcrumb, path } = currRoute
        setBreadcrumbs([{ name: breadcrumb, path }])
      }
    },
    [location.pathname],
  )

  useEffect(
    () => {
      if (
        !breadcrumbs.length
        || (prevLocation?.pathname !== location.pathname)
      ) {
        setRouteBreadcrumbs()
      }
    },
    [breadcrumbs.length, location.pathname, prevLocation, setRouteBreadcrumbs],
  )

  return (
    <div className={s.wrapper}>
      <BookmarkIcon className={s.icon} />
      {
        breadcrumbs.map(({ name, path }, index) => {
          const isLastCrumb = index === breadcrumbs.length - 1
          return (
            <Fragment key={path}>
              <Link
                className={cn(s.link, isLastCrumb && s.isActive)}
                to={path}
              >
                {name}
              </Link>
              { !isLastCrumb && <span className={s.devider}>/</span> }
            </Fragment>
          )
        })
      }
    </div>
  )
}

export default memo(Breadcrumbs)
