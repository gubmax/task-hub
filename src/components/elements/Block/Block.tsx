import React, { FC, memo } from 'react'

import { BlockProps } from './Block.types'
import s from './Block.module.scss'

const Block: FC<BlockProps> = memo(({ className, children }) => (
  <div className={`${s.block} ${className || ''}`}>{children}</div>
))

export { Block }
