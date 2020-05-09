import { useRef, useEffect, useCallback } from 'react'

const useDebouncedCallback = <T extends (...args: any[]) => any>(
  callback: T,
  delay: number,
): [T, T, () => void] => {
  const timeoutHandler = useRef<ReturnType<typeof setTimeout> | null>(null)
  const isComponentUnmounted = useRef(true)
  const debouncedFunction = useRef(callback)
  debouncedFunction.current = callback

  useEffect(() => {
    isComponentUnmounted.current = false
  }, [])

  const cancelDebouncedCallback = useCallback(() => {
    const timeout = timeoutHandler.current
    if (timeout !== null) {
      clearTimeout(timeout)
    }

    timeoutHandler.current = null
  }, [])

  const debouncedCallback = useCallback((...args) => {
    const timeout = timeoutHandler.current
    if (timeout !== null) {
      clearTimeout(timeout)
    }

    timeoutHandler.current = setTimeout(() => {
      cancelDebouncedCallback()

      if (isComponentUnmounted.current === false) {
        debouncedFunction.current(...args)
      }
    }, delay)
  }, [cancelDebouncedCallback, delay])

  const callDebouncedCallbackImmediately = (...args: any[]) => {
    if (isComponentUnmounted.current === false) {
      debouncedFunction.current(...args)
    }
    cancelDebouncedCallback()
  }

  return [
    debouncedCallback as T,
    callDebouncedCallbackImmediately as T,
    cancelDebouncedCallback,
  ]
}

export { useDebouncedCallback }
