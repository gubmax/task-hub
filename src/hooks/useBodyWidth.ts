import {
  useState, useEffect, Dispatch, SetStateAction,
  useCallback,
} from 'react'

import {useDebouncedCallback} from 'src/hooks'

const useBodyWidth = (
  condition: (width: number) => boolean,
): [boolean, Dispatch<SetStateAction<boolean>>] => {
  const checkCondition = useCallback(() => condition(document.body.offsetWidth), [condition])
  const [resizeWindow] = useDebouncedCallback(
    () => {
      const check = checkCondition()
      if (check !== value) {
        setValue(check) 
      }
    },
    100
  )

  const [value, setValue] = useState(checkCondition())

  useEffect(() => {
    window.addEventListener('resize', resizeWindow)

    return () => {
      window.removeEventListener('resize', resizeWindow)
    }
  }, [resizeWindow])

  return [value, setValue]
}

export { useBodyWidth }
