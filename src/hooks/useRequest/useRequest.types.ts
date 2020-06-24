export type ReducerStateType = {
  responseData: unknown | null,
  isLoading: boolean,
  error: string | null,
}

export type ReducerActionType = {
  type: 'FETCH_START',
  payload?: never;
} | {
  type: 'FETCH_SUCCESS',
  payload: unknown | null,
} | {
  type: 'FETCH_FAILURE',
  payload: string | null,
}

export type useRequestType = <ResponseDataType>(props: {
  url: string,
  data?: ResponseDataType,
  preload?: boolean,
}) => [ReducerStateType, () => Promise<void | ResponseDataType | undefined>]
