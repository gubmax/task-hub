import React, { FC, memo } from 'react'

import { BlockProps } from './Block.types'
import s from './Block.module.scss'

const Block: FC<BlockProps> = memo(({ className, children, title, text }) => (
  <div className={s.wrapper}>
    { title && <span className={s.title}>{title}</span> }
    { text && <span className={s.text}>{text}</span> }
    <div className={`${s.block} ${className || ''}`}>{children}</div>
  </div>
))

export { Block }
