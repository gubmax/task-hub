import React, {
  FC, memo, useCallback, cloneElement,
  Children, ReactElement,
} from 'react'

import { ListProps } from './List.types'
import s from './List.module.scss'

const List: FC<ListProps> = memo(({ className, children }) => {
  const addClassToChild = useCallback(
    (child: ReactElement) => {
      const { className: childClassName } = child.props || {}

      const props = {
        className: childClassName !== undefined
          ? `${s.listItem} ${childClassName}`
          : s.listItem,
      }

      return (
        <div className={s.listItemWrapper}>
          {cloneElement(child, props)}
        </div>
      )
    },
    [],
  )

  return (
    <>
      <div className={className || ''}>
        {
          Children.map(children, (child: ReactElement) => addClassToChild(child))
        }
      </div>
    </>
  )
})

export { List }
