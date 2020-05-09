import React, { FC, memo, useMemo, useCallback } from 'react'

import { Loader } from 'src/components/elements'
import { ButtonProps } from './Button.interface'
import s from './Button.module.scss'

const Button: FC<ButtonProps> = memo(({
  children: text, primary, large, loading,
  className, onClick,
}) => {
  const classNames = useMemo(() => (
    [
      s.btn,
      primary ? s.primary : s.default,
      large && s.large,
      className,
    ].join(' ')
  ), [className, large, primary])

  const clickHandler = useCallback(() => {
    if (loading) {
      return
    }

    return onClick()
  }, [loading, onClick])

  return (
    <button
      className={classNames}
      type="button"
      onClick={clickHandler}
    >
      {loading ? <Loader small white /> : text}
    </button>
  )
})

export { Button }
