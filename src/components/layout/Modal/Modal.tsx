import { FC, useMemo, useEffect } from 'react'
import { createPortal } from 'react-dom'

const Modal: FC = ({ children }) => {
  const el = useMemo(() => (
    document.createElement('div')
  ), [])

  useEffect(() => {
    const modalRoot = document.getElementById('modal-root')
    modalRoot!.appendChild(el)
    return () => {
      modalRoot!.removeChild(el)
    }
  }, [el])

  return createPortal(children, el)
}

export { Modal }
