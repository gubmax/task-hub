import React, { FC, memo } from 'react'

import { cn } from 'src/helpers'
import { LoaderProps } from './Loader.types'
import s from './Loader.module.scss'

const Loader: FC<LoaderProps> = memo(({ small, white, className }) => {
  const classNames = cn(
    s.loader,
    small && s.small,
    white && s.white,
    className,
  )

  return (
    <span className={classNames}>
      <span className={s.spinner} />
    </span>
  )
})

export { Loader }
