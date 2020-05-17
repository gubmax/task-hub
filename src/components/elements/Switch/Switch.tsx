import React, { FC, memo } from 'react'

import { cn } from 'src/helpers'
import { SwitchProps } from './Switch.types'
import s from './Switch.module.scss'

const Switch: FC<SwitchProps> = memo(({
  className = '',
  checked = false,
  id, description, children, onChange,
}) => (
  <label
    className={cn(s.switch, className)}
    htmlFor={id}
  >
    <div>
      <span>{children}</span>
      { description && <span className={s.description}>{description}</span> }
    </div>
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
