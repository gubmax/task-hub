import React, {
  FC, useState, useCallback, FormEvent,
} from 'react'

import { FormProps } from './Form.types'

const Form: FC<FormProps> = ({ className, children, onSubmit }) => {
  const [fetching, setFetching] = useState(false)

  const handleSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault()

      if (fetching || onSubmit === undefined) {
        return
      }

      setFetching(true)
      onSubmit().finally(() => {
        setFetching(false)
      })
    },
    [fetching, onSubmit],
  )

  return (
    <form className={className} onSubmit={handleSubmit}>
      {children}
    </form>
  )
}

export default Form
