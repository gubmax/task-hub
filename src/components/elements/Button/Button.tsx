import React, { FC, memo, useCallback } from 'react'

import { cn } from 'src/helpers'
import { Loader } from 'src/components/elements'
import { ButtonProps } from './Button.types'
import s from './Button.module.scss'

const Button: FC<ButtonProps> = memo(({
  children: text,
  type = 'button',
  primary, large, loading, className,
  onClick,
}) => {
  const classNames = cn(
    s.btn,
    primary ? s.primary : s.default,
    large && s.large,
    className,
  )

  const clickHandler = useCallback(() => {
    if (loading) {
      return
    }

    if (onClick) {
      return onClick()
    }
  }, [loading, onClick])

  return (
    <button
      className={classNames}
      type={type}
      onClick={clickHandler}
    >
      {loading ? <Loader small white /> : text}
    </button>
  )
})

export { Button }
