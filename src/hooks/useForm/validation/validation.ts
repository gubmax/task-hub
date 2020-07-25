import { Validate, Validation } from './validation.types'

export const isEmptyField = (value: string | undefined): boolean => (
  value === undefined
  || value === ''
)

const validateRequiredField = (value: string | undefined): true | string => {
  if (
    isEmptyField(value)
    || value!.match(/^[ ]*$/)
  ) {
    return 'Must not be empty'
  }

  return true
}

const validateFieldLength: Validate<number> = (value, payload) => {
  const errText = `Must be no more than ${payload} symbols`

  if (value.length > payload) {
    return errText
  }

  return true
}

const validateIntegerField: Validate = (value) => {
  const errText = 'Must be an number'
  const re = /^[0-9]*$/
  const res = re.test(value)

  if (res === false) {
    return errText
  }

  return true
}

const validateCorrectDateField: Validate = (value) => {
  const errText = 'Data is invalid'
  const re = /\d{2}.\d{2}.\d{4}/

  if (re.test(value) === false) {
    return errText
  }

  const parts = value.split('.')
  const date = Date.parse(`${parts[1]}/${parts[0]}/${parts[2]}`)

  if (Number.isNaN(date)) {
    return errText
  }

  return true
}

const validateEmailField: Validate = (value) => {
  const errText = 'E-mail is invalid'
  const re = /.+@.+\..+/
  const res = re.test(value)

  if (res === false) {
    return errText
  }

  return true
}

export const validation: Validation = {
  required: validateRequiredField,
  length: validateFieldLength,
  integer: validateIntegerField,
  correctDate: validateCorrectDateField,
  email: validateEmailField,
}
