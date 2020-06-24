import {
  useReducer, useRef, useEffect, Reducer,
  useCallback,
} from 'react'

import { mockFetch } from 'src/helpers'
import { useRequestType, ReducerStateType, ReducerActionType } from './useRequest.types'

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
  const didCancel = useRef(false)

  const request = useCallback(async () => {
    dispatch({ type: 'FETCH_START' })

    const res = await mockFetch(data)

    if (didCancel.current) {
      return res
    }

    if (res instanceof Error) {
      dispatch({ type: 'FETCH_FAILURE', payload: res.toString() })
    } else {
      dispatch({ type: 'FETCH_SUCCESS', payload: res })
    }

    return res
  }, [data])

  useEffect(() => {
    const getData = () => {
      if (didCancel.current) {
        return
      }

      request()
    }

    if (preload) {
      getData()
    }

    return () => {
      didCancel.current = true
    }
  }, [data, url, preload, request])

  return [state, request]
}

export { useRequest }
