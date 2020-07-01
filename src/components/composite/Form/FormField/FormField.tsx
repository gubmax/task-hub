import React, { FC, memo } from 'react'

import { cn } from 'src/helpers'
import { Field } from 'src/components/elements'
import { FormFieldProps } from './FormField.types'
import s from './FormField.module.scss'

const FormField: FC<FormFieldProps> = memo(({
  className, label, error, ...rest
}) => (
  <div className={cn(s.wrapper, className)}>
    <Field error={error} {...rest} />
    <span className={s.label}>{label}</span>
    <span className={s.error}>{error}</span>
  </div>
))

export { FormField }