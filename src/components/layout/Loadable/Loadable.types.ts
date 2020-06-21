import { ReactElement } from 'react'

export type ResolveIndex = number | string

export type LoadableProps = {
  load: () => Promise<any>,
  resolveIndex: ResolveIndex,
  fallback?: ReactElement,
  // TODO: Add 'timeout' and 'delay' params
  // timeout: number,
  // delay: number,
  onLoadingStart?: () => void,
  onLoadingEnd?: () => void,
}
