import React, { FC, memo, useCallback, ChangeEvent } from 'react'

import { cn } from 'src/helpers'
import { FieldProps } from './Field.types'
import s from './Field.module.scss'

const Field: FC<FieldProps> = memo(({
  id, className, label, value = '',
  placeholder, error, password, autoComplete,
  autoFocus = false,
  onChange,
}) => {
  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target
      if (onChange) {
        onChange(id, value)
      }
    },
    [id, onChange],
  )

  return (
    <div className={cn(s.wrapper, className)}>
      <input
        id={id}
        type={password ? 'password' : 'text'}
        className={cn(s.input, error && s.hasError)}
        value={value}
        placeholder={placeholder}
        onChange={handleChange}
        autoComplete={autoComplete ? 'on' : 'off'}
        autoFocus={autoFocus}
      />
      { label && <span className={s.label}>{label}</span> }
      <span className={s.error}>{error}</span>
    </div>
  )
})

export { Field }
