import React, {
  FC, memo, useState, useRef,
  useCallback, ChangeEvent, KeyboardEvent,
} from 'react'
import { useHistory, useLocation } from 'react-router-dom'

import { useStore, useRequest, useDebouncedCallback, useClickOutside } from 'src/hooks'
import { ReactComponent as SearchIcon } from 'src/static/images/icons/search-24px.svg'
import { ReactComponent as ClearIcon } from 'src/static/images/icons/clear-24px.svg'
import { SearchFieldProps } from './SearchField.types'
import s from './SearchField.module.scss'

const SEARCH_URL = '/search'

const SearchField: FC<SearchFieldProps> = memo(({ className, collapse = false }) => {
  const history = useHistory()
  const { pathname } = useLocation()
  const [, { setSearching }] = useStore()
  const [, searchFetch] = useRequest({ url: SEARCH_URL, preload: true })

  // Debouncing search
  const [debounceSearch, searchImmediately] = useDebouncedCallback(() => {
    if (value === '') {
      return
    }

    if (pathname !== SEARCH_URL) {
      history.push(SEARCH_URL)
    }

    setSearching(true)
    searchFetch().finally(() => setSearching(false))
  }, 500)

  const [collapseField, setCollapseField] = useState(collapse)
  const [value, setValue] = useState('')
  const inputRef = useRef<HTMLInputElement | null>(null)

  const isSearchPage = pathname === SEARCH_URL

  const elRef = useClickOutside<HTMLDivElement>(
    () => collapse && setCollapseField(true),
    !collapseField,
  )

  const onSearchHandler = useCallback(() => {
    const inputNode = inputRef.current!

    if (collapseField) {
      setCollapseField(false)

      inputNode.ontransitionend = () => {
        inputNode.focus()
        inputNode.ontransitionend = null
      }

      return
    }

    searchImmediately()
    inputNode.focus()
  }, [collapseField, searchImmediately])

  const onChangeHandler = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setValue(event.target.value)
      debounceSearch()
    },
    [debounceSearch]
  )

  const onKeyPressHandler = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter') {
        searchImmediately()
      }
    },
    [searchImmediately]
  )

  const clearValue = useCallback(
    () => {
      if (!value.length) {
        setCollapseField(true)
        history.goBack()
        return
      }

      setValue('')
      inputRef.current!.focus()
    },
    [value, history]
  )

  const classNames = [
    s.wrapper,
    collapse && collapseField ? s.isCollapse : '',
    className,
  ].join(' ')

  return (
    <div className={classNames} ref={elRef}>
      <input
        type="text"
        className={s.input}
        value={value}
        ref={inputRef}
        placeholder="Search"
        onChange={onChangeHandler}
        onKeyPress={onKeyPressHandler}
      />
      <SearchIcon
        className={`${s.icon} ${s.searchIcon}`}
        onClick={onSearchHandler}
        onKeyPress={onSearchHandler}
        role="button"
        tabIndex={0}
      />
      {
        (isSearchPage || value)
        && (!collapse || (collapse && !collapseField))
        && (
          <ClearIcon
            className={`${s.icon} ${s.clearIcon}`}
            onClick={clearValue}
            onKeyPress={clearValue}
            role="button"
            tabIndex={0}
          />
        )
      }
    </div>
  )
})

export { SearchField }
