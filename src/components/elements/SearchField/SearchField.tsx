import React, {
  FC, useState, useRef, useCallback,
  useMemo, ChangeEvent, KeyboardEvent,
} from 'react'
import { useHistory, useLocation } from 'react-router-dom'

import { useRequest, useDebouncedCallback } from 'src/hooks'
import { ReactComponent as SearchIcon } from 'src/static/images/icons/search-24px.svg'
import { ReactComponent as ClearIcon } from 'src/static/images/icons/clear-24px.svg'
import { SearchFieldProps } from './SearchField.interface'
import s from './SearchField.module.scss'
import { useStore } from 'src/store'

const SEARCH_URL = '/search'

const SearchField: FC<SearchFieldProps> = ({ className }) => {
  const history = useHistory()
  const { pathname } = useLocation()
  const [, { setSearching }] = useStore()
  const [, searchFetch] = useRequest({ url: SEARCH_URL, preload: true })
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

  const [value, setValue] = useState('')
  const inputRef = useRef<HTMLInputElement | null>(null)

  const isSearchPage = pathname === SEARCH_URL

  const onChangeHandler = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
    
    debounceSearch()
  }, [debounceSearch])

  const onKeyPressHandler = useCallback((event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      searchImmediately()
    }
  }, [searchImmediately])

  const clearValue = useCallback(() => {
    if (value === '') {
      history.goBack()
      return
    }

    setValue('')
    inputRef.current!.focus()
  }, [value, history])

  return useMemo(() => (
    <div className={`${s.wrapper} ${className}`}>
      <SearchIcon
        className={`${s.icon} ${s.searchIcon}`}
        onClick={searchImmediately}
        onKeyPress={searchImmediately}
        role="button"
        tabIndex={0}
      />
      <input
        type="text"
        className={s.input}
        value={value}
        ref={inputRef}
        placeholder="Search"
        onChange={onChangeHandler}
        onKeyPress={onKeyPressHandler}
      />
      {
        isSearchPage
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
  ), [
    className, onChangeHandler, onKeyPressHandler, clearValue,
    value, searchImmediately, isSearchPage,
  ])
}

export { SearchField }
