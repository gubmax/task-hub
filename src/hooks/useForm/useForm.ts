import { useState, useEffect } from 'react'

import { isEmptyField, validationRules } from './validation'
import { ValidationRule, Validate } from './validation/validation.types'
import {
  FormState, FormFields, FormMethods, ValidationRules, ChangeFormState,
} from './useForm.types'

const useForm = <Fields extends FormFields>(
  fields: Fields,
  initialState: FormState<Fields> = {},
  saveState?: (state: FormState<Fields>) => void,
): [FormState<Fields>, FormState<Fields>, FormMethods<Fields>] => {
  type State = FormState<Fields>

  const [state, setFormState] = useState<State>(initialState)
  const [saveStateAllowed, setSaveStateAllowed] = useState<boolean>(false)
  const [errors, setErrors] = useState<State>({})

  const allowSaveState = () => {
    if (saveState) {
      setSaveStateAllowed(true)
    }
  }

  useEffect(() => {
    const saveFormStateToStore = () => {
      if (!saveState || !saveStateAllowed) {
        return
      }

      setSaveStateAllowed(false)
      saveState(state)
    }

    saveFormStateToStore()
  }, [saveStateAllowed, saveState, state])

  const changeFormState: ChangeFormState = (event) => {
    const { value, name } = event.target

    allowSaveState()
    setFormState((prevState: State) => ({ ...prevState, [name]: value }))
  }

  const resetFormState = () => {
    allowSaveState()
    setFormState({ ...initialState })
  }

  const clearFormState = (arr: Array<keyof Fields>) => {
    allowSaveState()

    if (!arr) {
      setFormState({})
      return
    }

    const savedValues = arr.reduce<State>((acc, str) => {
      if (state[str] !== undefined) {
        acc[str] = state[str]
      }
      return acc
    }, {})

    setFormState({ ...savedValues })
  }

  const trimFormStateValues = () => {
    const trimmedState = Object.keys(state).reduce<State>((acc, key: keyof State) => {
      const currVal = state[key]
      if (key !== undefined && currVal !== undefined) {
        acc[key] = currVal.trim()
      }
      return acc
    }, {})

    return trimmedState
  }

  const validateFormState = (
    validatableState: State = state, validatableFields: Fields = fields,
  ): boolean => {
    const errorsObj: State = {}

    Object.keys(validatableFields).forEach((key: keyof Fields) => {
      const currVal = validatableState[key]
      const currRules: ValidationRules = validatableFields[key]

      const validate = (
        name: ValidationRule,
        payload: any,
        validateFunc: Validate<any>,
      ) => {
        const res = currRules !== undefined && (name === 'required' || !isEmptyField(currVal))
          ? validateFunc(currVal!, payload)
          : true

        if (res !== true) {
          errorsObj[key] = res
          return false
        }

        return true
      }

      currRules.find((rule) => {
        const { name, payload }: { name: ValidationRule, payload?: any } = typeof rule === 'object' ? rule : { name: rule }

        if (name !== undefined) {
          return !validate(name, payload, validationRules[name])
        }

        return false
      })
    })

    setErrors(errorsObj)
    return !Object.keys(errorsObj).length
  }

  return [
    state, errors,
    {
      setFormState,
      changeFormState,
      resetFormState,
      clearFormState,
      trimFormStateValues,
      validateFormState,
    },
  ]
}

export { useForm }
