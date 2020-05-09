import React, {
  FC, memo, ReactElement, Children,
  cloneElement,
} from 'react'

import { Block } from '../Block'
import { ListProps } from './List.interface'
import s from './List.module.scss'

const List: FC<ListProps> = memo(({ className, text, children }) => {
  const addClassToChild = (child: ReactElement) => {
    const { className: childClassName } = child.props

    const props = {
      className: childClassName !== undefined ? `${s.listItem} ${childClassName}` : s.listItem,
    }

    return (
      <div className={s.listItemWrapper}>
        {cloneElement(child, props)}
      </div>
    )
  }

  return (
    <>
      {
        text && <span className={s.text}>{text}</span>
      }
      <Block className={`${s.list} ${className || ''}`}>
        {
          Children.map(children, (child) => addClassToChild(child as ReactElement))
        }
      </Block>
    </>
  )
})

export { List }
