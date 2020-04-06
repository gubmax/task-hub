import React, { FC, useMemo } from 'react'

import { LoaderProps } from './Loader.interface'
import s from './Loader.module.scss'

const Loader: FC<LoaderProps> = ({ white, className }) => {
  const classNames = useMemo(() => (
    [
      s.loader,
      white && s.white,
      className,
    ].join(' ')
  ), [white, className])

  return useMemo(() => (
    <span className={classNames}>
      <span className={s.spinner}></span>
    </span>
  ), [classNames])
}

export { Loader }
