import React, { FC } from 'react'

import { useDocumentTitle } from 'src/hooks'
import { SignInForm } from 'src/components/forms'

const SignInPage: FC = () => {
  useDocumentTitle('Sign in')
  return <SignInForm />
}

export { SignInPage }
