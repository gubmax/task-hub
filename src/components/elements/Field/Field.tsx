import React, { memo, forwardRef } from 'react'

import { cn } from 'src/helpers'
import { FieldProps } from './Field.types'
import s from './Field.module.scss'

const Field = memo(
  forwardRef<HTMLInputElement, FieldProps>(({
    className, name, value = '', label,
    placeholder, error, password, autoComplete,
    autoFocus = false, onChange, onKeyPress,
  }, ref) => {
    const classNames = cn(
      s.input,
      label && s.withLabel,
      error && s.hasError,
      className,
    )

    const template = (
      <input
        name={name}
        type={password ? 'password' : 'text'}
        className={classNames}
        ref={ref}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        onKeyPress={onKeyPress}
        autoComplete={autoComplete ? 'on' : 'off'}
        autoFocus={autoFocus} // eslint-disable-line jsx-a11y/no-autofocus
      />
    )

    if (label) {
      return (
        <div className={s.wrapper}>
          <span className={s.label}>{label}</span>
          {template}
        </div>
      )
    }

    return template
  }),
)

export { Field }
