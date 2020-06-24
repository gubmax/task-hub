import { useRef, useEffect } from 'react'

const useClickOutside = <RefType extends Node>(
  onClickOutside: () => void,
  handle: boolean = true,
) => {
  const elRef = useRef<RefType| null>(null)

  useEffect(
    () => {
      const checkClick = (event: MouseEvent) => {
        if (
          event.target instanceof Node
          && !elRef.current!.contains(event.target)
        ) {
          onClickOutside()
        }
      }

      if (handle) {
        document.body.addEventListener('click', checkClick)
      }

      return () => {
        document.body.removeEventListener('click', checkClick)
      }
    },
    [handle, onClickOutside],
  )

  return elRef
}

export { useClickOutside }
