import React, {
  FC, useState, useRef, useCallback, useEffect,
} from 'react'

import { ReactComponent as SearchIcon } from 'src/static/images/icons/search-24px.svg'
import { ReactComponent as ClearIcon } from 'src/static/images/icons/clear-24px.svg'
import { SearchProps } from './Search.interface'
import s from './Search.module.scss'

const Search: FC<SearchProps> = ({ className }) => {
  const [showCleanBtn, setShowCleanBtn] = useState(false)
  const refInput = useRef<HTMLInputElement | null>(null)

  const onInput = useCallback(() => {
    const { length } = refInput.current!.value

    if (length && !showCleanBtn) {
      setShowCleanBtn(true)
    } else if (length === 0) {
      setShowCleanBtn(false)
    }
  }, [showCleanBtn])

  useEffect(() => {
    const container = refInput.current
    container!.addEventListener('input', onInput)

    return () => {
      container!.removeEventListener('input', onInput)
    }
  }, [onInput])

  const clearInputValue = () => {
    refInput.current!.value = ''
    setShowCleanBtn(false)
  }

  return (
    <div className={`${s.wrapper} ${className}`}>
      <SearchIcon className={`${s.icon} ${s.searchIcon}`} />
      <input
        type="text"
        className={s.input}
        ref={refInput}
        placeholder="Search"
      />
      {
        showCleanBtn
          && (
            <ClearIcon
              className={`${s.icon} ${s.clearIcon}`}
              onClick={clearInputValue}
              onKeyPress={clearInputValue}
              role="button"
              tabIndex={0}
            />
          )
      }
    </div>
  )
}

export { Search }
