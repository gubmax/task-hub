import React, {
  FC, memo, useState, useRef,
  useCallback, ChangeEvent, KeyboardEvent, useEffect,
} from 'react'
import { useHistory, useLocation } from 'react-router-dom'


import { ENDPOINT_SEARCH, cn } from 'src/helpers'
import { useStore, useRequest, useDebouncedCallback, useClickOutside } from 'src/hooks'
import { ReactComponent as SearchIcon } from 'src/static/images/icons/search-24px.svg'
import { ReactComponent as ClearIcon } from 'src/static/images/icons/clear-24px.svg'
import { SearchFieldProps } from './SearchField.types'
import s from './SearchField.module.scss'

const SearchField: FC<SearchFieldProps> = memo(({ className, collapse = false }) => {
  const history = useHistory()
  const { pathname } = useLocation()
  const [, { setSearching }] = useStore()
  const [, searchFetch] = useRequest({ url: ENDPOINT_SEARCH, preload: true })

  // Debouncing search
  const [debounceSearch, searchImmediately] = useDebouncedCallback(() => {
    if (value === '') {
      return
    }

    if (pathname !== ENDPOINT_SEARCH) {
      history.push(ENDPOINT_SEARCH)
    }

    setSearching(true)
    searchFetch().finally(() => setSearching(false))
  }, 500)

  const [isFocus, setIsFocus] = useState(false)
  const [collapseField, setCollapseField] = useState(collapse)
  const [value, setValue] = useState('')
  const inputRef = useRef<HTMLInputElement | null>(null)

  const isSearchPage = pathname === ENDPOINT_SEARCH

  useEffect(
    () => {
      if (!collapse && !collapseField) {
        setCollapseField(true)
      }
    },
    [collapse, collapseField]
  )

  const elRef = useClickOutside<HTMLDivElement>(
    () => {
      setIsFocus(false)
      if (collapse) {
        setCollapseField(true)
      }
    },
    !collapseField || isFocus,
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
      setIsFocus(true)
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

  const classNames = cn(
    s.wrapper,
    collapse && collapseField ? s.isCollapse : '',
    className,
  )

  const handleClick = useCallback(() => setIsFocus(true), [])

  return (
    <div className={classNames} ref={elRef} onClick={handleClick}>
      <input
        type="text"
        className={cn(s.input, isFocus && s.isActive)}
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
