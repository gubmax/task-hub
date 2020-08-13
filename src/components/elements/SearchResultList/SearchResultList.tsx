import React, { FC } from 'react'

import s from './SearchResultList.module.scss'

const SearchResultList: FC = () => (
  <div className={s.noResultsMsg}>No results</div>
)

export default SearchResultList
