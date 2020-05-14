import { useMemo } from 'react'

const useDocumentTitle = (title?: string): string => useMemo(
  () => {
    const mainTitle = 'TaskHub'
    const currTitle = title && title.length
      ? `${title} · ${mainTitle}`
      : mainTitle

    document.title  = currTitle

    return currTitle
  },
  [title]
)

export { useDocumentTitle }
