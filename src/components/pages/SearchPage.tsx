import React, { FC } from 'react'

import { useStore } from 'src/hooks'
import { SearchResultList, Loader } from 'src/components/elements'

const SearchPage: FC = () => {
  const [{ isSearching }] = useStore((state) => state.search)
  return isSearching ? <Loader /> : <SearchResultList />
}

export { SearchPage }
