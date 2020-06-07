export type ValidationRule = 'required' | 'length' | 'integer' | 'correctDate' | 'email'

export type Validate<P = never> = [P] extends [never]
  ? (value: string) => true | string
  : (value: string, payload: P) => true | string
