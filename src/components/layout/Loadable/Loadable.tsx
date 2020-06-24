import {
  FC, memo, useState, useRef,
  useEffect, createElement, useMemo,
} from 'react'

import { LoadableProps, ResolveIndex } from './Loadable.types'

const isWebpackReady = (moduleId: ResolveIndex) => {
  // eslint-disable-next-line camelcase
  if (typeof __webpack_modules__ !== 'object') {
    return false
  }

  // eslint-disable-next-line camelcase, no-undef
  return __webpack_modules__[moduleId as number] !== undefined
}

// eslint-disable-next-line no-undef
const getWebpackModule = (id: ResolveIndex) => __webpack_require__(id)

const Loadable: FC<LoadableProps> = memo(({
  load, resolveIndex, fallback,
  onLoadingStart = () => {},
  onLoadingEnd = () => {},
}) => {
  const module = useMemo(() => {
    if (isWebpackReady(resolveIndex)) {
      const webpackModule = getWebpackModule(resolveIndex)
      return webpackModule.default || webpackModule
    }

    return null
  }, [resolveIndex])

  const [, forceUpdate] = useState<null>()
  const loadableRef = useRef<any>(module)

  useEffect(
    () => {
      let didCancel = false

      if (loadableRef.current === null) {
        onLoadingStart()

        load().then((component: any) => {
          loadableRef.current = component.default || component
          onLoadingEnd()

          if (!didCancel) {
            forceUpdate(null)
          }
        })
      }

      return () => {
        didCancel = true
      }
    },
    [load, onLoadingEnd, onLoadingStart],
  )

  if (loadableRef.current !== null) {
    return createElement(loadableRef.current)
  }

  if (fallback !== undefined) {
    return fallback
  }

  return null
})

export { Loadable }
