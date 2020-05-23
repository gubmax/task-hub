import React, { FC } from 'react'

import { useAuth } from 'src/hooks'
import { Block, Form, Field, Button, Logo} from 'src/components/elements'
import s from './SignInForm.module.scss'

const SignInForm: FC = () => {
  const [{ isLoading }, { signIn }] = useAuth()

  return (
    <div className={s.wrapper}>
      <Block className={s.block}>
        <Form className={s.form} onSubmit={signIn}>
          <Logo className={s.logo} size="large" />
          <Field id="login" label="E-mail" />
          <Field id="password" label="Password" />
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
