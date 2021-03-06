export const getBooleanItemFromLocalStorage = (key: string): boolean | null => {
  const value = localStorage.getItem(key) as 'true' | 'false'
  return value === null ? null : value === 'true'
}

export const setBooleanItemToLocalStorage = (key: string, value: boolean) => {
  localStorage.setItem(key, value ? 'true' : 'false')
}
