export type Validate<T = never> = [T] extends [never]
  ? (value: string) => true | string
  : (value: string, payload: T) => true | string

export type Validation = {
  required: Validate<boolean>,
  length: Validate<number>,
  integer: Validate,
  correctDate: Validate,
  email: Validate,
}
