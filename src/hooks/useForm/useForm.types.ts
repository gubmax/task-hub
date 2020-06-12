import { Dispatch, SetStateAction, ChangeEvent, KeyboardEvent } from 'react'

import { ValidationRule } from './validation/validation.types'

type ValidationRuleWithPayload = {
  name: ValidationRule,
  payload: any,
}

export type ValidationRules =  Array<ValidationRule | ValidationRuleWithPayload>

export type FormFields<T extends string | number | symbol = any> = { [K in T]: ValidationRules }

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
