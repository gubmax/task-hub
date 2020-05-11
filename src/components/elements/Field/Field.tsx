import React, { FC, memo, useCallback, ChangeEvent } from 'react'

import { FieldProps } from './Field.types'
import s from './Field.module.scss'

const Field: FC<FieldProps> = memo(({
  id, label, value, placeholder,
  onChange,
}) => {
  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target
      if (onChange) {
        onChange(value)
      }
    },
    [onChange],
  )

  return (
    <div className={s.wrapper}>
      <input
        id={id}
        type="text"
        className={s.input}
        defaultValue={value}
        placeholder={placeholder}
        onChange={handleChange}
      />
      { label && <span className={s.label}>{label}</span> }
    </div>
  )
})

export { Field }
