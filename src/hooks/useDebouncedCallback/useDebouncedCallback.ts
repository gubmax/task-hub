import { useRef, useEffect, useCallback } from 'react'

import { Callback, DebouncedCallback } from './useDebouncedCallback.types'

const useDebouncedCallback = <T extends Callback>(callback: T, delay: number): [
  DebouncedCallback<T>,
  (...args: Parameters<T>) => ReturnType<T>,
  () => void
] => {
  const timeoutHandlerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const componentIsMounted = useRef(false)

  const cancelDebouncedCallback = useCallback(() => {
    const timeout = timeoutHandlerRef.current

    if (timeout !== null) {
      clearTimeout(timeout)
    }

    timeoutHandlerRef.current = null
  }, [])

  const callDebouncedCallbackImmediately = useCallback(
    (...args: Array<Parameters<T>>) => {
      cancelDebouncedCallback()

      if (componentIsMounted.current) {
        return callback(...args)
      }

      return undefined
    },
    [callback, cancelDebouncedCallback],
  )

  const debouncedCallback: DebouncedCallback = useCallback(
    (...args) => new Promise((resolve) => {
      cancelDebouncedCallback()
      timeoutHandlerRef.current = setTimeout(
        () => resolve(callDebouncedCallbackImmediately(...args)),
        delay,
      )
    }),
    [callDebouncedCallbackImmediately, cancelDebouncedCallback, delay],
  )

  useEffect(() => {
    componentIsMounted.current = true
    return cancelDebouncedCallback
  }, [cancelDebouncedCallback])

  return [
    debouncedCallback,
    callDebouncedCallbackImmediately,
    cancelDebouncedCallback,
  ]
}

export { useDebouncedCallback }
