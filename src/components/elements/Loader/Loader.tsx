import React from 'react'

import s from './Loader.module.scss'

const Loader = ({ className }: { className?: string }) => (
  <span className={`${s.loader} ${className || ''}`}></span>
)

export { Loader }
