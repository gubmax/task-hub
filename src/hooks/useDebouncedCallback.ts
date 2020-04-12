import { useRef, useCallback } from 'react'

const useDebouncedCallback = <T extends (...args: any[]) => any>(
  callback: T,
  delay: number = 200,
): [T, () => void] => {
  const timeoutHandler = useRef<ReturnType<typeof setTimeout> | null>(null)
  const debouncedFunction = useRef(callback)
  debouncedFunction.current = callback

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
      debouncedFunction.current(...args)
    }, delay)
  }, [cancelDebouncedCallback, delay])

  return [debouncedCallback as T, cancelDebouncedCallback]
}

export { useDebouncedCallback }
