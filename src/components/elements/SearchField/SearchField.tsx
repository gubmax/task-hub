import React, {
  FC, useState, useRef, useCallback,
  useMemo, ChangeEvent, KeyboardEvent,
} from 'react'
import { useHistory, useLocation } from "react-router-dom";

import { ReactComponent as SearchIcon } from 'src/static/images/icons/search-24px.svg'
import { ReactComponent as ClearIcon } from 'src/static/images/icons/clear-24px.svg'
import { SearchFieldProps } from './SearchField.interface'
import s from './SearchField.module.scss'

const SearchField: FC<SearchFieldProps> = ({ className }) => {
  const history = useHistory()
  const { pathname } = useLocation()

  const [value, setValue] = useState('')
  const inputRef = useRef<HTMLInputElement | null>(null)

  const url = '/search'
  const isSearchPage = pathname === url

  const search = useCallback(() => {
    // TODO: Add search request
  } , [])

  const onChangeHandler = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)

    if (pathname !== url) {
      history.push(url)
      return
    }
  }, [history, pathname])


  const onKeyPressHandler = useCallback((event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      search()
    }
  }, [search])

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
        onClick={search}
        onKeyPress={search}
        role="button"
        tabIndex={0}
      />
      <input
        type="text"
        className={s.input}
        value={isSearchPage ? value : ''}
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
    value, search, isSearchPage,
  ])
}

export { SearchField }
