export const saveToLocalStorage = (key: string, value: ThemeType | IBook[]) => {
  localStorage.setItem(key, JSON.stringify(value))
}
export const getFromLocalStorage = (
  key: string,
): ThemeType | IBook[] | null => {
  const storedValue = localStorage.getItem(key)

  if (storedValue) {
    try {
      const parsedValue = JSON.parse(storedValue) as ThemeType | IBook[]
      return parsedValue
    } catch (error) {
      console.error(`Error parsing localStorage item ${key}: ${error}`)
    }
  }

  return null
}
