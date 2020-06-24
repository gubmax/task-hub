import React, {
  FC, memo, useRef, useEffect,
} from 'react'

import { cn } from 'src/helpers'
import { usePrevious } from 'src/hooks'
import { LinearLoaderProps } from './LinearLoader.types'
import s from './LinearLoader.module.scss'

const LinearLoader: FC<LinearLoaderProps> = memo(({ active }) => {
  const prevActive = usePrevious(active)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const lineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (prevActive) {
      lineRef.current!.classList.add(s.isEnd)

      timeoutRef.current = setTimeout(() => {
        lineRef.current!.classList.remove(s.isEnd)
      }, 400)
    }

    return () => {
      const timeout = timeoutRef.current

      if (timeout) {
        clearTimeout(timeout)
      }

      timeoutRef.current = null
    }
  }, [prevActive])

  const classNames = cn(
    s.wrapper,
    active && s.isActive,
  )

  return (
    <div className={classNames} ref={lineRef}>
      <div className={s.line} />
    </div>
  )
})

export { LinearLoader }
