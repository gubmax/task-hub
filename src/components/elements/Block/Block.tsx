import React, { FC } from 'react'

import { BlockProps } from './Block.interface'
import s from './Block.module.scss'

const Block: FC<BlockProps> = ({ className, children }) => (
  <div className={`${s.block} ${className || ''}`}>{children}</div>
)

export { Block }
