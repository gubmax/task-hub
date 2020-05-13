export type FieldProps = {
  id: string,
  label?: string,
  value?: string | number | string[],
  placeholder?: string,
  error?: string,
  password?: boolean,
  onChange?: (id: string, value: string) => void,
}
