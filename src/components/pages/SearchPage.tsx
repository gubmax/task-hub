import React, { FC } from 'react'

import { useDocumentTitle, useStore } from 'src/hooks'
import { SearchResultList, Loader } from 'src/components/elements'

const SearchPage: FC = () => {
  useDocumentTitle('Search')
  const [{ isSearching }] = useStore((state) => state.search)
  return isSearching ? <Loader /> : <SearchResultList />
}

export default SearchPage
