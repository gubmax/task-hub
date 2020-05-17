import React, { FC, useCallback } from 'react'

import { cn } from 'src/helpers'
import { DummyCardProps } from './DummyCard.types'
import s from './DummyCard.module.scss'

const DummyCard: FC<DummyCardProps> = ({ className, type, active, onClick }) => {
  const handleClick = useCallback(() => onClick(type === 'dark'), [onClick, type])

  return (
    <div className={cn(s.wrapper, className)}>
      <div className={cn(s.card, s[type], active && s.isActive)} onClick={handleClick}>
        <div className={s.narrowLine} />
        <div className={s.columns}>
          <div className={s.leftColumn}>
            <div className={s.circle} />
            <div className={s.circle} />
            <div className={s.circle} />
          </div>
          <div className={s.rightColumn}>
            <div className={s.line} />
            <div className={s.line} />
          </div>
        </div>
      </div>
      <span className={cn(s.text, active && s.isActive)}>{type}</span>
    </div>
  )
}

export { DummyCard }
