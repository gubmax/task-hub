import React, { FC, useCallback } from 'react'

import { useAuth, useForm } from 'src/hooks'
import { FormFields } from 'src/hooks/useForm/useForm.types'
import { Block, Button, Logo} from 'src/components/elements'
import { Form, FormField } from 'src/components/composite'
import s from './SignInForm.module.scss'

type Field = 'login' | 'password'

const formFields: FormFields<Field> = {
  login: ['required', 'email', { name: 'length', payload: 100 }],
  password: ['required', { name: 'length', payload: 100 }],
}

const SignInForm: FC = () => {
  const [{ isLoading }, { signIn }] = useAuth()

  const [formState, formErrors, {
    setFormState, changeFormState, trimFormStateValues, validateFormState,
  }] = useForm(formFields)

  const handleSubmit = useCallback(
    async () => {
      const trimmedState = trimFormStateValues()
      const isValid = validateFormState(trimmedState)
      setFormState({ ...trimmedState })
  
      if (!isValid) {
        return
      }
  
      return signIn()
    },
    [setFormState, signIn, trimFormStateValues, validateFormState]
  )

  return (
    <div className={s.wrapper}>
      <Block className={s.block}>
        <Form className={s.form} onSubmit={handleSubmit}>
          <Logo className={s.logo} size="large" />
          <FormField
            name="login"
            label="E-mail"
            value={formState.login}
            error={formErrors.login}
            onChange={changeFormState}
            autoComplete
            autoFocus
          />
          <FormField
            name="password"
            label="Password"
            value={formState.password}
            error={formErrors.password}
            password
            onChange={changeFormState}
            autoComplete
          />
          <Button
            className={s.submitBtn}
            type="submit"
            primary
            large
            loading={isLoading}
          >
            Войти
          </Button>
        </Form>
      </Block>
    </div>
  )
}

export { SignInForm }
