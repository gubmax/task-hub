import React, {
  FC, useMemo, useCallback, cloneElement,
  Children, ReactElement,
} from 'react'

import { cn } from 'src/helpers'
import { ListProps } from './List.types'
import s from './List.module.scss'

const List: FC<ListProps> = ({ className, children }) => {
  const addClassName = useCallback(
    (child: ReactElement) => cloneElement(child, {
      className: cn(s.listItem, child.props.className),
    }),
    [],
  )

  const itemsTemplate = useMemo(
    () => (
      Children.map(children, (child: ReactElement, index) => (
        <>
          {addClassName(child)}
          { index !== children.length - 1 && <hr className={s.separator} />}
        </>
      ))
    ),
    [addClassName, children],
  )

  return (
    <div className={className || ''}>
      {itemsTemplate}
    </div>
  )
}

export default List
