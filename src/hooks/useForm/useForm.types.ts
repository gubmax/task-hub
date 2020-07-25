import { Dispatch, SetStateAction, ChangeEvent } from 'react'

import { Validation } from './validation/validation.types'

export type RuleWithPayload<
  T extends Validation = Validation,
  K extends keyof T = keyof T,
> = K extends infer N
  ? (
    T[K] extends (value: any) => any
      ? { name: N, payload?: never }
      : (
        T[K] extends (value: any, payload: infer P) => any
          ? { name: N, payload: P }
          : never
      )
    )
  : never

export type Rules = Array<keyof Validation | RuleWithPayload>

export type FormFields<T extends PropertyKey = PropertyKey> = { [K in T]: Rules }

export type FormState<T> = Partial<{ [K in keyof T]: string }>;

export type ChangeFormState = (event: ChangeEvent<HTMLInputElement>) => void;

export type FormMethods<D> = {
  setFormState: Dispatch<SetStateAction<FormState<D>>>,
  changeFormState: ChangeFormState,
  resetFormState: () => void,
  clearFormState: (arr: string[]) => void,
  trimFormStateValues: () => FormState<D>,
  validateFormState: (state?: FormState<D>, fields?: D) => boolean,
}
