import React, { FC } from 'react'

import { cn } from 'src/helpers'
import { Field } from 'src/components/elements'
import { FormFieldProps } from './FormField.types'
import s from './FormField.module.scss'

const FormField: FC<FormFieldProps> = ({
  className, label, error, ...rest
}) => (
  <div className={cn(s.wrapper, className)}>
    <Field error={error} label={label} {...rest} />
    <span className={s.error}>{error}</span>
  </div>
)

export default FormField
