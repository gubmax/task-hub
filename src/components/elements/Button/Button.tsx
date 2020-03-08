import React, { FC } from 'react'

import { ButtonProps } from './Button.interface'
import s from './Button.module.scss'

const Button: FC<ButtonProps> = ({
  children, primary, className, onClick,
}) => (
  <button
    className={`${s.btn} ${(primary && s.primary) || s.default} ${className}`}
    type="button"
    onClick={onClick}
  >
    {children}
  </button>
)

export { Button }
