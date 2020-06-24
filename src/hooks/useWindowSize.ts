import {
  useState, useEffect, Dispatch, SetStateAction,
  useCallback,
} from 'react'

import { useDebouncedCallback } from 'src/hooks'

const useWindowSize = (
  mediaQueryString: string,
): [boolean, Dispatch<SetStateAction<boolean>>] => {
  const checkCondition = useCallback(
    () => window.matchMedia(mediaQueryString).matches,
    [mediaQueryString],
  )

  const [value, setValue] = useState(checkCondition())

  const [resizeWindow] = useDebouncedCallback(
    () => {
      const check = checkCondition()
      if (check !== value) {
        setValue(check)
      }
    },
    100,
  )

  useEffect(() => {
    window.addEventListener('resize', resizeWindow)

    return () => {
      window.removeEventListener('resize', resizeWindow)
    }
  }, [resizeWindow])

  return [value, setValue]
}

export { useWindowSize }
