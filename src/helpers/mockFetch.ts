export const mockFetch = <Data = true>(data: Data, timeout: number = 2000): Promise<Data> => (
  new Promise((resolve) => { setTimeout(() => resolve(data), timeout) })
)
