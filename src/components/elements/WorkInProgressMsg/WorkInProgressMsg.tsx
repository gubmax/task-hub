import React, { FC } from 'react'

import s from './WorkInProgressMsg.module.scss'

const WorkInProgressMsg: FC = () => (
  <div className={s.wrapper}>
    <span className={s.title}>Work</span>
    <p className={s.text}>in progress</p>
  </div>
)

export { WorkInProgressMsg }
