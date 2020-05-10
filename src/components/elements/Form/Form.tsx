import React, {
  FC, memo, useState, useCallback,
  FormEvent,
} from 'react'

import { FormProps } from './Form.types'

const Form: FC<FormProps> = memo(({ className, children, onSubmit }) => {
  const [fetch, setFetch] = useState(false)

  const handleSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault()
  
      if (fetch) {
        return
      }
  
      setFetch(true)
      onSubmit().finally(() => {
        setFetch(false)
      })
    },
    [fetch, onSubmit],
  )

  return (
    <form className={className} onSubmit={handleSubmit}>
      {children}
    </form>
  )
})

export { Form }
