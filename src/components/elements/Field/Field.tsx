import React, { FC, memo, useCallback, ChangeEvent } from 'react'

import { cn } from 'src/helpers'
import { FieldProps } from './Field.types'
import s from './Field.module.scss'

const Field: FC<FieldProps> = memo(({
  id, label, value, placeholder,
  error, password, onChange,
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

  const classNames = cn(
    s.input,
    error && s.hasError,
  )

  return (
    <div className={s.wrapper}>
      <input
        id={id}
        type={password ? 'password' : 'text'}
        className={classNames}
        defaultValue={value}
        placeholder={placeholder}
        onChange={handleChange}
      />
      { label && <span className={s.label}>{label}</span> }
      { error && <span className={s.error}>{error}</span> }
    </div>
  )
})

export { Field }
