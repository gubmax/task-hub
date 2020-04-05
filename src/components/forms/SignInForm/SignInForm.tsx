import React, { FC } from 'react'

import { useAuth } from 'src/hooks'
import { Block, Button } from 'src/components/elements'
import s from './SignInForm.module.scss'

const SignInForm: FC = () => {
  const [, { signIn }] = useAuth()

  return (
    <Block className={s.wrapper}>
      <span className={s.logo}>H</span>
      <Button primary large onClick={signIn}>Войти</Button>
    </Block>
  )
}

export { SignInForm }
