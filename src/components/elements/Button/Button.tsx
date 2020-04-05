import React, { FC, useMemo } from 'react'

import { ButtonProps } from './Button.interface'
import s from './Button.module.scss'

const Button: FC<ButtonProps> = ({
  children, primary, large, className,
  onClick,
}) => {
  const classNames = useMemo(() => (
    `${s.btn} ${primary ? s.primary : s.default} ${large ? s.large : ''} ${className || ''}`
  ), [className, large, primary])

  return useMemo(() => (
    <button
      className={classNames}
      type="button"
      onClick={onClick}
    >
      {children}
    </button>
  ), [children, classNames, onClick])
}

export { Button }
