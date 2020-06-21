import React, { FC, memo } from 'react'
import { Link as RouterLink, LinkProps, useLocation } from 'react-router-dom'

const Link: FC<LinkProps> = memo(({to, ...rest}) => {
  const location = useLocation()

  const linkTo = typeof to === 'string'
    ? { pathname: to }
    : to

  const linkState = typeof to === 'object'
    ? { ...to.state, from: location}
    : { from: location }

  return (
    <RouterLink
      {...rest}
      to={{
        ...linkTo,
        ...{ state: linkState}
      }}
    />
  )
})

export { Link }
