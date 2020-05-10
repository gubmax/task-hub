export type FieldProps = {
  id: string,
  label?: string,
  value?: string | number | string[],
  placeholder?: string,
  onChange?: (value: string) => void,
}
