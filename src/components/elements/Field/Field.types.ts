export type FieldProps = {
  id: string,
  className?: string,
  label?: string,
  value?: string | number | string[],
  placeholder?: string,
  error?: string,
  password?: boolean,
  autoComplete?: boolean,
  autoFocus?: boolean,
  onChange?: (id: string, value: string) => void,
}
