import React, { FC, memo } from 'react'

import { cn } from 'src/helpers'
import { LogoProps } from './Logo.types'
import s from './Logo.module.scss'

const Logo: FC<LogoProps> = ({ size = 'small', className }) => (
  <span className={cn(s.logo, s[size], className)}>
    <span>Task</span>
    <span className={s.highlight}>H</span>
    <span>ub</span>
  </span>
)

export default memo(Logo)
