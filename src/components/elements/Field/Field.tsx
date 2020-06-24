import React, { memo, forwardRef } from 'react'

import { cn } from 'src/helpers'
import { FieldProps } from './Field.types'
import s from './Field.module.scss'

const Field = memo(
  forwardRef<HTMLInputElement, FieldProps>(({
    className, name, value = '', placeholder,
    error, password, autoComplete, autoFocus = false,
    onChange, onKeyPress,
  }, ref) => (
    <input
      name={name}
      type={password ? 'password' : 'text'}
      className={cn(s.input, error && s.hasError, className)}
      ref={ref}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      onKeyPress={onKeyPress}
      autoComplete={autoComplete ? 'on' : 'off'}
      autoFocus={autoFocus} // eslint-disable-line jsx-a11y/no-autofocus
    />
  )),
)

export { Field }
