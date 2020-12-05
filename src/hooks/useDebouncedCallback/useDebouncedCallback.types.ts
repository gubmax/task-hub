export type Callback = (...args: any[]) => any

export type DebouncedCallback<T extends Callback = Callback> =
  (...args: Parameters<T>) => Promise<ReturnType<T>>
