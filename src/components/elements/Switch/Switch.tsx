import React, { FC, memo } from 'react'

import { SwitchProps } from './Switch.types'
import s from './Switch.module.scss'

const Switch: FC<SwitchProps> = memo(({
  className = '',
  checked = false,
  id, onChange, children,
}) => (
  <label
    className={`${s.switch} ${className}`}
    htmlFor={id}
  >
    <span>{ children }</span>
    <input
      className={s.input}
      type="checkbox"
      id={id}
      checked={checked}
      onChange={onChange}
    />
    <span className={s.slider} />
  </label>
))

export { Switch }
