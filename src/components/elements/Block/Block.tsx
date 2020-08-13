import React, { FC } from 'react'

import { cn } from 'src/helpers'
import { BlockProps } from './Block.types'
import s from './Block.module.scss'

const Block: FC<BlockProps> = ({
  className, children, title, text,
}) => (
  <div className={cn(s.wrapper, className)}>
    { title && <span className={s.title}>{title}</span> }
    { text && <span className={s.text}>{text}</span> }
    <div className={s.block}>{children}</div>
  </div>
)

export default Block
