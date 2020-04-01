import { useReducer, useEffect, Reducer, useCallback } from 'react'

import { mockFetch } from 'src/helpers'
import { useRequestType, ReducerStateType, ReducerActionType } from './useRequest.interface'

const initialState: ReducerStateType = {
  responseData: null,
  isLoading: false,
  error: null,
}

const reducer: Reducer<ReducerStateType, ReducerActionType> = (
  state,
  { type, payload },
) => {
  switch (type) {
    case 'FETCH_START':
      return {
        ...state,
        isLoading: true,
      }
    case 'FETCH_SUCCESS':
      return {
        ...state,
        isLoading: false,
        responseData: payload as unknown | null,
      }
    case 'FETCH_FAILURE':
      return {
        ...state,
        isLoading: false,
        error: payload as string | null,
      }
    default:
      return state
  }
}

const useRequest: useRequestType = ({ url, data, preload }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const request = useCallback(async () => {
    dispatch({ type: 'FETCH_START' })
    return mockFetch(data)
      .then((res) => {
        dispatch({ type: 'FETCH_SUCCESS', payload: res })
        return res
      })
      .catch((err: Error) => dispatch({ type: 'FETCH_FAILURE', payload: err.toString() }))
  }, [data])

  useEffect(() => {
    let didCancel = false

    const getData = () => {
      if (didCancel) {
        return
      }

      request()
    }

    if (preload) {
      getData() 
    }

    return () => {
      didCancel = true
    }
  }, [data, url, preload, request])

  return [state, request]
}

export { useRequest }
