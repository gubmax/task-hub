import { ChangeEvent, KeyboardEvent } from 'react'

export type FieldProps = {
  name: string,
  className?: string,
  value?: string | number | string[],
  label?: string,
  placeholder?: string,
  error?: string,
  password?: boolean,
  autoComplete?: boolean,
  autoFocus?: boolean,
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void,
  onKeyPress?: (event: KeyboardEvent<HTMLInputElement>) => void,
}
