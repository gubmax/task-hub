import React, { FC, memo, useMemo } from 'react'

import { LoaderProps } from './Loader.interface'
import s from './Loader.module.scss'

const Loader: FC<LoaderProps> = memo(({ small, white, className }) => {
  const classNames = useMemo(() => (
    [
      s.loader,
      small && s.small,
      white && s.white,
      className,
    ].join(' ')
  ), [small, white, className])

  return (
    <span className={classNames}>
      <span className={s.spinner}></span>
    </span>
  )
})

export { Loader }
